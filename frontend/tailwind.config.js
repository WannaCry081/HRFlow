/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : "class",
  theme: {
    fontFamily : {
      oswald : ["oswald", "sans"],
      lato : ["lato", "sans"],
      poppins : ["poppins", "sans"]
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
        "primary" : {
          "dark" : "#6E69D8",
          "light" : "#5955B3"
        },
        "secondary" : {
          "dark" : "#FF719E",
          "light" : "#FF5B8F"
        },
        "tertiary"  : {
          "dark" : "#CF89FF",
          "light" : "#BC6FF1"
        },
        "skyblue" : {
          "dark" : "#94D6FF",
          "light" : "#AAC4FF"
        },
        "honey" : {
          "dark" : "#FFE19A",
          "light" : "#FFD369"
        },
        "grass" : {
          "dark" : "#BEE0AC",
          "light" : "#9DC08B"
        },
        "rustic" : {
          "dark" : "#F29879",
          "light" : "#E57853"
        },
        "pastel": {
          "primary": "#F0EEFA",
          "secondary": "#F9F8F8",
          "tertiary": "#F5EAFA",
          "skyblue": "#F3F3FF",
          "honey": "#FFFAEF",
          "grass": "#EFFFE7",
          "rustic": "#FFEAE3"
        },
        "jetblack" : "#20262E"
      }
    },
  },
  plugins: [],
}

