import React from "react"
import styled from "styled-components"

import { FiSearch } from "react-icons/fi"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const Icon = styled.span`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  font-size: 18px;
  color: ${props => props.theme.colors.textFieldBorder};
  transition: all 0.2s;
`

const Input = styled.input.attrs({ type: "text" })`
  padding: 12px 16px 12px 46px;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.textFieldBorder};
  border-radius: ${props => props.theme.radii.sm};
  background-color: ${props => props.theme.colors.surface};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  box-sizing: border-box;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border: 1px solid ${props => props.theme.colors.textFieldActivatedBorder};
    box-shadow: 0 0 0 3px
      ${props =>
        props.theme.name === "dark"
          ? "rgba(208, 100, 85, 0.25)"
          : "rgba(163, 50, 43, 0.12)"};
  }

  &:focus + ${Icon} {
    color: ${props => props.theme.colors.textFieldActivatedBorder};
  }

  &::placeholder {
    color: ${props => props.theme.colors.tertiaryText};
  }
`

const TextField = ({ ...props }) => {
  return (
    <Wrapper>
      <Input {...props} />

      <Icon>
        <FiSearch />
      </Icon>
    </Wrapper>
  )
}

export default TextField
