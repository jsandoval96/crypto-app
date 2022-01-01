import react from "@vitejs/plugin-react";
import realFs from "fs";
import gracefulFs from "graceful-fs";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

gracefulFs.gracefulify(realFs);

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    fs: {
      strict: false,
    },
  },
});
