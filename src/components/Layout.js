import React from "react"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          marginBottom: rhythm(1.5),
          marginTop: 0,
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
    )
  } else {
    header = (
      <h3
        style={{
          marginTop: 0,
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
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer style={{ display: `flex`, justifyContent: `space-between` }}>
        <div
          style={{
            display: `flex`,
            justifyContent: `space-between`,
            width: `17em`,
          }}
        >
          <a href="https://twitter.com/jesseflorig">Twitter</a>
          <a href="https://github.com/jesseflorig">GitHub</a>
          <a href="https://stackoverflow.com/users/152493/jesse">
            StackOverflow
          </a>
        </div>
        <div>
          <a href="https://jesseflorig.dev/rss.xml">RSS</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout