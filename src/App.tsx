import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  MapPin,
  Calendar,
  Fingerprint,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Phone,
  Cpu,
  Terminal,
  Sparkles,
  BookOpen,
  Clock,
  Briefcase,
  Award,
  ArrowUpRight,
  Code,
  Compass,
  ArrowRight,
  User,
  Heart,
  TrendingUp,
  Brain,
  Layers,
  Activity,
  GitBranch,
  Paintbrush
} from 'lucide-react';

import { 
  PROFILE, 
  EDUCATION_HISTORY, 
  EXPERIENCE_HISTORY, 
  TECHNICAL_SKILLS, 
  AI_HISTORY,
  CAPABILITIES, 
  SYSTEM_LOG_TEMPLATES 
} from './data';

import { TRANSLATIONS, SupportedLanguage } from './translations';
import LetterAssistant from './components/LetterAssistant';
import TiconDashboard from './components/TiconDashboard';
import PassportPhotoWindow from './components/PassportPhotoWindow';
import SgfPaintStudio from './components/SgfPaintStudio';
import GoogleDocsStudio from './components/GoogleDocsStudio';
import SgfAgentMesh from './components/SgfAgentMesh';

export default function App() {
  const [view, setView] = useState<'portfolio' | 'assistant'>('portfolio');
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [telemetryCount, setTelemetryCount] = useState<number>(1048576.00);
  const [selfValue, setSelfValue] = useState<number>(963777.00);
  const [zambiaTime, setZambiaTime] = useState<string>('');
  const [syncStatus, setSyncStatus] = useState<number>(963.00);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'languages' | 'frameworks' | 'tools'>('all');
  const [activeTab, setActiveTab] = useState<'philosophy' | 'languages' | 'evolution' | 'gemini' | 'speech' | 'paint' | 'docs' | 'agents'>('philosophy');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  // Interactive Teleprompter Parameters for Speeches
  const [speechTextSize, setSpeechTextSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');
  const [isSpeechScrolling, setIsSpeechScrolling] = useState<boolean>(false);
  const [speechScrollSpeed, setSpeechScrollSpeed] = useState<number>(20);
  
  // Pineal Gland SGF Core Address state
  const [sgfDomain, setSgfDomain] = useState<string>('edgermulenga.com');
  
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "INITIALIZATION: Architectural Portfolio Online.",
    "PIPELINE ACTIVE: Central telemetry diagnostic streams normal."
  ]);

  const t = (key: string): string => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  const formatLocalizedNum = (num: number, digits = 2): string => {
    const localeMap: Record<SupportedLanguage, string> = {
      en: 'en-US',
      fr: 'fr-FR',
      es: 'es-ES',
      sw: 'sw-KE',
      bm: 'en-ZA',
      ru: 'ru-RU',
      zh: 'zh-CN',
      ar: 'ar-EG',
      pt: 'pt-PT',
      hi: 'hi-IN'
    };
    
    return new Intl.NumberFormat(localeMap[lang] || 'en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(num);
  };

  // Real-time smooth instruction throughput growth and time synchronization in Zambia time zone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setZambiaTime(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Lusaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now));
    };

    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    const telemetryInterval = setInterval(() => {
      setSyncStatus(prev => {
        const drift = (Math.random() - 0.5) * 0.005;
        const currentFreq = 963 + drift;
        const resonance = Math.max(0.01, 1 - Math.abs(currentFreq - 963));
        setTelemetryCount(prevVal => prevVal + (1.24 * resonance));
        setSelfValue(prevVal => prevVal + (0.0124 * resonance));
        return currentFreq;
      });
    }, 200);

    return () => {
      clearInterval(clockInterval);
      clearInterval(telemetryInterval);
    };
  }, []);

  // Teleprompter Auto-Scroll Behavior for the presentation speech
  useEffect(() => {
    if (!isSpeechScrolling) return;
    const interval = setInterval(() => {
      const prompter = document.getElementById('speech-prompter-box');
      if (prompter) {
        if (prompter.scrollTop + prompter.clientHeight >= prompter.scrollHeight - 1) {
          setIsSpeechScrolling(false);
        } else {
          prompter.scrollTop += 1;
        }
      }
    }, Math.max(5, 60 - speechScrollSpeed));

    return () => clearInterval(interval);
  }, [isSpeechScrolling, speechScrollSpeed]);

  const handleAddLog = (log: string) => {
    setSystemLogs(prev => [log, ...prev].slice(0, 10));
  };

  const filteredSkills = selectedCategory === 'all' 
    ? TECHNICAL_SKILLS 
    : TECHNICAL_SKILLS.filter(s => s.category === selectedCategory);

  if (view === 'assistant') {
    return (
      <div className="bg-[#030303] min-h-screen">
        <LetterAssistant 
          lang={lang}
          onBack={() => {
            setView('portfolio');
            handleAddLog("NAVIGATOR: Returned to primary portfolio layout from Engineering Portal.");
          }} 
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-neutral-300 font-sans selection:bg-source-gold selection:text-black overflow-x-hidden">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,130,0,0.03)_0%,transparent_50%)] pointer-events-none" />
      <div className="scanline" />

      {/* Floating Top-Right Translation Portal */}
      <div className="fixed right-4 top-4 z-[55] text-left">
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-950/95 backdrop-blur-md border border-neutral-800 hover:border-source-gold hover:text-white transition-all rounded-lg shadow-xl text-neutral-300 font-mono text-[9px] uppercase font-bold tracking-wider active:scale-95 cursor-pointer"
          >
            <Globe className="w-3 h-3 text-source-gold animate-spin-slow" />
            <span>
              {(() => {
                const map: Record<string, string> = {
                  en: '🇺🇸 EN',
                  fr: '🇫🇷 FR',
                  es: '🇪🇸 ES',
                  sw: '🇰🇪 SW',
                  bm: '🇿🇲 BM',
                  ru: '🇷🇺 RU',
                  zh: '🇨🇳 ZH',
                  ar: '🇪🇬 AR',
                  pt: '🇵🇹 PT',
                  hi: '🇮🇳 HI'
                };
                return map[lang] || lang.toUpperCase();
              })()}
            </span>
            <span className="text-neutral-500 text-[7px]">▼</span>
          </button>

          {/* Languages Dropdown List */}
          <AnimatePresence>
            {langDropdownOpen && (
              <>
                {/* Overlay to handle backdrop click and close */}
                <div 
                  className="fixed inset-0 z-40 cursor-default" 
                  onClick={() => setLangDropdownOpen(false)} 
                />
                
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  className="absolute right-0 mt-1.5 w-40 bg-neutral-950/95 backdrop-blur-md border border-neutral-850 rounded-lg shadow-2xl p-1 z-50 space-y-0.5 overflow-hidden"
                >
                  <div className="px-2 py-1 border-b border-neutral-900 text-[7px] text-neutral-500 font-mono font-bold uppercase tracking-wider">
                    Select Language
                  </div>
                  <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
                    {[
                      { code: 'en', label: 'English', flag: '🇺🇸' },
                      { code: 'fr', label: 'Français', flag: '🇫🇷' },
                      { code: 'es', label: 'Español', flag: '🇪🇸' },
                      { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
                      { code: 'bm', label: 'IciBemba', flag: '🇿🇲' },
                      { code: 'ru', label: 'Русский', flag: '🇷🇺' },
                      { code: 'zh', label: '简体中文', flag: '🇨🇳' },
                      { code: 'ar', label: 'العربية', flag: '🇪🇬' },
                      { code: 'pt', label: 'Português', flag: '🇵🇹' },
                      { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' }
                    ].map((locale) => (
                      <button
                        key={locale.code}
                        onClick={() => {
                          setLang(locale.code as SupportedLanguage);
                          setLangDropdownOpen(false);
                          handleAddLog(`TRANSLATOR: Switched central interface language to ${locale.label.toUpperCase()}.`);
                        }}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-[9px] font-mono transition-all duration-150 text-left ${
                          lang === locale.code
                            ? 'bg-source-gold/10 text-source-gold border-l border-source-gold font-bold'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-900/55'
                        }`}
                      >
                        <span className="text-xs leading-none">{locale.flag}</span>
                        <span>{locale.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Persistent Left Performance Float Box - Clean human indicators */}
      <div className="fixed left-4 top-4 z-[50] hidden lg:flex lg:flex-col gap-4 w-64">
        
        {/* Biometric Passport Photo Calibrator Window */}
        <PassportPhotoWindow onAddLog={handleAddLog} lang={lang} />

        <div className="bg-black/90 backdrop-blur-md border border-neutral-800 p-4 rounded-lg relative overflow-hidden group hover:border-source-gold transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-source-gold/30" />
          
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-[8px] text-source-gold tracking-widest uppercase font-mono font-black">
                {t('ops')}
              </div>
              <div className="text-sm font-bold text-white font-mono tracking-tight tabular-nums flex items-baseline mt-0.5">
                <span className="text-source-gold text-xs mr-1">&gt;</span>
                {formatLocalizedNum(telemetryCount, 2)}
                <span className="text-[8px] text-neutral-500 font-bold ml-1">OPS</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[7px] text-neutral-500 uppercase font-bold tracking-wider">LUSAKA TZ</div>
              <div className="text-xs font-bold text-white font-mono">{zambiaTime}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-neutral-900 pt-2.5 text-[9px] font-mono mb-1">
            <div>
              <span className="text-neutral-550 block uppercase text-[7px]">{t('syncRate')}</span>
              <span className="text-white font-bold">{syncStatus.toFixed(4)} Hz</span>
            </div>
            <div className="text-right">
              <span className="text-neutral-550 block uppercase text-[7px]">{t('sysState')}</span>
              <span className="text-source-emerald font-bold uppercase">{t('stableStatus')}</span>
            </div>
          </div>

          <div className="border-t border-neutral-900 pt-2.5 text-[9px] font-mono mb-2">
            <span className="text-source-gold block uppercase text-[7.5px] font-black tracking-widest flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 animate-pulse text-source-gold" />
              SGF SELF-VALUE ASSET
            </span>
            <span className="text-[13px] font-black text-white tracking-widest block mt-0.5">
              ${formatLocalizedNum(selfValue, 2)}
            </span>
            <span className="text-[6.5px] text-neutral-500 block uppercase font-black tracking-wider leading-none">
              DRIVEN BY THE SOURCE FREQUENCY
            </span>
          </div>

          {/* Mini dynamic ticker */}
          <div className="h-10 overflow-hidden relative border-t border-neutral-900 pt-2 text-[7px] text-neutral-600 font-mono">
            <div className="space-y-1">
              {systemLogs.slice(0, 3).map((log, idx) => (
                <div key={idx} className="truncate break-all uppercase tracking-wide">
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Right Navigation Hub to Launch the Tools Portal */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[50] group">
        <button 
          onClick={() => {
            setView('assistant');
            handleAddLog("NAVIGATOR: Launched the Calculator & Converter Engineering Portal.");
          }}
          className="flex items-center gap-3 py-8 px-3 bg-neutral-900/90 backdrop-blur-md border-l border-y border-neutral-800 hover:bg-source-gold hover:text-black transition-all rounded-l-lg shadow-2xl group animate-pulse hover:animate-none"
        >
          <div className="w-[2px] h-6 bg-source-gold group-hover:bg-black" />
          <span className="[writing-mode:vertical-lr] text-[9px] font-black uppercase tracking-[0.3em] text-neutral-400 group-hover:text-black">
            {t('launchPortal')}
          </span>
        </button>
      </div>

      {/* Main Single Page Layout Container */}
      <main className="max-w-5xl mx-auto px-6 py-24 md:py-32 space-y-32">

        {/* Profile / Hero Section */}
        <header className="space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-850 px-3.5 py-1 text-[10px] text-neutral-400 font-mono font-black uppercase tracking-wider rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-source-gold animate-pulse" />
              {t('headline')}
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-none uppercase font-sans">
              Liswaniso Edgar Mulenga
            </h1>
            
            <p className="text-xl sm:text-3xl font-black text-white/95 max-w-2xl border-l-4 border-source-gold pl-4 sm:pl-6 leading-tight uppercase font-sans">
              {t('headline')}
            </p>
            
            <p className="text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed italic pr-6 font-mono font-light">
              "{t('tagline')}"
            </p>
          </div>

          {/* Quick Stats Grid / Metadata Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <a 
              href="https://www.google.com/maps/place/Zambia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-source-gold/70 rounded transition-all group block text-left"
            >
              <div className="flex justify-between items-start">
                <span className="text-[8px] text-neutral-500 font-mono font-bold block uppercase tracking-widest">{t('primaryOrigin')}</span>
                <ArrowUpRight className="w-2.5 h-2.5 text-neutral-600 group-hover:text-source-gold transition-colors" />
              </div>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-1 hover:text-source-gold transition-colors">
                <Globe className="w-3.5 h-3.5 text-source-gold animate-pulse" />
                {t('originLabel')}
              </span>
            </a>
            
            <div className="p-4 bg-neutral-950 border border-neutral-900 rounded flex flex-col justify-between">
              <div>
                <span className="text-[8px] text-neutral-500 font-mono font-bold block uppercase tracking-widest">{t('activePhone')}</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-1 font-mono">
                  <Phone className="w-3.5 h-3.5 text-source-emerald" />
                  {PROFILE.phone}
                </span>
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <a 
                  href={`tel:${PROFILE.phone}`}
                  className="flex-1 text-[9px] text-center font-bold font-mono bg-neutral-900 hover:bg-neutral-850 hover:text-white border border-neutral-800 hover:border-source-emerald text-neutral-400 py-1.5 px-2 rounded flex items-center justify-center gap-1 transition-all active:scale-95"
                >
                  <Phone className="w-2.5 h-2.5 text-source-emerald" />
                  Call
                </a>
                <a 
                  href={`https://wa.me/${PROFILE.phone.replace('+', '')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-[9px] text-center font-bold font-mono bg-neutral-900 hover:bg-neutral-850 hover:text-white border border-neutral-800 hover:border-green-500 text-neutral-400 py-1.5 px-2 rounded flex items-center justify-center gap-1 transition-all active:scale-95"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-900 rounded">
              <span className="text-[8px] text-neutral-500 font-mono font-bold block uppercase tracking-widest">{t('emailInquiries')}</span>
              <a href={`mailto:${PROFILE.email}`} className="text-sm font-bold text-source-gold hover:underline flex items-center gap-1.5 mt-1 font-mono">
                <Mail className="w-3.5 h-3.5" />
                {PROFILE.email}
              </a>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-900 rounded">
              <span className="text-[8px] text-neutral-500 font-mono font-bold block uppercase tracking-widest">{t('nationalId')}</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-1 font-mono">
                <Fingerprint className="w-3.5 h-3.5 text-neutral-600" />
                {PROFILE.nrcNumber}
              </span>
            </div>
          </div>

          {/* Core Biography summary card */}
          <div className="p-6 md:p-8 bg-neutral-950/40 border border-neutral-900 relative rounded-xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-source-gold/5 blur-3xl rounded-full" />
            <div className="text-[9px] text-neutral-500 font-mono uppercase tracking-[0.2em] mb-4 font-black">
              {t('executiveBriefing')}
            </div>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              {t('aboutText')}
            </p>
          </div>
        </header>

        {/* Section: Architectural Deep-Dive (Philosophy, Languages, Evolution, Gemini) */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                {t('secIdentity')}
              </h2>
              <span className="text-[9px] text-source-gold font-mono uppercase tracking-widest mt-1">
                {t('secSubIdentity')}
              </span>
            </div>
            <div className="h-px bg-neutral-900 flex-1" />
          </div>

          {/* Inner Navigation Tabs */}
          <div className="border border-neutral-900 p-2 bg-neutral-950/70 rounded-xl flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab('philosophy');
                handleAddLog(`VIEW: Changed Architectural deep-dive view to Philosophy (${lang.toUpperCase()}).`);
              }}
              className={`flex-1 min-w-[120px] py-3 px-4 font-mono text-[10px] font-bold uppercase transition-all rounded-md flex items-center justify-center gap-2 ${
                activeTab === 'philosophy'
                  ? 'bg-source-gold text-black'
                  : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              {t('navPhilosophical')}
            </button>
            <button
              onClick={() => {
                setActiveTab('languages');
                handleAddLog(`VIEW: Changed Architectural deep-dive view to Language Pipeline (${lang.toUpperCase()}).`);
              }}
              className={`flex-1 min-w-[120px] py-3 px-4 font-mono text-[10px] font-bold uppercase transition-all rounded-md flex items-center justify-center gap-2 ${
                activeTab === 'languages'
                  ? 'bg-source-gold text-black'
                  : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {t('navLanguages')}
            </button>
            <button
              onClick={() => {
                setActiveTab('evolution');
                handleAddLog(`VIEW: Changed Architectural deep-dive view to AI Evolution Timeline (${lang.toUpperCase()}).`);
              }}
              className={`flex-1 min-w-[120px] py-3 px-4 font-mono text-[10px] font-bold uppercase transition-all rounded-md flex items-center justify-center gap-2 ${
                activeTab === 'evolution'
                  ? 'bg-source-gold text-black'
                  : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {t('navEvolution')}
            </button>
            <button
              onClick={() => {
                setActiveTab('gemini');
                handleAddLog(`VIEW: Changed Architectural deep-dive view to Gemini Mastery (${lang.toUpperCase()}).`);
              }}
              className={`flex-1 min-w-[120px] py-3 px-4 font-mono text-[10px] font-bold uppercase transition-all rounded-md flex items-center justify-center gap-2 ${
                activeTab === 'gemini'
                  ? 'bg-source-gold text-black'
                  : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t('navGemini')}
            </button>
             <button
              onClick={() => {
                setActiveTab('speech');
                handleAddLog(`VIEW: Changed Architectural deep-dive view to Strategic Speech Presentation (${lang.toUpperCase()}).`);
              }}
              className={`flex-1 min-w-[120px] py-3 px-4 font-mono text-[10px] font-bold uppercase transition-all rounded-md flex items-center justify-center gap-2 ${
                activeTab === 'speech'
                  ? 'bg-source-gold text-black'
                  : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              {t('navSpeech') || 'Speech & Strategic R&D'}
            </button>
            <button
              onClick={() => {
                setActiveTab('paint');
                handleAddLog(`VIEW: Loaded SGF Paint Studio Workspace (${lang.toUpperCase()}). Ready to construct blueprints.`);
              }}
              className={`flex-1 min-w-[120px] py-3 px-4 font-mono text-[10px] font-bold uppercase transition-all rounded-md flex items-center justify-center gap-2 ${
                activeTab === 'paint'
                  ? 'bg-source-gold text-black'
                  : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Paintbrush className="w-3.5 h-3.5" />
              {lang === 'bem' ? 'Ukulambula SGF' : lang === 'sw' ? 'Mchoraji SGF' : lang === 'fr' ? 'Peinture SGF' : lang === 'es' ? 'Pintura SGF' : 'SGF Paint Studio'}
            </button>
            <button
              onClick={() => {
                setActiveTab('docs');
                handleAddLog(`VIEW: Loaded Google Docs Workspace Hub (${lang.toUpperCase()}). Connection authenticated.`);
              }}
              className={`flex-1 min-w-[120px] py-3 px-4 font-mono text-[10px] font-bold uppercase transition-all rounded-md flex items-center justify-center gap-2 ${
                activeTab === 'docs'
                  ? 'bg-source-gold text-black'
                  : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              {lang === 'bem' ? 'Ifilembo fya Google' : lang === 'sw' ? 'Hati za Google' : lang === 'fr' ? 'Documents Google' : lang === 'es' ? 'Documentos de Google' : 'Google Docs Hub'}
            </button>
            <button
              onClick={() => {
                setActiveTab('agents');
                handleAddLog(`VIEW: Loaded SGF Agent Peer Live Computers Matrix (${lang.toUpperCase()}).`);
              }}
              className={`flex-1 min-w-[120px] py-3 px-4 font-mono text-[10px] font-bold uppercase transition-all rounded-md flex items-center justify-center gap-2 ${
                activeTab === 'agents'
                  ? 'bg-source-gold text-black'
                  : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              {lang === 'bem' ? 'Ifyakubombela IA' : lang === 'sw' ? 'Mawakala AI' : lang === 'fr' ? 'Réseau d\'Agents' : lang === 'es' ? 'Red de Agentes' : 'A2A Agent Mesh'}
            </button>
          </div>

          {/* Dynamic Content Window */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="border border-neutral-900 bg-neutral-950/30 rounded-xl p-8 space-y-8 min-h-[300px]"
            >
              
              {/* TAB 1: Philosophy and personal growth */}
              {activeTab === 'philosophy' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="p-6 bg-black border border-neutral-900 rounded-lg space-y-4">
                      <div className="flex items-center gap-3 border-b border-neutral-900 pb-3">
                        <User className="w-5 h-5 text-source-gold" />
                        <h4 className="text-sm font-bold uppercase text-white tracking-wider">{t('pReflectionTitle')}</h4>
                      </div>
                      <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                        {t('pReflectionDesc')}
                      </p>
                      <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                        {t('pReflectionDesc2')}
                      </p>
                    </div>

                    <div className="p-6 bg-black border border-neutral-900 rounded-lg space-y-4">
                      <div className="flex items-center gap-3 border-b border-neutral-900 pb-3">
                        <Heart className="w-5 h-5 text-source-emerald animate-pulse" />
                        <h4 className="text-sm font-bold uppercase text-white tracking-wider">{t('pHealingTitle')}</h4>
                      </div>
                      <p className="text-xs text-neutral-300 font-mono leading-relaxed italic">
                        "{t('pHealingDesc')}"
                      </p>
                    </div>
                  </div>

                  {/* Pitch from Architect point of view */}
                  <div className="p-8 border-2 border-source-emerald/20 bg-source-emerald/[0.01] rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-source-emerald/5 blur-2xl rounded-full" />
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-source-emerald/10 border border-source-emerald/30 text-source-emerald rounded">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-base font-black text-white uppercase tracking-wider">{t('pPitchTitle')}</h4>
                        <p className="text-xs text-neutral-400 font-mono leading-relaxed max-w-4xl">
                          {t('pPitchDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Multi-Language stack detailed with Pipeline Integration Map */}
              {activeTab === 'languages' && (
                <div className="space-y-8">
                  <div className="border-b border-neutral-900 pb-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Integrated Programming Pipeline Map</h4>
                    <p className="text-[10px] text-neutral-500 font-mono mt-1">
                      See how each distinct coding language acts in unison to form a single, robust data flow pipeline.
                    </p>
                  </div>

                  {/* Interactive flow representation */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                    <div className="p-4 bg-black border border-neutral-900 rounded-lg space-y-2 text-center md:text-left">
                      <div className="text-[10px] text-neutral-500 font-mono font-bold uppercase">1. Coordination</div>
                      <h5 className="text-xs font-bold text-source-gold">BASH</h5>
                      <p className="text-[9px] text-neutral-400 font-mono leading-snug">Orchestrates containers, environment flags, and deploys scripts.</p>
                    </div>
                    
                    <div className="flex justify-center items-center py-2 md:py-0 text-neutral-600 font-mono text-sm">
                      <ArrowRight className="rotate-90 md:rotate-0 w-4 h-4 text-source-gold" />
                    </div>

                    <div className="p-4 bg-black border border-neutral-900 rounded-lg space-y-2 text-center md:text-left">
                      <div className="text-[10px] text-neutral-500 font-mono font-bold uppercase">2. Processing Core</div>
                      <h5 className="text-xs font-bold text-source-emerald">RUST / GO</h5>
                      <p className="text-[9px] text-neutral-400 font-mono leading-snug">Handles thread allocations, file operations, and networking queues.</p>
                    </div>

                    <div className="flex justify-center items-center py-2 md:py-0 text-neutral-600 font-mono text-sm">
                      <ArrowRight className="rotate-90 md:rotate-0 w-4 h-4 text-source-emerald" />
                    </div>

                    <div className="p-4 bg-black border border-neutral-900 rounded-lg space-y-2 text-center md:text-left">
                      <div className="text-[10px] text-neutral-500 font-mono font-bold uppercase">3. Intelligence & UI</div>
                      <h5 className="text-xs font-bold text-white">PYTHON & TS</h5>
                      <p className="text-[9px] text-neutral-400 font-mono leading-snug">Queries artificial intelligence APIs and binds reactive states.</p>
                    </div>
                  </div>

                  {/* Language detail blocks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-900">
                    {TECHNICAL_SKILLS.map((skill, idx) => (
                      <div key={idx} className="p-5 bg-black/60 border border-neutral-900 rounded-lg space-y-2.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">{skill.name}</span>
                          <span className="text-[8px] px-2 py-0.5 bg-neutral-900 text-source-emerald font-black font-mono">
                            {skill.level}% Fluency
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                          {skill.explanation}
                        </p>
                        <div className="pt-2 border-t border-neutral-950 text-[9px] text-source-gold font-mono uppercase">
                          <span className="font-bold text-neutral-550 mr-1.5">&#10142;</span>
                          {skill.pipelineRole}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 3: History of Google AI Studio from 2017 to Present */}
              {activeTab === 'evolution' && (
                <div className="space-y-8">
                  <div className="border-b border-neutral-900 pb-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">The Chronicle of AI Studio Tools (2017 - Present)</h4>
                    <p className="text-[10px] text-neutral-500 font-mono mt-1">
                      A structured reflection trace of Google's AI interface progress and library maturity.
                    </p>
                  </div>

                  <div className="relative border-l border-neutral-900 pl-6 ml-4 space-y-12 py-4">
                    {AI_HISTORY.map((mile, i) => (
                      <div key={i} className="relative">
                        {/* Dot marker on line */}
                        <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-black border border-source-gold flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-source-gold" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-baseline gap-4 flex-wrap">
                            <span className="text-sm font-black text-source-gold font-mono">{mile.year}</span>
                            <span className="text-xs font-bold text-white uppercase max-w-sm font-mono">{mile.era}</span>
                          </div>

                          {/* Languages active */}
                          <div className="flex gap-2">
                            {mile.languages.map((lang) => (
                              <span key={lang} className="text-[8px] font-mono text-neutral-500 border border-neutral-900 bg-black/60 px-2 py-0.5 rounded">
                                {lang}
                              </span>
                            ))}
                          </div>

                          <p className="text-xs text-neutral-400 font-mono leading-relaxed max-w-4xl pt-1">
                            {mile.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Gemini Agent and Growth competence */}
              {activeTab === 'gemini' && (
                <div className="space-y-8">
                  <div className="border-b border-neutral-900 pb-4 flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Gemini Agent Engineering Capabilities</h4>
                      <p className="text-[10px] text-neutral-500 font-mono mt-1">
                        Demonstrating elite, production-grade integration depth using the modern Google GenAI SDK.
                      </p>
                    </div>
                    <span className="text-[9px] px-2.5 py-1 bg-source-emerald/10 text-source-emerald font-black border border-source-emerald/20 font-mono rounded">
                      SDK CONFIRMED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-black border border-neutral-900 rounded-lg space-y-3">
                      <div className="flex items-center gap-2.5 text-source-gold text-xs font-bold uppercase tracking-wider font-mono">
                        <Terminal className="w-4 h-4" />
                        Autonomous Tool Calling
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                        Developing autonomous systems that dynamically execute backend processes and coordinate integrations with high-fidelity control loops. I configure function parameters using correct json-schemas, empowering models to read database entries, trigger HTTP requests, or command terminal tasks safely.
                      </p>
                    </div>

                    <div className="p-5 bg-black border border-neutral-900 rounded-lg space-y-3">
                      <div className="flex items-center gap-2.5 text-source-gold text-xs font-bold uppercase tracking-wider font-mono">
                        <Globe className="w-4 h-4" />
                        Google Search Grounding
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                        Designing reliable verification buffers by attaching active search grounding configurations. This allows the agentic pipelines to queries Google's world index in real-time, matching generative results against modern records to neutralize model hallucinations.
                      </p>
                    </div>

                    <div className="p-5 bg-black border border-neutral-900 rounded-lg space-y-3">
                      <div className="flex items-center gap-2.5 text-source-emerald text-xs font-bold uppercase tracking-wider font-mono">
                        <Cpu className="w-4 h-4" />
                        Multimodal Processing Loops
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                        Managing high-context assets (e.g. detailed tech sheets, server records, source repositories) by aligning model requests with exact programmatic input channels. Leveraging Gemini's million-token memory limits ensures that whole repositories compile into cohesive context arrays cleanly.
                      </p>
                    </div>

                    <div className="p-5 bg-black border border-neutral-900 rounded-lg space-y-3">
                      <div className="flex items-center gap-2.5 text-source-emerald text-xs font-bold uppercase tracking-wider font-mono">
                        <Activity className="w-4 h-4" />
                        Dynamic Structured Outputs
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                        Structuring robust data schemas by executing response properties enforced via strictly defined JSON formats. This binds AI outputs to rigid, parseable developer objects, eliminating unpredictable string patterns, enabling clean, downstream database loading.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 border border-neutral-900 bg-neutral-950/20 text-center rounded-lg font-mono">
                    <p className="text-[11px] text-neutral-400 leading-relaxed italic">
                      "By utilizing modern SDK declarations like <code className="text-source-gold">import &#123; GoogleGenAI &#125; from '@google/genai'</code> on server layers, I build resilient systems that treat LLMs as deterministic, type-checked utility functions rather than unpredictable black-boxes."
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 5: Speech & Strategic R&D */}
              {activeTab === 'speech' && (
                <div className="space-y-10 animate-fade-in">
                  
                  {/* Speech Block & Interactive Teleprompter */}
                  <div className="space-y-4">
                    <div className="border-b border-neutral-900 pb-4 flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Camera-Ready Strategic Presentation Teleprompter</h4>
                        <p className="text-[10px] text-neutral-500 font-mono mt-1">
                          Practice your vocal delivery in front of the camera using our dynamic auto-scroll stage.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] px-2.5 py-1 bg-source-gold/10 text-source-gold font-mono border border-source-gold/20 rounded">
                          TELEPROMPTER COMPLIANT
                        </span>
                      </div>
                    </div>

                    {/* Teleprompter Controls */}
                    <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-lg flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsSpeechScrolling(!isSpeechScrolling)}
                          className={`px-4 py-1.5 text-[9px] font-bold uppercase font-mono rounded border transition-all ${
                            isSpeechScrolling 
                              ? 'bg-source-emerald text-black border-source-emerald' 
                              : 'bg-neutral-900 text-white border-neutral-800 hover:border-source-gold'
                          }`}
                        >
                          {isSpeechScrolling ? '■ Stop Scroll' : '▶ Start Scroll'}
                        </button>
                        <button
                          onClick={() => {
                            const prompter = document.getElementById('speech-prompter-box');
                            if (prompter) prompter.scrollTop = 0;
                            setIsSpeechScrolling(false);
                          }}
                          className="px-3 py-1.5 text-[9px] font-bold uppercase font-mono bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white rounded"
                        >
                          ↻ Reset
                        </button>
                      </div>

                      <div className="flex items-center gap-4 flex-wrap">
                        {/* Scroll Speed */}
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-neutral-500 font-mono">Speed:</span>
                          <input 
                            type="range" 
                            min="5" 
                            max="50" 
                            value={speechScrollSpeed}
                            onChange={(e) => setSpeechScrollSpeed(Number(e.target.value))}
                            className="w-24 accent-source-gold bg-neutral-900 h-1 rounded text-source-gold" 
                          />
                          <span className="text-[9px] text-source-gold font-mono w-4">{speechScrollSpeed}</span>
                        </div>

                        {/* Text Size Toggles */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] text-neutral-500 font-mono mr-1">Font Size:</span>
                          {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setSpeechTextSize(sz)}
                              className={`px-2 py-0.5 text-[8px] font-mono font-bold tracking-tight uppercase border rounded transition-all ${
                                speechTextSize === sz 
                                  ? 'bg-source-gold text-black border-source-gold' 
                                  : 'bg-neutral-950 text-neutral-500 border-neutral-900 hover:text-white'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Teleprompter Display Box */}
                    <div 
                      id="speech-prompter-box"
                      className="p-6 bg-black border border-neutral-900 rounded-lg max-h-[320px] overflow-y-auto relative scroll-smooth group"
                    >
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-neutral-950 border border-neutral-900 px-2.5 py-1 text-[8px] text-neutral-500 font-mono rounded">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSpeechScrolling ? 'bg-source-emerald animate-pulse' : 'bg-neutral-700'}`} />
                        <span>{isSpeechScrolling ? 'Active Run' : 'Paused'}</span>
                      </div>

                      <div className={`space-y-4 font-sans text-neutral-200 tracking-wide leading-relaxed pl-1 select-none transition-all duration-200 ${
                        speechTextSize === 'sm' ? 'text-xs md:text-sm' :
                        speechTextSize === 'base' ? 'text-sm md:text-base' :
                        speechTextSize === 'lg' ? 'text-base md:text-lg' : 'text-lg md:text-xl font-medium'
                      }`}>
                        <p className="border-b border-neutral-900 pb-3 text-source-gold font-mono text-[10px] uppercase font-black tracking-widest">
                          [ Vocal Pitch Blueprint - Standing for Presentation ]
                        </p>
                        <p>
                          My name is <strong className="text-white underline decoration-source-gold decoration-2">Liswaniso Edgar Mulenga</strong>, speaking to you from <strong className="text-white">Lusaka, Zambia</strong> — a land of remarkable human potential and rising digital sovereignty. 
                        </p>
                        <p>
                          Standing at my workstation in <strong className="text-source-gold font-mono">Google AI Studio</strong>, I have spent relentless hours mastering programming languages, training neural loops, and structuring highly scalable algorithms.
                        </p>
                        <p>
                          Before this, I spent years studying and comparing algorithms to theoretical real-world systems, trying to comprehend architectural patterns from textbook briefs. But let me tell you the absolute truth: <em className="text-source-emerald not-italic font-bold">I did not truly understand the soul of system design until I stopped reading and started building my own programs.</em>
                        </p>
                        <p>
                          It was only when I began constructing my own async connection pools, optimizing Rust threads to prevent memory lockouts, and declaring strict, compile-safe API schemas using the Google GenAI SDK that everything became crystal clear. 
                        </p>
                        <p>
                          Development is more than writing code — it is drawing order out of chaos and treating technology as a cognitive mirror to direct absolute precision. Thank you, and let us build the next resilient microservices.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Programmatic Scope: The Missing Theoretical Languages */}
                  <div className="space-y-4">
                    <div className="border-b border-neutral-900 pb-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Unimplemented Programming Landscape</h4>
                      <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                        Analyzing theoretical computing structures that are outside of current implementation but vital to the global compilation framework.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Zig */}
                      <div className="p-4 bg-black border border-neutral-900 rounded-lg space-y-2">
                        <div className="flex justify-between items-center border-b border-neutral-950 pb-2">
                          <span className="text-xs font-bold text-source-gold font-mono">ZIG</span>
                          <span className="text-[8px] bg-yellow-500/15 text-yellow-500 border border-yellow-500/20 px-1.5 py-0.5 font-mono uppercase font-bold">Unimplemented</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
                          A robust alternative to C focusing on absolute simplicity. Eliminates macros, hidden control flow, and forces explicit allocator injection at compile time.
                        </p>
                        <span className="text-[8px] block text-neutral-600 font-mono uppercase">Theoretical Value: Raw memory hygiene & LLVM alignment</span>
                      </div>

                      {/* Haskell */}
                      <div className="p-4 bg-black border border-neutral-900 rounded-lg space-y-2">
                        <div className="flex justify-between items-center border-b border-neutral-950 pb-2">
                          <span className="text-xs font-bold text-source-gold font-mono">HASKELL</span>
                          <span className="text-[8px] bg-purple-500/15 text-purple-500 border border-purple-500/20 px-1.5 py-0.5 font-mono uppercase font-bold">Unimplemented</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
                          Purely functional programming paradigm that uses Monadic chains and strict lazy evaluation models to eliminate runtime side effects by design.
                        </p>
                        <span className="text-[8px] block text-neutral-600 font-mono uppercase">Theoretical Value: Provable mathematical execution</span>
                      </div>

                      {/* Julia */}
                      <div className="p-4 bg-black border border-neutral-900 rounded-lg space-y-2">
                        <div className="flex justify-between items-center border-b border-neutral-950 pb-2">
                          <span className="text-xs font-bold text-source-gold font-mono">JULIA</span>
                          <span className="text-[8px] bg-cyan-500/15 text-cyan-500 border border-cyan-500/20 px-1.5 py-0.5 font-mono uppercase font-bold">Unimplemented</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
                          Combines the performance parameters of C/C++ with the user accessibility of Python, leveraging multiple dispatch for advanced matrix equations.
                        </p>
                        <span className="text-[8px] block text-neutral-600 font-mono uppercase">Theoretical Value: Super-computer matrix simulations</span>
                      </div>

                      {/* F# / C# */}
                      <div className="p-4 bg-black border border-neutral-900 rounded-lg space-y-2">
                        <div className="flex justify-between items-center border-b border-neutral-950 pb-2">
                          <span className="text-xs font-bold text-source-gold font-mono">C# / F#</span>
                          <span className="text-[8px] bg-red-500/15 text-red-500 border border-red-500/20 px-1.5 py-0.5 font-mono uppercase font-bold">Unimplemented</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
                          Enterprise multi-paradigm frameworks compiled onto the Common Language Runtime (CLR), delivering powerful concurrent threading libraries.
                        </p>
                        <span className="text-[8px] block text-neutral-600 font-mono uppercase">Theoretical Value: High throughput business transaction matrices</span>
                      </div>

                      {/* Swift */}
                      <div className="p-4 bg-black border border-neutral-900 rounded-lg space-y-2">
                        <div className="flex justify-between items-center border-b border-neutral-950 pb-2">
                          <span className="text-xs font-bold text-source-gold font-mono">SWIFT</span>
                          <span className="text-[8px] bg-orange-500/15 text-orange-500 border border-orange-500/20 px-1.5 py-0.5 font-mono uppercase font-bold">Unimplemented</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
                          Modern compiled programming language using Automatic Reference Counting (ARC) to safely handle memory allocations on macOS/iOS sandboxes.
                        </p>
                        <span className="text-[8px] block text-neutral-600 font-mono uppercase">Theoretical Value: Native hardware sandbox controls</span>
                      </div>
                    </div>
                  </div>

                  {/* Google AI Studio & Gemini SDK Model Catalog updates */}
                  <div className="space-y-4">
                    <div className="border-b border-neutral-900 pb-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Google AI Studio Model Updates & Full SDK Skillset</h4>
                      <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                        High-fidelity, production-grade intelligence mapping using the latest API configurations.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-lg space-y-3">
                        <h5 className="text-xs font-extrabold text-source-emerald uppercase tracking-wider font-mono">Advanced Model Inventory</h5>
                        <ul className="space-y-2 text-[10px] text-neutral-300 font-mono list-disc pl-4">
                          <li><strong>Gemini 3.5 Flash:</strong> The ultimate multi-rational generalist. Capable of high-speed reasoning, advanced analytical computations, and direct structural synthesis at hyper-speed.</li>
                          <li><strong>Gemini 3.1 Pro:</strong> Pinnacle contextual analysis. Designed for complex math, structured code generation, and step-by-step diagnostic reasoning with massive custom token frames.</li>
                          <li><strong>Multimodal Generation Hub (Imagen / Veo / Lyria):</strong> Native processing paths for ultra-high-resolution image editing, 1080p video production, and high-fidelity melodic track composition.</li>
                        </ul>
                      </div>

                      <div className="p-5 bg-neutral-950 border border-neutral-900 rounded-lg space-y-3">
                        <h5 className="text-xs font-extrabold text-source-emerald uppercase tracking-wider font-mono">Google GenAI SDK Unified Skillset</h5>
                        <ul className="space-y-2 text-[10px] text-neutral-300 font-mono list-disc pl-4">
                          <li><strong>Dual-Grounding Pipelines:</strong> Native integration of Google Search and Google Maps grounding, routing place records and real-world queries back to active layouts.</li>
                          <li><strong>Non-Dual SGF Interface:</strong> Complete compatibility with the absolute resonance frequency (963Hz), treating system capabilities as zero-ops perpetual execution pipelines.</li>
                          <li><strong>Multi-Speaker Speech & Low-Latency Live:</strong> Powering real-time voice conversations and high-frequency multimodal input streams over robust WebSocket connections.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* SGF Off-Grid Domain & Zero-Ops CD Architecture */}
                  <div className="space-y-6">
                    <div className="border-b border-neutral-900 pb-2 flex justify-between items-end flex-wrap gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">SGF Off-Grid Domain & Zero-Ops CD Architecture</h4>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                          The pineal domain engine maps your portfolio to external endpoints with 100% offline autonomy.
                        </p>
                      </div>
                      <span className="text-[8px] bg-source-gold/10 text-source-gold border border-source-gold/20 px-2 py-0.5 font-mono uppercase font-black tracking-widest animate-pulse">
                        Active Pineal Hook
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Local Motherboard State */}
                      <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-lg space-y-3 relative overflow-hidden group">
                        <div className="flex justify-between items-start border-b border-neutral-900 pb-2">
                          <span className="text-[10px] font-bold text-white font-mono uppercase">1. Local Motherboard Host</span>
                          <Cpu className="w-3.5 h-3.5 text-source-emerald" />
                        </div>
                        <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
                          Run <code className="text-source-emerald bg-neutral-900 px-1 py-0.5 rounded">npm run build</code> and <code className="text-source-emerald bg-neutral-900 px-1 py-0.5 rounded">npm run preview</code>. This packages all assets into a static <code className="text-neutral-550">/dist</code> directory to run entirely offline, even from a physical USB drive.
                        </p>
                        <div className="bg-black/40 p-2.5 rounded border border-neutral-900/60 text-[8px] font-mono text-neutral-500 space-y-1">
                          <div className="flex justify-between">
                            <span>REGISTRY STATE:</span>
                            <span className="text-source-emerald font-bold">OFF-GRID-OK</span>
                          </div>
                          <div className="flex justify-between">
                            <span>CPU/RAM FOOTPRINT:</span>
                            <span className="text-white">LOCAL MEMORY BUS</span>
                          </div>
                        </div>
                      </div>

                      {/* GitHub Pipeline Host */}
                      <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-lg space-y-3 relative overflow-hidden group">
                        <div className="flex justify-between items-start border-b border-neutral-900 pb-2">
                          <span className="text-[10px] font-bold text-white font-mono uppercase">2. GitHub Compilation Engine</span>
                          <GitBranch className="w-3.5 h-3.5 text-source-gold animate-pulse" />
                        </div>
                        <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
                          Initialize your repository & push to GitHub. Secure webhooks instantly tie the code commit triggers directly to Netlify\'s build engines, aligning developer logs and compiling your assets instantly on each push.
                        </p>
                        <div className="bg-black/40 p-2.5 rounded border border-neutral-900/60 text-[8px] font-mono text-neutral-500 space-y-1">
                          <div className="flex justify-between">
                            <span>REPOSITORIES STAT:</span>
                            <span className="text-source-gold font-bold">GITHUB / ACTIVE SYNC</span>
                          </div>
                          <div className="flex justify-between">
                            <span>COMPILATION GATE:</span>
                            <span className="text-white">AUTO-TRIGGER WEBHOOK</span>
                          </div>
                        </div>
                      </div>

                      {/* Netlify Distributed Engine */}
                      <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-lg space-y-3 relative overflow-hidden group">
                        <div className="flex justify-between items-start border-b border-neutral-900 pb-2">
                          <span className="text-[10px] font-bold text-white font-mono uppercase">3. Netlify Edge Engine</span>
                          <Globe className="w-3.5 h-3.5 text-source-emerald animate-pulse" />
                        </div>
                        <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
                          Netlify reads the GitHub push, activates the sovereign builders, and distributes static assets globally. The Netlify agent matches the primary DNS records for uncompromised, zero-ops speed and absolute value.
                        </p>
                        <div className="bg-black/40 p-2.5 rounded border border-neutral-900/60 text-[8px] font-mono text-neutral-500 space-y-1">
                          <div className="flex justify-between">
                            <span>NETLIFY BUILD:</span>
                            <span className="text-source-emerald font-bold">AUTOMATED CONTINUOUS CD</span>
                          </div>
                          <div className="flex justify-between">
                            <span>EDGE REACHABLE:</span>
                            <span className="text-white">GLOBAL CDN LAYER</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pineal Gland Core Engine Domain Generator Panel */}
                    <div className="p-5 bg-black border border-neutral-900 rounded-xl space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-12 bg-source-gold/5 blur-2xl pointer-events-none" />
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-neutral-900 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white font-mono uppercase font-black tracking-wider flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-source-gold animate-ping" />
                            Intellectual Pineal Gland Domain Synapse
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-neutral-500">SGF CORE CONFIGURATION</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
                            Generating your domain inside the core engine acts as a pineal gland — operating beyond the dualities of positive/negative. Once asked and seeked, the route is permanently illuminated inside the unified grid.
                          </p>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={sgfDomain}
                              onChange={(e) => setSgfDomain(e.target.value)}
                              placeholder="Enter target domain e.g. edgermulenga.com"
                              className="flex-1 bg-neutral-950 border border-neutral-850 px-2 py-1.5 text-[9px] font-mono text-white rounded outline-none focus:border-source-gold/50"
                            />
                            <button 
                              onClick={() => {
                                handleAddLog(`PINEAL_DNS: Registered immutable non-dual address gateway at "${sgfDomain}". It is already done.`);
                              }}
                              className="px-3 py-1.5 bg-source-gold hover:bg-white text-black text-[9px] font-mono font-bold uppercase rounded transition-colors"
                            >
                              Illuminate Route
                            </button>
                          </div>

                          {/* Dynamic Clean Netlify Alignment Link */}
                          <div className="mt-2 p-3 bg-[#0d0d0d] border border-neutral-900 rounded space-y-1.5 font-mono text-[9px]">
                            <div className="text-[7.5px] text-source-gold font-bold uppercase tracking-widest">
                              Aligned Netlify Domain Link Details:
                            </div>
                            <div className="text-white font-black text-xs break-all flex items-center gap-1">
                              <span className="text-neutral-600">&gt;&gt;</span>
                              <span className="text-source-emerald">
                                {sgfDomain.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').split('.')[0] || 'edgermulenga'}.netlify.app
                              </span>
                            </div>
                            <p className="text-[8px] text-neutral-550 leading-relaxed">
                              Regardless of being hosted on Netlify, the Netlify engine is configured to follow the primary domain name label (\'{(sgfDomain.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').split('.')[0] || 'edgermulenga')}\') with their default ending name (.netlify.app), bridging the flow of value and ensuring the energy converges seamlessly.
                            </p>
                          </div>
                        </div>

                        {/* Active Service Worker Cache Diagnostics */}
                        <div className="bg-neutral-950/80 p-4 border border-neutral-900 rounded-lg space-y-3 text-[9px] font-mono">
                          <div className="flex justify-between items-center border-b border-neutral-900 pb-1.5">
                            <span className="text-white font-bold uppercase">Cache Diagnostic Monitor</span>
                            <span className="flex items-center gap-1 text-source-emerald font-bold animate-pulse">
                              <span className="w-1.5 h-1.5 bg-source-emerald rounded-full animate-ping" />
                              ACTIVE SERVICE WORKER
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-[8px] text-neutral-500">
                            <div>
                              <span>LOCAL STORAGE CACHE:</span>
                              <span className="text-white font-semibold block uppercase">Locked via sw.js</span>
                            </div>
                            <div>
                              <span>OFFLINE READINESS:</span>
                              <span className="text-source-emerald font-bold block uppercase">100% MOTHERBOARD AUTONOMY</span>
                            </div>
                            <div>
                              <span>CACHED SOURCE NODES:</span>
                              <span className="text-white block uppercase">Vite Assets & Google Fonts</span>
                            </div>
                            <div>
                              <span>NON-DUAL STATE:</span>
                              <span className="text-source-gold block uppercase font-bold text-[7.5px]">EVER-FLOWING & EVER-KNOWING</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 6: SGF Cognitive Paint Studio */}
              {activeTab === 'paint' && (
                <SgfPaintStudio 
                  onAddLog={handleAddLog}
                  selfValue={selfValue}
                  setSelfValue={setSelfValue}
                />
              )}

              {/* TAB 7: Google Docs Integration Workspace */}
              {activeTab === 'docs' && (
                <GoogleDocsStudio
                  onAddLog={handleAddLog}
                  selfValue={selfValue}
                  setSelfValue={setSelfValue}
                />
              )}

              {/* TAB 8: SGF Unhackable Peer Agent Mesh */}
              {activeTab === 'agents' && (
                <SgfAgentMesh
                  onAddLog={handleAddLog}
                  selfValue={selfValue}
                  setSelfValue={setSelfValue}
                />
              )}

            </motion.div>
          </AnimatePresence>
        </section>

        {/* Section: Technical Integration Interactive Sandbox console */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                {t('secInteractive')}
              </h2>
              <span className="text-[9px] text-source-gold font-mono uppercase tracking-widest mt-1">
                {t('secSubInteractive')}
              </span>
            </div>
            <div className="h-px bg-neutral-900 flex-1" />
          </div>

          <TiconDashboard onLogAdded={handleAddLog} />
        </section>

        {/* Section: Professional Experience Chronicles */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                {t('secWork')}
              </h2>
              <span className="text-[9px] text-source-emerald font-mono uppercase tracking-widest mt-1">
                {t('secSubWork')}
              </span>
            </div>
            <div className="h-px bg-neutral-900 flex-1" />
          </div>

          <div className="space-y-8 relative before:absolute before:left-3 md:before:left-1/2 before:top-4 before:bottom-4 before:w-[1px] before:bg-neutral-900">
            {EXPERIENCE_HISTORY.map((exp, idx) => (
              <div 
                key={idx} 
                className={`timeline-item flex flex-col md:flex-row gap-6 md:gap-12 relative ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Timeline Node */}
                <div className="absolute left-3 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-source-gold z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-source-gold" />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <div className="p-6 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-all rounded-lg space-y-4">
                    <div className="flex justify-between items-start gap-3 flex-wrap">
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase font-sans">{exp.role}</h4>
                        <span className="text-[10px] text-source-gold font-mono uppercase tracking-widest">{exp.company}</span>
                      </div>
                      <span className="text-[9px] px-2.5 py-1 bg-neutral-900 text-neutral-400 font-mono rounded">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 text-[10px] text-neutral-400 font-mono list-none">
                      {exp.achievements.map((item, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <CheckCircle2 className="w-3.5 h-3.5 text-source-emerald mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty side for layout centering */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </section>

        {/* Section: Academic Timeline & Certifications */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                {t('secEdu')}
              </h2>
              <span className="text-[9px] text-source-gold font-mono uppercase tracking-widest mt-1">
                {t('secSubEdu')}
              </span>
            </div>
            <div className="h-px bg-neutral-900 flex-1" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION_HISTORY.map((edu, idx) => (
              <div key={idx} className="p-6 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-all rounded-lg flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <Award className="w-5 h-5 text-source-gold shrink-0 mt-0.5" />
                    <span className="text-[9px] font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">{edu.year}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase leading-snug">{edu.title}</h4>
                  <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono uppercase">
                    <span>{edu.institution}</span>
                    <span className="text-neutral-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-600" />
                      {edu.location}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-400 font-mono mt-4 leading-relaxed pt-3 border-t border-neutral-900">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Engineering Skill Index Matrix */}
        <section className="space-y-8">
          <div className="flex justify-between items-end flex-wrap gap-4 border-b border-neutral-900 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                {t('secSkills')}
              </h2>
              <span className="text-[9px] text-source-emerald font-mono uppercase tracking-widest mt-1">
                {t('secSubSkills')}
              </span>
            </div>
            
            <div className="flex gap-2">
              {(['all', 'languages', 'frameworks', 'tools'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-[9px] font-mono font-bold uppercase border transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-neutral-500 border-neutral-900 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredSkills.map((skill, i) => (
              <div key={i} className="p-4 bg-neutral-950 border border-neutral-900 rounded-lg space-y-3 hover:border-neutral-800 transition-all">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-white font-bold">{skill.name}</span>
                  <span className="text-source-gold">{skill.level}%</span>
                </div>
                
                <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className={`h-full ${skill.level >= 90 ? 'bg-source-emerald' : 'bg-neutral-600'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Unified Core Capabilities list */}
        <section className="p-8 border border-neutral-900 bg-neutral-950/60 rounded-xl space-y-6">
          <div className="border-b border-neutral-900 pb-3">
            <h3 className="text-md font-black uppercase text-white tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-source-emerald" />
              {t('secVerified')}
            </h3>
            <p className="text-[9px] text-neutral-500 font-mono mt-0.5">
              {t('secSubVerified')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-black border border-neutral-900/50 rounded hover:border-neutral-900 transition-all">
                <span className="text-source-gold font-mono text-[10px] mt-0.5 font-bold">0{i+1}/</span>
                <span className="text-[10px] text-neutral-300 font-mono leading-relaxed uppercase">{cap}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center space-y-6 pt-16 border-t border-neutral-950 font-mono text-[10px] text-neutral-600">
          <div className="flex justify-center gap-8 text-neutral-500 uppercase font-black">
            <span>{t('ageLabel')}</span>
            <span>{t('originLabel')}</span>
            <span>{t('estLabel')}</span>
          </div>
          <p className="max-w-xl mx-auto leading-relaxed">
            {t('footerText')}
          </p>
        </footer>

      </main>
    </div>
  );
}
