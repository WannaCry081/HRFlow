/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : "class",
  theme: {
    fontFamily : {
      oswald : ["Oswald", "AssetsOswald","sans"],
      lato : ["Lato", "AssetsLato","sans"],
      poppins : ["Poppins", "AssetsPoppins","sans"]
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
          "light" : "#5955B3",
          "pastel": "#F0EEFA",
          "base": "#F9FAFB",
          "palePastel": "#F4EEF6"
        },
        "secondary" : {
          "dark" : "#FF719E",
          "light" : "#FF5B8F",
          "pastel": "#FCF5F5"
        },
        "tertiary"  : {
          "dark" : "#CF89FF",
          "light" : "#BC6FF1",
          "pastel": "#F5EAFA"
        },
        "skyblue" : {
          "dark" : "#94D6FF",
          "light" : "#AAC4FF",
          "pastel": "#F3F3FF"
        },
        "honey" : {
          "dark" : "#FFE19A",
          "light" : "#FFD369",
          "pastel": "#FFFAEF"
        },
        "grass" : {
          "dark" : "#BEE0AC",
          "light" : "#9DC08B",
          "pastel": "EFFFE7"
        },
        "rustic" : {
          "dark" : "#F29879",
          "light" : "#E57853",
          "pastel": "#FFEAE3"
        },
        "jetblack" : "#20262E"
      }
    },
  },
  plugins: [],
}

