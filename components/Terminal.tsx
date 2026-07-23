"use client";

import { useEffect, useRef, useState } from "react";

type Line = { type: "output" | "accent" | "green" | "comment" | "prompt"; text: string };

const COMMANDS: Record<string, () => Line[] | "__clear__"> = {
  help: () => [
    { type: "output", text: "Available commands:" },
    { type: "accent", text: "  about       → Summary of Tamanna" },
    { type: "accent", text: "  skills      → Tech stack overview" },
    { type: "accent", text: "  projects    → Current projects" },
    { type: "accent", text: "  contact     → Get in touch" },
    { type: "accent", text: "  leetcode    → LeetCode stats" },
    { type: "accent", text: "  clear       → Clear terminal" },
  ],
  about: () => [
    { type: "output", text: "Tamanna Singh — Software Development Engineer 1 (SDE-1)" },
    { type: "output", text: "Location: Gurgaon, India" },
    { type: "output", text: "Company:  KocharTech (SDE-1)" },
    { type: "green", text: "Focus:    Building full-stack & backend systems end-to-end with AI integrations." },
  ],
  skills: () => [
    { type: "output", text: "Core stack:" },
    { type: "accent", text: "  AI:      RAG | LangGraph | LangChain | VectorDBs | OpenAI | Gemini" },
    { type: "accent", text: "  Backend: NestJS | Node.js | Next.js | React | PostgreSQL | Redis | Prisma" },
    { type: "accent", text: "  Tools:   Docker | AWS | Kubernetes | CI/CD | Jenkins" },
    { type: "green", text: "Languages: Python • TypeScript • JavaScript • Java • SQL" },
  ],
  projects: () => [
    { type: "output", text: "1. RepoSage — GitHub Q&A Chatbot (RAG + Pinecone)" },
    { type: "output", text: "2. PingWatch — Uptime Monitor & Status SaaS (BullMQ + Redis)" },
    { type: "output", text: "3. Multi-Agent Code Reviewer (LangGraph + OpenAI)" },
    { type: "output", text: "4. AI Research Agent (LangGraph + Tavily + ArXiv)" },
    { type: "output", text: "5. Human Approval Gate Agent (LangGraph + HITL + Interrupts)" },
    { type: "green", text: "Status: All in active development / production." },
  ],
  contact: () => [
    { type: "output", text: "Phone:    +91-8542877005" },
    { type: "output", text: "Email:    tamanna.singh1002@gmail.com" },
    { type: "output", text: "Location: Gurgaon, India" },
    { type: "output", text: "GitHub:   tamanna-singh02" },
    { type: "output", text: "LinkedIn: tamanna-singh1002" },
  ],
  leetcode: () => [
    { type: "output", text: "LeetCode: tamanna_singh02" },
    { type: "green", text: "300+ problems solved" },
    { type: "accent", text: "Domains: Arrays, Trees, DP, Graphs, System Design" },
  ],
  clear: () => "__clear__",
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "comment", text: '# Welcome to Tamanna\'s terminal. Type "help" to begin.' },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll output to bottom whenever lines change
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  function handleCmd(cmd: string) {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [...lines, { type: "prompt", text: cmd }];
    if (!trimmed) { setLines(newLines); return; }

    const fn = COMMANDS[trimmed];
    if (!fn) {
      newLines.push({ type: "output", text: `Command not found: "${trimmed}". Type "help".` });
    } else {
      const result = fn();
      if (result === "__clear__") { setLines([]); return; }
      (result as Line[]).forEach((r) => newLines.push(r));
    }
    newLines.push({ type: "output", text: "" });
    setLines(newLines);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleCmd(input);
      setInput("");
    }
  }

  // Click anywhere in the terminal → focus the input
  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <div className="terminal-wrapper">
      <div className="terminal-window" onClick={focusInput}>
        {/* Title bar */}
        <div className="terminal-bar">
          <div className="terminal-dot td-red" />
          <div className="terminal-dot td-yellow" />
          <div className="terminal-dot td-green" />
          <span className="terminal-title">tamanna@portfolio:~$ — bash</span>
        </div>

        {/* Scrollable output — input is NOT in here */}
        <div ref={outputRef} className="terminal-body" style={{ height: "480px", overflowY: "auto" }}>
          {lines.map((line, i) => (
            <div key={i}>
              {line.type === "prompt" && (
                <span>
                  <span className="t-prompt">➜ tamanna </span>
                  <span className="t-cmd">{line.text}</span>
                </span>
              )}
              {line.type === "output" && <span className="t-output">{line.text || " "}</span>}
              {line.type === "accent" && <span className="t-accent">{line.text}</span>}
              {line.type === "green" && <span className="t-green">{line.text}</span>}
              {line.type === "comment" && <span className="t-comment">{line.text}</span>}
            </div>
          ))}
        </div>

        {/* Input row — always visible at bottom, outside the scrollable area */}
        <div
          className="terminal-input-row"
          style={{ borderTop: "1px solid var(--border)", padding: "14px 20px" }}
        >
          <span className="t-prompt">➜ tamanna&nbsp;</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="type a command and press Enter..."
          />
        </div>
      </div>
    </div>
  );
}
