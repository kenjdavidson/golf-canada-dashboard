import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/golf-canada-dashboard/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // Include markdown files as assets so they can be served from /public/content
  assetsInclude: ['**/*.md'],
});
