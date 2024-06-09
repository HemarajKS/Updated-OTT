import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/package/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        "outer-space": "#292A2A",
        "dove-gray": "#6D6D6D",
        white: "#FFFFFF",
        "transparent-white": "#FFFFFF26",
        "cod-gray": "#161616B2",
        "dodger-blue": "#1D78FF",
        cinnabar: "#E13740",
        christi: "#45BB0E",
        gray: "#808080",
        "gray-light": "#808080B2",
        tundora: "#4D4D4D",
        "bay-of-many": "#264C85",
        "wild-sand": "#F4F4F4",
        "light-grey-1": "#B3B3B3",
        "light-grey": "#FFFFFF99",
        "dark-grey": "#292A2A",
        "dark-blue": "#010e2f",
      },
      backgroundImage: {
        "auth-pattern": "url('/assets/images/background-poster.png')",
        "auth-gradient":
          "linear-gradient(90deg, rgba(23, 32, 63, 0.8) 0%, rgba(18, 23, 47, 0.5) 59.5%, rgba(17, 25, 56, 0.9) 100%), linear-gradient(0.04deg, rgba(0, 0, 0, 0) 0.04%, rgba(0, 0, 0, 0.5) 26.74%, #262626 92.11%)",
        "auth-gradient-mobile":
          "linear-gradient(90deg, rgb(23 32 63 / 81%) 0%, rgb(18 23 47 / 88%) 91%, rgba(17, 25, 56, 0.9) 100%), linear-gradient(0.04deg, #000000 0.04%, rgb(0 0 0 / 28%) 23.54%, #262626 92.11%)",
      },
      height: {
        // @ts-ignore
        screen: ["100vh", "100dvh"],
      },
      borderWidth: {
        normal: "1px",
      },
      padding: {
        small: "14px 20px",
        normal: "60px 40px",
        mobile: "36px 16px",
        medium: "16px",
      },
      borderRadius: {
        sm: "4px",
        normal: "8px",
      },
      fontSize: {
        xxs: "12px",
        xs: "14px",
        sm: "16px",
        lg: "32px",
        "24": "24px",
        "20": "20px",
        "18": "18px",
      },

      fontWeight: {
        normal: "400",
        thick: "500",
        semibold: "600",
        bold: "700",
        "600": "600",
      },

      lineHeight: {
        normal: "24px",
        "26.4px": "26.4px",
      },

      width: {
        "card-container": "528px",
      },
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
export default config;
