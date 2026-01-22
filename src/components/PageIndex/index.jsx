import React from "react"
import {Link} from "gatsby"
import styled from "styled-components";

// 스타일드 컴포넌트를 사용하여 스타일 정의
const PageIndexContainer = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 48px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.ui};
  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

const PageLink = styled(Link)`
  text-decoration: none;
  margin: 0 4px;
  padding: 6px 10px;
  border: 1px solid transparent;
  border-radius: ${props => props.theme.radii.sm};
  transition: background-color 0.3s, color 0.3s;
  color: ${props => props.theme.colors.text};

  &:hover {
    text-decoration: none;
    border-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
  }
`;

const CurrentPageLink = styled(PageLink)`
  border-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.accent};
`;

const PageIndex = ({currentPage, totalPage}) => {
  const indexSize = 5
  const pageNumbers = Array.from({length: totalPage}, (_, i) => i + 1)
  const startPage = Math.min(Math.max(1, currentPage - 2),
      totalPage - indexSize >=1 ? totalPage - indexSize : 1)
  const endPage = Math.min(startPage + indexSize - 1, totalPage)

  return (
      <PageIndexContainer>
        {currentPage > 3 && totalPage > indexSize && (
            <PageLink to={currentPage === 2 ? "/" : `/page/${currentPage - 1}`}>
              &lt;
            </PageLink>
        )}
        {pageNumbers.slice(startPage - 1, endPage).map((number) => {
          const target = number === 1 ? "/" : `/page/${number}`
          return number === currentPage ? (
            <CurrentPageLink key={number} to={target}>
              {number}
            </CurrentPageLink>
          ) : (
            <PageLink key={number} to={target}>
              {number}
            </PageLink>
          )
        })}
        {currentPage < totalPage - 3 && totalPage > indexSize && (
            <PageLink to={`/page/${currentPage + 1}`}>&gt;</PageLink>
        )}
      </PageIndexContainer>
  )
}

export default PageIndex
