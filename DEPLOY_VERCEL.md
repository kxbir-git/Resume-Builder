# Deploying to Vercel

This project is already configured to deploy on **Vercel** out of the box.

## What was set up

1. **`vite.config.ts`** — branches on `process.env.VERCEL`:
   - On Vercel it runs plain TanStack Start + Nitro with the `vercel` preset,
     emitting to `.vercel/output/` (Vercel Build Output API v3).
   - Locally / inside Lovable it uses the standard `@lovable.dev/vite-tanstack-config`
     wrapper so dev + Lovable preview keep working.
2. **`vercel.json`** — tells Vercel to use Bun and run `bun run build`. No `outputDirectory`
   is needed; Nitro writes directly to `.vercel/output/`.

## Deploy steps

1. Push this repo to GitHub (from Lovable: **GitHub → Connect to GitHub → Create Repository**).
2. Go to <https://vercel.com/new> and import the repo.
3. Leave "Framework Preset" as **Other** — `vercel.json` handles it.
4. Add environment variables (Project → Settings → Environment Variables) for
   Production / Preview / Development. Only add what your app actually uses:
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` — client-side Supabase
   - `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — server-side
   - `LOVABLE_API_KEY` — only if you use Lovable AI Gateway
5. Click **Deploy**. Vercel will run `bun install && bun run build`, then serve the
   client assets from `.vercel/output/static/` and mount the SSR entry
   (`__server.func`) as a serverless function.

## Verify

Open the deployment URL and check:

- [ ] Landing page renders
- [ ] `/signup` → `/dashboard` navigation works
- [ ] `/builder` saves data and shows a live preview
- [ ] `/templates` switches templates + accent
- [ ] `/preview` → **Download PDF** returns a real PDF (this proves the
      `/api/resume-pdf` server route runs as a Vercel Function)

If the PDF download fails, check **Vercel → Deployments → Function Logs**.

## Custom domain

Project → Settings → Domains → Add. Point DNS as Vercel instructs. SSL is automatic.

## Reverting

To go back to the Lovable / Cloudflare deploy path, unset `VERCEL` (Vercel sets it
automatically at build time). Locally, `bun run build` already uses the Lovable
wrapper. No config change is needed.
