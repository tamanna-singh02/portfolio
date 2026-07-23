# Tamanna Singh — Portfolio Details & Resume

This document contains a comprehensive breakdown of all the professional experience, skills, projects, achievements, and contact information extracted from the portfolio. You can use this content to populate a new portfolio or resume.

---

## 1. Personal & Contact Information

* **Name:** Tamanna Singh
* **Email:** [tamanna.singh1002@gmail.com](mailto:tamanna.singh1002@gmail.com)
* **Phone:** +91-8542877005
* **Location:** Gurgaon, India
* **GitHub User:** [tamanna-singh02](https://github.com/tamanna-singh02)
* **LinkedIn:** [tamanna-singh1002](https://linkedin.com/in/tamanna-singh1002)

---

## 2. Professional Summary

> Software Development Engineer (SDE-1) building full-stack and backend systems end-to-end with **NestJS, TypeScript, Node.js**, and **Next.js**. Built AI document generation pipeline cutting manual effort by **70%**, WebSocket analytics dashboard lifting sales visibility by **15%**, and optimized DB performance by **20%**.

* **Titles & Roles:**
  * AI Engineer
  * Full-Stack Developer
  * LLM Application Builder
  * RAG Pipeline Architect
  * NestJS + TypeScript Expert

---

## 3. Key Statistics

| Metric | Value | Description |
| :--- | :--- | :--- |
| **LeetCode Problems** | 298 | Solved across core DS & Algo |
| **Docs Effort Reduced** | 70% | Through AI document generation pipelines |
| **DB Performance Gain** | 20% | Optimization of database queries |
| **University Score** | 9.0 CGPA | Chitkara University BE CSE score |

---

## 4. Technical Skills

### AI / ML (◈)
* Large Language Models (LLMs)
* Retrieval-Augmented Generation (RAG)
* LangGraph
* LangChain
* Vector Databases (Pinecone, pgvector)
* Embeddings
* Prompt Engineering
* OpenAI API
* Gemini API
* Machine Learning

### Backend & Full-Stack (◉)
* NestJS
* Node.js
* Next.js
* React
* REST API Development
* Microservices
* WebSockets
* Docker
* AWS
* PostgreSQL
* Redis
* Prisma

### Languages (◐)
* Python
* JavaScript
* TypeScript
* Java
* SQL

### Tools & Practices (◎)
* Git / Version Control
* Docker
* Kubernetes
* Jenkins
* Postman
* CI/CD
* Agile / Scrum

---

## 5. Professional Journey & Education

### Experience

#### **Software Development Engineer 1 (SDE-1)** @ KocharTech
*Gurgaon / Amritsar, India | Sept 2025 – Present*
* **Key Achievements & Responsibilities:**
  * Built an AI doc generation pipeline, reducing manual team documentation effort by **70%**.
  * Architected core backend services using **NestJS, TypeScript**, and **Docker**.
  * Optimized **Prisma + PostgreSQL + Redis** stack for high-traffic endpoints.

#### **SDE Intern** @ KocharTech
*Amritsar, India | Sept 2024 – Aug 2025*
* **Key Achievements & Responsibilities:**
  * Created a real-time analytics dashboard via **WebSockets**, leading to a **+15%** improvement in sales visibility.
  * Developed secure **RESTful APIs** with JWT authentication and granular authorization.
  * Improved database query performance by **20%** and integrated **Jest** test suites into the CI/CD pipeline.

---

### Education

#### **B.E. Computer Science & Engineering** @ Chitkara University
*Rajpura, Punjab | 2021 – 2025*
* **Grade:** 9.0 CGPA
* **Key Focus & Highlights:**
  * Specialized in algorithms, system design, and distributed systems.
  * Selected as a Top 10 Finalist at the **All India Smart Hackathon**.
  * Solved **298** problems on LeetCode across core DS & Algo.

#### **Class XII — CBSE** @ The Aditya Birla Public School
*Renukoot, UP | 2019 – 2020*
* **Grade:** 91%

---

## 6. Projects (Detailed Deep-Dives)

### Project 1: RepoSage
* **Subtitle:** GitHub Codebase Q&A Chatbot
* **Status:** Completed
* **Tech Stack:** NestJS, TypeScript, Gemini, Pinecone, RAG
* **Core Highlights:**
  * Engineered a RAG pipeline that ingests any GitHub repo, chunks files using language-aware boundaries, and stores embeddings in Pinecone for semantic retrieval.
  * Developed multi-turn conversation memory retaining codebase context across sessions without re-indexing.
  * Implemented hybrid search (dense + sparse retrieval) and cross-encoder re-ranking for improved answer precision on complex queries.

#### Technical Architecture
```text
  GitHub Repo URL
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
        └─ Conversation memory (session-scoped context)
```

#### Engineering Details
* **Chunking Strategy:** Language-aware boundaries (functions, classes, modules) rather than arbitrary token windows.
* **Retrieval:** Hybrid dense (Gemini embeddings) + sparse (BM25) with cross-encoder re-ranking.
* **Memory:** Session-scoped conversation context stored in-memory; no re-indexing between turns.
* **Auth:** GitHub OAuth for private repo access; streaming LLM responses to the UI.

#### Challenges & Solutions
* **Handling Monorepos with 50k+ Files:** Solved by progressive ingestion with smart file-type filtering.
* **Embeddings Staleness:** Kept embeddings fresh when the repository changes via incremental diff-based re-ingestion triggered by webhooks.
* **Hallucination Prevention:** Grounded every LLM answer with retrieved code snippets as citations.

---

### Project 2: PingWatch
* **Subtitle:** Uptime Monitor & Status SaaS
* **Status:** In Progress
* **Tech Stack:** Next.js, TypeScript, PostgreSQL, Redis, Docker, BullMQ
* **Core Highlights:**
  * Architected a multi-tenant uptime monitoring SaaS with Dockerized health-check workers consuming BullMQ/Redis job queues, pushing real-time monitor status via Redis pub/sub and Server-Sent Events.
  * Built per-workspace public status pages on Next.js ISR with automated incident creation/resolution on state transitions, delivering Slack, Discord, and webhook alerts through a Redis-backed retry queue with exponential backoff.

#### Technical Architecture
```text
  Monitored Services (HTTP / Ping)
        │
        ▼
  [BullMQ / Redis Queue]  ◄── Multi-tenant job scheduler
        │
        ▼
  [Docker Health Worker]  ── Pushes status via Redis Pub/Sub & SSE
        │
        ├──► [Next.js ISR Status Page] ── Auto incident creation/resolution
        └──► [Alert Engine]          ── Retry queue (Slack/Discord/Webhooks)
```

#### Engineering Details
* **Job Queue:** BullMQ on Redis managing concurrent health-check workers with exponential backoff.
* **Real-time Updates:** Redis Pub/Sub coupled with Server-Sent Events (SSE) for live status streaming.
* **Page Rendering:** Next.js Incremental Static Regeneration (ISR) for high-performance public status pages.
* **Alerting:** Webhook dispatchers with retry queues ensuring zero missed incident notifications.

#### Challenges & Solutions
* **Preventing False Positive Alerts:** Implemented multi-region verification before triggering incident state.
* **Handling High Worker Throughput:** Optimized BullMQ concurrency settings and connection pooling on Redis.
* **Instant Status Updates:** SSE streaming pushes live downtime events to dashboard instantly without heavy polling.

---

### Project 3: Multi-Agent Code Reviewer
* **Subtitle:** LangGraph-Powered PR Analysis
* **Status:** In Progress
* **Tech Stack:** LangGraph, TypeScript, OpenAI, GitHub API, PostgreSQL
* **Core Highlights:**
  * Developed a multi-agent system with specialized agents for security vulnerability detection, performance analysis, style linting, and test coverage gaps.
  * Configured a GitHub webhook triggering the agent pipeline on every PR, posting structured inline review comments on the diff.
  * Designed a stateful agent graph allowing agents to share findings and produce consolidated, severity-ranked review reports.

#### Technical Architecture
```text
  GitHub PR Webhook
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
         [PostgreSQL/Prisma] ──► Per-developer analytics
```

#### Engineering Details
* **Agent Framework:** LangGraph StateGraph — agents share state and pass findings between nodes.
* **Specialization:** 4 domain-specific agents each with tailored system prompts and focused context windows.
* **Output Format:** Structured JSON per finding: severity, line ref, suggestion, confidence score.
* **Analytics:** Prisma + PostgreSQL for persisting review history, enabling per-dev quality trends.

#### Challenges & Solutions
* **Avoiding Redundant Findings:** Agents share a deduplication layer before final aggregation.
* **Handling Large Diffs:** Diff is chunked and routed by file type to keep context within token limits.
* **Reducing False Positives:** Each agent outputs a confidence score; low-confidence findings are surfaced separately.

---

### Project 4: AI Research Agent
* **Subtitle:** Autonomous Multi-Source Research System
* **Status:** Completed
* **Tech Stack:** Python, LangGraph, LangChain, Gemini/Groq, Tavily, ArXiv, Wikipedia, Rich, Pydantic, Loguru
* **Core Highlights:**
  * Built an AI-powered research agent that autonomously decides when to use external tools instead of relying solely on an LLM's internal knowledge.
  * Researches topics via natural language interface, gathering information from multiple trusted sources (Tavily web search, ArXiv academic papers, Wikipedia background knowledge).
  * Generates structured Markdown research reports with automatic export options, execution metrics, and step-by-step logging.

#### Technical Architecture
```text
  User Research Query
        │
        ▼
  [LangGraph Orchestrator]  (StateGraph + ReAct Loop)
        │
        ├──► [Tavily Web Search]  ── Real-time web findings & citations
        ├──► [ArXiv Tool]         ── Academic paper abstracts & metadata
        └──► [Wikipedia Tool]     ── Background context & topic overview
        │
        ▼
  [Report Synthesizer]  (LLM Node)
        │  Pydantic schema validation & Markdown formatting
        ├──► Structured Markdown Report (.md Export)
        └──► Rich Terminal Interface + Loguru Execution Logs
```

#### Engineering Details
* **Orchestration:** LangGraph StateGraph for dynamic tool routing and iterative research loops.
* **Tool Suite:** Integrated Tavily API for search, ArXiv for papers, and Wikipedia for general context.
* **Validation:** Pydantic models ensuring strict output structure for report sections and citations.
* **Observability:** Loguru logging and Rich CLI components tracking execution metrics and tool calls.

#### Challenges & Solutions
* **Preventing Infinite Tool Loops:** Implemented step counter limits and stopping conditions in LangGraph state.
* **Handling Noisy Search Results:** Multi-stage LLM filtering to discard low-credibility sources before report generation.
* **Synthesizing Heterogeneous Data:** Normalizing ArXiv abstracts, Wikipedia summaries, and Tavily snippets into unified Markdown.

---

### Project 5: Human Approval Gate Agent
* **Subtitle:** Human-in-the-Loop AI Execution Agent
* **Status:** Completed
* **Tech Stack:** Python, LangGraph, LangChain, OpenAI/Groq, SQLite, Pydantic
* **Core Highlights:**
  * Built a Human-in-the-Loop (HITL) AI agent that executes real-world actions only after explicit human approval, ensuring reliability, safety, and complete traceability.
  * Converts natural language queries into emails, calendar events, and support tickets with automatic action validation prior to execution.
  * Pauses execution at a human approval checkpoint with Approve / Edit / Reject options, using LangGraph interrupts to resume execution seamlessly even after application restarts.
  * Maintains a complete audit trail of every decision and action for full transparency, accountability, and regulatory compliance.

#### Technical Architecture
```text
  User Request (Natural Language)
        │
        ▼
  [Intent & Action Parser]  (LLM + Pydantic Validation)
        │  Generates structured action payload (email / calendar / ticket)
        ▼
  [Action Validator Node]  ── Schema & security validation
        │
        ▼
  [Human Approval Gate]  (LangGraph Interrupt Checkpoint)
        │  Execution pauses & persists graph state to SQLite checkpointer
        │
        ├──► APPROVE ──► [Tool Execution Node] ──► External API Dispatch
        ├──► EDIT    ──► [State Mutator Node]   ──► Re-validate & Execute
        └──► REJECT  ──► [Audit Log Node]      ──► Log Rejection & Exit
        │
        ▼
  [Audit Log Engine]  ── Persistent SQLite audit trail of all actions & feedback
```

#### Engineering Details
* **Human-in-the-Loop:** LangGraph `interrupt()` halts graph state until human explicitly Approves, Edits, or Rejects.
* **Persistence:** SQLite checkpointer saves full graph state across application restarts and crash recoveries.
* **Action Parsing:** Pydantic models validate email parameters, calendar times, and ticket priorities before approval.
* **Audit Logging:** Immutable SQLite logging captures raw inputs, proposed actions, human feedback, and final outcomes.

#### Challenges & Solutions
* **Persisting Graph State across Restarts:** Configured LangGraph `SqliteSaver` checkpointer for zero data loss during approval waits.
* **Handling Dynamic Human Edits:** Structured state mutator merges user modifications back into Pydantic models before execution.
* **Preventing Unauthorized Action Execution:** Strict gate barrier ensures no external API calls occur prior to state approval.

---

## 7. Certifications & Achievements

* **AI Doc Generation — 70% Efficiency** (KocharTech, 2025)
  * Production AI system that reduced manual documentation effort by 70% across the engineering team.
* **Top 10 Finalist — Smart Hackathon** (All India Smart Hackathon, 2024)
  * Selected in top 10 out of all participating teams nationwide, building a full-stack rapid prototype under a 24–36 hour time constraint.
* **298 LeetCode Problems** (LeetCode, Ongoing)
  * Consistent algorithmic practice across arrays, trees, DP, graphs, and system design problems.
  * *Stats:* Easy: 178, Medium: 113, Hard: 7.
* **Data Structures Certificate** (Coursera, 2023)
  * Completed comprehensive course covering arrays, trees, graphs, dynamic programming, and advanced algorithmic patterns.
* **Big Data-201 Certificate** (Infosys Springboard, 2023)
  * Certified in Big Data fundamentals, distributed processing frameworks, and data pipeline architecture.
