import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Nitro deploys to Vercel using the "vercel" preset. Outputs to `.vercel/output`
// which Vercel picks up automatically (Build Output API v3).
export default defineConfig({
  nitro: {
    preset: "vercel",
  },
});
