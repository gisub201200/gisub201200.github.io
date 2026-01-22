import React, { useEffect, useMemo, useState } from "react"
import { Link } from "gatsby"
import { useSelector } from "react-redux"
import styled, { useTheme } from "styled-components"
import { Utterances } from "utterances-react-component"

import { utterances } from "../../../../blog-config"

import MDSpinner from "react-md-spinner"

import Divider from "components/Divider"
import Bio from "components/Bio"

const PostListSection = styled.section`
  grid-column: 1 / -1;
  margin-bottom: 56px;

  @media (max-width: 860px) {
    grid-column: 1 / -1;
  }
`

const PostListHeader = styled.h3`
  margin-bottom: 20px;
  font-size: 15px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.ui};
  color: ${props => props.theme.colors.secondaryText};
`

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const PostItem = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 84px;
  gap: 16px;
  align-items: center;
  padding: 14px 0;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  transition: transform 0.2s;

  &:hover {
    transform: translateX(4px);
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr 72px;
  }
`

const PostTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.text};
  line-height: 1.4;
`

const PostMeta = styled.div`
  margin-top: 6px;
  font-size: 12.8px;
  color: ${props => props.theme.colors.tertiaryText};
`

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
`

const PageButton = styled.button`
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  border-radius: ${props => props.theme.radii.sm};
  border: 1px solid ${props => props.theme.colors.heroBorder};
  background: ${props =>
    props.active ? props.theme.colors.accent : "transparent"};
  color: ${props =>
    props.active ? props.theme.colors.hoveredLinkText : props.theme.colors.text};
  font-size: 12px;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    transform: translateY(-1px);
    border-color: ${props => props.theme.colors.accent};
  }
`

const PostThumb = styled.div`
  width: 84px;
  height: 84px;
  border-radius: ${props => props.theme.radii.sm};
  border: 1px solid ${props => props.theme.colors.heroBorder};
  background-color: ${props => props.theme.colors.background};
  background-image: ${props => (props.image ? `url(${props.image})` : "none")};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 18px;
  color: ${props => props.theme.colors.accent};

  @media (max-width: 860px) {
    width: 72px;
    height: 72px;
  }
`

const CommentWrapper = styled.div`
  grid-column: 1 / -1;
  @media (max-width: 860px) {
    padding: 0 15px;
  }
`

const SpinnerWrapper = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HiddenWrapper = styled.div`
  height: ${props => (props.isHidden ? "0px" : "auto")};
  overflow: ${props => (props.isHidden ? "hidden" : "auto")};
`

const extractFirstImage = html => {
  if (!html) return null
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : null
}

const DEFAULT_THUMBNAIL = "/thumbnail.png"

const Spinner = () => {
  const theme = useTheme()
  return (
    <SpinnerWrapper>
      <MDSpinner singleColor={theme.colors.spinner} />
    </SpinnerWrapper>
  )
}

const Comment = () => {
  const { theme } = useSelector(state => state.theme)
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false)
    }, 1500)
  }, [])

  return (
    <>
      {spinner && <Spinner />}

      <HiddenWrapper isHidden={spinner}>
        <HiddenWrapper isHidden={theme === "light"}>
          <Utterances
            repo={utterances.repo}
            theme={`github-dark`}
            issueTerm={utterances.type}
          />
        </HiddenWrapper>
        <HiddenWrapper isHidden={theme === "dark"}>
          <Utterances
            repo={utterances.repo}
            theme={`github-light`}
            issueTerm={utterances.type}
          />
        </HiddenWrapper>
      </HiddenWrapper>
    </>
  )
}

const Footer = ({ postList, listTitle = "같은 태그 글" }) => {
  const pageSize = 5
  const [page, setPage] = useState(1)
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((postList?.length || 0) / pageSize)),
    [postList?.length]
  )

  useEffect(() => {
    setPage(1)
  }, [postList?.length])

  const pagedPosts = useMemo(() => {
    if (!postList || postList.length === 0) return []
    const start = (page - 1) * pageSize
    return postList.slice(start, start + pageSize)
  }, [page, postList])

  return (
    <>
      {postList?.length > 0 && (
        <PostListSection>
          <PostListHeader>{listTitle}</PostListHeader>
          <PostList>
            {pagedPosts.map(post => {
                const image = extractFirstImage(post.html) || DEFAULT_THUMBNAIL
              return (
                <PostItem key={post.id} to={post.fields.slug}>
                  <div>
                    <PostTitle>{post.frontmatter.title}</PostTitle>
                    <PostMeta>{post.frontmatter.date}</PostMeta>
                  </div>
                  <PostThumb image={image}>
                    {!image && post.frontmatter.title?.slice(0, 1)}
                  </PostThumb>
                </PostItem>
              )
            })}
          </PostList>
          {totalPages > 1 && (
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => {
                const nextPage = index + 1
                return (
                  <PageButton
                    key={`page-${nextPage}`}
                    type="button"
                    active={page === nextPage}
                    onClick={() => setPage(nextPage)}
                  >
                    {nextPage}
                  </PageButton>
                )
              })}
            </Pagination>
          )}
        </PostListSection>
      )}
      <Bio />
      <CommentWrapper>
        <Divider mt="32px" />
        <Comment />
      </CommentWrapper>
    </>
  )
}

export default Footer
