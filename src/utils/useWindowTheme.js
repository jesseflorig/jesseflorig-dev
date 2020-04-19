import { useState } from "react"

const LOCAL_THEME_KEY = "florigPreferredTheme"
const DEFAULT_THEME = "dark"
const ALTERNATE_THEME = "light"

function getLocalTheme() {
  return typeof window !== `undefined`
    ? window.localStorage.getItem(LOCAL_THEME_KEY)
    : DEFAULT_THEME
}

function setLocalTheme(newTheme) {
  //
  if (typeof window !== `undefined`) {
    window.localStorage.setItem(LOCAL_THEME_KEY, newTheme)
  }
}

function setBodyClass(newClass) {
  //
  if (typeof document !== `undefined`) {
    document.body.className = newClass
  }
}

export default function useWindowTheme(defaultTheme = DEFAULT_THEME) {
  const [theme, setTheme] = useState(getLocalTheme() || defaultTheme)
  setBodyClass(theme)

  const toggleTheme = () => {
    const newTheme = theme === DEFAULT_THEME ? ALTERNATE_THEME : DEFAULT_THEME
    setTheme(newTheme)
    setLocalTheme(newTheme)
    setBodyClass(newTheme)
  }

  return [theme, toggleTheme]
}
