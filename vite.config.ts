import type { ConfigEnv, UserConfig } from "vite";

// Two build paths:
// 1. On Vercel (or when VERCEL=1 / NITRO_PRESET=vercel is set) → plain
//    TanStack Start + Nitro with the `vercel` preset. Nitro writes to
//    `.vercel/output/` which Vercel picks up via Build Output API v3.
// 2. Everywhere else (Lovable sandbox / preview / local dev) → the
//    `@lovable.dev/vite-tanstack-config` wrapper. That keeps HMR, error
//    overlays, and the default Cloudflare-compatible bundle intact.
const isVercel = !!process.env.VERCEL || process.env.NITRO_PRESET === "vercel";

export default async (env: ConfigEnv): Promise<UserConfig> => {
  if (isVercel) {
    const { tanstackStart } = await import("@tanstack/react-start/plugin");
    const react = (await import("@vitejs/plugin-react")).default;
    const tailwindcss = (await import("@tailwindcss/vite")).default;
    const tsconfigPaths = (await import("vite-tsconfig-paths")).default;
    const { nitro } = await import("nitro/vite");

    return {
      plugins: [
        tsconfigPaths(),
        tailwindcss(),
        tanstackStart(),
        react(),
        nitro({ preset: "vercel" }),
      ],
    };
  }

  const { defineConfig } = await import("@lovable.dev/vite-tanstack-config");
  const build = defineConfig();
  return build(env);
};
