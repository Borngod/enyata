import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Here you can configure SCSS options if needed
        implementation: sass, // Specify the SCSS implementation (Dart Sass in this case)
      },
    },
  },
});
