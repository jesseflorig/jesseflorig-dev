---
title: Building a custom theme hook
date: "2020-01-04"
description: "Let's build a persistent toggleable page theme using React hooks."
---

When setting up this blog, I wanted a way to implement a page theme. There are plenty of UI frameworks that support this out of the box. [Chakra UI](https://chakra-ui.com) and [Material UI](https://material-ui.com) are two of my favorites, but I thought integrating either one of these would be overkill. 

Virtually, the entire theme of this site lives in a [Typography.js](https://kyleamathews.github.io/typography.js) config, so I decided the best solution would be to figure out how to add a `css±.dark` class name to the `html±<body>` tag. Then, all I would need to do is add a couple `css±.dark` classes to my theme.

And before we get started, the last requirement for our theme is persistence between page loads. That way, if a user comes back to the site, the theme is automatically set to their preferred theme. For this, we can use `localStorage` ([MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)).

## Hooked on hooks

To keep things nice and clean, I want to put all of the logic for this into a [React hook](https://reactjs.org/docs/hooks-intro.html). If you're familiar with hooks, you might be thinking this can be done as a one liner:

```js
const [theme, setTheme] = useState("dark")
```
That is definitely one way to do it, in fact, that's what we'll start with. But stopping there, you're left with implementing your own logic for `js±setTheme()`, and it would be really nice if our hook exposed a `js±toggleTheme()` function instead of a setter. 

Okay, so given our intended hook API, we end up with our theme hook looking like this:
```js
import { useState } from "react"

export default function(){
  const [theme, setTheme] = useState("dark") //highlight-line

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
     setTheme(newTheme)
  }

  document.body.className = theme
  
  return [theme, toggleTheme]
}
```
This allows us to use `theme` anywhere we want, and it will reactively toggle whenever we call `toggleTheme()`. If our toggle logic gets more complicated (it will), we just update `toggleTheme()`.

## Adding local persistence

To fullfill our last requirement, let's add support for `localStorage`. All we'll need is `getItem()` and `setItem()`.

To make the hook easily configurable, we'll add a `LOCAL_THEME_KEY` constant at the top. And while we're at it, we may as well create a `DEFAULT_THEME` and `ALTERNATE_THEME`. Doing so, we end up with something like this:
```js
import { useState } from "react"

const LOCAL_THEME_KEY = "preferredTheme"
const DEFAULT_THEME = "dark"
const ALTERNATE_THEME = "light"

export default function(){
  const localTheme = return window.localStorage.getItem(LOCAL_THEME_KEY) || DEFAULT_THEME //highlight-line
  const [theme, setTheme] = useState(localTheme)

  const toggleTheme = () => {
    const newTheme = theme === DEFAULT_THEME ? ALTERNATE_THEME : DEFAULT_THEME
    setTheme(newTheme)
    window.localStorage.setItem(LOCAL_THEME_KEY, newTheme) //highlight-line
  }

  document.body.className = theme
  
  return [theme, toggleTheme]
}
```
And now you have a working hook that will provide a `theme` variable and a simple function call that will toggle the `theme` everytime its called. Neat!

When I was developing this locally, the code above worked just fine. And if you plan to deploy the code as part of a client side application, you're good to go. However, when I went to deploy my [Gatsby.js](https://gatsbyjs.org) app, I got deploy error stating that `window` was not defined. 

## Making it work with SSR

Oh, crap. One of the benefits of Gatsby, is that all your pages are rendered by the server before shipping to the client, so when your pages are being built, any client-side browser globals (like `window` or `document`) you're accustomed to will result in errors. In hindsight, this makes sense. 

So what do we do? Luckily, the build error points us to a [debug page](https://www.gatsbyjs.org/docs/debugging-html-builds/) that gives us some ways to deal with such errors. It seems like all we need to do is check for those globals before we use them. Since our one-line actions are going to become more complex with these changes, I'm going to factor them out into functions so the main hook logic remains clean and simple:
```js
import { useState } from "react"

const LOCAL_THEME_KEY = "preferredTheme"
const DEFAULT_THEME = "dark"
const ALTERNATE_THEME = "light"

function getLocalTheme() {
  return typeof window !== `undefined` //highlight-line
    ? window.localStorage.getItem(LOCAL_THEME_KEY)
    : DEFAULT_THEME
}

function setLocalTheme(newTheme) {
  if (typeof window !== `undefined`) { //highlight-line
    window.localStorage.setItem(LOCAL_THEME_KEY, newTheme)
  }
}

function setBodyClass(newClass) {
  if (typeof document !== `undefined`) { //highlight-line
    document.body.className = newClass
  }
}

export default function(){
  const localTheme = getLocalTheme()
  const [theme, setTheme] = useState(localTheme)

  const toggleTheme = () => {
    const newTheme = theme === DEFAULT_THEME ? ALTERNATE_THEME : DEFAULT_THEME
    setTheme(newTheme)
    setLocalTheme(newTheme)
  }

  setBodyClass(newTheme)
  
  return [theme, toggleTheme]
}
```
With our latest changes pushed, our deploy is successful! 
