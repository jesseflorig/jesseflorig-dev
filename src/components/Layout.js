import React from "react"
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"
import ThemeToggle from "./ThemeToggle"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  const header =
    location.pathname === rootPath ? (
      <h1
        style={{
          margin: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    ) : (
      <h3
        style={{
          margin: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header
        style={{
          display: `flex`,
          alignItems: `flex-st`,
          justifyContent: `space-between`,
          marginBottom: `2em`,
        }}
      >
        {header}
        <ThemeToggle />
      </header>
      <main>{children}</main>
      <footer
        style={{
          display: `flex`,
          justifyContent: `space-between`,
        }}
      >
        <div
          style={{
            display: `flex`,
            justifyContent: `space-between`,
            width: `17em`,
          }}
        >
          <a href="https://twitter.com/jesseflorig" target="_new">
            Twitter
          </a>
          <a href="https://github.com/jesseflorig" target="_new">
            GitHub
          </a>
          <a href="https://stackoverflow.com/users/152493/jesse" target="_new">
            StackOverflow
          </a>
        </div>
        <div>
          <a href="https://jesseflorig.dev/rss.xml" target="_new">
            RSS
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
