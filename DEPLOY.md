# Portfolio — Vercel Deployment

## Quick Start (local)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Convert app to React Vite SPA"
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository — Vercel auto-detects Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Deploy**
   - Click **Deploy**. Vercel will build static files and host your SPA globally.

## Project Structure

```
src/
  main.tsx            React entry point
  App.tsx             Root component
  index.css           Full design system (dark/light theme, animations)
  components/
    Portfolio.tsx     Main page component (all sections)
    Hero3DImage.tsx   Hero developer card image
    OrbCanvas.tsx     WebGL-style canvas orb animation
    SkillsRadar.tsx   SVG radar chart
    Terminal.tsx      Interactive terminal easter egg
    GitHubStats.tsx   Live GitHub API stats
    ProjectCard.tsx   Project card with deep-dive toggle
    ContactForm.tsx   Client-side contact form
  lib/
    data.ts           All portfolio data (skills, projects, journey, etc.)
```

## Customizing

All content is in `src/lib/data.ts` — edit skills, projects, journey, achievements there.
Colors and design tokens are CSS variables in `src/index.css` (`:root`).
