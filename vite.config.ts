import type { ConfigEnv, UserConfig } from "vite";

// Plain TanStack Start + Nitro setup.
// On Vercel, Nitro's `vercel` preset writes to `.vercel/output/`
// which Vercel picks up via Build Output API v3.
export default async (_env: ConfigEnv): Promise<UserConfig> => {
  const { tanstackStart } = await import("@tanstack/react-start/plugin/vite");
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
};
