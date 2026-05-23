import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Plus, 
  Search, 
  Trash2, 
  LogOut, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  Database, 
  Lock, 
  User as UserIcon, 
  BookOpen, 
  Code,
  FilePenLine,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { auth, loginWithGoogle, logout, getCachedAccessToken } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface GoogleDocsStudioProps {
  onAddLog: (message: string) => void;
  selfValue: number;
  setSelfValue: React.Dispatch<React.SetStateAction<number>>;
}

interface DocListItem {
  id: string;
  title: string;
  lastUpdated: string;
}

export default function GoogleDocsStudio({ onAddLog, selfValue, setSelfValue }: GoogleDocsStudioProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // New Doc Form
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocPreset, setNewDocPreset] = useState<'srs' | 'schema' | 'resonator'>('srs');
  const [generatedDocId, setGeneratedDocId] = useState<string | null>(null);

  // Read Doc
  const [searchDocId, setSearchDocId] = useState('');
  const [activeDocTitle, setActiveDocTitle] = useState('');
  const [activeDocContent, setActiveDocContent] = useState('');

  // Append Notes
  const [appendNoteText, setAppendNoteText] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Track state of OAuth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      const cachedToken = getCachedAccessToken();
      setToken(cachedToken);
      if (firebaseUser) {
        onAddLog(`OAUTH_STATUS: Session resumed for ${firebaseUser.email || 'authenticated user'}.`);
      }
    });
    return () => unsubscribe();
  }, [onAddLog]);

  const handleSignIn = async () => {
    setLoading(true);
    onAddLog('OAUTH_TRIGGER: Dispatching Google Auth popup request with Google Docs scopes...');
    try {
      const result = await loginWithGoogle();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        onAddLog(`OAUTH_SUCCESS: Authenticated ${result.user.displayName || 'Developer'}. Token loaded in memory.`);
        setSelfValue(prev => prev + 1240.50); // Resonance reward
      }
    } catch (error) {
      console.error(error);
      onAddLog('OAUTH_ERROR: Google Docs authorization handshake aborted by client or network rejection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setGeneratedDocId(null);
      setActiveDocTitle('');
      setActiveDocContent('');
      onAddLog('OAUTH_SHUTDOWN: Purged active credentials and access tokens from localized cache.');
    } catch (err) {
      console.error(err);
    }
  };

  // Google Docs API calls
  const handleCreateDoc = async () => {
    const curToken = token || getCachedAccessToken();
    if (!curToken) {
      onAddLog('WRITE_FAILURE: Unauthorized transaction. Clear credentials and sign-in with Google.');
      return;
    }

    if (!newDocTitle.trim()) {
      onAddLog('VALIDATION_FAILURE: Please provide a distinct title for the new SGF Blueprint Document.');
      return;
    }

    setActionLoading(true);
    // Add logs
    onAddLog(`DOCS_TRANS: Initializing Google Document construction: "${newDocTitle}"`);
    
    try {
      // 1. Create the blank document with the title
      const createResponse = await fetch('https://docs.googleapis.com/v1/documents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${curToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newDocTitle })
      });

      if (!createResponse.ok) {
        throw new Error(`Google API returned status ${createResponse.status}: ${createResponse.statusText}`);
      }

      const docObj = await createResponse.json();
      const documentId = docObj.documentId;
      setGeneratedDocId(documentId);
      setSearchDocId(documentId); // Autofill read search bar
      onAddLog(`DOCS_READY: Secure document container instantiated. Document ID: ${documentId}.`);

      // 2. Synthesize SGF Architectural outline depending on the chosen template via Gemini Omni agent proxy
      onAddLog(`OMNI_AI: Requesting Gemini Omni Agent server proxy to synthesize structure body...`);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `
            You are Liswaniso Edgar Mulenga, acting as the Gemini Omni Agent in the backplane.
            Synthesize a highly professional, visionary outline for a document named "${newDocTitle}" 
            under the outline preset style of "${newDocPreset.toUpperCase()}".
            
            Deliver ONLY the markdown content blocks cleanly. Use uppercase section titles. Build real-world configurations, not placeholders.
            Structure:
            1. COGNITIVE SGF SPECIFICATION HEADERS (Reference frequency 963.00Hz, Self-Value Index of $${selfValue.toFixed(2)})
            2. ARCHITECTURAL TOPOLOGY
            3. CRITICAL IMPLEMENTATION SCHEMA (Include actual Rust/Python/MongoDB structures or classes matching this scope)
            4. SYSTEM INTEGRATION LOGS
            
            Keep the content strictly technical, extremely polished, and tailored to architectural excellence. Avoid intro fluff or greetings.
          `
        })
      });

      if (!response.ok) {
        throw new Error('Gemini Omni agent fails to proxy architectural payload.');
      }

      const bodyData = await response.json();
      const rawText = bodyData.reply || `SGF Architecture Specification for ${newDocTitle}.\nInitialized 963Hz.`;

      // 3. Write structured body content using Docs BatchUpdate API
      onAddLog(`DOCS_SYNC: BatchUpdating file contents of Document ID ${documentId} on Google servers...`);
      const updateResponse = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${curToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [
            {
              insertText: {
                text: `${rawText}\n\nDocument synthesized autonomously on the SGF Spectrum.\n`,
                endOfSegmentLocation: {}
              }
            }
          ]
        })
      });

      if (!updateResponse.ok) {
        throw new Error(`Docs BatchUpdate failure. Code: ${updateResponse.status}`);
      }

      onAddLog(`SGF_SYNTHESIS: Complete. Fully functional digital blueprint deployed to Google Docs.`);
      setSelfValue(prev => prev + 2480.99); // Reward successful direct sync
      
      // Auto-fetch doc contents to display in viewport
      fetchDocDetails(documentId);
    } catch (error: any) {
      console.error(error);
      onAddLog(`DOCS_ERROR: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setActionLoading(false);
    }
  };

  const fetchDocDetails = async (docIdToFetch?: string) => {
    const curToken = token || getCachedAccessToken();
    const id = docIdToFetch || searchDocId;

    if (!curToken) {
      onAddLog('FETCH_FAILURE: Access token unallocated in memory.');
      return;
    }

    if (!id.trim()) {
      onAddLog('VALIDATION_FAILURE: Please specify a valid Google Document ID or URL.');
      return;
    }

    // Extract document ID if complete Google Doc URL was supplied
    let parsedId = id.trim();
    const urlPattern = /\/d\/([a-zA-Z0-0-_]+)/;
    const match = parsedId.match(urlPattern);
    if (match && match[1]) {
      parsedId = match[1];
    }

    setLoading(true);
    setActiveDocContent('');
    setActiveDocTitle('');
    onAddLog(`DOCS_RETRIEVE: Accessing https://docs.googleapis.com/v1/documents/${parsedId}`);

    try {
      const res = await fetch(`https://docs.googleapis.com/v1/documents/${parsedId}`, {
        headers: { 'Authorization': `Bearer ${curToken}` }
      });

      if (!res.ok) {
        throw new Error(`Google API returned status ${res.status}. Check if Document exists and scopes are trusted.`);
      }

      const docData = await res.json();
      setActiveDocTitle(docData.title);
      
      // Parse beautiful layout text representation out of structural elements
      let parsedContent = '';
      if (docData.body && docData.body.content) {
        docData.body.content.forEach((elem: any) => {
          if (elem.paragraph && elem.paragraph.elements) {
            elem.paragraph.elements.forEach((sub: any) => {
              if (sub.textRun && sub.textRun.content) {
                parsedContent += sub.textRun.content;
              }
            });
          }
        });
      }

      setActiveDocContent(parsedContent || 'Document contains no readable structural text.');
      onAddLog(`DOCS_SUCCESS: Successfully parsed structural contents of "${docData.title}". Layout loaded fully.`);
    } catch (err: any) {
      console.error(err);
      onAddLog(`FETCH_ERROR: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAppendNote = async () => {
    const curToken = token || getCachedAccessToken();
    const id = searchDocId;

    if (!curToken) return;
    if (!appendNoteText.trim()) {
      onAddLog('VALIDATION_FAILURE: Update payload notes cannot be blank.');
      return;
    }

    let parsedId = id.trim();
    const urlPattern = /\/d\/([a-zA-Z0-0-_]+)/;
    const match = parsedId.match(urlPattern);
    if (match && match[1]) {
      parsedId = match[1];
    }

    setActionLoading(true);
    onAddLog(`DOCS_UPDATE: Appending customized telemetry notes back to Document ${parsedId}...`);

    try {
      const formattedAppend = `\n\n--- SGF MANUAL UPDATE WORKSPACE ---\n[TIMESTAMP: ${new Date().toISOString()}]\n${appendNoteText}\n`;
      const updateResponse = await fetch(`https://docs.googleapis.com/v1/documents/${parsedId}:batchUpdate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${curToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [
            {
              insertText: {
                text: formattedAppend,
                endOfSegmentLocation: {}
              }
            }
          ]
        })
      });

      if (!updateResponse.ok) {
        throw new Error(`BatchUpdate failed. StatusCode: ${updateResponse.status}`);
      }

      onAddLog(`UPDATE_SUCCESS: Telecom segments written successfully. Reloading view.`);
      setAppendNoteText('');
      setShowConfirmModal(false);
      setSelfValue(prev => prev + 480.00); // Reward active updates

      // Reload document content
      fetchDocDetails(parsedId);
    } catch (error: any) {
      console.error(error);
      onAddLog(`UPDATE_ERROR: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Ribbon Header */}
      <div className="border-b border-neutral-900 pb-3 flex justify-between items-start flex-wrap gap-2">
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-source-gold" />
            SGF Document Hub & Workspace Integration
          </h4>
          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
            Directly bridge Google Docs storage APIs with the SGF absolute 963Hz frequency.
          </p>
        </div>
        <span className="text-[8px] bg-source-emerald/10 text-source-emerald border border-source-emerald/20 px-2 py-0.5 font-mono uppercase font-black tracking-widest animate-pulse">
          OAUTH ACTIVE
        </span>
      </div>

      {!user ? (
        /* Sign-in Wall styled matching authentic Google elements and SGF Theme */
        <div className="max-w-md mx-auto text-center py-12 p-8 border border-neutral-900 bg-neutral-950 rounded-xl space-y-6">
          <FileText className="w-12 h-12 text-source-gold mx-auto animate-pulse" />
          <div className="space-y-2">
            <h5 className="text-sm font-black text-white uppercase tracking-widest font-mono">Authenticate Google Workspace</h5>
            <p className="text-[10px] text-neutral-400 font-mono leading-relaxed">
              Unlock direct reading, structured synthesis, writing, and synchronization of documents on your secure Google Drive with Google Docs API, using permissions you authorize.
            </p>
          </div>

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="gsi-material-button w-full flex items-center justify-center gap-2 py-3 bg-neutral-900 hover:bg-neutral-850 hover:border-neutral-700 transition border border-neutral-800 rounded font-mono text-[10px] text-white font-bold"
          >
            {loading ? (
              <span className="animate-spin h-3.5 w-3.5 border border-white border-t-transparent rounded-full" />
            ) : (
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
            )}
            <span className="font-extrabold uppercase tracking-wider">AUTHORIZE GOOGLE DOCS HUB</span>
          </button>
          
          <div className="text-[8px] text-neutral-600 font-mono uppercase tracking-wider">
            SECURE POPUP INTERACTION REQUIRED • TOKENS CACHED IN LOCAL RAM MEMORY ONLY
          </div>
        </div>
      ) : (
        /* Workspace interface when connected */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
          
          {/* Controls column (LHS) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Identity Profile Badge */}
            <div className="bg-neutral-950 border border-neutral-900 rounded p-4 space-y-3">
              <span className="text-[7.5px] text-source-gold block uppercase font-black tracking-widest">AUTHENTICATED IDENTITY:</span>
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-neutral-800" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-source-gold/20 flex items-center justify-center border border-source-gold/40">
                    <UserIcon className="w-4 h-4 text-source-gold" />
                  </div>
                )}
                <div>
                  <h6 className="text-[10px] font-black text-white uppercase">{user.displayName || 'Authorized User'}</h6>
                  <p className="text-[8px] text-neutral-500 truncate max-w-[180px]">{user.email}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-900 flex justify-between items-center">
                <span className="text-[8px] text-source-emerald font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> SECURE CONGRUENCY
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-[8px] text-neutral-400 hover:text-red-400 transition uppercase font-black flex items-center gap-1"
                >
                  <LogOut className="w-3" /> Log Out
                </button>
              </div>
            </div>

            {/* Synthesizer Doc Creator */}
            <div className="bg-neutral-950 border border-neutral-900 rounded p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] text-white font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-source-gold" />
                  Create Blueprint Doc
                </span>
                <span className="text-[7px] text-source-gold font-bold">GEMINI ASSIST</span>
              </div>
              
              <div className="space-y-3 text-[10px]">
                <div>
                  <label className="text-neutral-500 uppercase text-[7.5px] block mb-1">Blueprint Title</label>
                  <input
                    type="text"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="e.g. SGF Consensus Topology"
                    className="w-full bg-black border border-neutral-850 p-2 text-white text-[10.5px] outline-none rounded focus:border-source-gold/40"
                  />
                </div>

                <div>
                  <label className="text-neutral-500 uppercase text-[7.5px] block mb-1">Architecture Outline Preset</label>
                  <select
                    value={newDocPreset}
                    onChange={(e) => setNewDocPreset(e.target.value as any)}
                    className="w-full bg-black border border-neutral-850 p-2 text-white text-[10.5px] outline-none rounded"
                  >
                    <option value="srs">Software Requirement Specs (SRS)</option>
                    <option value="schema">Database Cluster Map (MongoDB)</option>
                    <option value="resonator">Direct Resonance SGF Protocol</option>
                  </select>
                </div>

                <button
                  onClick={handleCreateDoc}
                  disabled={actionLoading || !newDocTitle.trim()}
                  className="w-full py-2 bg-source-gold text-black hover:bg-white font-extrabold uppercase text-[9px] tracking-wider transition rounded disabled:opacity-40"
                >
                  {actionLoading ? 'DEPLOYING TO DRIVE...' : 'SYNTHESIZE GOOGLE DOC'}
                </button>
              </div>
            </div>

            {/* Search Finder */}
            <div className="bg-neutral-950 border border-neutral-900 rounded p-4 space-y-3">
              <span className="text-[8.5px] text-white font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-source-gold" />
                Inspect Existing Document
              </span>
              <p className="text-[8px] text-neutral-500 leading-none mb-1">Enter complete Google Docs URL or a distinct 44-character Document ID:</p>
              
              <div className="space-y-2 text-[10px]">
                <input
                  type="text"
                  value={searchDocId}
                  onChange={(e) => setSearchDocId(e.target.value)}
                  placeholder="Paste URL or ID here..."
                  className="w-full bg-black border border-neutral-850 p-2 text-white text-[9px] outline-none rounded"
                />
                <button
                  onClick={() => fetchDocDetails()}
                  disabled={loading || !searchDocId.trim()}
                  className="w-full py-2 bg-neutral-900 hover:bg-neutral-850 text-white font-bold text-[9px] uppercase transition border border-neutral-800 hover:border-neutral-700 rounded disabled:opacity-40 flex items-center justify-center gap-1"
                >
                  {loading && <RefreshCw className="w-3 animate-spin text-source-gold" /> }
                  {loading ? 'RETRIEVING PAYLOAD...' : 'PULL FROM GOOGLE SERVER'}
                </button>
              </div>
            </div>

          </div>

          {/* Viewport and writing Area (RHS) */}
          <div className="lg:col-span-8 flex flex-col h-full space-y-4">
            
            {/* parchment Editorial Window */}
            <div className="bg-[#050505] border border-neutral-900 rounded-xl p-6 flex-1 flex flex-col justify-between min-h-[400px]">
              
              {/* Header block details */}
              <div className="border-b border-neutral-900 pb-3 mb-4 flex justify-between items-start">
                <div>
                  <span className="text-[7.5px] text-neutral-500 block uppercase font-bold">Active Working Viewport:</span>
                  <h5 className="text-[12px] font-black tracking-widest text-[#FFF] uppercase mt-0.5">
                    {activeDocTitle || 'NO DOCUMENT MOUNTED'}
                  </h5>
                  {generatedDocId && (
                    <span className="text-[7px] text-source-gold block font-bold tracking-wider uppercase mt-1">
                      ACTIVE ID: {generatedDocId}
                    </span>
                  )}
                </div>
                
                {generatedDocId && (
                  <a
                    href={`https://docs.google.com/document/d/${generatedDocId}/edit`}
                    target="_blank"
                    rel="no-referrer"
                    className="text-[8.5px] px-2.5 py-1 bg-source-gold/10 hover:bg-source-gold/20 text-source-gold border border-source-gold/20 rounded font-black transition-all flex items-center gap-1.5"
                  >
                    LAUNCH GOOGLE DOCS VIEW <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Core Content Viewer (Parchment Styled typography) */}
              <div className="flex-1 bg-[#101010] p-4 border border-neutral-950 shadow-inner rounded-lg overflow-y-auto max-h-[350px] mb-4">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-3 py-16 text-center animate-pulse">
                    <RefreshCw className="w-8 h-8 text-source-gold animate-spin" />
                    <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-widest">DECODING FILE CONTENT BLOCKS...</span>
                  </div>
                ) : activeDocContent ? (
                  <pre className="text-[10px] font-serif text-neutral-300 leading-relaxed font-sans whitespace-pre-wrap select-text selection:bg-source-gold/30">
                    <code>{activeDocContent}</code>
                  </pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-24 text-neutral-600 gap-2">
                    <FileText className="w-8 h-8 text-neutral-800" />
                    <p className="text-[9.5px] uppercase font-black tracking-widest">Workspace Viewport Empty</p>
                    <p className="text-[8.5px] max-w-sm font-sans text-neutral-500">Synthesize a new document outline using Gemini Omni, or paste an existing URL / ID in the search block to load your data.</p>
                  </div>
                )}
              </div>

              {/* Append telemetry updates note (requires Confirmation dialog) */}
              {activeDocTitle && (
                <div className="border-t border-neutral-900 pt-3 space-y-3">
                  <div className="flex justify-between items-center text-[8px] text-neutral-500">
                    <span className="uppercase font-bold tracking-wider flex items-center gap-1"><FilePenLine className="w-3 text-source-gold" /> Append Telemetry Update Notes (Google server mutations)</span>
                    <span className="text-source-gold">SGF INTERACTIVE ZONE</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={appendNoteText}
                      onChange={(e) => setAppendNoteText(e.target.value)}
                      placeholder="Write system updates to append at the end of this Google Doc..."
                      className="flex-grow bg-black border border-neutral-850 p-2 text-[10px] outline-none rounded"
                    />
                    <button
                      onClick={() => setShowConfirmModal(true)}
                      disabled={!appendNoteText.trim() || actionLoading}
                      className="px-4 bg-source-emerald text-black font-extrabold text-[9px] uppercase rounded hover:bg-white transition"
                    >
                      APPEND NOTES
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Secure User Consent Confirmation Modal overlay for Mutation */}
          {showConfirmModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
              <div className="bg-neutral-950 border border-neutral-900 rounded-lg p-6 max-w-sm w-full space-y-4">
                <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase text-[10px] tracking-wider">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  MANDATORY SYSTEM CONSENT CONFIRMATION
                </div>
                
                <p className="text-[10px] text-neutral-300 leading-relaxed font-mono">
                  You are about to execute an append update on your Google Drive for the file: <br/>
                  <strong className="text-white">"{activeDocTitle}"</strong>. <br/><br/>
                  Are you sure you want to write these update notes on your personal user resources permanently?
                </p>

                <div className="flex gap-2 font-mono text-[9px]">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white rounded transition text-center uppercase font-black"
                  >
                    CANCEL PROCESS
                  </button>
                  <button
                    onClick={handleAppendNote}
                    className="flex-grow py-2 bg-source-emerald text-black hover:bg-white rounded transition text-center uppercase font-bold"
                  >
                    CONFIRM & WRITE permanently
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
