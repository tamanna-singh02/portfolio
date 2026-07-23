"use client";

import Image from "next/image";

export default function Hero3DImage() {
  return (
    <div className="hero-3d-wrapper">
      {/* Ambient background dual neon glow ring */}
      <div className="hero-3d-glow" />

      {/* Main Static Cyber Card Container */}
      <div className="hero-3d-card">
        {/* Outer Frame Border / Cyber Brackets */}
        <div className="hero-3d-frame">
          <div className="frame-corner top-left" />
          <div className="frame-corner top-right" />
          <div className="frame-corner bottom-left" />
          <div className="frame-corner bottom-right" />
        </div>

        {/* Crisp Hero Developer Image */}
        <div className="hero-image-container">
          <Image
            src="/hero-developer.png"
            alt="Tamanna Singh - AI Engineer"
            width={1500}
            height={1500}
            priority
            className="hero-developer-img"
          />
        </div>

        {/* Floating Glassmorphic Status Badge */}
        <div className="hero-3d-badge">
          <span className="badge-dot" />
          <span className="badge-text">AI ENGINEER • TAMANNA SINGH</span>
        </div>
      </div>
    </div>
  );
}
