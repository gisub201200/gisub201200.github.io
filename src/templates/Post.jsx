import React from "react"
import SEO from "components/SEO"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import Article from "components/Article"

import { siteUrl } from "../../blog-config"

const Post = ({ data }) => {
  if (!data?.markdownRemark) return null
  const post = data.markdownRemark
  const { seriesList, relatedPosts, recentPosts } = data

  const {
    title,
    date,
    update,
    tags,
    series,
    thumbnail,
    thumbnailHanja,
    keywords,
  } = post.frontmatter
  const { excerpt, html } = post
  const { readingTime, slug, thumbnail: resolvedThumbnail } = post.fields
  const extractFirstImage = htmlSource => {
    if (!htmlSource) return null
    const match = htmlSource.match(/<img[^>]+src=["']([^"']+)["']/i)
    return match ? match[1] : null
  }
  const fallbackThumbnail = extractFirstImage(html)
  const seoThumbnail = resolvedThumbnail || thumbnail || fallbackThumbnail

  let filteredSeries = []
  if (series !== null) {
    filteredSeries = seriesList.edges.map(seriesPost => {
      if (seriesPost.node.id === post.id) {
        return {
          ...seriesPost.node,
          currentPost: true,
        }
      } else {
        return {
          ...seriesPost.node,
          currentPost: false,
        }
      }
    })
  }

  const relatedList = relatedPosts.nodes.filter(node => node.id !== post.id)
  const fallbackList = recentPosts.nodes.filter(node => node.id !== post.id)
  const postList = relatedList.length > 0 ? relatedList : fallbackList
  const listTitle = relatedList.length > 0 ? "같은 태그 글" : "최근 글"

  return (
    <Layout>
      <SEO
        title={title}
        description={excerpt}
        url={`${siteUrl}${slug}`}
        image={seoThumbnail}
        keywords={keywords}
      />
      <Article>
        <Article.Header
          title={title}
          date={date}
          update={update}
          tags={tags}
          minToRead={Math.round(readingTime.minutes)}
        />
        {filteredSeries.length > 0 && (
          <Article.Series header={series} series={filteredSeries} />
        )}
        <Article.Body html={post.html} thumbnailHanja={thumbnailHanja} />
        <Article.Footer
          postList={postList}
          listTitle={listTitle}
        />
      </Article>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $series: String
    $tags: [String!]!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200, truncate: true)
      html
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMMM DD, YYYY")
          tags
          series
          thumbnail
          thumbnailHanja
          keywords
        }
      fields {
        slug
        thumbnail
        readingTime {
          minutes
        }
      }
    }
    seriesList: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: $tags } } }
      limit: 20
    ) {
      nodes {
        id
        html
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
    recentPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 20
    ) {
      nodes {
        id
        html
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
