import React from "react"
import styled from "styled-components"

import { title } from "../../../../blog-config"

const FooterWrapper = styled.footer`
  //margin-top: 32px;
  margin-top: auto;
  padding: 40px 0;
  border-top: 1px solid ${props => props.theme.colors.divider};
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.04em;
  font-family: ${props => props.theme.fonts.ui};
  color: ${props => props.theme.colors.secondaryText};

  & > a {
    color: ${props => props.theme.colors.accent};
  }
`

const Footer = () => {
  return (
    <FooterWrapper>
      © {title}. 한자어의 결을 천천히 읽는 아카이브.
    </FooterWrapper>
  )
}

export default Footer
