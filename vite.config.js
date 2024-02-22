import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.jsx"),
      name: "XrasUi",
      fileName: "xras-ui",
    },
    rollupOptions: {
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") return "xras-ui.css";
        },
      },
    },
  },
  plugins: [react()],
});
