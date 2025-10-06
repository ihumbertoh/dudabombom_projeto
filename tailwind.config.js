/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fffaf0",
          100: "#fff3d1",
          200: "#ffea9a",
          300: "#ffdf5c",
          400: "#ffd52a",
          500: "#ffcc00", // primary
          600: "#e6b800",
          700: "#b38f00", // darker for text on yellow
          800: "#8f6b00",
          900: "#664f00",
          secondary: "#6b4226", // chocolate brown
          cream: "#fff9e6",
          accent: "#ffb84d",
          mint: "#a7f3d0",
          dark: "#111827",
          onPrimary: "#111827", // recommended text color on yellow
        },
      },
      fontFamily: {
        sans: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
