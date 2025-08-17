/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#2563eb",
        "primary-dark": "#1d4ed8",
        "secondary-purple": "#8b5cf6",
        "accent-pink": "#ec4899",
        "accent-orange": "#f97316",
        "accent-teal": "#14b8a6",
        "text-dark": "#1f2937",
        "text-light": "#6b7280",
        "bg-light": "#f8fafc",
        "bg-white": "#ffffff",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
