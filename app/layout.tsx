import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tamanna Singh — AI Engineer & Full-Stack Developer",
  description:
    "Full-stack developer with 1+ year of production experience at KocharTech, transitioning into AI Engineering. Built AI-powered systems with RAG pipelines, vector databases, and LangGraph agents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
