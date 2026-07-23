export default function Hero3DImage() {
  const imageSrc = `${import.meta.env.BASE_URL}hero-developer.png`;

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
          <img
            src={imageSrc}
            alt="Tamanna Singh - AI Engineer"
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
