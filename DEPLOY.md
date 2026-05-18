# Portfolio — Vercel Deployment

## Quick Start (local)

```bash
npm install
cp .env.example .env.local
# Fill in Vercel Postgres credentials (see below), or skip for local dev without contact form
npm run dev
```

## Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init && git add . && git commit -m "Initial portfolio"
   gh repo create tamanna-portfolio --public && git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repo — Vercel auto-detects Next.js

3. **Add Vercel Postgres (for contact form)**
   - In Vercel Dashboard → **Storage** → **Create Database** → **Postgres**
   - Name it `portfolio-db`, choose a region close to you
   - Click **Connect Project** → select your portfolio project
   - Vercel auto-injects all `POSTGRES_*` env vars

4. **Deploy** — that's it. The `contact_messages` table is created automatically on first form submission.

## Project Structure

```
app/
  layout.tsx          Root layout + metadata
  page.tsx            Renders Portfolio component
  globals.css         Full design system (dark theme, animations)
  api/
    contact/
      route.ts        POST /api/contact → Vercel Postgres
components/
  Portfolio.tsx       Main page component (all sections)
  OrbCanvas.tsx       WebGL-style canvas orb animation
  SkillsRadar.tsx     SVG radar chart
  Terminal.tsx        Interactive terminal easter egg
  GitHubStats.tsx     Live GitHub API stats
  ProjectCard.tsx     Project card with deep-dive toggle
  ContactForm.tsx     Contact form (persists to Postgres)
lib/
  data.ts             All portfolio data (skills, projects, journey, etc.)
```

## Customizing

All content is in `lib/data.ts` — edit skills, projects, journey, achievements there.
Colors and design tokens are CSS variables in `app/globals.css` (`:root`).
