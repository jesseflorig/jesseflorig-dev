import React from "react"
import { Link, graphql } from "gatsby"
import { formatReadingTime } from "../utils/formatUtils"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { slug } = post.fields
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://jesseflorig.dev${slug}`
  )}`
  const editUrl = `https://github.com/jesseflorig/jesseflorig-dev/edit/master/src/pages/${slug.slice(
    1,
    slug.length - 1
  )}/index.md`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {`${post.frontmatter.date} – `}
            {formatReadingTime(post.timeToRead)}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer>
          <a href={discussUrl}>Discuss on Twitter</a>
          <a href={editUrl} style={{ marginLeft: "1em" }}>
            Edit on GitHub
          </a>
        </footer>
        <hr
          style={{
            marginTop: rhythm(1 / 2),
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            margin: "1em 0",
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <>
                <small>Previous post:</small>
                <h3>
                  <Link to={previous.fields.slug} rel="prev">
                    {previous.frontmatter.title}
                  </Link>
                </h3>
              </>
            )}
          </li>
          <li>
            {next && (
              <>
                <small>Up next:</small>
                <h3>
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title}
                  </Link>
                </h3>
              </>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
