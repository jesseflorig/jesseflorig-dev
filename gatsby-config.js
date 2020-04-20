module.exports = {
  siteMetadata: {
    title: `jesseflorig.dev`,
    author: `Jesse Florig`,
    description: `A personal dev blog`,
    siteUrl: `https://jesseflorig.dev`,
    social: {
      twitter: `jesseflorig`,
      github: `jesseflorig`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-acronyms`,
            options: {
              acronyms: {
                a11y: `accessibility`,
                CSS: `Cascading Style Sheets`,
                HTML: `Hypertext Markup Language`,
                i18n: `internationalization`,
                JS: `JavaScript`,
                OBE: `Overcome By Events`,
                TBD: `To Be Determined`,
              },
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: {
                sh: "bash",
                js: "javascript",
              },
              inlineCodeMarker: `±`, // OPT + SHIFT + '='
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-47568220-3`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "JESSEFLORIG.DEV - RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `jesseflorig.dev`,
        short_name: `jesseflorig.dev`,
        start_url: `/`,
        background_color: `#444444`,
        theme_color: `#444444`,
        display: `minimal-ui`,
        icon: `src/assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
