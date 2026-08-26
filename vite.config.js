import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages alt dizinde yayınlanacaksa: base: "/guc-hesabi/"
  base: "./guc-hesabi/",
});
