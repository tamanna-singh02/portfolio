"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { DATA } from "@/lib/data";

const OrbCanvas = dynamic(() => import("./OrbCanvas"), { ssr: false });
const Hero3DImage = dynamic(() => import("./Hero3DImage"), { ssr: false });
const SkillsRadar = dynamic(() => import("./SkillsRadar"), { ssr: false });
const GitHubStats = dynamic(() => import("./GitHubStats"), { ssr: false });
const Terminal = dynamic(() => import("./Terminal"), { ssr: false });
const ProjectCard = dynamic(() => import("./ProjectCard"), { ssr: false });
const ContactForm = dynamic(() => import("./ContactForm"), { ssr: false });

function useTyping(titles: string[], speed = 60) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    const current = titles[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
      } else {
        timer = setTimeout(() => setPhase("deleting"), 2000);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), speed / 2);
      } else {
        setIdx((i) => (i + 1) % titles.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, idx, titles, speed]);

  return text;
}

function animateCounter(el: HTMLElement, target: number, suffix: string, decimal: boolean) {
  const start = performance.now();
  const duration = 1800;
  const update = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (decimal ? (eased * target).toFixed(1) : Math.floor(eased * target)) + suffix;
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

export default function Portfolio() {
  const typedTitle = useTyping(DATA.titles, 60);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Restore saved theme on mount
  useEffect(() => {
    const saved = (localStorage.getItem("portfolio-theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
  }

  // Animated background grid
  useEffect(() => {
    const canvas = document.getElementById("grid-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, t = 0, raf: number;
    const CELL = 60;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const isLight = document.documentElement.dataset.theme === "light";
      const lineColor = isLight ? "rgba(2,120,164,0.08)" : "rgba(0,200,255,0.12)";
      const dotColor = isLight ? "rgba(2,120,164," : "rgba(0,200,255,";
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke();
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke();
      }
      for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
          const wave = Math.sin(t * 0.02 + x * 0.3 + y * 0.2);
          if (wave > 0.85) {
            const alpha = (wave - 0.85) * 6 * (isLight ? 0.4 : 0.6);
            ctx.fillStyle = `${dotColor}${alpha})`;
            ctx.beginPath(); ctx.arc(x * CELL, y * CELL, 2, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // Custom cursor (dark mode only)
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    if (!cursor || !ring) return;
    let mx = -100, my = -100, rx = -100, ry = -100, raf: number;
    let isHovered = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    function renderCursor() {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;

      cursor!.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${isHovered ? 2 : 1})`;
      ring!.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

      raf = requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const onEnter = () => {
      isHovered = true;
      ring.style.width = "56px";
      ring.style.height = "56px";
    };
    const onLeave = () => {
      isHovered = false;
      ring.style.width = "36px";
      ring.style.height = "36px";
    };
    const els = document.querySelectorAll("a, button, .project-card, .skill-tag, .btn-primary, .btn-secondary");
    els.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  // Floating particles
  useEffect(() => {
    document.querySelectorAll(".particle").forEach((p) => p.remove());
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const delay = -Math.random() * dur;
      const drift = (Math.random() - 0.5) * 200;
      const colors = ["rgba(0,200,255,0.6)", "rgba(147,51,234,0.5)", "rgba(0,255,157,0.4)"];
      p.style.cssText = `width:${size}px;height:${size}px;left:${x}%;background:${colors[Math.floor(Math.random()*3)]};--drift:${drift}px;animation-duration:${dur}s;animation-delay:${delay}s;`;
      document.body.appendChild(p);
    }
    return () => document.querySelectorAll(".particle").forEach((p) => p.remove());
  }, []);

  // Reveal on scroll — uses MutationObserver so dynamic imports are covered
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    function observeNew() {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => io.observe(el));
    }
    observeNew();
    const mo = new MutationObserver(observeNew);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  // Animated stat counters
  useEffect(() => {
    if (statsTriggered) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsTriggered(true);
          DATA.stats.forEach((s, i) => {
            if (statRefs.current[i]) animateCounter(statRefs.current[i]!, s.value, s.suffix, !!s.decimal);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    const el = document.getElementById("stats-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [statsTriggered]);

  const NAV_ITEMS = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "journey", label: "Journey" },
    { id: "achievements", label: "Achievements" },
    { id: "projects", label: "Projects" },
    { id: "github-stats", label: "GitHub" },
    { id: "terminal-section", label: "Terminal" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
      <canvas id="grid-canvas" />
      <div className="scanlines" />

      {/* NAV */}
      <nav>
        <div className="nav-logo">TS<span>.</span>dev</div>
        <ul className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setMobileMenuOpen(false)}>
                {label}
              </a>
            </li>
          ))}
          <li className="desktop-theme-li">
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle light/dark mode">
              {theme === "dark" ? "☀" : "◑"}
            </button>
          </li>
        </ul>

        <div className="mobile-nav-controls">
          <button className="theme-toggle mobile-theme-btn" onClick={toggleTheme} title="Toggle light/dark mode">
            {theme === "dark" ? "☀" : "◑"}
          </button>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-content">
          <div className="hero-tag">Available for AI Engineer roles</div>
          <h1 className="hero-name">
            <span className="first">{DATA.name.first}<br /></span>
            <span className="last">{DATA.name.last}</span>
          </h1>
          <div className="hero-title">
            {typedTitle}<span className="cursor-blink" />
          </div>
          <p className="hero-desc" dangerouslySetInnerHTML={{ __html: DATA.summary }} />
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">View Projects ↓</a>
            <a href="#contact" className="btn-secondary">Get In Touch →</a>
          </div>
        </div>
        <div className="hero-orb"><OrbCanvas /></div>
        <div className="hero-media-container">
          <Hero3DImage />
        </div>
      </section>

      {/* STATS */}
      <section id="stats-section" className="stats-section-container">
        <div className="hero-stats reveal">
          {DATA.stats.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value" ref={(el) => { statRefs.current[i] = el; }}>
                {s.decimal ? s.value.toFixed(1) : s.value}{s.suffix}
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-header reveal">
          <div className="section-tag">Capabilities</div>
          <h2 className="section-title">Tech <em>Stack</em></h2>
        </div>
        <div className="skills-main-layout">
          <div className="skills-grid reveal">
            {DATA.skills.map((cat, i) => (
              <div key={i} className="skill-card">
                <div className="skill-card-title"><span>{cat.icon}</span> {cat.category}</div>
                <div className="skill-tags">
                  {cat.tags.map((tag, j) => (
                    <span key={j} className="skill-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="reveal skills-radar-container">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Skill Coverage
            </div>
            <SkillsRadar />
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey">
        <div className="section-header reveal">
          <div className="section-tag">Timeline</div>
          <h2 className="section-title">My <em>Journey</em></h2>
          <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "12px", marginTop: "12px", letterSpacing: "0.05em" }}>
            # school → university → professional
          </p>
        </div>
        <div className="journey-timeline">
          {DATA.journey.map((item, i) => (
            <div key={i} className={`journey-item ${item.side} reveal`}>
              {item.side === "left" ? (
                <>
                  <div className="journey-card">
                    <div className="journey-header-row left">
                      <div className={`journey-type-tag ${item.type}`}>
                        {item.type === "work" ? "◉ Work" : item.type === "education" ? "◈ University" : "◎ School"}
                      </div>
                      {item.current && <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--green)", animation: "pulse-border 2s infinite" }}>● Current</span>}
                    </div>
                    <div className="journey-period">{item.period}</div>
                    <div className="journey-title">{item.title}</div>
                    <div className="journey-org">{item.org}</div>
                    {item.grade && <div className="journey-grade" style={{ color: item.gradeColor ?? undefined }}>{item.grade}</div>}
                    {item.bullets.length > 0 && (
                      <ul className="journey-bullets">
                        {item.bullets.map((b, j) => <li key={j}><span className="journey-bullet-dot">▸</span><span>{b}</span></li>)}
                      </ul>
                    )}
                  </div>
                  <div className="journey-connector"><div className={`journey-node ${item.type}`}>{item.icon}</div></div>
                  <div className="journey-spacer" />
                </>
              ) : (
                <>
                  <div className="journey-spacer" />
                  <div className="journey-connector"><div className={`journey-node ${item.type}`}>{item.icon}</div></div>
                  <div className="journey-card">
                    <div className="journey-header-row right">
                      <div className={`journey-type-tag ${item.type}`}>
                        {item.type === "work" ? "◉ Work" : item.type === "education" ? "◈ University" : "◎ School"}
                      </div>
                      {item.current && <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--green)", animation: "pulse-border 2s infinite" }}>● Current</span>}
                    </div>
                    <div className="journey-period">{item.period}</div>
                    <div className="journey-title">{item.title}</div>
                    <div className="journey-org">{item.org}</div>
                    {item.grade && <div className="journey-grade" style={{ color: item.gradeColor ?? undefined }}>{item.grade}</div>}
                    {item.bullets.length > 0 && (
                      <ul className="journey-bullets">
                        {item.bullets.map((b, j) => <li key={j}><span className="journey-bullet-dot">▸</span><span>{b}</span></li>)}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements">
        <div className="section-header reveal">
          <div className="section-tag">Recognition</div>
          <h2 className="section-title">Achievements & <em>Certifications</em></h2>
        </div>
        <div className="achievements-grid">
          {DATA.achievements.map((a, i) => (
            <div
              key={i}
              className="achievement-card reveal"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
                e.currentTarget.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
              }}
            >
              <div className={`achievement-icon ${a.type}`}>{a.icon}</div>
              <div className="achievement-badge">{a.year}</div>
              <div className="achievement-title">{a.title}</div>
              <div className="achievement-org">{a.org}</div>
              <div className="achievement-desc">{a.desc}</div>
              {a.leet && (
                <div className="leet-stats">
                  <div className="leet-stat"><span className="leet-num easy">{a.leet.easy}</span><span className="leet-label">Easy</span></div>
                  <div className="leet-stat"><span className="leet-num medium">{a.leet.medium}</span><span className="leet-label">Medium</span></div>
                  <div className="leet-stat"><span className="leet-num hard">{a.leet.hard}</span><span className="leet-label">Hard</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-header reveal">
          <div className="section-tag">Building</div>
          <h2 className="section-title">Active <em>Projects</em></h2>
        </div>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "12px", marginBottom: "32px", letterSpacing: "0.05em" }}>
          # Click &quot;Deep Dive&quot; on any project to see architecture, implementation details &amp; engineering challenges
        </p>
        <div className="projects-grid">
          {DATA.projects.map((proj, i) => <ProjectCard key={i} proj={proj} />)}
        </div>
      </section>

      {/* GITHUB STATS */}
      <section id="github-stats">
        <div className="section-header reveal">
          <div className="section-tag">Open Source</div>
          <h2 className="section-title">GitHub <em>Activity</em></h2>
        </div>
        <GitHubStats />
      </section>

      {/* TERMINAL */}
      <section id="terminal-section">
        <div className="section-header reveal">
          <div className="section-tag">Interactive</div>
          <h2 className="section-title">Live <em>Terminal</em></h2>
        </div>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "13px", marginBottom: "32px" }}>
          # Try commands: help, about, skills, projects, contact, leetcode, clear
        </p>
        <div className="reveal"><Terminal /></div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div className="about-text reveal">
            <div className="section-header">
              <div className="section-tag">About</div>
              <h2 className="section-title">Who I <em>Am</em></h2>
            </div>
            <p>I&apos;m a <strong>Full-stack developer transitioning into AI Engineering</strong>, currently at KocharTech in Amritsar. I build production-grade intelligent systems that bridge software engineering and AI.</p>
            <p>My recent work involves <strong>RAG pipelines, LangGraph agents, and LLM integrations</strong> — tools that help engineers work smarter. I care deeply about system design, clean architecture, and shipping things that work at scale.</p>
            <p>When I&apos;m not building, I&apos;m grinding <strong>LeetCode</strong> or reading the latest AI research.</p>
          </div>
          <div className="about-metrics reveal">
            {[
              { num: "1+", desc: "Year Production Experience" },
              { num: "3", desc: "AI Projects Active" },
              { num: "2", desc: "Hackathons Participated" },
              { num: "9.0", desc: "CGPA — CS Engineering" },
            ].map((m, i) => (
              <div key={i} className="metric-card">
                <div className="metric-num">{m.num}</div>
                <div className="metric-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="reveal">
          <div className="section-tag" style={{ justifyContent: "center" }}>Let&apos;s connect</div>
          <h2 className="contact-title">Ready to <span>Build</span> Together?</h2>
          <p className="contact-desc">I&apos;m actively looking for AI Engineer / LLM Application roles. Let&apos;s build intelligent systems end-to-end.</p>
          <ContactForm />
          <div className="contact-links">
            <a href={`mailto:${DATA.contact.email}`} className="contact-link">✉ Email</a>
            <a href={`tel:${DATA.contact.phone}`} className="contact-link">📱 {DATA.contact.phone}</a>
            <a href={`https://github.com/${DATA.contact.github}`} target="_blank" rel="noopener noreferrer" className="contact-link">⌥ GitHub</a>
            <a href={`https://linkedin.com/in/${DATA.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-link">◈ LinkedIn</a>
            <span className="contact-link" style={{ cursor: "default" }}>📍 {DATA.contact.location}</span>
          </div>
        </div>
      </section>

      <footer>
        <span className="footer-text">© 2026 Tamanna Singh — AI Engineer & Full-Stack Developer</span>
        <span className="footer-text" style={{ color: "var(--cyan)" }}>Built with ♥ + code</span>
      </footer>
    </>
  );
}
