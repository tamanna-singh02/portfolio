"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-title">◈ Send a message</div>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          className="form-input"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          className="form-input"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea
          className="form-textarea"
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="What's on your mind?"
        />
      </div>
      <button className="form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message →"}
      </button>
      {status === "success" && <div className="form-success">✓ Message sent! I&apos;ll get back to you soon.</div>}
      {status === "error" && <div className="form-error">⚠ Failed to send. Email me directly instead.</div>}
    </form>
  );
}
