import { useState } from "react"
const LOCAL_THEME_KEY = "florigPreferredTheme"

function getTheme() {
  return window.localStorage.getItem(LOCAL_THEME_KEY)
}

export default function useWindowTheme(defaultTheme = "dark") {
  const [theme, setTheme] = useState(getTheme() || defaultTheme)
  document.body.className = theme

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    window.localStorage.setItem(LOCAL_THEME_KEY, newTheme)
    document.body.className = newTheme
  }

  return [theme, toggleTheme]
}
