"use client";

import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

interface CircuitPath {
  points: { x: number; y: number }[];
  pulses: number[];
  speed: number;
}

interface Signal {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export default function OrbCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = 600;
    const H = 600;
    const cx = W / 2, cy = H / 2;
    
    // Set up high DPI canvas resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    let angleY = 0; // Horizontal rotation (Yaw)
    let angleX = 0.15; // Vertical tilt (Pitch)
    let targetAngleY = 0;
    let targetAngleX = 0.15;
    let baseRotationSpeed = 0.003;
    let raf: number;

    // 1. Generate 3D Brain Core Curves
    const brainCurves: Point3D[][] = [];
    const numCurvesPerHemisphere = 12;
    const pointsPerCurve = 35;
    const Rx = 75;
    const Ry = 90;
    const Rz = 115;
    const xOffset = 10;

    for (const Hemi of [-1, 1]) {
      for (let c = 0; c < numCurvesPerHemisphere; c++) {
        // Base longitude for this curve (distributed on the lateral side mostly)
        const phi0 = (c / (numCurvesPerHemisphere - 1)) * Math.PI * 0.85 + (Hemi === -1 ? Math.PI * 0.075 : -Math.PI * 0.925);
        const curve: Point3D[] = [];
        const phase = Math.random() * Math.PI * 2;
        
        for (let p = 0; p < pointsPerCurve; p++) {
          const t = -Math.PI / 2 + (p / (pointsPerCurve - 1)) * Math.PI; // latitude
          
          // Modulate longitude and radius to simulate gyri/sulci (brain folds)
          const phi = phi0 + 0.14 * Math.sin(5 * t + phase) + 0.06 * Math.cos(11 * t);
          const rMod = 1.0 + 0.07 * Math.sin(6 * t + phase) + 0.03 * Math.cos(13 * t);
          
          const xRaw = Rx * rMod * Math.cos(t) * Math.sin(phi);
          const yRaw = Ry * rMod * Math.sin(t);
          const zRaw = Rz * rMod * Math.cos(t) * Math.cos(phi);
          
          // Offset hemispheres laterally
          const x = Hemi * (xOffset + Math.abs(xRaw));
          const y = yRaw;
          const z = zRaw;
          
          // Color gradient based on vertical position t
          const tNorm = (t + Math.PI / 2) / Math.PI;
          let color = "";
          if (Hemi === -1) {
            // Cyan to Indigo/Violet
            const r = Math.floor(0 * (1 - tNorm) + 130 * tNorm);
            const g = Math.floor(200 * (1 - tNorm) + 50 * tNorm);
            const b = Math.floor(255 * (1 - tNorm) + 255 * tNorm);
            color = `${r},${g},${b}`;
          } else {
            // Pink/Magenta to Indigo/Violet
            const r = Math.floor(255 * (1 - tNorm) + 130 * tNorm);
            const g = Math.floor(45 * (1 - tNorm) + 50 * tNorm);
            const b = Math.floor(120 * (1 - tNorm) + 255 * tNorm);
            color = `${r},${g},${b}`;
          }
          
          curve.push({ x, y, z, color, size: 1.0 + Math.random() * 0.8 });
        }
        brainCurves.push(curve);
      }
    }

    // 2. Generate Commissural Connecting Fibers (Corpus Callosum)
    const bridgeCurves: Point3D[][] = [];
    const numBridgeCurves = 10;
    const pointsPerBridge = 12;
    for (let b = 0; b < numBridgeCurves; b++) {
      const curve: Point3D[] = [];
      const zPos = -40 + (b / (numBridgeCurves - 1)) * 80;
      const yHeight = -10 + Math.sin(b * 1.5) * 6;
      const phase = Math.random() * Math.PI;
      for (let p = 0; p < pointsPerBridge; p++) {
        const tNorm = p / (pointsPerBridge - 1);
        const x = -xOffset - 8 + tNorm * (2 * xOffset + 16);
        const y = yHeight - 8 * Math.cos(Math.PI * (tNorm - 0.5));
        const z = zPos + Math.sin(p * 0.5 + phase) * 2;
        // Soft cyan-to-pink gradient across the bridge
        const r = Math.floor(80 * (1 - tNorm) + 220 * tNorm);
        const g = Math.floor(180 * (1 - tNorm) + 45 * tNorm);
        const b = Math.floor(255 * (1 - tNorm) + 180 * tNorm);
        curve.push({ x, y, z, color: `${r},${g},${b}`, size: 0.9 });
      }
      bridgeCurves.push(curve);
    }

