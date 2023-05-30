const mainConfig = require("@workshops/config/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...mainConfig,
  content: ["./src/**/*.{js,ts,jsx,tsx}"]
};
