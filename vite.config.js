import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // if the string starts wuth "api" put "http://localhost:3000" before it automatically.
        target: "http://localhost:3000",
      },
      "/images": {
        // eaxly like above.
        target: "http://localhost:3000",
      },
    },
  },
});
