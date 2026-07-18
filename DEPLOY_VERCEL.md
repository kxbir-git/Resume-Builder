# Deploying Resumecraft to Vercel

This project was built with **TanStack Start** and is currently configured to run on **Cloudflare Workers** (see `wrangler.jsonc` and the `cloudflare` plugin baked into `@lovable.dev/vite-tanstack-config`). To deploy on Vercel, you need to switch the server target to Vercel's runtime so server routes like `/api/resume-pdf` execute as Vercel Functions instead of a Cloudflare Worker.

> **Easier alternative:** Click **Publish** inside Lovable to ship to `*.lovable.app` (or attach a custom domain) with zero configuration. Use this guide only if Vercel is a hard requirement.

---

## 1. Prerequisites

- A GitHub account (Vercel deploys from a Git repo)
- A [Vercel account](https://vercel.com/signup) (free Hobby tier is fine)
- [Node.js 20+](https://nodejs.org/) and [Bun](https://bun.sh/) installed locally
- This project pushed to a GitHub repo (use the **GitHub** button in the top-right of Lovable to connect)

---

## 2. Switch the server target from Cloudflare to Vercel

TanStack Start uses [Nitro](https://nitro.unjs.io/) presets to target different hosts. We need to tell it to build for Vercel.

### 2a. Update `vite.config.ts`

Replace the file contents with:

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    target: "vercel",
  },
});
```

### 2b. Remove Cloudflare-only files

These are no longer needed on Vercel:

```bash
rm wrangler.jsonc
```

### 2c. (Optional) Remove Cloudflare dependencies

If you don't plan to deploy back to Cloudflare, you can drop them to slim your install:

```bash
bun remove wrangler @cloudflare/workers-types
```

---

## 3. Add a `vercel.json` (recommended)

Create `vercel.json` in the project root so Vercel uses Bun and the correct build output:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "bun run build",
  "installCommand": "bun install",
  "framework": null,
  "outputDirectory": ".output"
}
```

---

## 4. Push your code to GitHub

From Lovable: click **GitHub → Connect to GitHub**, then **Create Repository**. Lovable pushes your latest code automatically.

Or from your local clone:

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

---

## 5. Import the project into Vercel

1. Go to <https://vercel.com/new>
2. Click **Import** next to your GitHub repo
3. Vercel auto-detects the framework as **Other** — leave it that way (our `vercel.json` overrides this)
4. **DO NOT click Deploy yet** — first add env vars (next step)

---

## 6. Configure environment variables

In the Vercel import screen (or **Project → Settings → Environment Variables** after import), add the following for **Production**, **Preview**, and **Development**:

| Name | Value | Where to find it |
|---|---|---|
| `VITE_SUPABASE_URL` | `https://<project-ref>.supabase.co` | Lovable Cloud / Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJ...` (publishable/anon key) | Lovable Cloud / Supabase API settings |
| `SUPABASE_URL` | same as `VITE_SUPABASE_URL` | (server-side mirror) |
| `SUPABASE_PUBLISHABLE_KEY` | same as `VITE_SUPABASE_PUBLISHABLE_KEY` | (server-side mirror) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (service role — **secret**) | Supabase API settings → service_role |

> **Skip the Supabase keys** if you haven't enabled Lovable Cloud yet — the current frontend shell works without them.

If you later add the AI features, also add:

| Name | Value |
|---|---|
| `LOVABLE_API_KEY` | from Lovable → AI Gateway |

---

## 7. Deploy

Click **Deploy**. Vercel will:

1. Run `bun install`
2. Run `bun run build` (produces `.output/`)
3. Spin up your SSR entry as a Vercel Function
4. Mount `/api/resume-pdf` as a serverless function

When it finishes you'll get a URL like `https://resumecraft-xxx.vercel.app`.

---

## 8. Verify the deployment

Open the deployed URL and test the full flow:

- [ ] Landing page renders
- [ ] `/signup` → `/dashboard` navigation works
- [ ] `/builder` saves data to localStorage and shows live preview
- [ ] `/templates` switches templates/accent
- [ ] `/preview` → **Download PDF** returns a real PDF (this proves the server function is live)

If the PDF download fails with a 404 or 500, check **Vercel → Deployments → Function Logs**. The most common cause is forgetting Step 2a.

---

## 9. (Optional) Attach a custom domain

1. **Project → Settings → Domains**
2. Add your domain (e.g. `resumecraft.com`)
3. Update your registrar's DNS as instructed (usually an `A` record to `76.76.21.21` or a `CNAME` to `cname.vercel-dns.com`)
4. Vercel auto-provisions an SSL certificate within a few minutes

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Build fails: `Cannot find module 'wrangler'` | You removed `wrangler.jsonc` but didn't update `vite.config.ts` — recheck Step 2a |
| `/api/resume-pdf` returns 404 | The `vercel` Nitro preset isn't active. Confirm `target: "vercel"` in `vite.config.ts` |
| PDF function times out | Default Hobby timeout is 10s. Upgrade to Pro or shrink the resume payload |
| Blank page in production | Check **Functions → Logs** for SSR errors. Usually a missing env var |
| `import.meta.env.VITE_*` is `undefined` | Vars must start with `VITE_` AND be set at **build time** in Vercel (not just runtime) |

---

## Switching back to Cloudflare / Lovable hosting

Revert `vite.config.ts` to:

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig();
```

and restore `wrangler.jsonc`. Then redeploy via Lovable's **Publish** button.
