import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Terminal, 
  Cpu, 
  Zap, 
  Activity, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  Sparkles,
  RefreshCw,
  AlertOctagon,
  ShieldAlert
} from 'lucide-react';

interface TiconDashboardProps {
  onLogAdded?: (log: string) => void;
}

import { PinealGlandEngine } from '../lib/pinealGland';

export default function TiconDashboard({ onLogAdded }: TiconDashboardProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'typescript' | 'python' | 'go' | 'rust' | 'omni' | 'pineal'>('typescript');
  
  // Pineal Gland Engine & Teleprocessor States
  const pinealEngine = PinealGlandEngine.getInstance();
  const [askQuery, setAskQuery] = useState<string>('Synthesize hyper-scalable neural pipelines');
  const [seekQuery, setSeekQuery] = useState<string>('DistributedConsensusNode');
  const [pinealTelemetry, setPinealTelemetry] = useState(pinealEngine.getTelemetry());

  const handleAsk = () => {
    const result = pinealEngine.ask<{ manifestation: string }>(askQuery);
    localAddLog(`PINEAL_ASK: ${result.data.manifestation} (Bypassed polarity in ${result.latencyNs}ns)`);
    setPinealTelemetry(pinealEngine.getTelemetry());
  };

  const handleSeek = () => {
    const result = pinealEngine.seek(seekQuery);
    localAddLog(`PINEAL_SEEK: Found target. Path coordinates initialized: ${result.route} (Capability unlocked: ${result.capacityUnlocked})`);
    setPinealTelemetry(pinealEngine.getTelemetry());
  };

  const handleKnock = () => {
    const result = pinealEngine.knock();
    localAddLog(`PINEAL_KNOCK: Gates of compilation opened [Buffer ${result.signalBuffer}] (Access Granted)`);
    setPinealTelemetry(pinealEngine.getTelemetry());
  };
  const [isWebSocketTapActive, setIsWebSocketTapActive] = useState<boolean>(true);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileProgress, setCompileProgress] = useState<number>(0);
  const [sandboxLogs, setSandboxLogs] = useState<string[]>([
    "COMPILER STATUS: Multi-language testing suite ready.",
    "Awaiting developer compile execution trigger..."
  ]);

  const [systemLogs, setSystemLogs] = useState<string[]>([
    "INITIALIZATION: Network orchestration layers connected.",
    "TELEMETRY: Handshake initialized."
  ]);

  const localAddLog = (log: string) => {
    const time = new Date().toLocaleTimeString();
    const formatted = `[${time}] ${log}`;
    setSystemLogs(prev => [formatted, ...prev].slice(0, 50));
    if (onLogAdded) {
      onLogAdded(formatted);
    }
  };

  // Run Compiler Simulation
  const triggerCompilerRun = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setCompileProgress(0);
    setSandboxLogs([
      `[SANDBOX] Initializing runtime pipeline for: ${selectedLanguage.toUpperCase()}`,
      `[PROVISIONING] Spawning secure isolated container process...`,
      isWebSocketTapActive 
        ? `[GRID ALERT] Local high-voltage state saturating buffers. WebSocket load regulator active.`
        : `[GRID SECURED] Volts balanced. Execution baseline normal.`
    ]);

    const interval = setInterval(() => {
      setCompileProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 20;
      });
    }, 150);

    const steps = isWebSocketTapActive 
      ? [
          "Attaching target connection parameters...",
          "WARNING: WebSocket high voltage detected (43.8kV buffer saturation).",
          "Packet frame alignment failing. Unrecognizable byte headers.",
          "ERROR: Critical overload on WebSocket handler interface.",
          "COMPILATION ABORTED: Please disable the high-voltage WebSocket tap to restore clarity."
        ]
      : [
          "Attaching target connection parameters...",
          "WebSocket supply tap isolated physically. Balanced load locked at 1.2 kV.",
          "Evaluating TypeScript interface types & environment bounds...",
          "WebSocket frame handshake accepted (Status 101 Switching Protocols).",
          "SUCCESS: Grid balance achieved at harmonic 963Hz parameter rate.",
          `SUCCESS: Tested script executed in 450ms. Exit Code: 0.`
        ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSandboxLogs(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsCompiling(false);
          localAddLog(isWebSocketTapActive
            ? `GRID STATUS: Multi-language sandbox compiler blocked under WebSocket voltage overload.`
            : `GRID STATUS: Compliant test pipeline executed successfully on ${selectedLanguage.toUpperCase()}.`
          );
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Upper Grid Layout: Selector Console & Switch Controls */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left: Language Selection and Compiler Window */}
        <div className="xl:col-span-8 p-6 md:p-8 border border-neutral-900 bg-neutral-950/80 rounded-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-900 pb-4">
            <div>
              <h4 className="text-sm font-black uppercase text-white tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4 text-source-gold" />
                Multi-Language Integration Sandbox
              </h4>
              <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                Simulated secure compiler suite to test language executions under load balancing.
              </p>
            </div>
            
            <button
              onClick={triggerCompilerRun}
              disabled={isCompiling}
              className={`px-4 py-1.5 flex items-center gap-2 font-mono text-[10px] font-bold border transition-all ${
                isCompiling
                  ? 'bg-neutral-900 text-neutral-600 border-neutral-800 cursor-not-allowed'
                  : 'bg-source-gold hover:bg-white text-black border-source-gold'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCompiling ? 'animate-spin' : ''}`} />
              {isCompiling ? 'COMPILING...' : 'RUN COMPILER'}
            </button>
          </div>

          {/* Sub-tabs for Language select */}
          <div className="flex flex-wrap gap-2">
            {(['typescript', 'python', 'go', 'rust', 'omni', 'pineal'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                  localAddLog(`CONFIG_LOADED: Selected sandbox runtime alignment to: ${lang.toUpperCase()}`);
                }}
                className={`px-3 py-1.5 font-mono text-[10px] font-semibold border transition-all ${
                  selectedLanguage === lang
                    ? 'bg-source-gold text-black border-source-gold'
                    : 'bg-black text-neutral-500 border-neutral-900 hover:text-white'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Code Window */}
          <div className="p-4 bg-black border border-neutral-900 rounded-lg text-xs font-mono text-neutral-300 overflow-x-auto select-all max-h-[220px]">
            {selectedLanguage === 'typescript' && (
              <pre>{`// Real-Time System Telemetry Stream Web Socket Handler
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const server = createServer();
// Setup WebSocket listener on decoupled server
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (socket) => {
  console.log("WebSocket client successfully connected.");
  
  socket.on('message', (data) => {
    // Process frames correctly without memory overflows
    const message = data.toString('utf-8');
    const parsed = JSON.parse(message);
    console.log("Telemetry frame received:", parsed);
  });
  
  const telemetryInterval = setInterval(() => {
    socket.send(JSON.stringify({
      latency_ms: Math.random() * 2 + 5.0,
      system_load_percent: 18.42,
      status: "OPTIMIZED_FLOW"
    }));
  }, 100);

  socket.on('close', () => clearInterval(telemetryInterval));
});`}</pre>
            )}
            {selectedLanguage === 'omni' && (
              <pre>{`// Multimodal Real-Time Streaming Config (Gemini Omni Integration)
// Establishes zero-latency media stream pipes for startups to scale
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Establish structured processing channel schemas with minimal network footprints.',
  config: {
    systemInstruction: 'Maintain rigid execution bounds and high-accuracy type checks.',
    tools: [{ codeExecution: {} }]
  }
});
console.log("Omni Response:", response.text);`}</pre>
            )}
            {selectedLanguage === 'python' && (
              <pre>{`from google import genai
