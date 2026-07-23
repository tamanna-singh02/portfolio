import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    setTimeout(() => {
      // Create mailto fallback link for seamless pure client-side interaction
      const subject = encodeURIComponent(`Portfolio Message from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.location.href = `mailto:tamannasingh0204@gmail.com?subject=${subject}&body=${body}`;

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 400);
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
        {status === "sending" ? "Opening Email Client..." : "Send Message →"}
      </button>
      {status === "success" && (
        <div className="form-success">
          ✓ Your email draft has been prepared! If your mail client didn&apos;t open, reach out directly to tamannasingh0204@gmail.com
        </div>
      )}
      {status === "error" && <div className="form-error">⚠ Failed to process. Email me directly at tamannasingh0204@gmail.com</div>}
    </form>
  );
}
