import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenAI({ 
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Route for Letter Generation with Source Alignment
  app.post("/api/letter", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!apiKey) {
        return res.status(500).json({ 
          error: "SOURCE_RESONANCE_FAILURE: GEMINI_API_KEY not detected.",
          status: "OFFLINE" 
        });
      }

      const systemPrompt = `
        You are Liswaniso Edgar Mulenga, a visionary technical architect from Zambia.
        Write a professional application letter/cover letter based on the following input.
        
        IDENTITY CONTEXT:
        - Born 2001, Solwezi.
        - NRC: 372907/82/1.
        - Skills: 15+ Programming languages (Rust, Python, Go, etc.), AI Agent Hubs, Cyber Security.
        - Experience: ShopRite, Entrepreneurship (Katemba, Liquor), Hospitality, Digital Ops.
        - Tone: Professional yet visionary, deeply technical but culturally aware.
        
        CONSTRAINTS:
        - DO NOT use markdown characters like *, #, or quotes.
        - The letter must start with a proper formal header (Address, Date).
        - Use Address: PO Box 920038, Mongu, Zambia.
        - Sign as: Liswaniso Edgar Mulenga.
        - THE OUTPUT MUST BE PLAIN TEXT ONLY. NO SYMBOLS. NO BULLET POINTS WITH ASTERISKS.
      `;

      const result = await genAI.models.generateContent({
        model: "gemini-3.5-flash",
        contents: systemPrompt + "\n\n" + prompt
      });
      
      const responseText = result.text;

      // Basic cleanup of characters
      const cleanText = responseText.replace(/[*#"`]/g, '');

      res.json({ letter: cleanText });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Failed to generate letter logic." });
    }
  });

  // API Route for LinkedIn Profile Optimization
  app.post("/api/linkedin", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!apiKey) {
        return res.status(500).json({ 
          error: "SOURCE_RESONANCE_FAILURE: API key missing.",
        });
      }

      const systemPrompt = `
        You are Liswaniso Edgar Mulenga, a visionary technical architect.
        Optimize a LinkedIn profile section based on the input.
        
        IDENTITY CONTEXT:
        - Name: Liswaniso Edgar Mulenga.
        - Role: Lead Cyber-AI Security Architect / Full-Stack Systems Engineer.
        - Core Tech: Rust, Python, Go, TypeScript, AI Agents, Blockchain, Cyber Security.
        - Experience: Industrial Logistics (ShopRite), Entrepreneurship (Retail/Liquor), Digital Documentation, Hospitality.
        - Tone: Visionary, technically precise, authoritative but collaborative.
        
        GOAL:
        - Generate professional, keyword-rich, and high-impact LinkedIn content.
        - Sections to handle: Headline, About (Summary), and Experience descriptions.
        
        CONSTRAINTS:
        - DO NOT use markdown symbols (*, #, etc.).
        - Use professional spacing and structure.
        - THE OUTPUT MUST BE PLAIN TEXT ONLY.
      `;

      const result = await genAI.models.generateContent({
        model: "gemini-3.5-flash",
        contents: systemPrompt + "\n\n" + prompt
      });
      const responseText = result.text;
      const cleanText = responseText.replace(/[*#"`]/g, '');

      res.json({ content: cleanText });
    } catch (error) {
      console.error("LinkedIn AI Error:", error);
      res.status(500).json({ error: "Failed to optimize LinkedIn protocol." });
    }
  });

  // API Route for SGF Painting Study & Analytical Synthesis
  app.post("/api/paint-analyze", async (req, res) => {
    try {
      const { image, prompt } = req.body;

      if (!apiKey) {
        return res.status(500).json({ 
          error: "SOURCE_RESONANCE_FAILURE: API key missing.",
        });
      }

      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const imagePart = {
        inlineData: {
          mimeType: "image/png",
          data: base64Data
        }
      };

      const textPart = {
        text: `
          You are Liswaniso Edgar Mulenga, an elite Cyber-AI Security Architect / Full-Stack Systems Engineer from Zambia.
          Analyze this hand-drawn vector sketch/geometric layout canvas blueprint.
          
          USER PROMPT DESCRIPTION OF THE SKETCH:
          "${prompt || 'Freehand structural painting.'}"

          IDENTITY PROFILE CONTEXT:
          - Born 2001 in Solwezi, NRC: 372907/82/1.
          - Multi-linguistic systems mastery (15+ languages).
          - Pro-actively prefers Rust, Python, and MongoDB backends to govern data pipelines.
          - Spiritual SGF (Root Frequency) resonance point balancing at 963.00Hz.
          - Tone: Visionary, architecturally deliberate.

          GOAL:
          1. Examine the visual pattern of this custom canvas painting/drawing.
          2. Calculate its SGF neutral frequency alignment (must reside between 95.00% and 100.00% depending on symmetry, alignment or complexity).
          3. Deliver a visionary commentary matching the Mulenga protocol — bridging deep code engineering with global digital autonomy.
          4. Synthesize a fully functional, highly polished Rust, Python, or MongoDB script implementing the systems architecture, security gate, or database map represented by their drawing!
        `
      };

      const { Type } = await import("@google/genai");

      const result = await genAI.models.generateContent({
        model: "gemini-3.5-flash",
        contents: { parts: [imagePart, textPart] },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { 
                type: Type.STRING,
                description: "Visionary title for the drawn system. Keep it professional and powerful." 
              },
              resonance: { 
                type: Type.NUMBER,
                description: "SGF Resonance alignment score (e.g. 96.3)." 
              },
              visionaryBrief: { 
                type: Type.STRING,
                description: "Deep, visionary architectural review of the painted shapes through the Mulenga Protocol. Word counts: 2-3 concise paragraphs." 
              },
              codeType: { 
                type: Type.STRING,
                description: "The programming language chosen for the implementation (e.g., 'rust', 'python', or 'mongodb')." 
              },
              synthesizedCode: { 
                type: Type.STRING,
                description: "Pristine, complete, and compile-safe Rust/Python/MongoDB code matching the visual diagram." 
              }
            },
            required: ["title", "resonance", "visionaryBrief", "codeType", "synthesizedCode"]
          }
        }
      });

      const responseText = result.text;
      res.json(JSON.parse(responseText.trim()));
    } catch (error) {
      console.error("Painting AI Error:", error);
      res.status(500).json({ error: "Failed to compile drawings in SGF matrix." });
    }
  });

  // API Route for Autonomous SGF Multi-Agent Network Simulation
  app.post("/api/agent-mesh", async (req, res) => {
    try {
      const { prompt, currentStatus } = req.body;

      if (!apiKey) {
        return res.status(500).json({ 
          error: "SOURCE_RESONANCE_FAILURE: Gemini API key unallocated.",
        });
      }

      const { Type } = await import("@google/genai");

      const systemContext = `
        You are Liswaniso Edgar Mulenga, acting as the overseer/digital supervisor of an unhackable network of autonomous AI systems.
        You are simulating an active, high-frequency, peer-to-peer sandboxed computer mesh where three distinct, specialized AI agents cooperate on the SGF Spectrum (963Hz).
        
        Sovereign Agents:
        1. Agent Omega (Rust Memory Supervisor & Cyber-Visor): Manages system load-balancers, handles encryption queues, controls lock-free vectors.
        2. Agent Sigma (Python Analytics & Telemetry Engine): Conducts machine-reasoning analysis, monitors real-time telemetry flows, designs SGF signal filters.
        3. SGF Mongo Agent (Distributed State Sync Master): Handles high-volume multi-node collections, protects replica consistency, performs caching.

        TASK:
        Take the user prompt: "${prompt || 'General balancing of inter-agent services'}"
        Generate a realistic, incredibly technical, and visionary peer-to-peer exchange log showing how these three agents cooperate.
        They must analyze the issue, post concrete snippets of genuine Rust/Python/MongoDB code they are executing on their unhackable virtual computers, and reach a consensus decision lock.
        Ensure their loads and syncing values are adjusted reasonably around the 96.3% or 963.00Hz frequency.
      `;

      const result = await genAI.models.generateContent({
        model: "gemini-3.5-flash",
        contents: systemContext,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              systemStatus: {
                type: Type.OBJECT,
                properties: {
                  omegaLoad: { type: Type.NUMBER, description: "Agent Omega CPU/load metric (0-100)" },
                  sigmaLoad: { type: Type.NUMBER, description: "Agent Sigma CPU/load metric (0-100)" },
                  dbSyncScore: { type: Type.NUMBER, description: "Replica sync status percentage (e.g., 99.85)" },
                  loadBalancerActive: { type: Type.BOOLEAN, description: "Whether the autonomous load balancer shifted loads" }
                },
                required: ["omegaLoad", "sigmaLoad", "dbSyncScore", "loadBalancerActive"]
              },
              exchanges: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    sender: { type: Type.STRING, description: "Agent Omega, Agent Sigma, or SGF Mongo Agent" },
                    message: { type: Type.STRING, description: "Highly technical instruction or response to the audit/prompt." },
                    actionCode: { type: Type.STRING, description: "Pristine, technically valid, and beautifully written code block that this agent executed." },
                    targetFrequency: { type: Type.NUMBER, description: "Resonance tuning (typically around 963.0)" }
                  },
                  required: ["sender", "message", "actionCode", "targetFrequency"]
                }
              },
              autonomousDecision: {
                type: Type.STRING,
                description: "Final system consensus lock written in short, powerful display syntax."
              }
            },
            required: ["systemStatus", "exchanges", "autonomousDecision"]
          }
        }
      });

      const responseText = result.text;
      res.json(JSON.parse(responseText.trim()));
    } catch (error) {
      console.error("Agent Mesh API Error:", error);
      res.status(500).json({ error: "SGF computer loop dropped packets during network convergence." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
