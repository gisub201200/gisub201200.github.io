import React from "react"
import {graphql} from "gatsby"

import Layout from "components/Layout"
import SEO from "components/SEO"
import PostList from "components/PostList"
import PageIndex from "components/PageIndex"
import Divider from "components/Divider"
import VerticalSpace from "components/VerticalSpace"

import {title, description, siteUrl} from "../../blog-config"

const PostPagination = ({data, pageContext}) => {

  const posts = data.paging.nodes
  const {currentPage, totalPage} = pageContext // 현재 페이지와 총 페이지 수

  if (posts.length === 0) {
    return (
        <p>
          No blog posts found. Add markdown posts
          to &quot;content/blog&quot; (or
          the directory you specified for
          the &quot;gatsby-source-filesystem&quot;
          plugin in gatsby-config.js).
        </p>
    )
  }

  return (
      <Layout>
        <SEO title={title} description={description} url={siteUrl}/>
        <VerticalSpace size={4}/>
        <PostList postList={posts} />
        <Divider/>
        <PageIndex currentPage={currentPage} totalPage={totalPage} />
      </Layout>
  )
}
export default PostPagination

export const pageQuery = graphql`
    query BlogPostBySlug($skip: Int!) {
        paging: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            skip: $skip
            limit: 10
        ){
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
