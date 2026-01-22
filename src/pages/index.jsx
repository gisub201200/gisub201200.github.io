import React from "react"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import SEO from "components/SEO"
import PostList from "components/PostList"
import Divider from "components/Divider"
import VerticalSpace from "components/VerticalSpace"

import { title, description, siteUrl } from "../../blog-config"
import PageIndex from "../components/PageIndex";

const BlogIndex = ({ data }) => {
  const posts = data.paging.nodes
  const totalPosts = data.totalMarkdown.nodes.length
  const postPerPage = 10
  const totalPage = Math.max(1, Math.ceil(totalPosts / postPerPage))

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to &quot;content/blog&quot; (or
        the directory you specified for the &quot;gatsby-source-filesystem&quot;
        plugin in gatsby-config.js).
      </p>
    )
  }

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      <VerticalSpace size={4} />
      <PostList postList={posts} />
      <Divider/>
      <PageIndex currentPage={1} totalPage={totalPage} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        paging : allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC } limit: 10) {
            nodes {
                excerpt(pruneLength: 200, truncate: true)
                html
                fields {
                    slug
                    thumbnail
                }
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    update(formatString: "MMM DD, YYYY")
                    title
                    description
                    tags
                    thumbnail
                }
            }
        }

        totalMarkdown: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
        ){
            nodes{
                fields {
                    slug
                }
            }
        }
    }
`
