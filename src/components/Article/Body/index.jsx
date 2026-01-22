import React from "react"
import styled from "styled-components"

import StyledMarkdown from "./StyledMarkdown"
import PrismTheme from "./PrismTheme"

const Wrapper = styled.div`
  grid-column: 1 / -1;
  position: relative;
  margin-bottom: 112px;
  font-size: 17px;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 24px;

  @media (max-width: 860px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  @media (max-width: 560px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const HanjaCard = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 32px;
  margin: 0 0 32px;
  border-radius: ${props => props.theme.radii.md};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.theme.shadows.subtle};
  font-family: ${props => props.theme.fonts.heading};
  font-size: 72px;
  letter-spacing: 0.12em;
  color: ${props => props.theme.colors.boldText};
  text-align: center;

  @media (max-width: 860px) {
    font-size: 58px;
    padding: 24px 24px;
  }

  @media (max-width: 560px) {
    font-size: 46px;
    padding: 20px 18px;
  }
`

const Body = ({ html, thumbnailHanja }) => {
  return (
    <Wrapper>
      <PrismTheme />

      {thumbnailHanja && <HanjaCard>{thumbnailHanja}</HanjaCard>}
      <StyledMarkdown
        id="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
      />
    </Wrapper>
  )
}

export default Body
