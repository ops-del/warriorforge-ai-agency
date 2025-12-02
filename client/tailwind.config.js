/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1D4ED8",
          purple: "#7C3AED",
          slate: "#0F172A",
        },
      },
      boxShadow: {
        card: "0 20px 50px -20px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [],
};
