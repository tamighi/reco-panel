import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss(), tailwindcss(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "RecoPanel",
      formats: ["es"],
      fileName: "reco-panel",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
