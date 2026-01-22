import React from "react"
import { graphql } from "gatsby"

import styled from "styled-components"

import Layout from "components/Layout"
import SEO from "components/SEO"
import PostList from "components/PostList"
import Divider from "components/Divider"

import { description, siteUrl } from "../../blog-config"

const Header = styled.div`
  grid-column: 1 / -1;
`

const Title = styled.h1`
  margin-bottom: 12px;
  line-height: 1.25;
  font-size: 34px;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.boldText};
  word-break: keep-all;
`

const Subtitle = styled.h3`
  display: inline-block;
  padding: 4px 8px;
  margin-top: 20px;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.secondaryText};
  letter-spacing: 0.08em;
  font-family: ${props => props.theme.fonts.ui};
`

const SeriesInform = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${props => props.theme.colors.secondaryText};
  font-family: ${props => props.theme.fonts.ui};

  & > span {
    margin: 0 3px;
  }
`

const Date = styled.span`
  color: ${props => props.theme.colors.tertiaryText};
  font-weight: lighter;
`

const Series = ({ pageContext, data }) => {
  const seriesName = pageContext.series
  const posts = data.posts.nodes

  return (
    <Layout>
      <SEO
        title={`SERIES: ${seriesName}`}
        description={description}
        url={siteUrl}
      />

      <Header>
        <Subtitle>연재</Subtitle>
        <Title> {seriesName} </Title>

        <SeriesInform>
          <span>글 {posts.length}편</span>
          <span>·</span>
          <Date>
            최신 업데이트 {posts[posts.length - 1].frontmatter.date}
          </Date>
        </SeriesInform>

        <Divider />
      </Header>

      <PostList postList={posts} />
    </Layout>
  )
}

export default Series

export const pageQuery = graphql`
  query BlogSeriesBySeriesName($series: String) {
    posts: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
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
