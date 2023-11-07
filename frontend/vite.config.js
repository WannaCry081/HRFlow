import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@Src",
        replacement: "/src",
      },
      {
        find: "@Components",
        replacement: "/src/components",
      },
      {
        find: "@Pages",
        replacement: "/src/pages",
      },
      {
        find: "@Services",
        replacement: "/src/services",
      },
      {
        find: "@Utils",
        replacement: "/src/Utils",
      },
      {
        find: "@Assets",
        replacement: "/src/assets",
      },
      {
        find: "@Layouts",
        replacement: "/src/layouts",
      },
      {
        find: "@Styles",
        replacement: "/src/styles",
      },
      {
        find: "@Hooks",
        replacement: "/src/hooks",
      },
    ],
  },
});
