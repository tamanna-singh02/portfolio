import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "var(--font-mono)",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "72px", color: "var(--cyan)", marginBottom: "16px" }}>404</h1>
      <p style={{ fontSize: "16px", color: "var(--text-dim)", marginBottom: "24px" }}>
        # Page Not Found
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--cyan)",
          border: "1px solid var(--border-bright)",
          padding: "10px 20px",
          textDecoration: "none",
          letterSpacing: "0.1em",
          textTransform: "uppercase"
        }}
      >
        ← Return Home
      </Link>
    </div>
  );
}