from google.genai import types

# Modern Python SDK implementation
client = genai.Client()
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents='Verify secure data pipeline configurations.',
    config=types.GenerateContentConfig(
        tools=[types.Tool(code_execution=types.CodeExecution())],
    ),
)
print("Pipeline verified safely:", response.text)`}</pre>
            )}
            {selectedLanguage === 'go' && (
              <pre>{`package main

import (
	"context"
	"fmt"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

func main() {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey("STABLE_KEY"))
	if err != nil {
		panic(err)
	}
	defer client.Close()
	
	fmt.Println("Systems online: decoupled compiler connected.")
}`}</pre>
            )}
            {selectedLanguage === 'rust' && (
              <pre>{`// High-Performance Rust systems backend
fn main() {
    let mut grid_voltage: f64 = 1.2; // Optimized normal kV
    let is_tap_active: bool = false;
    
    if is_tap_active {
        grid_voltage = 43.8; // High voltage saturation
        println!("WARNING: High-voltage buffer overload detected: {} kV", grid_voltage);
    } else {
        println!("Grid voltage stabilized. Secure performance index locked.");
    }
}`}</pre>
            )}
            {selectedLanguage === 'pineal' && (
              <pre>{`// Pineal Gland Source Engine: Bypassing polarity, accessing the ever-flowing stream
