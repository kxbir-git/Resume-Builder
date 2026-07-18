# Deploying to Vercel

This project is a TanStack Start + Nitro app configured for the Vercel Build
Output API v3. Nitro writes to `.vercel/output/` at build time and Vercel
serves it directly.

## Steps

1. Push this repo to GitHub.
2. In the Vercel dashboard: **Add New → Project → Import** your repo.
3. Framework preset: **Other** (Vercel auto-detects `vercel.json`).
4. Build command: `bun run build`
5. Output: `.vercel/output` (auto-detected).
6. Add any environment variables your app needs under **Settings → Environment Variables**.
7. Deploy.

## Local build

```bash
bun install
bun run build
bun run preview
```
