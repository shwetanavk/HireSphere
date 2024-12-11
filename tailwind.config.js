/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Roboto", "sans-serif"] },
    },
    // gridTemplateColumns: {
    //   "70/30": "70% 28%",
    // },\
    // gridTemplateColumns: {
    //   3: "3",
    //   "70/30": "70% 28%", // Custom template
    // },
  },
  plugins: [],
};
