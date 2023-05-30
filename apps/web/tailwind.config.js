const path = require("path");

const mainConfig = require("@workshops/config/tailwind.config");

const UI_BASE_PATH = path.dirname(
  require.resolve("@workshops/ui/package.json")
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...mainConfig,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    `${UI_BASE_PATH}/src/**/*.{js,ts,jsx,tsx}`
  ]
};
