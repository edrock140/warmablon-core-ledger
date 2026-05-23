export interface EducationEntry {
  title: string;
  institution: string;
  location: string;
  year: string;
  details: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface SkillItem {
  name: string;
  level: number;
  category: 'languages' | 'frameworks' | 'tools';
  explanation: string;
  pipelineRole: string;
}

export interface AiHistoryMilestone {
  year: string;
  era: string;
  languages: string[];
  description: string;
}

export const PROFILE = {
  name: "Liswaniso Edgar Mulenga",
  origin: "Africa, Zambia",
  location: "Africa, Zambia",
  phone: "+260979159587",
  email: "edgermulenga@gmail.com",
  birthYear: 2001,
  age: 25,
  nrcNumber: "372907/82/1",
  headline: "Lead Systems Architect & Multi-Language Generalist | Driving Next-Gen Scaling Tech",
  tagline: "Engineering resilient, high-integrity future backends, automated pipelines, and hyper-scalable cloud systems.",
  about: "My active focus is directed toward designing tomorrow's robust enterprise systems. I specialize in pure Rust high-concurrency server engines, clean Python schemas, and streamlined serverless Cloud Run deployments. I bridge the gap between emerging business objectives and technical realities with absolute commitments to automated operations, strict code hygiene, and zero-downtime microservices.",
  personalReflection: "Knowing what I know today allows me to bring order out of modern systematic chaos, grounding me as a deliberate and precise thinker. For me, software development is not merely a technical occupation—it is a cognitive mirror that heals and stabilizes my inner self. By learning to structure compiler constraints, eliminate memory leakage, and debug state variables, I simultaneously neutralize internal noise, build absolute focus, and maintain deep personal composure. Development fixes my relationship with ambiguity by proving that any complex, overwhelming problem is resolvable if you decompose it into perfect, compile-safe blocks of logic.",
  pitch: "As an architect, I construct clean, predictable, and resilient digital architectures, translating high-level system requirements into highly efficient backend execution loops. I view the development pipeline as a fully synchronized organism where multi-language subsystems work in absolute coordination to deliver high-performance scalability. I approach every project with the rigorous standards of a continuous integrator: testing assumptions under load, securing raw endpoints, and building for zero downtime."
};

export const EDUCATION_HISTORY: EducationEntry[] = [
  {
    title: "Next-Gen Distributed Storage Research (ASI Limits)",
    institution: "Emerging Systems R&D",
    location: "Global Distributed Nodes",
    year: "Roadmap Objective",
    details: "Architecting high-frequency consensus algorithms and lock-free storage engines in pure Rust. Exploring transactional safety boundaries at hyper-scale under extreme pressure conditions to prevent write delays or lockouts."
  },
  {
    title: "Deep-Level Neural Compilers & Native Code Execution",
    institution: "Advanced Intelligence Systems",
    location: "Zambian Tech Node Hub",
    year: "Future Pipeline Horizon",
    details: "Formulating compile-safe AST translations that bridge natural instructions with robust native assemblies, optimizing active execution speeds by eliminating typical translation wrapper layers."
  },
  {
    title: "Advanced Cloud Native Kernel Diagnostics",
    institution: "Open-Source Foundation",
    location: "Decoupled Container Groups",
    year: "Active Development Focus",
    details: "Designing real-time diagnostics monitoring agents inside Cloud Run containers, capturing live memory leaks and optimizing garbage disposal loops before service degradation occurs."
  },
  {
    title: "Zambian Digital Sovereignty Infrastructure Design",
    institution: "African Tech Frontiers",
    location: "Lusaka, Zambia",
    year: "Ongoing Strategic Vector",
    details: "Dedicating deep technical planning toward local decentralized data pipelines that strengthen regional security indices and accelerate local startup compute performance."
  }
];

export const EXPERIENCE_HISTORY: ExperienceEntry[] = [
  {
    role: "Target: High-Throughput Global Platforms",
    company: "Continuous Scaling Integrator",
    period: "Next Rolling Horizon",
    achievements: [
      "Planning deployment strategies for serverless microservices aimed at supporting high traffic volumes with zero network dropouts.",
      "Engineering robust asynchronous data routing layers in pure Rust to handle real-time streaming queries with latency lower than 2ms.",
      "Designing immutable Docker container definitions to ensure safe hot-swap updates on active staging groups without system blips."
    ]
  },
  {
    role: "Target: Autonomous Multi-Agent Integration",
    company: "AI-Native Business Orchestrations",
    period: "Emerging Developmental Stage",
    achievements: [
      "Integrating the modern Google GenAI SDK to drive fully autonomous, self-correcting backend cron jobs and systems health loops.",
      "Structuring clean JSON response schemas via strict API boundaries to assure type-safe execution loops.",
      "Designing safe, authenticated sandboxed execution environments for models to run database updates without security risks."
    ]
  },
  {
    role: "Target: Next-Gen Distributed Database Normalizations",
    company: "Highly Available Relational Matrices",
    period: "Upcoming Optimization Phase",
    achievements: [
      "Optimizing transactional record ledgers to scale across multiple geo-distributed database nodes smoothly.",
      "Configuring zero-downtime replication channels to prevent read-write bottlenecks during heavy database traffic peaks.",
      "Developing automated diagnostic log trackers that flag and isolate transaction delays immediately."
    ]
  }
];

export const TECHNICAL_SKILLS: SkillItem[] = [
  // Languages
  { 
    name: "Rust", 
    level: 90, 
    category: "languages",
    explanation: "Rust provides memory safety without garbage collection, ensuring high-speed threading and crash-free runtime performance.",
    pipelineRole: "Core Performance Layer: Governs CPU-bound multi-threaded mathematical routines and low-level task processing queues safely."
  },
  { 
    name: "Python", 
    level: 95, 
    category: "languages",
    explanation: "Python delivers unparalleled developer velocity for machine learning pipelines, script automation, and AI orchestrations.",
    pipelineRole: "Intelligence & Data Layer: Drives the Gemini API integrations, system testing suites, and complex automation workflows."
  },
  { 
    name: "TypeScript", 
    level: 92, 
    category: "languages",
    explanation: "TypeScript brings static typing to JavaScript, locking down interface boundaries, making frontends rigid and self-documenting.",
    pipelineRole: "Interface & API Proxy Layer: Handles user interface rendering, React states, and secure server-to-client JSON serialization."
  },
  { 
    name: "Go", 
    level: 85, 
    category: "languages",
    explanation: "Go offers lightweight concurrency via goroutines, built-in network libraries, and rapid compilation for cloud microservices.",
    pipelineRole: "Networking & Dispatching Layer: Deploys small, high-concurrency API routers and lightweight state message brokers."
  },
  { 
    name: "C++", 
    level: 80, 
    category: "languages",
    explanation: "C++ permits absolute control over physical system memory layout and fine-tuned access to underlying processor registers.",
    pipelineRole: "Legacy & Driver Layer: Executes localized native compilation tasks and low-level device configuration controls."
  },
  { 
    name: "Kotlin", 
    level: 75, 
    category: "languages",
    explanation: "Kotlin improves Java development on JVM runtimes, providing clean safety guarantees and concise functional expressions.",
    pipelineRole: "Mobile Interface Layer: Connects mobile interfaces safely and integrates local client caches cleanly."
  },
  { 
    name: "Bash Scripting", 
    level: 90, 
    category: "languages",
    explanation: "Bash automates localized Linux terminal manipulation, cron jobs, user directory mappings, and deployment scripts.",
    pipelineRole: "System Coordination Layer: Orchestrates our Docker builds, file structures, and dev-server launch activities."
  },

  // Frameworks
  {
    name: "React / Vite",
    level: 92,
    category: "frameworks",
    explanation: "A high-performance web component ecosystem powered by the lightning-fast Vite build tool that enables instant hot reloading and clean single-page app compilations.",
    pipelineRole: "Frontend Asset Pipeline: Consumes backend REST API metrics and visualizes them cleanly in structured user interfaces with fluid animations."
  },
  {
    name: "Express.js",
    level: 90,
    category: "frameworks",
    explanation: "A minimalist HTTP server framework for Node.js that enables simple, un-opinionated routing, middleware attachment, and request parsing.",
    pipelineRole: "API Gateway Layer: Proxies incoming client requests, manages headers safely, and routes logic towards deep computing subsystems."
  },
  {
    name: "FastAPI",
    level: 95,
    category: "frameworks",
    explanation: "A modern, high-velocity web framework built specifically for Python 3.8+ utilizing Pydantic types for auto-documenting OpenAPI endpoints and high async performance.",
    pipelineRole: "AI Service Delivery: Bridges language translation scripts, data model processing, and asynchronous Gemini logic blocks safely."
  },
  {
    name: "Tokio (Rust)",
    level: 88,
    category: "frameworks",
    explanation: "An event-driven, non-blocking I/O platform for writing asynchronous applications in Rust, delivering multi-threaded scheduler and timer services at bare-metal speeds.",
    pipelineRole: "Parallel Execution Loop: Handles high-concurrency client socket streaming, fast database interactions, and localized CPU task coordination."
  },
  {
    name: "Tailwind CSS",
    level: 95,
    category: "frameworks",
    explanation: "A utility-first CSS framework designed to inject styles directly inside HTML structures, securing beautiful, lightweight layouts without cluttered separate style sheets.",
    pipelineRole: "Unified UI/UX Skin: Assures absolute response density across mobile and desktop displays with custom high-contrast palettes."
  },

  // Tools
  {
    name: "Docker",
    level: 90,
    category: "tools",
    explanation: "Binds application code, dependencies, and system utilities into a light, standardized snapshot container that compiles and boots consistently on any machine.",
    pipelineRole: "Immutable Packaging: Wraps our backend databases and node servers inside sandbox containers to prevent 'works on my machine' errors."
  },
  {
    name: "Google Cloud (Cloud Run)",
    level: 85,
    category: "tools",
    explanation: "A fully managed serverless compute engine that deploys and scales containerized applications dynamically based on incoming traffic loads, guaranteeing uptime.",
    pipelineRole: "Production Runtime Host: Runs the compiled applications securely in isolated container groups with zero hardware management."
  },
  {
    name: "MongoDB",
    level: 88,
    category: "tools",
    explanation: "A flexible, document-oriented database that stores structured records natively as JSON collections, enabling high-speed index lookups and horizontal scalability.",
    pipelineRole: "Unstructured Data Broker: Caches real-time session records, user profile metrics, and chronological logs without rigid schema locks."
  },
  {
    name: "PostgreSQL",
    level: 88,
    category: "tools",
    explanation: "A robust, open-source object-relational database engine executing structured SQL queries with absolute reliability, transaction safety, and structural indexing.",
    pipelineRole: "Transactional Record Ledger: Safeguards critical user entities, system access details, and core reference structures with strict relation bounds."
  },
  {
    name: "Git / GitHub Actions",
    level: 92,
    category: "tools",
    explanation: "Distributed revision manager coupled with robust script automations that trigger automated tests and builds upon every single code change.",
    pipelineRole: "Strategic Release Automation: Conducts the test suite executions, checks script syntax via linters, and prepares release builds on push."
  },
  {
    name: "Linux Systems Support",
    level: 95,
    category: "tools",
    explanation: "In-depth understanding of Linux kernel mechanics, file system layouts, security privileges, service daemons, and shell system metrics.",
    pipelineRole: "Host System Foundation: Manages raw system threads, diagnostic pipelines, process priorities, and monitors storage hardware health."
  }
];

export const AI_HISTORY: AiHistoryMilestone[] = [
  {
    year: "2017",
    era: "The Foundational Core (Python & TensorFlow 1.x)",
    languages: ["Python", "C++"],
    description: "In 2017, machine learning revolved around static compute graphs, explicit session declarations, and raw mathematical engines. Python acted as the orchestrator to high-performance C++ runtimes. This era was characterized by manual gradient tracking and raw tensor operations, forming the baseline requirements for developer competence."
  },
  {
    year: "2019",
    era: "Eager Execution & Transformer Emergence",
    languages: ["Python", "C++", "Bash"],
    description: "Google introduced dynamic eager execution with TensorFlow 2.x, lowering the barrier to entry while transformer models began shifting NLP pipelines. The ecosystem started migrating from basic regression and feedforward networks towards complex sequence-to-sequence neural layers, calling for much tighter cloud pipeline integration."
  },
  {
    year: "2021",
    era: "Large Language Models & Cloud API Paradigms",
    languages: ["Python", "TypeScript", "Go"],
    description: "Large-scale neural processors transitioned from raw weights in storage into queryable Cloud API endpoints. Google's early generative models emerged, introducing prompt engineering and JSON-centric API handshakes as valid developer inputs. Multi-language web applications started relying on Node.js and Go microservices to proxy heavy model evaluations safely."
  },
  {
    year: "2023",
    era: "PaLM & Google AI MakerSuite Accessibility",
    languages: ["Python", "TypeScript", "Bash"],
    description: "The launch of PaLM APIs and the initial MakerSuite UI simplified agent prototyping. Developers could now execute lightweight prompt pipelines, build prototype system prompts, and configure simple external function utilities. Real-time applications combined vector databases with text parsers to implement foundational Retrieval-Augmented Generation (RAG)."
  },
  {
    year: "2024 - 2026",
    era: "Gemini Evolution & Multi-Modal Agentic Systems",
    languages: ["TypeScript", "Python", "Go", "Rust"],
    description: "The pinnacle development era: Gemini 1.5, 2.0, and 2.5 models introducing massive 1,000,000+ context windows, native tool execution, and high-frequency multimodal input handling. Developers no longer build static text pipelines—we build fully agentic systems. Using the modern @google/genai SDK, we construct autonomous loops, structured schemas with exact JSON schemas, real-time audio threads, and live web-grounded agents, integrating models directly as live analytical partners."
  }
];

export const CAPABILITIES = [
  "High-Performance System Design & Micro-services",
  "Automated Secure CI/CD Developer Pipelines",
  "Generative LLM (Gemini SDK) Flows Integration",
  "Containerized Docker Deployments & Orchestration",
  "Database Scheme Normalization & Connection Optimization",
  "Asynchronous Concurrency & Thread Coordination"
];

export const SYSTEM_LOG_TEMPLATES = [
  "SECURE KERNEL: CPU states optimized and aligned for runtime pipelines.",
  "DOCKER DAEMON: Secure container initialization checked.",
  "COMPLIANCE: Handshake security certificates verified.",
  "SYSTEM INDEX: Local memory pools locked.",
  "GRID VALUE: Professional engineering value synchronized.",
  "PIPELINE: Continuous integration systems reporting GREEN."
];
