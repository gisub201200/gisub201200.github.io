import React from "react"
import styled from "styled-components"

import Divider from "components/Divider"

const Wrapper = styled.div`
  grid-column: 1 / -1;
  margin-top: 0px;
`

const ArticleTitle = styled.h1`
  margin-bottom: 12px;
  line-height: 1.25;
  font-size: 34px;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.boldText};
`

const Header = ({ title }) => {
  return (
    <Wrapper>
      <ArticleTitle> {title} </ArticleTitle>
      <Divider mt="0" />
    </Wrapper>
  )
}

export default Header
