import React from "react"
import styled from "styled-components"

const Wrapper = styled.h1`
  margin-bottom: 24px;
  font-size: ${props => props.size};
  font-weight: 600;
  line-height: 1.4;
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.boldText};
  word-break: keep-all;

  & > a {
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
  }

  & > a:hover {
    color: ${props => props.theme.colors.secondaryText};
  }
`

const Title = ({ size, children }) => {
  const sizes = {
    sm: "18px",
    md: "26px",
    bg: "32px",
  }

  return <Wrapper size={sizes[size]}> {children} </Wrapper>
}

export default Title
