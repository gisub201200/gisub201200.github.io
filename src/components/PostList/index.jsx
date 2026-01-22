import React, { useState, useEffect } from "react"
import styled from "styled-components"
import _ from "lodash"

import { Link } from "gatsby"

import TagList from "components/TagList"

const PostListWrapper = styled.div`
  grid-column: ${props => props.span || "1 / -1"};
  display: grid;
  gap: 28px;
`

const PostCard = styled.article`
  position: relative;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  padding: 24px 28px;
  border-radius: ${props => props.theme.radii.sm};
  box-shadow: ${props => props.theme.shadows.subtle};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.soft};
  }

  @media (max-width: 860px) {
    padding: 20px 20px;
  }
`

const CardHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`

const WordBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const WordLink = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 26px;
  line-height: 1.35;
  color: ${props => props.theme.colors.boldText};
  text-decoration: none;
  letter-spacing: 0.01em;
`

const Meaning = styled.p`
  margin-bottom: 18px;
  font-size: 17px;
  line-height: 1.8;
  color: ${props => props.theme.colors.secondaryText};
  word-break: keep-all;
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`

const ReadLink = styled(Link)`
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.ui};
`

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  )
}

const PostList = ({ postList, span }) => {
  const [postCount, setPostCount] = useState(10)

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && postCount < postList.length) {
      setTimeout(() => setPostCount(postCount + 10), 300)
    }
  }, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad)

    return () => {
      window.removeEventListener("scroll", handleMoreLoad)
    }
  }, [postCount, postList])

  useEffect(() => {
    setPostCount(10)
  }, [postList])

  return (
    <PostListWrapper span={span}>
      {postList.slice(0, postCount).map((post, i) => {
        const { title, description, tags } = post.frontmatter
        const { excerpt } = post
        const { slug } = post.fields
        const meaning = description || excerpt
        return (
          <React.Fragment key={slug}>
            <PostCard>
              <CardHeader>
                <WordBlock>
                  <WordLink to={slug}>{title}</WordLink>
                </WordBlock>
              </CardHeader>
              <Meaning>{meaning}</Meaning>
              <MetaRow>
                <TagList tagList={tags} compact />
                <ReadLink to={slug}>자세히 보기</ReadLink>
              </MetaRow>
            </PostCard>

          </React.Fragment>
        )
      })}
    </PostListWrapper>
  )
}

export default PostList
