import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      // In development without a DB, just log and return success
      console.log("Contact form (no DB):", { name, email, message });
      return NextResponse.json({ success: true });
    }

    const sql = neon(databaseUrl);

    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
