/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/**/*.{html,ts}",
  "./node_modules/tw-elements/dist/js/**/*.js"
]
export const darkMode = ["class"]
export const theme = {
  extend: { },
}
export const plugins = [require("tw-elements/dist/plugin.cjs")]

