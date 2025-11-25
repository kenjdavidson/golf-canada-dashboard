import type { Config } from "tailwindcss";
import { mtConfig } from "@material-tailwind/react";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./index.html", 
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [mtConfig, typography],
};

export default config;