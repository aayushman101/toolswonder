import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F59E0B",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
export default config;
