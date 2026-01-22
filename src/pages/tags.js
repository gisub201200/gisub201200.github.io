import React, { useMemo } from "react"
import _ from "lodash"
import styled from "styled-components"
import SEO from "components/SEO"
import filter from "lodash/filter"

import { graphql } from "gatsby"

import queryString from "query-string"

import Layout from "components/Layout"
import Title from "components/Title"
import TagList from "components/TagList"
import PostList from "components/PostList"
import VerticleSpace from "components/VerticalSpace"

import { title, description, siteUrl } from "../../blog-config"

const TagListWrapper = styled.div`
  grid-column: 1 / -1;
  margin-top: 20px;
`

const TagsPage = ({ data, location }) => {
  const tags = _.sortBy(data.allMarkdownRemark.group, ["totalCount"]).reverse()
  const posts = data.allMarkdownRemark.nodes

  const search = location?.search || ""
  const selected = useMemo(() => queryString.parse(search)["q"], [search])
  const filteredPosts = useMemo(() => {
    if (!selected) return posts

    return filter(
      posts,
      post => post.frontmatter.tags.indexOf(selected) !== -1
    )
  }, [posts, selected])

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />

      <TagListWrapper>
        {selected ? (
          <Title size="sm">
            #{selected} 검색 결과 {filteredPosts.length}개
          </Title>
        ) : (
          <Title size="sm">
            전체 태그 {tags.length}개
          </Title>
        )}

        <TagList
          count
          tagList={tags}
          selected={selected}
        />
      </TagListWrapper>

      <VerticleSpace size={32} />

      <PostList postList={filteredPosts} />
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
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
          tags
          thumbnail
        }
      }
    }
  }
`
