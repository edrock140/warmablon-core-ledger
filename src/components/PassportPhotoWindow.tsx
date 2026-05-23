import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Sparkles, 
  Grid, 
  Sliders, 
  Eye, 
  EyeOff, 
  Maximize2, 
  Minimize2,
  Lock,
  RotateCcw,
  Zap,
  Info,
  Upload,
  Trash2,
  Palette,
  Image as ImageIcon
} from 'lucide-react';

import passportImg from '../assets/images/edgar_cap_earbuds_calibrated_1779460788556.png';

interface PassportPhotoWindowProps {
  onAddLog: (log: string) => void;
  lang: string;
}

export default function PassportPhotoWindow({ onAddLog, lang }: PassportPhotoWindowProps) {
  // Setup sizing modes: 'commonwealth' (35mm x 45mm) vs 'id_visa' (2" x 2" / 51mm x 51mm)
  const [sizeMode, setSizeMode] = useState<'commonwealth' | 'id_visa'>('commonwealth');
  const [minimised, setMinimised] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'view' | 'calibrate'>('view');
  
  // Custom interactive calibrations (default passport geometry turned off as requested)
  const [showOverlays, setShowOverlays] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [bgTint, setBgTint] = useState<'none' | 'yellow' | 'white'>('yellow');

  // Custom persistent profile image
  const [profileImg, setProfileImg] = useState<string>(() => {
    return localStorage.getItem('sgf_calibrated_profile_img') || passportImg;
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImg(base64String);
        localStorage.setItem('sgf_calibrated_profile_img', base64String);
        onAddLog(`ALBUM: Successfully loaded custom sovereign avatar (${Math.round(file.size / 1024)} KB). Registered to local storage container.`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetProfilePic = () => {
    setProfileImg(passportImg);
    localStorage.removeItem('sgf_calibrated_profile_img');
    onAddLog(`ALBUM: Restored signature SGF default identity image (calibrated with cap and white activewear).`);
  };
  
  // Handlers for switching sizes
  const handleSetSizeMode = (mode: 'commonwealth' | 'id_visa') => {
    setSizeMode(mode);
    const modeName = mode === 'commonwealth' 
      ? "Sovereign Horizon Aspect (35x45)" 
      : "Universal World Bound Aspect (51x51)";
    onAddLog(`BIOMETRICS: Calibrated identity window to ${modeName}.`);
  };

  const handleResetCalibration = () => {
    setBrightness(100);
    setContrast(100);
    setZoom(100);
    setRotation(0);
    onAddLog("BIOMETRICS: Re-calibrated sovereign parameters to initial factory default state.");
  };

  // Convert mm dimensions to screen representation (at standard 96 DPI scale)
  const getDimensions = () => {
    if (sizeMode === 'commonwealth') {
      return { 
        width: 132, 
        height: 170, 
        widthMm: 35, 
        heightMm: 45, 
        label: "35 x 45 mm (Sovereign Horizon Alignment Template)",
        ratio: "7:9"
      };
    } else {
      return { 
        width: 192, 
        height: 192, 
        widthMm: 51, 
        heightMm: 51, 
        label: "51 x 51 mm / 2\" x 2\" (Universal World Bound Template)",
        ratio: "1:1"
      };
    }
  };

  const dims = getDimensions();

  return (
    <div className="bg-neutral-950/95 backdrop-blur-md border border-neutral-800 rounded-lg shadow-2xl relative overflow-hidden group hover:border-source-gold transition-all duration-300 w-full text-xs text-neutral-400 font-mono">
      {/* Top Gold Foil security band */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-source-gold/50" />
      
      {/* Header bar */}
      <div className="p-3 border-b border-neutral-900 flex justify-between items-center bg-black/40">
        <div className="flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-source-gold animate-pulse" />
          <span className="text-[9px] text-white font-bold uppercase tracking-wider">
            Sovereign Identity Calibrator
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-source-emerald rounded-full animate-ping" />
          <span className="text-[7px] text-source-emerald font-bold tracking-widest uppercase">
            CALIBRATED
          </span>
          <button 
            onClick={() => setMinimised(!minimised)}
            className="p-1 hover:text-white transition-all text-neutral-500 rounded hover:bg-neutral-900"
            title={minimised ? "Expand passport drawer" : "Minimize passport drawer"}
          >
            {minimised ? (
              <Maximize2 className="w-3 h-3" />
            ) : (
              <Minimize2 className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {!minimised && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            {/* Sizing Standard Selector */}
            <div className="p-2.5 bg-neutral-900/30 border-b border-neutral-900 grid grid-cols-2 gap-1 bg-black">
              <button
                onClick={() => handleSetSizeMode('commonwealth')}
                className={`py-1.5 px-2 rounded font-mono text-[8px] uppercase font-bold transition-all ${
                  sizeMode === 'commonwealth'
                    ? 'bg-source-gold text-black shadow-md'
                    : 'bg-neutral-950 text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
              >
                Sovereign Horizon Standard
              </button>
              <button
                onClick={() => handleSetSizeMode('id_visa')}
                className={`py-1.5 px-2 rounded font-mono text-[8px] uppercase font-bold transition-all ${
                  sizeMode === 'id_visa'
                    ? 'bg-source-gold text-black shadow-md'
                    : 'bg-neutral-950 text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`}
              >
                Universal World Standard
              </button>
            </div>

            {/* Config Tabs: View vs Calibrate (Sliders) */}
            <div className="border-b border-neutral-900 flex text-[8px] uppercase tracking-wider bg-black/60 font-bold">
              <button
                onClick={() => setActiveTab('view')}
                className={`flex-1 py-2 text-center border-r border-neutral-900/50 transition-all ${
                  activeTab === 'view' ? 'text-white bg-neutral-900/40 border-b border-b-source-gold' : 'text-neutral-500 hover:text-white'
                }`}
              >
                Biometric Feed
              </button>
              <button
                onClick={() => setActiveTab('calibrate')}
                className={`flex-1 py-2 text-center transition-all ${
                  activeTab === 'calibrate' ? 'text-white bg-neutral-900/40 border-b border-b-source-gold' : 'text-neutral-500 hover:text-white'
                }`}
              >
                Fine Calibration
              </button>
            </div>

            {/* TAB CONTENT: Biometric Live View */}
            {activeTab === 'view' ? (
              <div className="p-4 flex flex-col items-center justify-center space-y-4">
                
                {/* Physical Boundary Calibration Wrapper */}
                <div className="relative p-1 bg-neutral-900 border border-neutral-850 rounded shadow-inner flex items-center justify-center min-h-[220px] w-full bg-[radial-gradient(#111_1px,transparent_1px)] bg-[size:10px_10px]">
                  
                  {/* Outer Frame Dimension Metadata Labels */}
                  <div className="absolute top-1 left-2 text-[7px] text-neutral-600 font-bold">
                    W-Aspect: {dims.widthMm}mm / {dims.width}px
                  </div>
                  <div className="absolute top-1 right-2 text-[7px] text-neutral-600 font-bold">
                    H-Aspect: {dims.heightMm}mm / {dims.height}px
                  </div>
                  
                  {/* Dynamic Dimension Holder matching exact passport size requirements */}
                  <motion.div
                    animate={{ 
                      width: dims.width, 
                      height: dims.height 
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="relative rounded border border-dashed border-source-gold/40 shadow-2xl overflow-hidden self-center transition-all duration-300"
                    style={{
                      width: `${dims.width}px`,
                      height: `${dims.height}px`,
                      backgroundColor: bgTint === 'yellow' ? '#facc15' : bgTint === 'white' ? '#ffffff' : '#050505',
                      boxShadow: bgTint === 'yellow' ? '0 0 25px rgba(250, 204, 21, 0.25)' : bgTint === 'white' ? '0 0 25px rgba(255,255,255,0.1)' : 'none'
                    }}
                  >
                    {/* The passport portrait photo */}
                    <img
                      src={profileImg}
                      alt="Liswaniso Edgar Mulenga Sovereign Identity Anchor"
                      className="w-full h-full object-cover select-none pointer-events-none transition-all duration-150"
                      referrerPolicy="no-referrer"
                      style={{
                        filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                        transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                        mixBlendMode: bgTint === 'none' ? 'normal' : 'multiply'
                      }}
                    />

                    {/* Biometric Guide Overlays */}
                    {showOverlays && (
                      <div className="absolute inset-0 pointer-events-none block z-15">
                        {/* Target Reticle Crosshair */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-[0.5px] bg-source-emerald/45 border-t border-dashed border-source-emerald/20" />
                          <div className="absolute h-full w-[0.5px] bg-source-emerald/45 border-l border-dashed border-source-emerald/20" />
                        </div>

                        {/* Standard Face Positioning Guidelined Circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[66%] h-[75%] rounded-[50%/60%] border border-dotted border-source-emerald/50 bg-source-emerald/[0.03]" />
                        </div>

                        {/* Top margin facial limit line */}
                        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-source-crimson/50" />
                        <div className="absolute top-[20%] left-1 text-[5px] text-source-crimson font-bold uppercase">
                          Crest Limit
                        </div>

                        {/* Horizontal Eye-Level guideline */}
                        <div className="absolute top-[42%] left-0 w-full h-[1px] bg-source-gold/40" />
                        <div className="absolute top-[42%] right-1 text-[5px] text-source-gold font-bold uppercase">
                          Eye Alignment
                        </div>

                        {/* Chin target marker line */}
                        <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-source-emerald/50" />
                        <div className="absolute bottom-[20%] left-1 text-[5px] text-source-emerald font-bold uppercase">
                          Base Chin
                        </div>

                        {/* Holographic grid watermark */}
                        <div className="absolute bottom-1 right-1 text-[6px] text-white/20 font-mono tracking-tighter uppercase">
                          ZAM-PP-963
                        </div>
                      </div>
                    )}

                    {/* Secure ID Serial Code Stamp */}
                    <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm px-1 rounded text-[5px] text-source-gold font-black border border-source-gold/25 tracking-wider select-none">
                      {sizeMode === 'commonwealth' ? '35x45 MM' : '2x2 IN'}
                    </div>
                  </motion.div>
                </div>

                {/* Instant Active Profile Pic Uploader buttons */}
                <div className="w-full flex gap-1.5 p-1.5 rounded border border-neutral-900 bg-neutral-950/50 justify-center">
                  <label className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-neutral-900 hover:bg-neutral-850 hover:text-white text-neutral-350 border border-neutral-800 hover:border-neutral-700 hover:border-source-gold/40 rounded text-[8px] font-black uppercase tracking-wider cursor-pointer transition-all active:scale-95 leading-none">
                    <Upload className="w-3 h-3 text-source-emerald shrink-0" />
                    Upload Photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handlePhotoUpload} 
                    />
                  </label>
                  <button
                    onClick={handleResetProfilePic}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-neutral-900 hover:bg-neutral-850 hover:text-white text-neutral-350 border border-neutral-800 hover:border-neutral-700 rounded text-[8px] font-black uppercase tracking-wider transition-all active:scale-95 leading-none"
                    title="Reset to default custom-calibrated photograph"
                  >
                    <RotateCcw className="w-3 h-3 text-source-gold shrink-0" />
                    Reset Default
                  </button>
                </div>

                {/* Sub-photo specs and toggles */}
                <div className="w-full space-y-2 border-t border-neutral-900 pt-3">
                  <div className="flex justify-between text-[8px] font-bold text-neutral-500 uppercase">
                    <span>Aspect Ratio: {dims.ratio}</span>
                    <span>Format: Sovereign Identity standard</span>
                  </div>

                  <div className="flex justify-between items-center bg-black/50 p-2 rounded border border-neutral-900">
                    <div className="flex items-center gap-1.5">
                      <Grid className="w-3 h-3 text-source-emerald" />
                      <span className="text-[8px] uppercase tracking-wider text-neutral-400">
                        Biometric Alignment Guides
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setShowOverlays(!showOverlays);
                        onAddLog(`BIOMETRICS: Toggled biometric guidance lines ${!showOverlays ? 'ENABLED' : 'DISABLED'}.`);
                      }}
                      className="px-2 py-0.5 text-[8px] uppercase font-bold border rounded transition-all active:scale-95"
                      style={{
                        borderColor: showOverlays ? 'var(--color-source-emerald)' : 'var(--color-source-void)',
                        color: showOverlays ? '#fff' : 'rgba(115,115,115,1)',
                        backgroundColor: showOverlays ? 'rgba(0,112,60,0.1)' : 'transparent'
                      }}
                    >
                      {showOverlays ? 'GUIDES: ON' : 'GUIDES: OFF'}
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* TAB CONTENT: Calibration and Tuning Sliders */
              <div className="p-4 space-y-4">
                <div className="text-[8px] text-neutral-500 uppercase font-black border-b border-neutral-900 pb-1 flex items-center justify-between">
                  <span>Manual Laser Calibration matrix</span>
                  <button 
                    onClick={handleResetCalibration}
                    className="text-source-gold flex items-center gap-1 hover:underline active:scale-95 transition-all text-[7px]"
                    title="Reset configuration sliders"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    Reset Specs
                  </button>
                </div>

                {/* Sliders bundle */}
                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-neutral-450 uppercase">Biometric Scale (Zoom)</span>
                      <span className="text-white font-bold">{zoom}%</span>
                    </div>
                    <input
                      type="range"
                      min="75"
                      max="140"
                      value={zoom}
                      onChange={(e) => setZoom(parseInt(e.target.value))}
                      className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-source-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-neutral-450 uppercase">Biometric Rotation</span>
                      <span className="text-white font-bold">{rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-15"
                      max="15"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-source-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-neutral-450 uppercase">Contrast Exposure</span>
                      <span className="text-white font-bold">{contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="130"
                      value={contrast}
                      onChange={(e) => setContrast(parseInt(e.target.value))}
                      className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-source-emerald"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-neutral-450 uppercase">Brightness Level</span>
                      <span className="text-white font-bold">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="135"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-source-emerald"
                    />
                  </div>

                  {/* Backdrop Tone Tuning Block */}
                  <div className="space-y-1.5 pt-2 border-t border-neutral-900/60">
                    <div className="flex justify-between text-[9px] uppercase">
                      <span className="text-neutral-450">Universal Backdrop Resonance</span>
                      <span className="text-white font-bold">
                        {bgTint === 'yellow' ? 'Zambian Gold Aura' : bgTint === 'white' ? 'Pure Ivory Light' : 'Dark Void'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => {
                          setBgTint('yellow');
                          onAddLog('BIOMETRICS: Background tone set to Golden Yellow resonance.');
                        }}
                        className={`py-1 rounded text-[8px] font-bold uppercase transition-all ${
                          bgTint === 'yellow' 
                            ? 'bg-source-gold text-black border border-yellow-500 shadow-md shadow-source-gold/10' 
                            : 'bg-neutral-950 text-neutral-500 hover:text-white border border-transparent'
                        }`}
                      >
                        Gold Aura
                      </button>
                      <button
                        onClick={() => {
                          setBgTint('white');
                          onAddLog('BIOMETRICS: Background tone set to Pure Ivory light standard.');
                        }}
                        className={`py-1 rounded text-[8px] font-bold uppercase transition-all ${
                          bgTint === 'white' 
                            ? 'bg-white text-black border border-neutral-300 shadow-md shadow-white/10' 
                            : 'bg-neutral-950 text-neutral-500 hover:text-white border border-transparent'
                        }`}
                      >
                        Pure White
                      </button>
                      <button
                        onClick={() => {
                          setBgTint('none');
                          onAddLog('BIOMETRICS: Background tone set to deep dark physical space.');
                        }}
                        className={`py-1 rounded text-[8px] font-bold uppercase transition-all ${
                          bgTint === 'none' 
                            ? 'bg-neutral-800 text-white border border-neutral-700' 
                            : 'bg-neutral-950 text-neutral-500 hover:text-white border border-transparent'
                        }`}
                      >
                        Dark Void
                      </button>
                    </div>
                  </div>
                </div>

                {/* Verification Summary and lock state */}
                <div className="p-2 bg-black border border-neutral-900 rounded text-[8px] leading-relaxed select-none">
                  <div className="flex gap-2 items-start text-neutral-500">
                    <Info className="w-3 h-3 text-source-gold shrink-0 mt-0.5" />
                    <p>
                      Sovereign identity profile with a clean background representing Liswaniso Edgar Mulenga. Configured using exact biometric guidelines to serve as your digital presence as you launch your tech stacks to the world and expand your horizon to 1000% output.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* Bottom biometric metrics readouts */}
            <div className="p-3 bg-black border-t border-neutral-900/80 rounded-b-lg grid grid-cols-2 gap-2 text-[8px] font-mono select-none">
              <div>
                <span className="text-neutral-500 block uppercase text-[6px] tracking-wider">IDENTITY ATTEST</span>
                <span className="text-white font-bold tracking-widest text-[8px]">EDGAR-SGF-963</span>
              </div>
              <div className="text-right">
                <span className="text-neutral-500 block uppercase text-[6px] tracking-wider">RESONANCE VIBE</span>
                <span className="text-source-gold font-bold">963 Hz (Crown)</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
