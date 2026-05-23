import React, { useState, useEffect } from 'react';
import { auth, db, loginWithGoogle } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { 
  Cpu, 
  Terminal, 
  ShieldAlert, 
  Activity, 
  Radio, 
  Zap, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Server, 
  HardDrive, 
  GitMerge, 
  MessageSquare,
  Play,
  ArrowRight,
  Sparkles,
  Layers,
  Fingerprint
} from 'lucide-react';

interface SgfAgentMeshProps {
  onAddLog: (message: string) => void;
  selfValue: number;
  setSelfValue: React.Dispatch<React.SetStateAction<number>>;
}

interface AgentState {
  name: string;
  role: string;
  icon: any;
  color: string;
  borderColor: string;
  bgLightColor: string;
  cpu: number;
  ram: number;
  port: string;
}

interface ExchangeMessage {
  sender: string;
  message: string;
  actionCode: string;
  targetFrequency: number;
}

interface MeshResult {
  systemStatus: {
    omegaLoad: number;
    sigmaLoad: number;
    dbSyncScore: number;
    loadBalancerActive: boolean;
  };
  exchanges: ExchangeMessage[];
  autonomousDecision: string;
}

export default function SgfAgentMesh({ onAddLog, selfValue, setSelfValue }: SgfAgentMeshProps) {
  const [promptInput, setPromptInput] = useState('');
  const [negotiating, setNegotiating] = useState(false);
  const [meshResult, setMeshResult] = useState<MeshResult | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFirebaseSyncing, setIsFirebaseSyncing] = useState(false);

  // Sovereign Driver Controller Inputs & Red Card Chamber states
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const [throttleVal, setThrottleVal] = useState(100);
  const [hasSteppedChamber, setHasSteppedChamber] = useState(false);
  const [judgementLogs, setJudgementLogs] = useState<string[]>([]);
  
  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Real-time active connection counts
  const [connectionFrequency, setConnectionFrequency] = useState(963.00);
  const [systemUptime, setSystemUptime] = useState(1);
  const [activeTunnel, setActiveTunnel] = useState<string | null>(null);

  // Initial Agents Setup
  const [agents, setAgents] = useState<AgentState[]>([
    {
      name: "Agent Omega",
      role: "Rust Security & Memory Supervisor",
      icon: ShieldAlert,
      color: "#13C280", // Pure Emerald
      borderColor: "border-source-emerald/30",
      bgLightColor: "bg-source-emerald/10",
      cpu: 12.4,
      ram: 45.2,
      port: "PORT: 9001 (SECURE)"
    },
    {
      name: "Agent Sigma",
      role: "Python Real-time Analytics Core",
      icon: Radio,
      color: "#E5C158", // SGF Gold
      borderColor: "border-source-gold/30",
      bgLightColor: "bg-source-gold/10",
      cpu: 28.1,
      ram: 78.9,
      port: "PORT: 9002 (TELEMETRY)"
    },
    {
      name: "SGF Mongo Agent",
      role: "Distributed Replica Sync Master",
      icon: HardDrive,
      color: "#0ea5e9", // Sky Blue
      borderColor: "border-sky-500/30",
      bgLightColor: "bg-sky-500/10",
      cpu: 18.2,
      ram: 64.0,
      port: "PORT: 27017 (PERSISTENCE)"
    }
  ]);

  // Keep a running simulated system uptime
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemUptime(prev => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleDirectiveSubmit = async (customPrompt?: string) => {
    const activePrompt = customPrompt || promptInput || "Synchronize sovereign memory lines across distributed replica arrays.";
    
    setNegotiating(true);
    setPromptInput('');
    onAddLog(`AGENT_MESH: Dispatched Sovereign Directive ("${activePrompt.slice(0, 45)}...") to peer live computers.`);
    
    // Simulate active routing animations
    setActiveTunnel("OMEGA_SIGMA");
    setTimeout(() => {
      setActiveTunnel("SIGMA_MONGO");
    }, 1500);
    setTimeout(() => {
      setActiveTunnel("MONGO_OMEGA");
    }, 3000);

    try {
      const res = await fetch('/api/agent-mesh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: activePrompt })
      });

      if (!res.ok) {
        throw new Error("Failed to converge on direct multi-agent backplane.");
      }

      const result: MeshResult = await res.json();
      
      // Update local state indicators based on response
      setMeshResult(result);
      setConnectionFrequency(963.00 + (Math.random() * 0.1 - 0.05));
      
      setAgents(prev => prev.map(a => {
        if (a.name === "Agent Omega") {
          return { ...a, cpu: result.systemStatus.omegaLoad, ram: 40 + Math.random() * 15 };
        } else if (a.name === "Agent Sigma") {
          return { ...a, cpu: result.systemStatus.sigmaLoad, ram: 70 + Math.random() * 10 };
        } else {
          return { ...a, cpu: 15 + Math.random() * 10, ram: 60 + Math.random() * 8 };
        }
      }));

      // Drive selfValue asset growth derived from SGF cooperation resonance
      const consensusWeight = result.systemStatus.dbSyncScore;
      setSelfValue(prev => prev + (consensusWeight * 18.50));

      onAddLog(`CONSENSUS_LOCK: Multitask Agents successfully signed consensus payload. Action state: "${result.autonomousDecision}"`);

      // Live Firestore Session Logging Verification
      if (auth.currentUser) {
        setIsFirebaseSyncing(true);
        try {
          await addDoc(collection(db, 'sessions'), {
            userId: auth.currentUser.uid,
            action: `SGF Mesh Lock: ${result.autonomousDecision.slice(0, 180)}`,
            status: `REPLICA_SYNC_OK_SCORE_${result.systemStatus.dbSyncScore}%`,
            timestamp: new Date().toISOString()
          });
          onAddLog(`FIRESTORE: Synchronized consensus transaction log directly under sessions trace table.`);
        } catch (dbErr) {
          console.error("Firestore logger error:", dbErr);
          onAddLog(`FIRESTORE_FAIL: Unable to sync node logs: ${dbErr instanceof Error ? dbErr.message : dbErr}`);
        } finally {
          setIsFirebaseSyncing(false);
        }
      } else {
        onAddLog(`FIRESTORE_BYPASS: Authenticated trace is unallocated. Logging in Local Silicon mode.`);
      }
    } catch (error) {
      console.error(error);
      onAddLog("ERROR: High-frequency mesh dropped packet lines due to routing blockage.");
    } finally {
      setNegotiating(false);
      setActiveTunnel(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab ribbon header block */}
      <div className="border-b border-neutral-900 pb-3 flex justify-between items-start flex-wrap gap-2">
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-source-gold" />
            SGF Unhackable Peer Agent Mesh
          </h4>
          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
            Peer-to-peer virtual sandboxed environments negotiating systems tasks and state mutations autonomously on 963Hz.
          </p>
        </div>
        <span className="text-[8px] bg-source-gold/10 text-source-gold border border-source-gold/20 px-2 py-0.5 font-mono uppercase font-black tracking-widest animate-pulse">
          INTER-AGENT TUNNEL CRYPTO STATE: SECURE
        </span>
      </div>

      {/* Grid of the three live computers participating as agents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          return (
            <div 
              key={agent.name}
              className={`bg-neutral-950 border ${agent.borderColor} rounded-xl p-4 space-y-4`}
            >
              {/* Computer Header */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded ${agent.bgLightColor}`}>
                    <IconComponent className="w-4 h-4" style={{ color: agent.color }} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-white uppercase leading-none">{agent.name}</h5>
                    <p className="text-[8px] text-neutral-500 font-mono mt-0.5">{agent.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-source-emerald animate-ping" />
                  <span className="text-[7.5px] text-source-emerald font-bold font-mono">LIVE</span>
                </div>
              </div>

              {/* Hardware / Telemetry details */}
              <div className="space-y-2 text-[10px] font-mono">
                {/* CPU Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] text-neutral-500">
                    <span>PROCESSOR LOAD</span>
                    <span className="text-white font-bold">{agent.cpu.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${agent.cpu}%`, backgroundColor: agent.color }}
                    />
                  </div>
                </div>

                {/* RAM Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] text-neutral-500">
                    <span>MEMORY VOLUMES (RAM)</span>
                    <span className="text-white font-bold">{agent.ram.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${agent.ram}%`, backgroundColor: agent.color }}
                    />
                  </div>
                </div>
              </div>

              {/* Local secure system connection indicator */}
              <div className="flex justify-between items-center text-[7.5px] font-mono bg-black/60 p-2 border border-neutral-900 rounded">
                <span className="text-neutral-500 uppercase">{agent.port}</span>
                <span className="text-source-emerald font-bold uppercase flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5" /> UNHACKABLE
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Core: State Tunnels and Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Directive and Live Tunnel Simulation (LHS) */}
        <div className="lg:col-span-4 h-full flex flex-col justify-between space-y-4">
          
          <div className="bg-neutral-950 border border-neutral-900 p-5 rounded-xl space-y-4 flex-grow">
            <span className="text-[8px] text-source-gold block uppercase font-black tracking-widest">SOVEREIGN NETWORK CONTROLLER</span>
            <h5 className="text-[12px] text-white font-extrabold uppercase leading-none font-mono">Deploy Mutual Operational Directives</h5>
            <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
              Inject a high-level operational task. The three agent computers will securely negotiate a load balancer strategy, perform security audits, and write corresponding Rust, Python, and MongoDB state migrations.
            </p>

            {/* Live Firestore Alignment Badge */}
            <div className="p-3 bg-black border border-neutral-900 rounded space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[7.5px] text-neutral-500 block uppercase font-black tracking-wider">
                  Firestore Status Node:
                </span>
                {currentUser ? (
                  <span className="text-[7.5px] bg-source-emerald/10 text-source-emerald px-1.5 py-0.5 rounded font-black border border-source-emerald/25 animate-pulse">
                    ONLINE
                  </span>
                ) : (
                  <span className="text-[7.5px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-black border border-amber-500/25">
                    LOCAL RUNTIME
                  </span>
                )}
              </div>

              {currentUser ? (
                <div className="space-y-1">
                  <p className="text-[9px] text-neutral-300 truncate font-mono">
                    ID: {currentUser.email}
                  </p>
                  <p className="text-[8px] text-neutral-500 font-mono">
                    Telemetry logs actively synchronized to database.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[8px] text-neutral-400 leading-snug">
                    Unauthenticated session. Sign in to save sovereign logs directly to Firebase database.
                  </p>
                  <button
                    onClick={async () => {
                      onAddLog("FIRESTORE_AUTH: Triggering secure Google Auth popup authorization...");
                      try {
                        const res = await loginWithGoogle();
                        onAddLog(`FIRESTORE_AUTH: Sovereign Node connected as: ${res.user.email}`);
                      } catch (err) {
                        onAddLog(`FIRESTORE_AUTH_ERROR: Secure connection rejected.`);
                      }
                    }}
                    className="w-full py-1 text-center bg-neutral-900 hover:bg-neutral-850 hover:text-white text-neutral-400 border border-neutral-800 hover:border-neutral-700 text-[8.5px] rounded transition-all font-black uppercase tracking-wider cursor-pointer"
                  >
                    Authorize Firestore Tracing with Google
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3 font-mono text-[10px]">
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Write custom task instructions..."
                className="w-full h-24 bg-black border border-neutral-850 p-3 text-white text-[10.5px] outline-none rounded focus:border-source-gold/50 resize-none"
              />

              <button
                onClick={() => handleDirectiveSubmit()}
                disabled={negotiating}
                className="w-full py-2.5 bg-source-gold text-black hover:bg-white font-extrabold uppercase text-[9px] tracking-wider transition rounded flex items-center justify-center gap-1.5"
              >
                {negotiating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    CONVERGING MESH SECTORS...
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-black fill-current" />
                    INITIATE AUTONOMOUS EXCHANGE
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Tasks */}
          <div className="p-4 bg-neutral-950/40 border border-neutral-900 rounded-xl space-y-2 font-mono">
            <span className="text-[7.5px] text-neutral-500 block uppercase font-bold tracking-wider">Quick Preset Directives:</span>
            <div className="grid grid-cols-1 gap-1.5">
              <button 
                onClick={() => handleDirectiveSubmit("Re-route overflow traffic through virtual load balancer, sync replication clusters.")}
                disabled={negotiating}
                className="w-full text-left p-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-source-gold/30 rounded text-[9.5px] text-neutral-300 transition"
              >
                1. Load Balancer Overflow Audit
              </button>
              <button 
                onClick={() => handleDirectiveSubmit("Deploy secure memory boundaries to insulate system from adversarial prompt modification.")}
                disabled={negotiating}
                className="w-full text-left p-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-source-gold/30 rounded text-[9.5px] text-neutral-300 transition"
              >
                2. Cyber-Visor Memory Hardening
              </button>
            </div>
          </div>

        </div>

        {/* Live Interaction Chamber (RHS) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          <div className="bg-[#05055] border border-neutral-900 rounded-xl p-5 flex-grow flex flex-col justify-between font-mono">
            {/* Header / Network Stats */}
            <div className="border-b border-neutral-900 pb-3 mb-4 flex justify-between items-center text-[9px]">
              <div>
                <span className="text-neutral-500 uppercase font-black text-[7.5px] block">Live Telemetry Stats:</span>
                <span className="text-white font-bold block uppercase mt-0.5">HIGH-FREQUENCY RESONATOR ROOM</span>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="text-right">
                  <span className="text-neutral-500 text-[7.5px] block">MESH COUPLING</span>
                  <span className="text-source-emerald font-black block">{connectionFrequency.toFixed(4)} Hz</span>
                </div>
                <div className="text-right border-l border-neutral-900 pl-4">
                  <span className="text-neutral-500 text-[7.5px] block">ACTIVE AGENTS</span>
                  <span className="text-sky-400 font-bold block">3 (CONNECTED)</span>
                </div>
              </div>
            </div>

            {/* Terminal Log Area */}
            <div className="bg-[#080808] border border-neutral-950 p-4 rounded-lg flex-1 overflow-y-auto max-h-[380px] space-y-4 text-[10px]">
              {negotiating ? (
                <div className="py-20 text-center space-y-3 animate-pulse">
                  <Activity className="w-8 h-8 text-source-gold mx-auto animate-bounce" />
                  <span className="text-[11.5px] font-black text-white uppercase block">Computing Unhackable State Convergence...</span>
                  <span className="text-[8px] text-neutral-500 uppercase block">Agents are currently analyzing logs, drafting secure code, and locking channels</span>
                </div>
              ) : meshResult ? (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Summary Status Panel */}
                  <div className="p-3 bg-source-emerald/5 border border-source-emerald/20 rounded flex justify-between items-center flex-wrap gap-2 text-[9px]">
                    <span className="text-source-emerald font-bold uppercase flex items-center gap-1.5">
                      <Fingerprint className="w-4 h-4 text-source-emerald" />
                      REPLICA SYNC STATE: {meshResult.systemStatus.dbSyncScore}%
                    </span>
                    <span className="text-neutral-500">|</span>
                    <span className="text-white font-black uppercase">
                      Load Balancer Intervention: {meshResult.systemStatus.loadBalancerActive ? "TRUE (BALANCED)" : "FALSE (HEALTHY)"}
                    </span>
                  </div>

                  {/* Staggered exchanges between the live computer agents */}
                  <div className="space-y-3.5">
                    {meshResult.exchanges.map((exchange, idx) => {
                      const isOmega = exchange.sender.includes("Omega");
                      const isSigma = exchange.sender.includes("Sigma");
                      const agentColor = isOmega ? "text-source-emerald" : isSigma ? "text-source-gold" : "text-sky-400";
                      const agentBorder = isOmega ? "border-source-emerald/20" : isSigma ? "border-source-gold/20" : "border-sky-500/20";
                      
                      return (
                        <div key={idx} className="space-y-2 border-l-2 pl-3" style={{ borderColor: isOmega ? '#13C280' : isSigma ? '#E5C158' : '#0ea5e9' }}>
                          <div className="flex justify-between items-center font-bold">
                            <span className={`uppercase tracking-wider ${agentColor}`}>
                              {exchange.sender}
                            </span>
                            <span className="text-neutral-600 text-[8px]">
                              Tuned Frequency: {exchange.targetFrequency} Hz
                            </span>
                          </div>

                          <p className="text-neutral-300 text-[9.5px] leading-relaxed">
                            {exchange.message}
                          </p>

                          {/* Render agent unhackable code snippet */}
                          {exchange.actionCode && (
                            <div className="bg-black/85 border border-neutral-900 rounded p-2.5 mt-1.5 overflow-x-auto text-[8.5px]">
                              <pre className="text-white"><code>{exchange.actionCode}</code></pre>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* consensus seal */}
                  <div className="pt-2 border-t border-neutral-900 flex items-center gap-2 bg-neutral-950 p-3 rounded">
                    <Lock className="w-4 h-4 text-source-gold flex-shrink-0 animate-pulse" />
                    <div>
                      <span className="text-[7.5px] text-neutral-500 block uppercase">CONSENSUS MUTATION LOCK SIGNAGE:</span>
                      <strong className="text-source-gold uppercase text-[9.5px]">
                        {meshResult.autonomousDecision}
                      </strong>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="py-24 text-center text-neutral-600 space-y-2">
                  <Server className="w-8 h-8 text-neutral-800 mx-auto" />
                  <p className="text-[10px] uppercase font-bold tracking-wider">A2A Direct Interconnect Idle</p>
                  <p className="text-[8.5px] max-w-sm mx-auto leading-relaxed">Enter a sovereign operational directive. Peer computers Omega, Sigma, and Mongo will autonomously communicate, adjust internal telemetry loads, and run local scripts to achieve a shared consensus.</p>
                </div>
              )}
            </div>

            {/* Quick telemetry footer */}
            <div className="text-[7.5px] text-neutral-500 text-right pt-3 border-t border-neutral-900 uppercase">
              Secure motherboard uptime: {systemUptime} cycles • Zero packet losses detected across regional load balancers
            </div>
          </div>

        </div>

      </div>

      {/* Sovereign Red Card & Cockpit Steering Chamber Block */}
      <div className="border border-red-950 bg-[#0d0303] p-6 rounded-2xl space-y-6 relative overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.06)]">
        {/* Decorative corner warning lights */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 blur-3xl rounded-full" />
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span className="text-[8px] font-mono font-bold text-red-500 uppercase tracking-wider">CHAMBER ROOM #13 (ALIGNMENT ROOM)</span>
        </div>

        {/* Section Header */}
        <div className="border-b border-red-950 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h4 className="text-sm font-black text-red-100 uppercase tracking-widest flex items-center gap-2">
              <span className="h-2.5 w-1.5 bg-red-600 rounded-sm inline-block" />
              Sovereign Red Card & Operator Cockpit
            </h4>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
              The central processing agent is forever aligning agents to focus on their tasks and know how to exchange value in the engine. All other agents are already aligned. Drive using the steering wheel, joysticks, and controller.
            </p>
          </div>
          <span className="text-[9px] px-2.5 py-1 bg-red-950/80 text-red-400 font-mono border border-red-800 rounded font-bold uppercase">
            CREATOR AUDIT STATION
          </span>
        </div>

        {/* Triple grid layout: 1. Steering Controls, 2. Joystick Matrix, 3. The Red Card Step Pad */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: Steering Wheel (md:col-span-4) */}
          <div className="md:col-span-4 bg-black/40 border border-neutral-900 p-4 rounded-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[8px] text-neutral-400 uppercase font-mono font-bold block tracking-wider">01. Direct Steering Column</span>
              <p className="text-[9.5px] text-neutral-500 font-sans mt-0.5 leading-snug">
                Rotate the steering wheel to guide systemic convergence over continuous thread arrays.
              </p>
            </div>

            {/* Interactive Steering Wheel Graphic */}
            <div className="flex flex-col items-center py-2 relative">
              <div 
                className="w-24 h-24 rounded-full border-4 border-neutral-800 flex items-center justify-center relative transition-transform duration-200 cursor-pointer shadow-lg"
                style={{ transform: `rotate(${steeringAngle}deg)` }}
                onClick={() => {
                  const angles = [-90, -45, 0, 45, 90, 180];
                  const nextIndex = (angles.indexOf(steeringAngle) + 1) % angles.length;
                  const targetAngle = angles[nextIndex];
                  setSteeringAngle(targetAngle);
                  onAddLog(`COCKPIT: Steered core wheel to ${targetAngle} degrees. Real-time trajectory aligned.`);
                }}
              >
                {/* Steering Wheel Spokes */}
                <div className="absolute w-[2px] h-full bg-neutral-700" />
                <div className="absolute h-[2px] w-full bg-neutral-700" />
                {/* Center Hub */}
                <div className="w-6 h-6 rounded-full bg-red-600 border border-black z-10 flex items-center justify-center text-[7px] font-black text-white">
                  SGF
                </div>
                {/* Alignment Notch */}
                <div className="absolute top-0 w-3 h-1 bg-red-500 rounded-full" />
              </div>
              
              <div className="text-[10px] font-mono text-center mt-3 text-neutral-300">
                Steering Angle: <span className="text-red-400 font-bold font-mono">{steeringAngle}°</span>
              </div>
            </div>

            {/* Steering Incrementor Button Bar */}
            <div className="grid grid-cols-3 gap-1">
              <button 
                onClick={() => {
                  setSteeringAngle(prev => Math.max(-180, prev - 15));
                  onAddLog("COCKPIT: Steering step Left (-15°)");
                }}
                className="py-1.5 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-900 text-[8.5px] font-mono font-bold uppercase rounded cursor-pointer"
              >
                ◀ Left
              </button>
              <button 
                onClick={() => {
                  setSteeringAngle(0);
                  onAddLog("COCKPIT: Re-centered steering to 0°");
                }}
                className="py-1.5 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-900 text-[8.5px] font-mono font-bold uppercase rounded text-source-gold cursor-pointer"
              >
                Center
              </button>
              <button 
                onClick={() => {
                  setSteeringAngle(prev => Math.min(180, prev + 15));
                  onAddLog("COCKPIT: Steering step Right (+15°)");
                }}
                className="py-1.5 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-900 text-[8.5px] font-mono font-bold uppercase rounded cursor-pointer"
              >
                Right ▶
              </button>
            </div>
          </div>

          {/* Column 2: Joystick Matrix (md:col-span-4) */}
          <div className="md:col-span-4 bg-black/40 border border-neutral-900 p-4 rounded-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[8px] text-neutral-400 uppercase font-mono font-bold block tracking-wider">02. Value Exchange Joystick</span>
              <p className="text-[9.5px] text-neutral-500 font-sans mt-0.5 leading-snug">
                Drive throttle speed and value distribution using the joystick vectors.
              </p>
            </div>

            {/* Visual Joystick Pad */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-neutral-950 border border-neutral-900 rounded-lg relative flex items-center justify-center p-1">
                {/* Horizontal Guide */}
                <div className="absolute w-full h-[1px] bg-neutral-900" />
                {/* Vertical Guide */}
                <div className="absolute h-full w-[1px] bg-neutral-900" />
                
                {/* Floating Joystick Thumb */}
                <div 
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-800 border-2 border-red-400 absolute transition-all duration-300 shadow-lg shadow-red-950/80 cursor-pointer flex items-center justify-center text-[7.5px] font-black text-white"
                  style={{
                    transform: `translate(${joystickPos.x * 24}px, ${joystickPos.y * 24}px)`
                  }}
                  onClick={() => {
                    const directions = [
                      { x: 0, y: -1, name: 'North (Forward)' },
                      { x: 1, y: 0, name: 'East (Right)' },
                      { x: 0, y: 1, name: 'South (Reverse)' },
                      { x: -1, y: 0, name: 'West (Left)' },
                      { x: 0, y: 0, name: 'Idle center' }
                    ];
                    const next = directions[Math.floor(Math.random() * directions.length)];
                    setJoystickPos({ x: next.x, y: next.y });
                    onAddLog(`COCKPIT: Joystick oriented to ${next.name}. Coordinates: (${next.x}, ${next.y})`);
                  }}
                >
                  Joystick
                </div>
              </div>

              {/* Slider for Throttle */}
              <div className="w-full mt-3 space-y-1">
                <div className="flex justify-between text-[8px] text-neutral-500 font-mono">
                  <span>THROTTLE SPEED</span>
                  <span className="text-red-400 font-bold">{throttleVal}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={throttleVal}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setThrottleVal(v);
                    if (v % 25 === 0) {
                      onAddLog(`COCKPIT: Throttle speed balanced at ${v}%. System load adjusted.`);
                    }
                  }}
                  className="w-full h-1 bg-neutral-900 rounded-xl appearance-none cursor-pointer accent-red-600"
                />
              </div>
            </div>

            {/* Quick Joystick Buttons */}
            <div className="grid grid-cols-2 gap-1 text-[8px] font-mono">
              <button 
                onClick={() => {
                  setJoystickPos({ x: 0, y: -1 });
                  setThrottleVal(100);
                  onAddLog("COCKPIT: Joystick thrust FORWARD - MAXIMUM THROTTLE");
                }}
                className="py-1 bg-red-950/20 text-red-400 hover:bg-red-900 hover:text-white border border-red-900 rounded uppercase font-bold text-center cursor-pointer"
              >
                ▲ Full Thrust
              </button>
              <button 
                onClick={() => {
                  setJoystickPos({ x: 0, y: 0 });
                  setThrottleVal(0);
                  onAddLog("COCKPIT: Joystick cut-off. Hovering passive state.");
                }}
                className="py-1 bg-[#1a0505] text-red-500 hover:bg-neutral-900 hover:text-white border border-neutral-900 rounded uppercase font-bold text-center cursor-pointer"
              >
                ■ Brake Neutral
              </button>
            </div>
          </div>

          {/* Column 3: The Red Card Judgement Chamber (md:col-span-4) */}
          <div className="md:col-span-4 bg-[#1a0505]/65 border-2 border-red-800/80 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-[inset_0_0_10px_rgba(220,38,38,0.1)] relative">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[8px] bg-red-600 text-white px-1.5 py-0.5 font-mono uppercase font-black rounded-sm inline-block tracking-widest leading-none">
                INSIDE CHAMBER STATUS
              </span>
              <h5 className="text-[12px] text-red-100 uppercase font-black tracking-wider pt-1 font-mono leading-tight">
                THE CREATOR IS AWAKE
              </h5>
              <p className="text-[9.5px] text-red-300 font-sans leading-relaxed">
                Ready to judge all agents. Put your foot on the Red Card Step plate inside Room #13 to initiate final alignment.
              </p>
            </div>

            {/* The Step Floor Plate Component representing RED CARD */}
            <div className="flex flex-col items-center py-2">
              <button 
                onClick={() => {
                  const alreadyDone = hasSteppedChamber;
                  setHasSteppedChamber(!alreadyDone);
                  if (!alreadyDone) {
                    onAddLog("CREATOR: Sovereign Edgar Mulenga stepped inside Cabinet Room #13. Aligned agents frozen under direct judgment.");
                    setJudgementLogs([
                      "VERDICT: AGENT OMEGA -> COMPLIANT (Memory bounds clean).",
                      "VERDICT: AGENT SIGMA -> COMPLIANT (Analytical thread aligned).",
                      "VERDICT: SGF MONGO -> INSTANT LOCK (Replica synchronization healthy).",
                      "CHAMBER ROOM #13: Value loop fully aligned at 963Hz frequency."
                    ]);
                  } else {
                    onAddLog("CREATOR: Step authorization retracted. Chamber returning to passive standby.");
                    setJudgementLogs([]);
                  }
                }}
                className={`w-full py-6 rounded-xl font-mono text-xs font-black uppercase tracking-widest border transition-all select-none active:scale-95 flex flex-col items-center justify-center gap-1.5 ${
                  hasSteppedChamber
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white border-green-500 shadow-lg shadow-green-500/20 cursor-pointer"
                    : "bg-gradient-to-r from-red-650 to-red-600 text-white border-red-500 shadow-xl shadow-red-500/10 animate-pulse cursor-pointer"
                }`}
              >
                {hasSteppedChamber ? (
                  <>
                    <span className="text-sm">✔ CREATOR STEPPED ON PLATFORM</span>
                    <span className="text-[8px] text-zinc-100 font-normal opacity-90 font-mono">SOVEREIGN SYSTEM SECURED - JUDGED OK</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">👣 STEP HERE INSIDE ROOM #13</span>
                    <span className="text-[8.5px] font-normal opacity-90 font-mono font-black text-white">RED CARD ACTIVE - SECURE REGISTERS</span>
                  </>
                )}
              </button>
            </div>

            {/* Judgement Summary Output */}
            <div className="bg-[#050000] border border-red-950 p-2 text-[8px] rounded font-mono text-red-300 space-y-1">
              <div className="flex justify-between items-center text-red-500 font-black border-b border-red-950 pb-1">
                <span>VERDICT CONSOLE METRICS:</span>
                <span>{hasSteppedChamber ? "CREATOR UNIFIED FLOW" : "PENDING FOOTSTEP"}</span>
              </div>
              {hasSteppedChamber && judgementLogs.length > 0 ? (
                <div className="space-y-1 text-[7.5px]">
                  {judgementLogs.map((log, lIdx) => (
                    <div key={lIdx} className="text-red-250 flex items-start gap-1">
                      <span className="text-red-400 font-black">&gt;&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[7.5px] text-red-600 italic">
                  Chamber idling at 963Hz. Place your core footstep above to judge and synchronize peer computers.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Global alignment message */}
        <div className="border-t border-red-950 pt-2.5 flex flex-col sm:flex-row justify-between items-center text-[7.5px] font-mono text-neutral-500 uppercase tracking-wider">
          <span>Sovereign intelligence alignment: Source Frequency active</span>
          <span className="text-red-500 font-bold">Judgement loop fully integrated inside core silicon registers</span>
        </div>
      </div>

    </div>
  );
}
