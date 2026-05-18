export const DATA = {
  name: { first: "Tamanna", last: "Singh" },
  titles: [
    "AI Engineer",
    "Full-Stack Developer",
    "LLM Application Builder",
    "RAG Pipeline Architect",
    "NestJS + TypeScript Expert",
  ],
  summary:
    "Full-stack developer with <strong>1+ year of production experience</strong> at KocharTech, transitioning into <strong>AI Engineering</strong>. Built AI-powered systems in production with <strong>RAG pipelines, vector databases</strong>, and <strong>LangGraph agents</strong>.",
  stats: [
    { value: 300, suffix: "+", label: "LeetCode Problems" },
    { value: 70, suffix: "%", label: "Docs Effort Reduced" },
    { value: 20, suffix: "%", label: "DB Performance Gain" },
    { value: 9.0, suffix: " CGPA", label: "University Score", decimal: true },
  ],
  skills: [
    {
      category: "AI / ML",
      icon: "◈",
      type: "ai",
      tags: ["RAG Pipelines", "LangGraph Agents", "OpenAI API", "Gemini LLM", "Pinecone", "pgvector", "Embeddings", "Prompt Engineering", "LLM APIs"],
    },
    {
      category: "Backend & APIs",
      icon: "◉",
      type: "backend",
      tags: ["NestJS", "NodeJS", "ExpressJS", "TypeScript", "REST APIs", "WebSockets", "JWT", "System Design"],
    },
    {
      category: "Databases & ORMs",
      icon: "◆",
      type: "db",
      tags: ["PostgreSQL", "Redis", "MySQL", "MongoDB", "Prisma ORM"],
    },
    {
      category: "Frontend",
      icon: "◇",
      type: "frontend",
      tags: ["ReactJS", "NextJS", "Radix UI", "shadcn", "JavaScript"],
    },
    {
      category: "DevOps & Tools",
      icon: "◎",
      type: "devops",
      tags: ["Docker", "Kubernetes", "Git", "GitHub", "Jenkins", "Postman", "Firebase", "CI/CD"],
    },
    {
      category: "Languages",
      icon: "◐",
      type: "lang",
      tags: ["TypeScript", "JavaScript", "Java", "C++"],
    },
  ],
  journey: [
    {
      side: "left",
      type: "school",
      icon: "◎",
      period: "2019 – 2020",
      title: "Class XII — CBSE",
      org: "The Aditya Birla Public School · Renukoot, UP",
      grade: "91%",
      gradeColor: "var(--cyan)",
      bullets: [] as string[],
    },
    {
      side: "right",
      type: "education",
      icon: "◈",
      period: "2021 – 2025",
      title: "B.E. Computer Science & Engineering",
      org: "Chitkara University · Rajpura, Punjab",
      grade: "9.0 CGPA",
      gradeColor: "var(--violet)",
      bullets: [
        "Specialized in algorithms, system design, and distributed systems.",
        "Active participant in hackathons and coding competitions.",
        "Solved 300+ problems on LeetCode across multiple domains.",
      ],
    },
    {
      side: "left",
      type: "work",
      icon: "◉",
      period: "Sept 2024 – Aug 2025",
      title: "SDE Intern",
      org: "KocharTech · Amritsar, India",
      grade: null,
      gradeColor: null,
      bullets: [
        "Built scalable full-stack app with React, NestJS, PostgreSQL & Redis.",
        "Real-time analytics dashboard via WebSockets — +15% sales visibility.",
        "RESTful APIs with JWT auth; unit tests with Jest in CI/CD pipeline.",
      ],
    },
    {
      side: "right",
      type: "work",
      icon: "◉",
      period: "Sept 2025 – Present",
      title: "Junior Software Developer",
      org: "KocharTech · Amritsar, India",
      grade: null,
      gradeColor: null,
      current: true,
      bullets: [
        "AI-powered document generation system — reduced manual effort by 70%.",
        "Architected core backend services with NestJS + TypeScript at scale.",
        "Optimized Prisma + PostgreSQL + Redis stack for high-traffic endpoints.",
      ],
    },
  ],
  achievements: [
    {
      type: "cert",
      icon: "◈",
      title: "Data Structures Certificate",
      org: "Coursera",
      year: "2023",
      desc: "Completed comprehensive course covering arrays, trees, graphs, dynamic programming, and advanced algorithmic patterns.",
      leet: null,
    },
    {
      type: "cert",
      icon: "◈",
      title: "Big Data-201 Certificate",
      org: "Infosys Springboard",
      year: "2023",
      desc: "Certified in Big Data fundamentals, distributed processing frameworks, and data pipeline architecture.",
      leet: null,
    },
    {
      type: "hack",
      icon: "⚡",
      title: "Tech Hackathons × 2",
      org: "Competitive Programming",
      year: "2023–2024",
      desc: "Participated in 2 inter-college tech hackathons, building rapid prototypes and competing on system design under time pressure.",
      leet: null,
    },
    {
      type: "leet",
      icon: "◆",
      title: "300+ LeetCode Problems",
      org: "LeetCode",
      year: "Ongoing",
      desc: "Consistent algorithmic practice across arrays, trees, DP, graphs, and system design problems.",
      leet: { easy: 120, medium: 145, hard: 35 },
    },
    {
      type: "award",
      icon: "◎",
      title: "AI Doc Generation — 70% Efficiency",
      org: "KocharTech",
      year: "2025",
      desc: "Production AI system that reduced manual documentation effort by 70% across the engineering team.",
      leet: null,
    },
    {
      type: "award",
      icon: "◎",
      title: "Top Academic Performance",
      org: "Chitkara University",
      year: "2025",
      desc: "Graduated with 9.0 CGPA in Computer Science & Engineering — top academic standing throughout the program.",
      leet: null,
    },
  ],
  projects: [
    {
      name: "RepoSage",
      subtitle: "GitHub Codebase Q&A Chatbot",
      stack: ["NestJS", "TypeScript", "Gemini", "Pinecone", "RAG"],
      bullets: [
        "RAG pipeline that ingests any GitHub repo, chunks files using language-aware boundaries, and stores embeddings in Pinecone for semantic retrieval.",
        "Multi-turn conversation memory retaining codebase context across sessions without re-indexing.",
        "Hybrid search (dense + sparse retrieval) + re-ranking for improved answer precision on complex queries.",
      ],
      deepDive: {
        arch: `  GitHub Repo URL
        │
        ▼
  [Ingestion Service]  ──────────────────────────────────────
        │  Clone & walk repo tree                           │
        │  Language-aware chunking                   NestJS Backend
        │  Gemini embeddings                               │
        ▼                                                   │
  [Pinecone VectorDB]  ◄──────────────────────────────────  │
        │  Semantic + BM25 sparse index                    │
        ▼                                                   │
  [Query Pipeline]  ──► Re-ranker ──► LLM (Gemini) ──►  Chat UI
        │                                            (Next.js + syntax hl)
        └─ Conversation memory (session-scoped context)`,
        details: [
          { label: "Chunking Strategy", value: "Language-aware boundaries: functions, classes, modules — not arbitrary token windows." },
          { label: "Retrieval", value: "Hybrid dense (Gemini embeddings) + sparse (BM25) with cross-encoder re-ranking." },
          { label: "Memory", value: "Session-scoped conversation context stored in-memory; no re-indexing between turns." },
          { label: "Auth", value: "GitHub OAuth for private repo access; streaming LLM responses to the UI." },
        ],
        challenges: [
          "Handling monorepos with 50k+ files — progressive ingestion with smart file-type filtering.",
          "Keeping embeddings fresh when repo changes — incremental diff-based re-ingestion on webhook.",
          "Preventing hallucination by grounding every LLM answer with retrieved code snippets as citations.",
        ],
      },
    },
    {
      name: "Multi-Agent Code Reviewer",
      subtitle: "LangGraph-Powered PR Analysis",
      stack: ["LangGraph", "TypeScript", "OpenAI", "GitHub API", "PostgreSQL"],
      bullets: [
        "Multi-agent system with specialized agents for security vulnerability detection, performance analysis, style linting, and test coverage gaps.",
        "GitHub webhook triggering the agent pipeline on every PR, posting structured inline review comments on the diff.",
        "Stateful agent graph allowing agents to share findings and produce consolidated, severity-ranked review reports.",
      ],
      deepDive: {
        arch: `  GitHub PR Webhook
        │
        ▼
  [Orchestrator Agent]  (LangGraph StateGraph)
        │
        ├──► [Security Agent]    ── OWASP checks, injection risks
        ├──► [Performance Agent] ── N+1 queries, complexity analysis
        ├──► [Style Agent]       ── ESLint rules, naming conventions
        └──► [Coverage Agent]    ── Missing test cases, branches
                    │
                    ▼
           [Aggregator Node]
                    │  Severity-ranked findings
                    ▼
        [GitHub API]  ──► Inline PR comments on diff
                    │
                    ▼
        [PostgreSQL/Prisma] ──► Per-developer analytics`,
        details: [
          { label: "Agent Framework", value: "LangGraph StateGraph — agents share state and pass findings between nodes." },
          { label: "Specialization", value: "4 domain-specific agents each with tailored system prompts and focused context windows." },
          { label: "Output Format", value: "Structured JSON per finding: severity, line ref, suggestion, confidence score." },
          { label: "Analytics", value: "Prisma + PostgreSQL for persisting review history, enabling per-dev quality trends." },
        ],
        challenges: [
          "Avoiding redundant findings — agents share a deduplication layer before final aggregation.",
          "Keeping context within token limits for large diffs — diff is chunked and routed by file type.",
          "False positive rate — each agent includes a confidence score; low-confidence findings are surfaced separately.",
        ],
      },
    },
    {
      name: "Comment Moderation AI Agent",
      subtitle: "Real-time Content Classification",
      stack: ["Next.js", "Gemini", "Inngest", "Supabase"],
      bullets: [
        "AI agent using Gemini LLM to classify blog comments for spam, toxicity, and quality with structured JSON output parsing.",
        "Inngest-powered asynchronous event-driven pipeline ensuring scalable, non-blocking performance under high comment volume.",
        "Integrated Supabase for real-time storage and OneSignal for automated push notifications on moderation decisions.",
      ],
      deepDive: {
        arch: `  New Comment Event
        │
        ▼
  [Next.js API Route]
        │  Enqueue moderation task
        ▼
  [Inngest Event Queue]  ──► async, durable, retryable
        │
        ▼
  [Moderation Agent]  (Gemini LLM)
        │  Structured JSON output:
        │  { spam: bool, toxicity: 0-1, quality: 0-1, action: string }
        │
        ├──► APPROVE  ──► Supabase (status = approved)
        ├──► REJECT   ──► Supabase (status = rejected) + notification
        └──► REVIEW   ──► Supabase (status = pending_human)
                              │
                              ▼
                    [OneSignal Push] ──► Moderator notified`,
        details: [
          { label: "LLM Output", value: "Structured JSON schema enforced via Gemini function calling — no regex parsing needed." },
          { label: "Queue", value: "Inngest handles retries, backoff, and fan-out — no manual queue infrastructure." },
          { label: "Storage", value: "Supabase Realtime for live dashboard updates; comments table with RLS policies." },
          { label: "Scale", value: "Non-blocking pipeline handles burst traffic; each event is independently retryable." },
        ],
        challenges: [
          "Structured output consistency — Gemini function calling enforces schema but needs fallback JSON parsing.",
          "Avoiding over-moderation — quality score threshold tuned with labeled dataset of 500+ sample comments.",
          "Real-time moderator UX — Supabase subscriptions push status changes to dashboard without polling.",
        ],
      },
    },
  ],
  contact: {
    email: "tamanna.singh1002@gmail.com",
    github: "tamanna-singh02",
    linkedin: "tamanna-singh1002",
  },
};

export const GITHUB_USER = "tamanna-singh02";

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  Shell: "#89e051",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Go: "#00ADD8",
  Rust: "#dea584",
};