    // 3. Generate Outer Neural Network Nodes
    const outerNodes: Point3D[] = [];
    const numNodes = 36;
    const nodeColors = ["0,200,255", "255,45,120", "147,51,234", "0,255,157"];
    for (let i = 0; i < numNodes; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      const r = 110 + Math.random() * 35;
      
      const x = r * Math.sin(theta) * Math.cos(phi) * 0.85;
      const y = r * Math.sin(theta) * Math.sin(phi) * 1.05;
      const z = r * Math.cos(theta) * 1.2;
      const color = nodeColors[Math.floor(Math.random() * nodeColors.length)];
      outerNodes.push({ x, y, z, color, size: 2.2 + Math.random() * 2 });
    }

    // Create connections (edges) between close nodes
    interface Connection {
      from: number;
      to: number;
      dist: number;
    }
    const connections: Connection[] = [];
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = outerNodes[i].x - outerNodes[j].x;
        const dy = outerNodes[i].y - outerNodes[j].y;
        const dz = outerNodes[i].z - outerNodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 90) {
          connections.push({ from: i, to: j, dist });
        }
      }
    }

    // 4. Generate Signal Pulses along the edges
    const activeSignals: Signal[] = [];
    const numSignals = 7;
    for (let i = 0; i < numSignals; i++) {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      if (conn) {
        activeSignals.push({
          fromNode: conn.from,
          toNode: conn.to,
          progress: Math.random(),
          speed: 0.006 + Math.random() * 0.01,
          color: outerNodes[conn.from].color,
        });
      }
    }

    // Helper: Find point along linear path
    function getPointOnPath(points: { x: number; y: number }[], progress: number) {
      if (points.length < 2) return points[0] || { x: 0, y: 0 };
      const totalLen = points.reduce((acc, pt, idx) => {
        if (idx === 0) return 0;
        const prev = points[idx - 1];
        const dx = pt.x - prev.x;
        const dy = pt.y - prev.y;
        return acc + Math.sqrt(dx * dx + dy * dy);
      }, 0);
      
      const targetDist = progress * totalLen;
      let currentDist = 0;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        const segDist = Math.sqrt(dx * dx + dy * dy);
        if (currentDist + segDist >= targetDist) {
          const ratio = (targetDist - currentDist) / segDist;
          return {
            x: prev.x + dx * ratio,
            y: prev.y + dy * ratio
          };
        }
        currentDist += segDist;
      }
      return points[points.length - 1];
    }

    // 5. Generate Circuit Traces for side board graphics
    const leftPaths: CircuitPath[] = [
      { points: [{ x: 45, y: 300 }, { x: 20, y: 300 }, { x: 20, y: 180 }, { x: 5, y: 180 }], pulses: [0.0, 0.5], speed: 0.005 },
      { points: [{ x: 60, y: 285 }, { x: 60, y: 250 }, { x: 40, y: 230 }, { x: 40, y: 120 }, { x: 20, y: 120 }], pulses: [0.25, 0.75], speed: 0.006 },
      { points: [{ x: 45, y: 310 }, { x: 25, y: 330 }, { x: 25, y: 420 }, { x: 10, y: 420 }], pulses: [0.1, 0.6], speed: 0.004 },
      { points: [{ x: 60, y: 315 }, { x: 60, y: 350 }, { x: 45, y: 365 }, { x: 45, y: 480 }, { x: 30, y: 480 }], pulses: [0.3, 0.8], speed: 0.005 },
      { points: [{ x: 75, y: 300 }, { x: 100, y: 300 }, { x: 115, y: 315 }, { x: 115, y: 350 }], pulses: [0.4], speed: 0.007 }
    ];

    const rightPaths: CircuitPath[] = [
      { points: [{ x: 555, y: 300 }, { x: 580, y: 300 }, { x: 580, y: 180 }, { x: 595, y: 180 }], pulses: [0.1, 0.6], speed: 0.005 },
      { points: [{ x: 540, y: 285 }, { x: 540, y: 250 }, { x: 560, y: 230 }, { x: 560, y: 120 }, { x: 580, y: 120 }], pulses: [0.35, 0.85], speed: 0.006 },
      { points: [{ x: 555, y: 310 }, { x: 575, y: 330 }, { x: 575, y: 420 }, { x: 590, y: 420 }], pulses: [0.2, 0.7], speed: 0.004 },
      { points: [{ x: 540, y: 315 }, { x: 540, y: 350 }, { x: 555, y: 365 }, { x: 555, y: 480 }, { x: 570, y: 480 }], pulses: [0.0, 0.5], speed: 0.005 },
      { points: [{ x: 525, y: 300 }, { x: 500, y: 300 }, { x: 485, y: 315 }, { x: 485, y: 350 }], pulses: [0.4], speed: 0.007 }
    ];

    // Interactive event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - (rect.left + rect.width / 2),
        y: e.clientY - (rect.top + rect.height / 2),
      };
      isHoveredRef.current = true;
    };
    
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // 6. Draw loop
    function draw() {
      ctx.clearRect(0, 0, W, H);
      
      const isLight = document.documentElement.dataset.theme === "light";
      
      // Interpolate rotation angles based on mouse offset
      if (isHoveredRef.current) {
        targetAngleY += baseRotationSpeed + mouseRef.current.x * 0.00004;
        targetAngleX = 0.15 + mouseRef.current.y * 0.0007;
      } else {
        targetAngleY += baseRotationSpeed;
        targetAngleX = 0.15 + (targetAngleX - 0.15) * 0.95; // return slowly to default vertical tilt
      }
      
      angleY += (targetAngleY - angleY) * 0.1;
      angleX += (targetAngleX - angleX) * 0.1;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Camera projection parameters
      const camDist = 450;
      const focalLen = 380;

      // Project single 3D point
      function project(pt: Point3D) {
        // Rotate Y (Yaw)
        const x1 = pt.x * cosY - pt.z * sinY;
        const z1 = pt.x * sinY + pt.z * cosY;
        
        // Rotate X (Pitch)
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;
        
        const scale = focalLen / (z2 + camDist);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
          color: pt.color,
          size: pt.size
        };
      }

      // Projection data structures
      const projectedBrain = brainCurves.flatMap(curve => curve.map(project));
      const projectedBridges = bridgeCurves.flatMap(curve => curve.map(project));
      const projectedNodes = outerNodes.map((n, idx) => ({ ...project(n), id: idx }));

      // A. DRAW BACKGROUND CIRCUITS (Flat overlays on the sides)
      ctx.save();
      const accentColor = isLight ? "rgba(0, 150, 220, " : "rgba(0, 220, 255, ";
      const pinkAccent = isLight ? "rgba(220, 30, 100, " : "rgba(255, 45, 120, ";
      
      // Left microchip outline
      ctx.strokeStyle = `${accentColor}0.25)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(48, 285); ctx.lineTo(72, 285); ctx.lineTo(75, 288); ctx.lineTo(75, 312);
      ctx.lineTo(72, 315); ctx.lineTo(48, 315); ctx.lineTo(45, 312); ctx.lineTo(45, 288);
      ctx.closePath();
      ctx.fillStyle = isLight ? "rgba(0, 150, 220, 0.04)" : "rgba(0, 220, 255, 0.05)";
      ctx.fill();
      ctx.stroke();

      // Left microchip internals
      ctx.strokeStyle = `${accentColor}0.15)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(52, 290); ctx.lineTo(52, 310);
      ctx.moveTo(60, 290); ctx.lineTo(60, 310);
      ctx.moveTo(68, 290); ctx.lineTo(68, 310);
      ctx.moveTo(50, 295); ctx.lineTo(70, 295);
      ctx.moveTo(50, 303); ctx.lineTo(70, 303);
      ctx.stroke();

      // Right microchip outline
      ctx.strokeStyle = `${pinkAccent}0.25)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(528, 285); ctx.lineTo(552, 285); ctx.lineTo(555, 288); ctx.lineTo(555, 312);
      ctx.lineTo(552, 315); ctx.lineTo(528, 315); ctx.lineTo(525, 312); ctx.lineTo(525, 288);
      ctx.closePath();
      ctx.fillStyle = isLight ? "rgba(220, 30, 100, 0.04)" : "rgba(255, 45, 120, 0.05)";
      ctx.fill();
      ctx.stroke();

      // Right chip text "AI"
      ctx.fillStyle = isLight ? "rgba(220, 30, 100, 0.85)" : "rgba(255, 45, 120, 0.9)";
      ctx.font = "bold 11px var(--font-mono)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AI", 540, 300);

      // Render circuit paths & pulsing electric signals
      const drawCircuitBoard = (paths: CircuitPath[], tintColor: string, isLeft: boolean) => {
        const glowVal = isLeft ? "0,200,255" : "255,45,120";
        paths.forEach((path) => {
          // Track
          ctx.beginPath();
          ctx.moveTo(path.points[0].x, path.points[0].y);
          for (let i = 1; i < path.points.length; i++) {
            ctx.lineTo(path.points[i].x, path.points[i].y);
          }
          ctx.strokeStyle = `${tintColor}0.12)`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Terminals
          const startPt = path.points[0];
          const endPt = path.points[path.points.length - 1];
          ctx.fillStyle = `${tintColor}0.35)`;
          ctx.beginPath(); ctx.arc(startPt.x, startPt.y, 2, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(endPt.x, endPt.y, 2, 0, Math.PI * 2); ctx.fill();

          // Pulses
          path.pulses.forEach((pVal, idx) => {
            path.pulses[idx] += path.speed;
            if (path.pulses[idx] > 1) path.pulses[idx] = 0;
            
            const pt = getPointOnPath(path.points, path.pulses[idx]);
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${glowVal},0.8)`;
            ctx.fillStyle = `${tintColor}0.95)`;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          });
        });
      };
      drawCircuitBoard(leftPaths, accentColor, true);
      drawCircuitBoard(rightPaths, pinkAccent, false);
      ctx.restore();

      // B. DRAW 3D NETWORK CONNECTIONS (Thin translucent lines in 3D)
      ctx.save();
      connections.forEach((conn) => {
        const fromPt = projectedNodes[conn.from];
        const toPt = projectedNodes[conn.to];
        
        // Depth-dependent opacity and styling
        const avgZ = (fromPt.z + toPt.z) / 2;
        // Map average Z depth to alpha (front lines are brighter, back lines are fainter)
        const alpha = Math.max(0.02, Math.min(0.24, 0.12 - (avgZ / Rz) * 0.08));
        
        // Color transition between nodes
        const grad = ctx.createLinearGradient(fromPt.x, fromPt.y, toPt.x, toPt.y);
        const col1 = isLight ? `rgba(${fromPt.color},${alpha * 0.8})` : `rgba(${fromPt.color},${alpha})`;
        const col2 = isLight ? `rgba(${toPt.color},${alpha * 0.8})` : `rgba(${toPt.color},${alpha})`;
        grad.addColorStop(0, col1);
        grad.addColorStop(1, col2);
        
        ctx.beginPath();
        ctx.moveTo(fromPt.x, fromPt.y);
        ctx.lineTo(toPt.x, toPt.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      ctx.restore();

      // C. DRAW ACTIVE SIGNALS TRAVELING ALONG 3D EDGES
      ctx.save();
      activeSignals.forEach((sig) => {
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          // Re-route to a random connection
          const conn = connections[Math.floor(Math.random() * connections.length)];
          if (conn) {
            sig.fromNode = conn.from;
            sig.toNode = conn.to;
            sig.progress = 0;
            sig.speed = 0.006 + Math.random() * 0.01;
            sig.color = outerNodes[conn.from].color;
          }
          return;
        }

        const fromPt = projectedNodes[sig.fromNode];
        const toPt = projectedNodes[sig.toNode];
        
        const sx = fromPt.x + (toPt.x - fromPt.x) * sig.progress;
        const sy = fromPt.y + (toPt.y - fromPt.y) * sig.progress;
        const sz = fromPt.z + (toPt.z - fromPt.z) * sig.progress;
        
        // Calculate depth scale
        const scale = focalLen / (sz + camDist);
        const signalSize = 2.0 * scale;
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${sig.color},0.95)`;
        ctx.fillStyle = `rgba(${sig.color},0.95)`;
        ctx.beginPath();
        ctx.arc(sx, sy, signalSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.restore();

      // D. DRAW BRAIN CORE, BRIDGES AND NODES (Depth sorted together for perfect 3D occlusion)
      interface DepthSortItem {
        x: number;
        y: number;
        z: number;
        scale: number;
        size: number;
        color: string;
        type: "brain" | "bridge" | "node";
      }

      const pool: DepthSortItem[] = [
        ...projectedBrain.map(pt => ({ ...pt, type: "brain" as const })),
        ...projectedBridges.map(pt => ({ ...pt, type: "bridge" as const })),
        ...projectedNodes.map(pt => ({ ...pt, type: "node" as const }))
      ];

      // Sort descending (back-to-front projection, painter's algorithm)
      pool.sort((a, b) => b.z - a.z);

      pool.forEach((item) => {
        const alpha = Math.max(0.1, Math.min(1.0, 0.7 - (item.z / (Rz * 1.5)) * 0.4));
        ctx.beginPath();
        
        if (item.type === "node") {
          // Outer nodes: larger circles with a glowing backdrop
          ctx.save();
          const drawColor = isLight ? `rgba(${item.color},0.85)` : `rgba(${item.color},0.95)`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${item.color},0.9)`;
          ctx.fillStyle = drawColor;
          ctx.arc(item.x, item.y, item.size * item.scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (item.type === "bridge") {
          // Commissural fibers: smaller connection dots
          ctx.fillStyle = isLight ? `rgba(${item.color},${alpha * 0.65})` : `rgba(${item.color},${alpha * 0.8})`;
          ctx.arc(item.x, item.y, item.size * item.scale, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Brain core: particle dot representing cortex curves
          ctx.fillStyle = isLight ? `rgba(${item.color},${alpha * 0.7})` : `rgba(${item.color},${alpha})`;
          ctx.arc(item.x, item.y, item.size * item.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // E. DRAW CENTRAL GLOW SPHERE (Behind the front layer, creates a dense core look)
      ctx.save();
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 110);
      if (isLight) {
        grad.addColorStop(0, "rgba(0,180,225,0.06)");
        grad.addColorStop(0.5, "rgba(220,30,100,0.03)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        grad.addColorStop(0, "rgba(0,200,255,0.08)");
        grad.addColorStop(0.5, "rgba(255,45,120,0.04)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
      }
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      raf = requestAnimationFrame(draw);
    }

    draw();

    // Cleanups
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={ref} style={{ opacity: 0.95 }} />;
}

