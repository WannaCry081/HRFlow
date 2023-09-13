/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : "class",
  theme: {
    fontFamily : {
      oswald : ["oswald"],
      lato : ["lato"],
      poppins : ["poppins"]
    },
    extend: {
      screens : {
        "xs" : "360px",
        "sm" : "640px",
        "md" : "768px",
        "lg" : "1024px",
        "xl" : "1280px",
        "2xl" : "1536px"
      },
      colors : {
        "primary" : "#5955B3",
        "secondary" : "#FF5B8F",
        "tertiary"  : "#BC6FF1",
        "skyblue" : "#AAC4FF",
        "honey" : "#FFD369",
        "grass" : "#9DC08B",
        "rustic" : "#E57853"
      }
    },
  },
  plugins: [],
}

