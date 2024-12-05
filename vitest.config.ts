import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig(async () => {
  const tsconfigPaths = (await import("vite-tsconfig-paths")).default;

  return {
    plugins: [react(), tsconfigPaths()],
    test: {
      environment: "node",
      globals: true,
      setupFiles: ["./vitest.setup.ts"],
    },
  };
});
