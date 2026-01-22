import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const TagListWrapper = styled.div`
  margin-bottom: ${props => (props.compact ? "0" : "16px")};
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-family: ${props => props.theme.fonts.ui};
`

const TagLink = styled.div`
  display: inline-block;
  padding: 6px 10px;
  border-radius: ${props => props.theme.radii.sm};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props =>
    props.selected
      ? props.theme.colors.selectedTagBackground
      : props.theme.colors.tagBackground};
  color: ${props =>
    props.selected
      ? props.theme.colors.selectedTagText
      : props.theme.colors.tagText};
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 0.06em;
  transition: all 0.2s;

  &:hover {
    background-color: ${props =>
      props.selected
        ? props.theme.colors.hoveredSelectedTagBackground
        : props.theme.colors.hoveredTagBackground};
  }
`

const spaceToDash = text => {
  return text.replace(/\s+/g, "-")
}

const encodeTag = tag => encodeURIComponent(tag)

const TagList = ({ tagList, count, selected, compact }) => {
  if (!tagList) return null

  if (!count) {
    return (
      <TagListWrapper compact={compact}>
        {tagList.map((tag, i) => (
          <Link
            key={JSON.stringify({ tag, i })}
            to={`/tags/?q=${encodeTag(tag)}`}
          >
            <TagLink>{spaceToDash(tag)}</TagLink>
          </Link>
        ))}
      </TagListWrapper>
    )
  }

  return (
    <TagListWrapper compact={compact}>
      {tagList.map((tag, i) => (
        <Link
          key={JSON.stringify({ tag, i })}
          to={
            selected === tag.fieldValue
              ? "/tags/"
              : `/tags/?q=${encodeTag(tag.fieldValue)}`
          }
        >
          <TagLink selected={tag.fieldValue === selected}>
            {spaceToDash(tag.fieldValue)} ({tag.totalCount})
          </TagLink>
        </Link>
      ))}
    </TagListWrapper>
  )
}

export default TagList
