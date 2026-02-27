import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";
import { herouiThemeConfig } from "./config/style/heroui-theme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [heroui(herouiThemeConfig)],
};

export default config;