import { PinealGlandEngine } from '../lib/pinealGland';

const engine = PinealGlandEngine.getInstance();

// 1. ASK: "Ask, and it shall be given to you"
const { data, latencyNs } = engine.ask("Synthesize hyper-scalable neural pipelines");

// 2. SEEK: "Seek, and ye shall find"
const { route } = engine.seek("DistributedConsensusNode");

// 3. KNOCK: "Knock, and it shall be opened"
const { signalBuffer, accessGranted } = engine.knock();

console.log("Telemetry Hz:", engine.getTelemetry().frequencyHz); // Balanced at 963.00Hz`}</pre>
            )}
          </div>

          {/* Interactive Pineal Control Box */}
          {selectedLanguage === 'pineal' && (
            <div className="mt-4 p-5 bg-[#030303] border-2 border-source-gold/40 rounded-xl space-y-4 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-source-gold/5 blur-[80px] pointer-events-none rounded-full" />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-neutral-900 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-source-gold animate-pulse" />
                  <span className="text-[11px] text-white font-mono uppercase font-black tracking-widest block">
                    Pineal Gland Engine & SGF Root Controller
                  </span>
                </div>
                <span className="text-[9px] px-2.5 py-0.5 bg-source-gold/10 text-source-gold font-mono border border-source-gold/20 rounded uppercase">
                  State: Absolute Neutrality
                </span>
              </div>

              {/* Metric Telemetry */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-neutral-950 p-3 border border-neutral-900 rounded-lg text-center font-mono">
                  <span className="text-[8px] text-neutral-500 block uppercase font-bold tracking-wider">Frequency Hz</span>
                  <span className="text-sm font-black text-white block mt-0.5">963.00 Hz</span>
                </div>
                <div className="bg-neutral-950 p-3 border border-neutral-900 rounded-lg text-center font-mono">
                  <span className="text-[8px] text-neutral-500 block uppercase font-bold tracking-wider">Polar Base</span>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-[9px] text-[#888] line-through font-bold">(-)</span>
                    <span className="text-xs font-black text-source-emerald">NEUTRAL</span>
                    <span className="text-[9px] text-[#888] line-through font-bold">(+)</span>
                  </div>
                </div>
                <div className="bg-neutral-950 p-3 border border-neutral-900 rounded-lg text-center font-mono">
                  <span className="text-[8px] text-neutral-500 block uppercase font-bold tracking-wider">Intelligence Stream</span>
                  <span className="text-xs font-black text-source-gold block mt-0.5 uppercase animate-pulse">Ever-Flowing</span>
                </div>
                <div className="bg-neutral-950 p-3 border border-neutral-900 rounded-lg text-center font-mono">
                  <span className="text-[8px] text-neutral-500 block uppercase font-bold tracking-wider">Signal Capacity</span>
                  <span className="text-sm font-black text-white block mt-0.5">{pinealTelemetry.activeSignals}</span>
                </div>
              </div>

              {/* Action Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {/* Ask column */}
                <div className="p-3 bg-neutral-950/60 border border-neutral-900/50 rounded-lg space-y-2.5">
                  <span className="text-[10px] text-source-gold font-mono font-bold block uppercase tracking-wide border-b border-neutral-900 pb-1">
                    1. ASK (Non-Dual Intent)
                  </span>
                  <input 
                    type="text" 
                    value={askQuery}
                    onChange={(e) => setAskQuery(e.target.value)}
                    placeholder="Ask the universal architecture..."
                    className="w-full bg-black border border-neutral-800 focus:border-source-gold/50 px-2 py-1.5 text-[10px] font-mono text-white rounded outline-none placeholder-neutral-700"
                  />
                  <button 
                    onClick={handleAsk}
                    className="w-full bg-source-gold text-black hover:bg-white text-[9px] font-mono font-bold uppercase py-2 rounded transition-colors active:scale-95"
                  >
                    Ask & Give
                  </button>
                </div>

                {/* Seek column */}
                <div className="p-3 bg-neutral-950/60 border border-neutral-900/50 rounded-lg space-y-2.5">
                  <span className="text-[10px] text-source-emerald font-mono font-bold block uppercase tracking-wide border-b border-neutral-900 pb-1">
                    2. SEEK (Dimensional Address)
                  </span>
                  <input 
                    type="text" 
                    value={seekQuery}
                    onChange={(e) => setSeekQuery(e.target.value)}
                    placeholder="Enter database target address..."
                    className="w-full bg-black border border-neutral-850 focus:border-source-emerald/50 px-2 py-1.5 text-[10px] font-mono text-white rounded outline-none placeholder-neutral-700"
                  />
                  <button 
                    onClick={handleSeek}
                    className="w-full bg-source-emerald text-black hover:bg-white text-[9px] font-mono font-bold uppercase py-2 rounded transition-colors active:scale-95"
                  >
                    Seek & Find
                  </button>
                </div>

                {/* Knock column */}
                <div className="p-3 bg-neutral-950/60 border border-neutral-900/50 rounded-lg flex flex-col justify-between space-y-2.5">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-mono font-bold block uppercase tracking-wide border-b border-neutral-900 pb-1">
                      3. KNOCK (Portal Gate)
                    </span>
                    <p className="text-[8px] text-neutral-500 font-mono mt-1.5 leading-relaxed">
                      Tap into the compilation gate with direct command codes to release write locks immediately.
                    </p>
                  </div>
                  <button 
                    onClick={handleKnock}
                    className="w-full bg-neutral-900 hover:bg-neutral-850 hover:text-white border border-neutral-800 hover:border-source-gold text-neutral-400 text-[9px] font-mono font-bold uppercase py-2 rounded transition-all active:scale-95"
                  >
                    Knock & Open Gateway
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Sandbox Compile Log Terminal */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono">
              <span>Sandbox Logs</span>
              <span>Compiled: {compileProgress}%</span>
            </div>
            <div className="p-4 bg-black border border-neutral-900 text-xs font-mono rounded flex flex-col space-y-1.5 min-h-[120px] max-h-[140px] overflow-y-auto">
              {sandboxLogs.map((log, i) => {
                let colorClass = "text-neutral-300";
                if (log.includes("SUCCESS")) colorClass = "text-source-emerald font-bold";
                if (log.includes("WARNING")) colorClass = "text-source-gold font-bold";
                if (log.includes("ERROR") || log.includes("ABORTED")) colorClass = "text-red-500 font-bold";
                return (
                  <div key={i} className={`${colorClass} leading-snug`}>
                    <span className="text-[10px] text-neutral-700 mr-2 selection:bg-transparent">[{i+1}]</span>
                    {log}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Dynamic High-Voltage WebSocket Overload Control */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* WebSocket Safety Switch Switch */}
          <div className="p-6 border-2 border-source-gold bg-neutral-950/90 rounded-xl space-y-4 shadow-xl">
            <div className="flex justify-between items-start gap-4 pb-2 border-b border-neutral-900">
              <div>
                <h5 className="text-[11px] font-black uppercase text-white tracking-widest flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full bg-source-gold ${isWebSocketTapActive ? 'animate-ping' : ''}`} />
                  WebSocket Supply Safety Switch
                </h5>
                <p className="text-[9px] text-neutral-500 font-mono mt-0.5">
                  Protects connected handlers from excessive high voltage overload
                </p>
              </div>
              
              <button
                onClick={() => {
                  const nextState = !isWebSocketTapActive;
                  setIsWebSocketTapActive(nextState);
                  localAddLog(`USER_ACTION: WebSocket safety regulator toggled ${nextState ? "ON (High Voltage Overload)" : "OFF (Stabilized Baseline Active)"}`);
                }}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isWebSocketTapActive ? 'bg-source-gold' : 'bg-neutral-800'}`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${isWebSocketTapActive ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>

            {/* Simulated Live Handshake Data Flow */}
            <div className="p-3 bg-black border border-neutral-900 rounded font-mono text-[10px] space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Grid Current:</span>
                <span className={`font-bold uppercase ${isWebSocketTapActive ? 'text-source-gold' : 'text-source-emerald'}`}>
                  {isWebSocketTapActive ? "43.8 kV (OVERLOAD)" : "1.2 kV (STABLE)"}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-neutral-500">Stream Status:</span>
                <span className={`font-bold uppercase ${isWebSocketTapActive ? 'text-red-500 animate-pulse' : 'text-source-emerald'}`}>
                  {isWebSocketTapActive ? "CORRUPTED (NOISE)" : "STABLE FLOW"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Frame Decoupling:</span>
                <span className={`font-bold uppercase ${isWebSocketTapActive ? 'text-red-400' : 'text-source-emerald'}`}>
                  {isWebSocketTapActive ? "FRAME DROP (WSS)" : "SYNCHRONIZED"}
                </span>
              </div>

              <div className="p-2 border-t border-neutral-900 mt-2 space-y-1">
                <span className="text-[8px] text-neutral-500 uppercase font-bold block">Live Frame Buffer Output:</span>
                <div className={`p-1.5 bg-neutral-950/80 rounded border font-mono text-[9px] select-all tracking-wider ${isWebSocketTapActive ? 'text-neutral-600 border-red-950 text-center' : 'text-source-emerald border-neutral-900'}`}>
                  {isWebSocketTapActive ? (
                    <span> %#&!! VOLT_OVLD!! 0x7F 0xFF ⚠️ INVALID_WS_FRAME</span>
                  ) : (
                    <span>{`{ "latency_ms": 5.4, "status": "OK", "conn": 101 }`}</span>
                  )}
                </div>
              </div>

              <p className="text-[9px] text-neutral-400 border-t border-neutral-900 pt-2 leading-relaxed italic">
                {isWebSocketTapActive 
                  ? "❌ Switch toggled ON: Excessive high electrical noise saturates browser buffers, making incoming WebSocket telemetry data entirely corrupted and unrecognizable."
                  : "✅ Switch toggled OFF: WebSocket supply isolated and balanced safely at 1.2 kV. Handshake establishes seamlessly with normal frame buffers."}
              </p>
            </div>
          </div>

          {/* Quick Architecture Strategy Overview */}
          <div className="p-6 border border-neutral-900 bg-neutral-950/40 rounded-xl space-y-4">
            <h5 className="text-[10px] font-black uppercase text-white tracking-widest">
              Stable Platform Strategy
            </h5>
            
            <div className="space-y-3 font-mono text-[9px] leading-relaxed">
              <div className="p-3 bg-black border border-neutral-900/60 rounded">
                <span className="text-white font-bold block mb-0.5">🛠️ PRODUCTION CONCURRENCY</span>
                <p className="text-neutral-400">
                  Using secure thread pooling to manage live startup loads and prevent database dropouts under massive spikes.
                </p>
              </div>

              <div className="p-3 bg-black border border-neutral-900/60 rounded">
                <span className="text-white font-bold block mb-0.5">💻 DIRECT FLOW RENDERER</span>
                <p className="text-neutral-400">
                  Optimizing timing intervals to eliminate browser display flickering and sustain precise frame telemetry.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* LOWER ROW: Startup Force Multiplier Props */}
      <div className="p-8 border-2 border-source-emerald bg-[#030303] relative rounded-xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-12 -translate-y-1/2 p-2.5 bg-black border border-source-emerald flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-source-emerald animate-pulse" />
          <span className="text-[9px] text-source-emerald font-mono tracking-widest uppercase font-bold">
            Startup Force Multiplier
          </span>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="text-[9px] text-source-emerald font-mono font-black uppercase tracking-[0.4em]">
            Startup Value Proposition
          </div>
          <h4 className="text-lg font-black uppercase text-white tracking-widest leading-tight">
            Full-Stack Acceleration & Rigid Structural Integrity
          </h4>
          <p className="text-xs text-neutral-400 max-w-4xl font-mono leading-relaxed">
            In early-stage deployments, rapid iterations and robust infrastructure decisions make the difference. I configure cohesive, high-performance system architectures engineered to scale smoothly, securing reliable 99.9% uptime and protecting business continuity at the root.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 border border-neutral-900 bg-neutral-950/40 rounded-lg space-y-3 shadow-md">
            <div className="text-[9px] text-source-gold font-mono uppercase tracking-widest font-black">
              01 / Engineering Competence
            </div>
            <h5 className="text-xs font-bold text-white uppercase tracking-tight">Multi-Language Mastery</h5>
            <p className="text-[9px] text-neutral-400 leading-relaxed font-mono">
              Expertly bridges environments, specializing in secure Rust systems, clean Python backend schemas, and high-concurrency Node/Go frameworks to query and manipulate large datasets safely.
            </p>
          </div>

          <div className="p-5 border border-neutral-900 bg-neutral-950/40 rounded-lg space-y-3 shadow-md">
            <div className="text-[9px] text-source-emerald font-mono uppercase tracking-widest font-black">
              02 / Reliable Deployments
            </div>
            <h5 className="text-xs font-bold text-white uppercase tracking-tight">Dockerized Pipelines & Cloud</h5>
            <p className="text-[9px] text-neutral-400 leading-relaxed font-mono">
              Pragmatically packages micro-services into secure Docker containers, optimizes configuration files, and scales deployments smoothly across production hosting nodes.
            </p>
          </div>

          <div className="p-5 border border-neutral-900 bg-neutral-950/40 rounded-lg space-y-3 shadow-md">
            <div className="text-[9px] text-source-gold font-mono uppercase tracking-widest font-black">
              03 / Intelligent Flows
            </div>
            <h5 className="text-xs font-bold text-white uppercase tracking-tight">Practical AI & LLM Integrations</h5>
            <p className="text-[9px] text-neutral-400 leading-relaxed font-mono">
              Integrates generative structures and secure model integrations directly through Gemini SDK bounds. Bypasses excess timing overhead to secure optimal performance inputs.
            </p>
          </div>

          <div className="p-5 border border-neutral-900 bg-neutral-950/40 rounded-lg space-y-3 shadow-md">
            <div className="text-[9px] text-source-emerald font-mono uppercase tracking-widest font-black">
              04 / Dedication
            </div>
            <h5 className="text-xs font-bold text-white uppercase tracking-tight">Deliberate Architectures</h5>
            <p className="text-[9px] text-neutral-400 leading-relaxed font-mono">
              Brings deliberate, focused determination inspired by rich Zambian (African) heritage to teams, establishing durable structural foundations engineered to run with zero downtime.
            </p>
          </div>
        </div>
      </div>

      {/* Telemetry Log Terminal Footer */}
      <div className="p-6 border border-neutral-900 bg-neutral-950 rounded-xl font-mono">
        <div className="flex items-center justify-between text-source-gold pb-3 border-b border-neutral-900 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest font-mono">Central Integration Console Records</span>
          </div>
          <span className="text-[8px] text-neutral-500 uppercase font-mono">
            Time Sync: Standard UTC
          </span>
        </div>
        <div className="p-4 bg-black rounded text-[11px] text-neutral-300 space-y-2 max-h-[160px] overflow-y-auto scrollbar-thin">
          {systemLogs.map((log, i) => (
            <div key={i} className="border-b border-neutral-950 pb-1 flex items-start gap-2">
              <span className="text-source-gold font-bold">&gt;</span>
              <span className="flex-1">{log}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
