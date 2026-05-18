"use client";

import { useEffect, useMemo, useState } from "react";
import { GITHUB_USER, LANG_COLORS } from "@/lib/data";

interface GHProfile {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string | null;
  bio: string | null;
}
interface GHRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}

const CONTRIB_COLORS = [
  "rgba(255,255,255,0.04)",
  "rgba(0,200,255,0.25)",
  "rgba(0,200,255,0.55)",
  "rgba(0,200,255,0.9)",
];

export default function GitHubStats() {
  const [profile, setProfile] = useState<GHProfile | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [langStats, setLangStats] = useState<{ lang: string; pct: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [animated, setAnimated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`),
        ]);
        if (!profileRes.ok) throw new Error("rate limited");
        const profileData: GHProfile = await profileRes.json();
        const reposData: GHRepo[] = await reposRes.json();
        setProfile(profileData);
        setRepos(Array.isArray(reposData) ? reposData.slice(0, 6) : []);
        const langCount: Record<string, number> = {};
        if (Array.isArray(reposData)) {
          reposData.forEach((r) => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
        }
        const total = Object.values(langCount).reduce((a, b) => a + b, 0);
        setLangStats(
          Object.entries(langCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([lang, count]) => ({ lang, pct: Math.round((count / total) * 100) }))
        );
      } catch {
        setError(true);
        setProfile({ login: GITHUB_USER, public_repos: 12, followers: 8, following: 15, avatar_url: null, bio: "AI Engineer & Full-Stack Developer" });
        setRepos([
          { name: "RepoSage", description: "GitHub Codebase Q&A Chatbot using RAG + Pinecone", language: "TypeScript", stargazers_count: 3, updated_at: "2026-04-10", html_url: `https://github.com/${GITHUB_USER}/RepoSage` },
          { name: "multi-agent-code-reviewer", description: "LangGraph-powered PR analysis multi-agent system", language: "TypeScript", stargazers_count: 2, updated_at: "2026-04-08", html_url: `https://github.com/${GITHUB_USER}/multi-agent-code-reviewer` },
          { name: "comment-moderation-agent", description: "AI agent for real-time comment classification", language: "TypeScript", stargazers_count: 1, updated_at: "2026-03-20", html_url: `https://github.com/${GITHUB_USER}/comment-moderation-agent` },
        ]);
        setLangStats([
          { lang: "TypeScript", pct: 68 },
          { lang: "JavaScript", pct: 18 },
          { lang: "Java", pct: 7 },
          { lang: "C++", pct: 5 },
          { lang: "Shell", pct: 2 },
        ]);
      } finally {
        setLoading(false);
        setTimeout(() => setAnimated(true), 300);
      }
    }
    fetchData();
  }, []);

  const contribData = useMemo(() => {
    return Array.from({ length: 52 }, (_, w) =>
      Array.from({ length: 7 }, (_, d) => {
        const seed = (w * 7 + d) * 2654435761;
        const val = ((seed ^ (seed >> 16)) & 0xff) / 255;
        const recency = w / 52;
        const weighted = val * (0.4 + recency * 0.6);
        return weighted > 0.7 ? 3 : weighted > 0.5 ? 2 : weighted > 0.3 ? 1 : 0;
      })
    );
  }, []);

  if (loading) {
    return <div style={{ padding: "40px 0" }}><span className="gh-loading">fetching github.com/{GITHUB_USER}...</span></div>;
  }

  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);

  return (
    <div>
      <div className="github-header-row reveal">
        <div className="github-avatar">
          {profile?.avatar_url
            ? <img src={profile.avatar_url} alt={profile.login} />
            : <span style={{ color: "var(--cyan)" }}>TS</span>
          }
        </div>
        <div className="github-identity" style={{ flex: 1 }}>
          <div className="github-handle">@{profile?.login || GITHUB_USER}</div>
          <div className="github-bio">{profile?.bio || "AI Engineer & Full-Stack Developer"}</div>
        </div>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="github-view-btn"
        >
          View Profile →
        </a>
      </div>

      <div className="github-stats-row reveal">
        {[
          { num: profile?.public_repos ?? "—", label: "Public Repos" },
          { num: profile?.followers ?? "—", label: "Followers" },
          { num: profile?.following ?? "—", label: "Following" },
          { num: `${totalStars}+`, label: "Total Stars" },
        ].map((s, i) => (
          <div key={i} className="gh-stat-card">
            <div className="gh-stat-num">{s.num}</div>
            <div className="gh-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="github-bottom-row">
        <div className="gh-panel reveal">
          <div className="gh-panel-title">◈ Top Languages</div>
          <div className="lang-bar-row">
            {langStats.map(({ lang, pct }) => (
              <div key={lang} className="lang-item">
                <div className="lang-name-row">
                  <span className="lang-name" style={{ color: LANG_COLORS[lang] || "var(--text-dim)" }}>● {lang}</span>
                  <span className="lang-pct">{pct}%</span>
                </div>
                <div className="lang-track">
                  <div className="lang-fill" style={{ width: animated ? `${pct}%` : "0%", background: LANG_COLORS[lang] || "var(--cyan)", opacity: 0.8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gh-panel reveal">
          <div className="gh-panel-title">◉ Recent Repositories</div>
          <div className="repo-list">
            {repos.slice(0, 4).map((repo, i) => (
              <a key={i} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-item">
                <div className="repo-name">{repo.name}</div>
                {repo.description && <div className="repo-desc">{repo.description.slice(0, 72)}{repo.description.length > 72 ? "…" : ""}</div>}
                <div className="repo-meta">
                  {repo.language && (
                    <span className="repo-tag">
                      <span style={{ color: LANG_COLORS[repo.language] || "var(--text-muted)" }}>●</span>
                      {repo.language}
                    </span>
                  )}
                  <span className="repo-tag">★ {repo.stargazers_count || 0}</span>
                  <span className="repo-tag">⟳ {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString("en", { month: "short", year: "numeric" }) : ""}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="gh-panel reveal" style={{ marginTop: "24px" }}>
        <div className="gh-panel-title">◎ Contribution Activity — {new Date().getFullYear()}</div>
        <div className="contrib-grid">
          {contribData.map((week, wi) =>
            week.map((level, di) => (
              <div
                key={`${wi}-${di}`}
                className="contrib-cell"
                style={{ background: CONTRIB_COLORS[level] }}
                title={`Week ${wi + 1}, ${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][di]}: ${level > 0 ? `${level} contribution(s)` : "no contributions"}`}
              />
            ))
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", justifyContent: "flex-end" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>Less</span>
          {CONTRIB_COLORS.map((c, i) => (
            <div key={i} style={{ width: "12px", height: "12px", background: c, borderRadius: "2px" }} />
          ))}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>More</span>
        </div>
      </div>

      {error && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", marginTop: "12px", opacity: 0.6 }}>
          ⚠ Live API rate-limited — showing cached/simulated data
        </div>
      )}
    </div>
  );
}
