const urljoin = require("url-join");
const path = require("path");
const config = require("./static/SiteConfig");

// Make sure that pathPrefix is not empty
const validatedPathPrefix = config.pathPrefix === "" ? "/" : config.pathPrefix;

module.exports = {
  pathPrefix: validatedPathPrefix,
  siteMetadata: {
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(config.siteUrl, config.pathPrefix)}/favicon.png`,
      copyright: config.copyright,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          // posts: require.resolve("./src/components/posts-layout.js"),
          default: require.resolve("./src/templates/default.jsx"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 690,
              showCaptions: true,
            },
          },
          "gatsby-remark-responsive-iframe",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-prismjs",
          "gatsby-remark-unwrap-images",
        ],
      },
    },
    {
      resolve: `gatsby-remark-autolink-headers`,
      options: {
        icon: false,
      },
    },
    // {
    //   resolve: "gatsby-plugin-page-creator",
    //   options: {
    //     path: `${__dirname}/src/posts`,
    //   },
    // },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-lodash",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor,
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-twitter",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-use-dark-mode",
      options: {
        minify: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icon: "static/favicon.svg",
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: path.resolve("src/netlifycms/index.js"), // default: undefined
        enableIdentityWidget: true,
        publicPath: "admin",
        htmlTitle: "Content Manager",
        includeRobots: false,
      },
    },
    // {
    //   resolve: "gatsby-plugin-feed",
    //   options: {
    //     setup(ref) {
    //       const ret = ref.query.site.siteMetadata.rssMetadata;
    //       ret.allMdx = ref.query.allMdx;
    //       ret.generator = "GatsbyJS Advanced Starter";
    //       return ret;
    //     },
    //     query: `
    //     {
    //       site {
    //         siteMetadata {
    //           rssMetadata {
    //             site_url
    //             feed_url
    //             title
    //             description
    //             image_url
    //             copyright
    //           }
    //         }
    //       }
    //     }
    //   `,
    //     feeds: [
    //       {
    //         serialize(ctx) {
    //           const { rssMetadata } = ctx.query.site.siteMetadata;
    //           return ctx.query.allMdx.edges.map((edge) => ({
    //             categories: edge.node.frontmatter.tags,
    //             date: edge.node.fields.date,
    //             title: edge.node.frontmatter.title,
    //             description: edge.node.excerpt,
    //             url: rssMetadata.site_url + edge.node.fields.slug,
    //             guid: rssMetadata.site_url + edge.node.fields.slug,
    //             custom_elements: [
    //               { "content:encoded": edge.node.html },
    //               { author: config.userEmail },
    //             ],
    //           }));
    //         },
    //         query: `
    //         {
    //           allMdx(
    //             limit: 1000,
    //             sort: { order: DESC, fields: [fields___date] },
    //           ) {
    //             edges {
    //               node {
    //                 excerpt
    //                 html
    //                 timeToRead
    //                 fields {
    //                   slug
    //                   date
    //                 }
    //                 frontmatter {
    //                   title
    //                   cover
    //                   date
    //                   category
    //                   tags
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       `,
    //         output: config.siteRss,
    //         title: config.siteRssTitle,
    //       },
    //     ],
    //   },
    // },
  ],
};
