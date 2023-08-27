import { name } from "./package.json";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: "src/index.ts",
      name,
      fileName: (format) => `${name}.${format}.js`,
    },
    rollupOptions: {
      external: ["qs"],
    },
  },
});
