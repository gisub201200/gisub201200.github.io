import React from "react"
import _ from "lodash"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.aside`
  grid-column: 9 / -1;
  position: sticky;
  top: 120px;
  align-self: start;
  font-size: 14px;
  padding: 16px 18px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.sm};
  background: ${props => props.theme.colors.surface};
  font-family: ${props => props.theme.fonts.ui};

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`

const Title = styled.div`
  margin-bottom: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: ${props => props.theme.colors.secondaryText};
`

const Tag = styled.li`
  margin-bottom: 10px;
  color: ${props => props.theme.colors.tertiaryText};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.theme.colors.text};
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
`

const SideTagList = ({ tags, postCount }) => {
  return (
    <Wrapper>
      <Title>태그</Title>
      <ul>
        <Tag>
          <Link to="/tags">전체 ({postCount})</Link>
        </Tag>
        {_.map(tags, tag => (
          <Tag key={tag.fieldValue}>
            <Link to={`/tags?q=${tag.fieldValue}`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </Tag>
        ))}
      </ul>
    </Wrapper>
  )
}

export default SideTagList
