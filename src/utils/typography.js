import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  scaleRatio: 2.5,
  googleFonts: [
    { name: "Oswald", styles: ["400", "700"] },
    { name: "Libre Baskerville", styles: ["400", "400i", "700"] },
  ],
  headerFontFamily: ["Oswald", "sans-serif"],
  bodyFontFamily: ["Libre Baskerville", "serif"],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    body: {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
    "h1, h2, h3, h4, h5, h6": {
      textTransform: "uppercase",
    },
    a: {
      color: "rgba(0,0,0,0.8)",
      textDecorationColor: "rgba(0,0,0,0.2)",
    },
    "a:hover": {
      textDecorationColor: "rgba(0,0,0,0.8)",
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
