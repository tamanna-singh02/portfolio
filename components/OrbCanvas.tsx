"use client";

import { useEffect, useRef } from "react";

export default function OrbCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = (canvas.width = 600);
    const H = (canvas.height = 600);
    const cx = W / 2, cy = H / 2;
    let t = 0;
    let raf: number;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (let r = 0; r < 5; r++) {
        const radius = 200 + r * 18 + Math.sin(t * 0.02 + r) * 6;
        const alpha = 0.04 - r * 0.006;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,200,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const orbits = [
        { r: 180, speed: 0.008, n: 6, color: "0,200,255", size: 3 },
        { r: 220, speed: -0.005, n: 4, color: "255,45,120", size: 2 },
        { r: 150, speed: 0.012, n: 8, color: "0,255,157", size: 2 },
      ];

      orbits.forEach((orbit) => {
        for (let i = 0; i < orbit.n; i++) {
          const angle = (i / orbit.n) * Math.PI * 2 + t * orbit.speed;
          const x = cx + orbit.r * Math.cos(angle);
          const y = cy + orbit.r * Math.sin(angle) * 0.4;
          const alpha = 0.3 + 0.7 * ((Math.sin(angle) + 1) / 2);
          ctx.beginPath();
          ctx.arc(x, y, orbit.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${orbit.color},${alpha})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${orbit.color},0.8)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      const grad = ctx.createRadialGradient(cx - 40, cy - 40, 20, cx, cy, 120);
      grad.addColorStop(0, "rgba(0,200,255,0.15)");
      grad.addColorStop(0.5, "rgba(255,45,120,0.08)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      const nodes = 12;
      for (let i = 0; i < nodes; i++) {
        const angle1 = (i / nodes) * Math.PI * 2 + t * 0.003;
        const x1 = cx + 90 * Math.cos(angle1);
        const y1 = cy + 90 * Math.sin(angle1) * 0.6;
        for (let j = i + 1; j < nodes; j += 3) {
          const angle2 = (j / nodes) * Math.PI * 2 + t * 0.003;
          const x2 = cx + 90 * Math.cos(angle2);
          const y2 = cy + 90 * Math.sin(angle2) * 0.6;
          const pulse = Math.sin(t * 0.05 + i + j);
          if (pulse > 0.3) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(0,200,255,${(pulse - 0.3) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      t++;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} style={{ opacity: 0.85 }} />;
}
