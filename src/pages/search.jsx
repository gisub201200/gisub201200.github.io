import React, { useEffect, useMemo, useState } from "react"
import SEO from "components/SEO"
import { graphql } from "gatsby"
import queryString from "query-string"

import Layout from "components/Layout"
import PostList from "components/PostList"
import { title, description, siteUrl } from "../../blog-config"

const Search = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes

  const initialQuery = useMemo(() => {
    const parsed = queryString.parse(location?.search || "")
    return typeof parsed.q === "string" ? parsed.q : ""
  }, [location?.search])
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const filteredPosts = useMemo(() => {
    const lowerQuery = query.toLocaleLowerCase()
    return posts.filter(post => {
      const { frontmatter, rawMarkdownBody } = post
      const { title } = frontmatter

      if (rawMarkdownBody.toLocaleLowerCase().includes(lowerQuery)) return true

      return title.toLocaleLowerCase().includes(lowerQuery)
    })
  }, [posts, query])

  return (
    <Layout headerProps={{ isSearchPage: true }}>
      <SEO title={title} description={description} url={siteUrl} />
      <PostList postList={filteredPosts} />
    </Layout>
  )
}

export default Search

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        html
        fields {
          slug
          thumbnail
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
          thumbnail
        }
        rawMarkdownBody
      }
    }
  }
`
