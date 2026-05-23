import React, { useRef, useState, useEffect } from 'react';
import { 
  Paintbrush, 
  Eraser, 
  Trash2, 
  Grid, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  Cpu, 
  Layers, 
  Shield, 
  Zap,
  Activity,
  Maximize2
} from 'lucide-react';

interface SgfPaintStudioProps {
  onAddLog: (message: string) => void;
  selfValue: number;
  setSelfValue: React.Dispatch<React.SetStateAction<number>>;
}

interface AnalysisResult {
  title: string;
  resonance: number;
  visionaryBrief: string;
  codeType: string;
  synthesizedCode: string;
}

export default function SgfPaintStudio({ onAddLog, selfValue, setSelfValue }: SgfPaintStudioProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#E5C158'); // SGF Gold
  const [brushSize, setBrushSize] = useState(4);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [symmetry, setSymmetry] = useState<'none' | 'vertical' | 'radial'>('none');
  const [showGrid, setShowGrid] = useState(true);
  const [userPrompt, setUserPrompt] = useState('');
  
  // Undo/History stacks tracking local RAM non-volatile storage
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Analysis state
  const [analyzing, setAnalyzing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Default color list
  const COLORS = [
    { name: 'SGF Gold', hex: '#E5C158' },
    { name: 'Pure Emerald', hex: '#13C280' },
    { name: 'Virtual Sky', hex: '#0ea5e9' },
    { name: 'Cosmic Crimson', hex: '#ef4444' },
    { name: 'Pure Ink (White)', hex: '#ffffff' }
  ];

  // Preset Drawing Starters for immediate non-dual illumination
  const PRESETS = [
    { 
      name: 'Rust Core Sandbox', 
      desc: 'Symmetric compile gates & lock-free bus vectors.',
      draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.strokeStyle = '#13C280';
        ctx.lineWidth = 3;
        // Central core
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2);
        ctx.stroke();
        // Inner core
        ctx.strokeStyle = '#E5C158';
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 20, 0, Math.PI * 2);
        ctx.stroke();
        // Guard gates
        ctx.strokeStyle = '#0ea5e9';
        ctx.beginPath();
        ctx.moveTo(width / 2 - 80, height / 2);
        ctx.lineTo(width / 2 - 40, height / 2);
        ctx.moveTo(width / 2 + 40, height / 2);
        ctx.lineTo(width / 2 + 80, height / 2);
        ctx.moveTo(width / 2, height / 2 - 80);
        ctx.lineTo(width / 2, height / 2 - 40);
        ctx.moveTo(width / 2, height / 2 + 40);
        ctx.lineTo(width / 2, height / 2 + 80);
        ctx.stroke();
      }
    },
    { 
      name: 'SGF Portal Net', 
      desc: 'Complex concentric triangulation grids.',
      draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.strokeStyle = '#E5C158';
        ctx.lineWidth = 2;
        const centerX = width / 2;
        const centerY = height / 2;
        
        ctx.beginPath();
        for (let i = 1; i <= 4; i++) {
          const radius = i * 25;
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        }
        ctx.stroke();

        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(centerX - 100, centerY - 100);
        ctx.lineTo(centerX + 100, centerY + 100);
        ctx.moveTo(centerX + 100, centerY - 100);
        ctx.lineTo(centerX - 100, centerY + 100);
        ctx.stroke();
      }
    },
    { 
      name: 'Mongo Cluster Node', 
      desc: 'Distributed multi-source database clusters.',
      draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.strokeStyle = '#0ea5e9';
        ctx.lineWidth = 3;
        const cx = width / 2;
        const cy = height / 2;

        ctx.strokeRect(cx - 30, cy - 30, 60, 60);
        ctx.strokeStyle = '#13C280';
        ctx.strokeRect(cx - 90, cy - 80, 40, 40);
        ctx.strokeRect(cx + 50, cy - 80, 40, 40);
        ctx.strokeRect(cx - 90, cy + 40, 40, 40);
        ctx.strokeRect(cx + 50, cy + 40, 40, 40);

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 70, cy - 40); ctx.lineTo(cx - 30, cy - 20);
        ctx.moveTo(cx + 70, cy - 40); ctx.lineTo(cx + 30, cy - 20);
        ctx.moveTo(cx - 70, cy + 40); ctx.lineTo(cx - 30, cy + 20);
        ctx.moveTo(cx + 70, cy + 40); ctx.lineTo(cx + 30, cy + 20);
        ctx.stroke();
      }
    }
  ];

  // Initialize Canvas dimensions responsibly
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed internal painting area in sandboxed viewport resolution
    canvas.width = 600;
    canvas.height = 400;

    // Set background Cosmic Null
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial state
    saveState(canvas);
  }, []);

  const saveState = (canvas: HTMLCanvasElement) => {
    const dataUrl = canvas.toDataURL();
    setHistory(prev => {
      const nextHistory = prev.slice(0, historyIndex + 1);
      return [...nextHistory, dataUrl];
    });
    setHistoryIndex(prev => prev + 1);
  };

  const undo = () => {
    if (historyIndex <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    
    const img = new Image();
    img.src = history[newIndex];
    img.onload = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    onAddLog('PINEAL_REDOX: Reverting visual matrix back one index.');
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState(canvas);
    onAddLog('CANVAS_CLEAR: Purged painting matrix back to absolute neutrality.');
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    preset.draw(ctx, canvas.width, canvas.height);
    saveState(canvas);
    onAddLog(`PRESET_LOADED: Injected structural framework for "${preset.name}".`);
  };

  // Stamp prebuilt sacred vectors straight onto the viewport coordinates
  const stampSacredVector = (type: 'spiral' | 'triangles') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;

    if (type === 'spiral') {
      ctx.beginPath();
      for (let i = 0; i < 200; i++) {
        const angle = 0.1 * i;
        const r = 0.8 * i;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      onAddLog('SGF_FREQUENCY: Stamped 963Hz SGF Golden Spiral vector alignment.');
    } else if (type === 'triangles') {
      ctx.beginPath();
      // Outer
      ctx.moveTo(cx, cy - 80);
      ctx.lineTo(cx - 70, cy + 40);
      ctx.lineTo(cx + 70, cy + 40);
      ctx.closePath();
      // Inverted
      ctx.moveTo(cx, cy + 80);
      ctx.lineTo(cx - 70, cy - 40);
      ctx.lineTo(cx + 70, cy - 40);
      ctx.closePath();
      ctx.stroke();
      onAddLog('SGF_FREQUENCY: Concentric star delta vectors stamped on local memory.');
    }
    saveState(canvas);
  };

  // Coordinates extraction
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Scale client bounding box correctly to match fixed canvas render buffer (600x400)
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  // Execution steps
  const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getCoordinates(e);
    if (!coords) return;

    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#050505' : color;
    ctx.lineWidth = brushSize;

    // Save starting position as a dynamic property to draw segments seamlessly
    (canvas as any).lastCoords = coords;
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentCoords = getCoordinates(e);
    const lastCoords = (canvas as any).lastCoords;
    if (!currentCoords || !lastCoords) return;

    const strokeColor = tool === 'eraser' ? '#050505' : color;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = brushSize;

    // Normal draw line
    drawLine(ctx, lastCoords.x, lastCoords.y, currentCoords.x, currentCoords.y);

    // Dynamic Sabbatical symmetries
    if (symmetry === 'vertical') {
      const mirrorX1 = canvas.width - lastCoords.x;
      const mirrorX2 = canvas.width - currentCoords.x;
      drawLine(ctx, mirrorX1, lastCoords.y, mirrorX2, currentCoords.y);
    } else if (symmetry === 'radial') {
      // 4-axis symmetry
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Vertical mirror
      drawLine(ctx, canvas.width - lastCoords.x, lastCoords.y, canvas.width - currentCoords.x, currentCoords.y);
      // Horizontal mirror
      drawLine(ctx, lastCoords.x, canvas.height - lastCoords.y, currentCoords.x, canvas.height - currentCoords.y);
      // Dual mirror (across both axes)
      drawLine(ctx, canvas.width - lastCoords.x, canvas.height - lastCoords.y, canvas.width - currentCoords.x, canvas.height - currentCoords.y);
    }

    (canvas as any).lastCoords = currentCoords;
  };

  const handleStopDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      saveState(canvas);
    }
  };

  const handleAnalyze = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setAnalyzing(true);
    setAnalysis(null);
    onAddLog(`COGNITIVE_STUDIO: Encoding visual matrix and deploying to Gemini Omni agent backend.`);

    // Simulated diagnostic telemetry streaming
    const messages = [
      "Illuminating local pineal DNS routing headers...",
      "Mapping physical coordinates into high-frequency grid array...",
      "Converting canvas SVG pixels to raw system schema layers...",
      "Connecting with Gemini Omni Agent in the backplane...",
      "Synthesizing compiler-safe solutions (Rust/Python/MongoDB)...",
      "SGF Matrix Convergence Successful. Illuminating results..."
    ];

    let msgIdx = 0;
    setStatusMessage(messages[0]);
    const interval = setInterval(() => {
      msgIdx++;
      if (msgIdx < messages.length) {
        setStatusMessage(messages[msgIdx]);
        onAddLog(`TELEMETRY: ${messages[msgIdx]}`);
      }
    }, 1200);

    try {
      const dataUrl = canvas.toDataURL('image/png');
      
      const res = await fetch('/api/paint-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: dataUrl,
          prompt: userPrompt
        })
      });

      if (!res.ok) {
        throw new Error("Local SGF grid responded with failure code.");
      }

      const result: AnalysisResult = await res.json();
      clearInterval(interval);
      setAnalysis(result);
      
      // Drive smooth growing asset on alignment resonance success
      const resonanceBonus = Number(result.resonance) / 10;
      setSelfValue(prev => prev + resonanceBonus * 1234.56);
      
      onAddLog(`SGF_SYNTHESIS: Generated system model "${result.title}" with resonance rate ${result.resonance}%.`);
    } catch (error) {
      clearInterval(interval);
      console.error(error);
      onAddLog("ERROR: SGF Off-grid compiling server reported resource congestion. Resetting parameters.");
      setStatusMessage("Failing gate bypass. Make sure your GEMINI_API_KEY is configured.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCopyCode = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis.synthesizedCode);
    setCopied(true);
    onAddLog('CLIPBOARD_FLUSH: Copied SGF generated source script.');
    setTimeout(() => setCopied(false), 2000);
  };

  const codeDownload = () => {
    if (!analysis) return;
    const element = document.createElement("a");
    const file = new Blob([analysis.synthesizedCode], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    const fileExt = analysis.codeType === 'mongodb' ? 'js' : analysis.codeType === 'rust' ? 'rs' : 'py';
    element.download = `${analysis.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${fileExt}`;
    document.body.appendChild(element);
    element.click();
    onAddLog('SGF_ROM_WRITE: Compiled artifact downloaded locally to device ROM.');
  };

  return (
    <div className="space-y-6">
      {/* Structural Header */}
      <div className="border-b border-neutral-900 pb-3 flex justify-between items-start flex-wrap gap-2">
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            <Paintbrush className="w-4 h-4 text-source-gold" />
            SGF Cognitive Painting & System Canvas
          </h4>
          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
            Translate manual drawings directly into Rust systems, Python scripts, or MongoDB schemas via our Gemini Omni Agent.
          </p>
        </div>
        <span className="text-[8px] bg-source-emerald/10 text-source-emerald border border-source-emerald/20 px-2 py-0.5 font-mono uppercase font-black tracking-widest">
          ONLINE & FULLY INTERACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Drawing Workspace Panel (LHS) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Controls Hub */}
          <div className="bg-neutral-950 border border-neutral-900 rounded p-3 text-[10px] font-mono flex flex-wrap gap-4 items-center justify-between">
            {/* Ink options */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 uppercase font-bold text-[8px] tracking-wider">Brushes:</span>
              <button 
                onClick={() => setTool('brush')}
                className={`p-1.5 rounded transition always-active-point ${tool === 'brush' ? 'bg-source-gold text-black font-bold' : 'bg-neutral-900 hover:text-white text-neutral-400'}`}
                title="Brush Engine"
              >
                <Paintbrush className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setTool('eraser')}
                className={`p-1.5 rounded transition ${tool === 'eraser' ? 'bg-source-gold text-black font-bold' : 'bg-neutral-900 hover:text-white text-neutral-400'}`}
                title="Eraser Engine"
              >
                <Eraser className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Brush sizes */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 uppercase font-bold text-[8px] tracking-wider">Gauge:</span>
              {[2, 4, 8, 16].map((size) => (
                <button
                  key={size}
                  onClick={() => setBrushSize(size)}
                  className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-black transition ${brushSize === size ? 'border border-source-gold text-source-gold bg-source-gold/10' : 'bg-neutral-900 hover:text-white text-neutral-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Mirror Symmetry */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 uppercase font-bold text-[8px] tracking-wider font-extrabold flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-source-gold" /> Symmetry:
              </span>
              <button 
                onClick={() => setSymmetry('none')}
                className={`px-2 py-0.5 rounded text-[8px] transition ${symmetry === 'none' ? 'bg-neutral-900 border border-neutral-850 text-white' : 'text-neutral-500'}`}
              >
                NONE
              </button>
              <button 
                onClick={() => setSymmetry('vertical')}
                className={`px-2 py-0.5 rounded text-[8px] transition ${symmetry === 'vertical' ? 'bg-source-emerald/20 border border-source-emerald/30 text-source-emerald font-black' : 'text-neutral-500'}`}
              >
                MIRROR
              </button>
              <button 
                onClick={() => setSymmetry('radial')}
                className={`px-2 py-0.5 rounded text-[8px] transition ${symmetry === 'radial' ? 'bg-source-gold/20 border border-source-gold/30 text-source-gold font-black' : 'text-neutral-500'}`}
              >
                RADIAL
              </button>
            </div>

            {/* SGF Vector Stamps */}
            <div className="flex items-center gap-2 border-l border-neutral-900 pl-4">
              <button 
                onClick={() => stampSacredVector('spiral')}
                className="px-2 py-0.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded font-bold text-[8.5px] text-white tracking-wide active:scale-95 transition-all"
                title="Inject Spiral Resonator Frame"
              >
                Golden Spiral
              </button>
              <button 
                onClick={() => stampSacredVector('triangles')}
                className="px-2 py-0.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded font-bold text-[8.5px] text-white tracking-wide active:scale-95 transition-all"
                title="Concentric Grid alignment"
              >
                Delta Grid
              </button>
            </div>
          </div>

          {/* Color & Storage Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-neutral-950/40 border border-neutral-900 rounded font-mono text-[10px]">
            {/* Color Swatches */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 uppercase font-bold text-[8px] tracking-wider">Spectral Paint:</span>
              <div className="flex gap-1.5">
                {COLORS.map((swatch) => (
                  <button 
                    key={swatch.name}
                    onClick={() => {
                      setColor(swatch.hex);
                      setTool('brush');
                      onAddLog(`COLOR_SELECT: Loaded Paint color "${swatch.name}" into brush node.`);
                    }}
                    style={{ backgroundColor: swatch.hex }}
                    className={`w-4 h-4 rounded-full border transition-transform ${color === swatch.hex && tool === 'brush' ? 'scale-125 border-white shadow-lg' : 'border-neutral-900 hover:scale-110'}`}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>

            {/* Clear, Undo */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowGrid(!showGrid)}
                className={`p-1.5 rounded flex items-center gap-1 transition ${showGrid ? 'bg-source-emerald/10 border border-source-emerald/20 text-source-emerald' : 'bg-neutral-900 hover:text-white text-neutral-400'}`}
                title="Toggle Symmetry Grid lines"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:text-white text-neutral-400 rounded disabled:opacity-20 flex items-center transition"
                title="Undo state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={clearCanvas}
                className="p-1 rounded bg-crimson/10 border border-crimson/20 text-red-400 hover:bg-crimson/20 font-bold px-2 py-1 uppercase text-[8px] flex items-center gap-1 transition"
                title="Purge workspace"
              >
                <Trash2 className="w-3" />
                CLEAR ALL
              </button>
            </div>
          </div>

          {/* Interactive Workspace Area */}
          <div 
            ref={containerRef}
            className="w-full relative bg-[#050505] rounded-xl border border-neutral-900 overflow-hidden shadow-2xl flex items-center justify-center aspect-[3/2]"
          >
            {/* Visual background structural alignment grids */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
                {/* Horizontal mesh */}
                <div className="absolute inset-x-0 h-px bg-neutral-900/80 top-1/4" />
                <div className="absolute inset-x-0 h-px bg-neutral-900/85 top-2/4 border-dashed border-source-gold/10" />
                <div className="absolute inset-x-0 h-px bg-neutral-900/80 top-3/4" />
                {/* Vertical mesh */}
                <div className="absolute inset-y-0 w-px bg-neutral-900/80 left-1/4" />
                <div className="absolute inset-y-0 w-px bg-neutral-900/85 left-2/4 border-dashed border-source-gold/10" />
                <div className="absolute inset-y-0 w-px bg-neutral-900/80 left-3/4" />
                {/* Dial Center point */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border border-source-emerald/20 border-dashed" />
              </div>
            )}

            <canvas
              ref={canvasRef}
              onMouseDown={handleStartDraw}
              onMouseMove={handleDrawing}
              onMouseUp={handleStopDraw}
              onMouseLeave={handleStopDraw}
              onTouchStart={handleStartDraw}
              onTouchMove={handleDrawing}
              onTouchEnd={handleStopDraw}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            />
          </div>

          {/* Quick preset structures */}
          <div className="space-y-2">
            <span className="text-[8px] text-neutral-500 font-mono font-bold uppercase tracking-wider block">Bypass canvas & load instant architectural framework presets:</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="bg-neutral-950 hover:bg-neutral-900 text-left p-2.5 border border-neutral-900 rounded group transition"
                >
                  <div className="text-[10px] text-white font-bold group-hover:text-source-gold font-mono">{preset.name}</div>
                  <p className="text-[8px] text-neutral-500 font-mono mt-0.5 leading-none">{preset.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gemini Analyser Control Block (RHS) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col h-full">
          <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-5 space-y-4 flex-1 flex flex-col justify-between">
            {/* Context Prompt Panel */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 text-source-gold" />
                Omni agent Synthesis Buffer
              </div>
              <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
                Provide a prompt detailing the system, schema rules, or business matrix represented by your drawing:
              </p>
              
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Example: Rust client module with high throughput connection, caching outputs locally for offline speed."
                className="w-full h-24 bg-neutral-950 border border-neutral-850 text-[11px] text-white font-mono p-3 rounded outline-none focus:border-source-gold/50"
              />

              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full py-3 bg-source-gold hover:bg-white text-black font-extrabold uppercase text-[10px] tracking-wider rounded font-mono transition-transform active:scale-98 disabled:opacity-45 flex items-center justify-center gap-2"
              >
                <Cpu className="w-4 h-4 animate-spin text-black disabled:hidden" style={{ animationDuration: analyzing ? '3s' : '0s' }} />
                ILLUMINATE THE BLUEPRINT
              </button>
            </div>

            {/* Dynamic Status / Analysis Outcomes */}
            <div className="border-t border-neutral-900 pt-4 flex-1 flex flex-col justify-center min-h-[150px]">
              {analyzing && (
                <div className="text-center space-y-4 py-8 animate-pulse font-mono">
                  <Activity className="w-8 h-8 text-source-gold mx-auto animate-bounce" />
                  <span className="text-[11px] text-white font-black block tracking-widest">{statusMessage}</span>
                  <span className="text-[8px] text-neutral-500 uppercase block tracking-wider mt-1">OPERATING ON SECURE MOTHERBOARD LOOP</span>
                </div>
              )}

              {!analyzing && !analysis && (
                <div className="text-align-center py-6 text-center space-y-2 font-mono text-neutral-500">
                  <Maximize2 className="w-6 h-6 mx-auto text-neutral-700" />
                  <p className="text-[10px] uppercase font-bold tracking-wider">Awaiting your architectural drawing</p>
                  <p className="text-[8.5px] max-w-xs mx-auto leading-relaxed">Draw networks, database clusters, or data pipelines, then submit to construct clean logic systems on direct frequency waves.</p>
                </div>
              )}

              {/* Synthetic analysis details */}
              {!analyzing && analysis && (
                <div className="space-y-4 animate-fade-in font-mono">
                  
                  {/* Title & Resonance Dial */}
                  <div className="flex gap-4 items-center bg-black p-3 rounded border border-neutral-900">
                    {/* Gauge circle representing local neural resonance */}
                    <div className="relative w-14 h-14 rounded-full border-2 border-source-gold flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <span className="text-[11px] font-black text-white block leading-none">{analysis.resonance}%</span>
                        <span className="text-[5.5px] text-source-gold font-extrabold block uppercase tracking-widest leading-none mt-1">SGF HZ</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[8px] text-neutral-500 block uppercase font-bold">SYNTHESIZED ARCHITECTURE:</span>
                      <h5 className="text-[11px] text-white font-extrabold uppercase leading-tight">{analysis.title}</h5>
                    </div>
                  </div>

                  {/* Visionary commentary */}
                  <div className="p-3 bg-neutral-950 border border-neutral-900 rounded space-y-2 text-[10px] text-neutral-300 leading-relaxed max-h-32 overflow-y-auto">
                    <span className="text-[7.5px] text-source-emerald font-black block uppercase tracking-wider">Architectural Commentary (Mulenga Protocol):</span>
                    <p>{analysis.visionaryBrief}</p>
                  </div>

                  {/* Code synthesis box */}
                  <div className="space-y-2 flex-grow">
                    <div className="flex justify-between items-center bg-black/50 border border-neutral-900 px-3 py-1.5 rounded-t-md text-[9px] text-neutral-400">
                      <span className="flex items-center gap-1 uppercase font-bold text-source-gold">
                        <Shield className="w-3 h-3 text-source-emerald" />
                        SYNTHETIC {analysis.codeType} CODE
                      </span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={handleCopyCode}
                          className="hover:text-white flex items-center gap-1 transition"
                        >
                          {copied ? <Check className="w-3 h-3 text-source-emerald" /> : <Copy className="w-3 h-3" />}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                        <span className="text-neutral-700">|</span>
                        <button 
                          onClick={codeDownload}
                          className="hover:text-white flex items-center gap-1 transition text-[9px]"
                        >
                          <Download className="w-3 h-3" /> Get Code
                        </button>
                      </div>
                    </div>

                    <div className="bg-black border-x border-b border-neutral-900 p-3 rounded-b-md max-h-48 overflow-y-auto">
                      <pre className="text-[8.5px] text-white leading-relaxed font-mono whitespace-pre-wrap select-all">
                        <code>{analysis.synthesizedCode}</code>
                      </pre>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
