"use client";

import { useRef, useState } from "react";

interface DeepDive {
  arch: string;
  details: { label: string; value: string }[];
  challenges: string[];
}

interface Project {
  name: string;
  subtitle: string;
  stack: string[];
  bullets: string[];
  deepDive: DeepDive;
}

export default function ProjectCard({ proj }: { proj: Project }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !open;
    setOpen(next);
    if (next) {
      setTimeout(() => {
        if (cardRef.current) {
          const y = cardRef.current.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + "%");
    e.currentTarget.style.setProperty("--my", ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + "%");
  }

  return (
    <div ref={cardRef} className={`project-card reveal${open ? " open" : ""}`} onMouseMove={onMouseMove}>
      {/* Left: main info */}
      <div className="project-main-content">
        <div className="project-status">● In Progress</div>
        <div className="project-title">{proj.name}</div>
        <div className="project-subtitle">{proj.subtitle}</div>

        <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
          {proj.bullets.map((b, j) => (
            <li key={j} style={{ display: "flex", gap: "8px", fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.65 }}>
              <span style={{ color: "var(--cyan)", flexShrink: 0, marginTop: "3px" }}>▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Deep dive toggle button */}
        <button className="expand-btn" onClick={toggle} type="button" style={{ marginTop: "24px", width: "auto", paddingLeft: "24px", paddingRight: "24px" }}>
          <span>{open ? "Collapse Deep Dive" : "Deep Dive"}</span>
          <span style={{ display: "inline-block", transition: "transform 0.35s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
        </button>
      </div>

      {/* Right: tech stack */}
      <div className="project-side">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "4px" }}>
          Stack
        </div>
        <div className="project-tech">
          {proj.stack.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}
        </div>
      </div>

      {/* Expanded deep dive — spans full width */}
      {open && (
        <div className="project-deep-dive-expanded" style={{
          borderTop: "1px solid var(--border)",
          marginTop: "28px",
          paddingTop: "28px",
          animation: "fadeSlideIn 0.35s ease forwards",
        }}>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--cyan)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "12px" }}>
              ◈ Architecture
            </div>
            <div className="arch-diagram">{proj.deepDive.arch}</div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--cyan)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "12px" }}>
              ◉ Implementation Details
            </div>
            <div className="deep-dive-grid">
              {proj.deepDive.details.map((d, i) => (
                <div key={i} className="deep-dive-item">
                  <div className="deep-dive-label">{d.label}</div>
                  <div className="deep-dive-value">{d.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--violet)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "12px" }}>
              ⚡ Engineering Challenges
            </div>
            <div className="challenge-list">
              {proj.deepDive.challenges.map((c, i) => (
                <div key={i} className="challenge-item">{c}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
