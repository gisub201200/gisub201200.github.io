import React, { useState, useEffect } from "react"
import styled from "styled-components"
import _ from "lodash"

import { Link, withPrefix } from "gatsby"

import Title from "components/Title"
import Divider from "components/Divider"
import TagList from "components/TagList"

const PostListWrapper = styled.div`
  @media (max-width: 860px) {
    padding: 0 10px;
  }
`

const PostWrapper = styled.div`
  position: relative;
  top: 0;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 860px) {
    padding: 0 5px;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`

const ThumbnailLink = styled(Link)`
  flex: 0 0 168px;
  height: 104px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  display: block;

  @media (max-width: 860px) {
    width: 100%;
    height: 180px;
  }
`

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.tertiaryText};
  font-size: 28px;
  font-weight: bold;
`

const PostContent = styled.div`
  flex: 1;
  min-width: 0;
`

const Date = styled.p`
  margin-bottom: 16px;
  font-size: 14.4px;
  color: ${props => props.theme.colors.tertiaryText};
`

const Excerpt = styled.p`
  margin-bottom: 32px;
  line-height: 1.7;
  font-size: 16px;
  color: ${props => props.theme.colors.secondaryText};
  word-break: break-all;
`

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  )
}

const extractFirstImage = html => {
  if (!html) return null
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : null
}

const DEFAULT_THUMBNAIL = "/thumbnail.png"

const normalizeThumbnail = thumbnail => {
  if (!thumbnail) return null
  if (/^https?:\/\//i.test(thumbnail)) return thumbnail

  const normalized = thumbnail.startsWith("/")
    ? thumbnail
    : `/${thumbnail.replace(/^\.?\//, "")}`
  return withPrefix(normalized)
}

const PostList = ({ postList }) => {
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
    <PostListWrapper>
      {postList.slice(0, postCount).map((post, i) => {
        const { title, description, date, tags, thumbnail } = post.frontmatter
        const { excerpt, html } = post
        const { slug, thumbnail: resolvedThumbnail } = post.fields
        const fallbackThumbnail = extractFirstImage(html)
        const thumbnailUrl = normalizeThumbnail(
          resolvedThumbnail || thumbnail || fallbackThumbnail || DEFAULT_THUMBNAIL
        )

        return (
          <React.Fragment key={slug}>
            <PostWrapper>
              <ThumbnailLink to={slug} aria-label={`${title} 썸네일`}>
                <ThumbnailImage src={thumbnailUrl} alt={`${title} 썸네일`} />
              </ThumbnailLink>
              <PostContent>
                <TagList tagList={tags} />
                <Title size="md">
                  <Link to={slug}>{title}</Link>
                </Title>
                <Date>{date}</Date>
                {description ? (
                  <Excerpt>{description}</Excerpt>
                ) : (
                  <Excerpt>{excerpt}</Excerpt>
                )}
              </PostContent>
            </PostWrapper>

            {postCount - 1 !== i && postList.length - 1 !== i && (
              <Divider mt="48px" mb="32px" />
            )}
          </React.Fragment>
        )
      })}
    </PostListWrapper>
  )
}

export default PostList
