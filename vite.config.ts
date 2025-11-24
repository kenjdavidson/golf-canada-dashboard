import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/golf-canada-dashboard/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  assetsInclude: ['**/*.md'],
  optimizeDeps: {
    include: ['@material-tailwind/react'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
