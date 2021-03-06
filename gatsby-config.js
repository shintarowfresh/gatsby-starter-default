module.exports = {
  siteMetadata: {
    title: `Candlin'`,
    author: `シンタロヲフレッシュ`,
    description: `A starter blog (AMP to PWA) demonstrating what Gatsby can do.`,
      siteUrl: `https://this-fire.life/`,
    social: {
      twitter: `shintarowfresh`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
          },
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: 800,
              height: 450
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
          // Setting a color is optional.
          color: `tomato`,
          // Disable the loading spinner.
          showSpinner: false,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
          trackingId: `UA-138619411-1`,
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
                  url: site.siteMetadata.siteUrl + 'posts' + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + 'posts' + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
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
            title: "candlin",
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Candlin'`,
        short_name: `Candlin`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#f1c945`,
        display: `minimal-ui`,
        icon: `content/assets/thisfire.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-html2amp',
      options: {
        files: ['posts/**/index.html', 'index.html'],
        gaConfigPath: 'gaConfig.json',
        dist: 'public/amp',
        serviceWorker: {
          src: 'https://gatsby-starter-blog-amp-to-pwa.netlify.com/sw.js',
          'data-iframe-src': 'https://gatsby-starter-blog-amp-to-pwa.netlify.com/amp-install-serviceworker.html',
          layout: 'nodisplay'
        }
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
