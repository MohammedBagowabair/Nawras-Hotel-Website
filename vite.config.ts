import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// BASE_PATH sets the GitHub Pages subpath, e.g. /Dar-Al-Sama-Hotel-Website/
export default defineConfig({
  base: process.env["BASE_PATH"] ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
