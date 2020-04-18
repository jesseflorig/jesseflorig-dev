import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  scaleRatio: 2.2,
  googleFonts: [
    { name: "Oswald", styles: ["400", "700"] },
    { name: "Libre Baskerville", styles: ["400", "400i", "700"] },
    { name: "Fira Code", styles: ["400", "700"] },
  ],
  headerFontFamily: ["Oswald", "sans-serif"],
  bodyFontFamily: ["Libre Baskerville", "serif"],
  overrideStyles: () => ({
    body: {
      color: "rgba(0,0,0,0.7)",
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    "h1, h2, h3, h4, h5, h6": {
      textTransform: "uppercase",
    },
    a: {
      color: "rgba(0,0,0,0.6)",
      textDecorationColor: "rgba(0,0,0,0.1)",
    },
    "a:hover": {
      color: "rgba(0,0,0,0.7)",
      textDecorationColor: "rgba(0,0,0,0.7)",
    },
    "h1 a": {
      color: "rgba(0, 0, 0, 0.8)",
    },
    "h3 a": {
      color: "rgba(0, 0, 0, 0.6)",
    },
    footer: {
      fontSize: "0.8em",
    },
    ".gatsby-highlight-code-line": {
      display: "block",
      borderLeft: "0.5em solid #a5e844",
      backgroundColor: "rgba(255,255,255, 0.1)",
      margin: "0 -1em",
      padding: ".2em 1em 0.2em 0.5em",
    },
    // Dark mode styles
    ".dark": {
      color: "rgba(255,255,255,0.7)",
      backgroundColor: "rgba(0,0,0,0.9)",
    },
    ".dark a": {
      color: "rgba(255,255,255,0.6)",
      textDecorationColor: "rgba(255,255,255,0.1)",
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
