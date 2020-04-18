import { useState } from "react"
const DEFAULT_THEME = "dark"
const LOCAL_THEME_KEY = "florigPreferredTheme"

function getTheme() {
  return typeof window !== `undefined`
    ? window.localStorage.getItem(LOCAL_THEME_KEY)
    : DEFAULT_THEME
}

export default function useWindowTheme(defaultTheme = DEFAULT_THEME) {
  const [theme, setTheme] = useState(getTheme() || defaultTheme)

  if (typeof document !== `undefined`) {
    document.body.className = theme
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (typeof window !== `undefined`) {
      window.localStorage.setItem(LOCAL_THEME_KEY, newTheme)
    }
    if (typeof document !== `undefined`) {
      document.body.className = newTheme
    }
  }

  return [theme, toggleTheme]
}
