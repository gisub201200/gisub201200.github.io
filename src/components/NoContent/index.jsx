import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 150px;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.tertiaryText};
`

const NoContent = ({ name }) => <Wrapper>{name} 콘텐츠가 없습니다.</Wrapper>

export default NoContent
