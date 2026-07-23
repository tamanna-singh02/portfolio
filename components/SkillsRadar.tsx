"use client";

import { useEffect, useState } from "react";

const labels = ["AI/ML", "Backend", "Frontend", "Databases", "DevOps", "Algorithms"];
const values = [0.9, 0.88, 0.75, 0.82, 0.78, 0.8];
const cx = 160, cy = 160, R = 120;
const gridLevels = [0.25, 0.5, 0.75, 1.0];

function polar(i: number, r: number): [number, number] {
  const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

export default function SkillsRadar() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  const dataPath =
    values
      .map((v, i) => {
        const [x, y] = polar(i, v * R);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ") + "Z";

  return (
    <svg width="100%" height="auto" viewBox="0 0 320 320" style={{ maxWidth: "320px", display: "block" }}>
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={labels.map((_, i) => polar(i, level * R).join(",")).join(" ")}
          fill="none"
          stroke="rgba(0,200,255,0.12)"
          strokeWidth="1"
        />
      ))}
      {labels.map((_, i) => {
        const [x, y] = polar(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(0,200,255,0.15)" strokeWidth="1" />;
      })}
      <path
        d={dataPath}
        fill="rgba(0,200,255,0.12)"
        stroke="rgba(0,200,255,0.7)"
        strokeWidth="2"
        style={{
          strokeDasharray: animated ? undefined : "1000",
          strokeDashoffset: animated ? 0 : 1000,
          transition: "stroke-dashoffset 1.5s ease",
        }}
      />
      {values.map((v, i) => {
        const [x, y] = polar(i, v * R);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            fill="var(--cyan)"
            style={{ filter: "drop-shadow(0 0 6px rgba(0,200,255,0.8))" }}
          />
        );
      })}
      {labels.map((label, i) => {
        const [x, y] = polar(i, R + 24);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(122,147,176,0.9)"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
