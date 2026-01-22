import React from "react"
import styled from "styled-components"
const BodyWrapper = styled.div`
  margin: 0 auto;
  padding: 34px 64px 80px;
  max-width: 1200px;
  @media (max-width: 1024px) {
    padding: 30px 32px 72px;
  }
  @media (max-width: 860px) {
    padding: 24px 18px 64px;
  }
  @media (max-width: 560px) {
    padding: 22px 14px 56px;
  }
`

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 24px;
  row-gap: 32px;

  @media (max-width: 1024px) {
    column-gap: 20px;
  }

  @media (max-width: 860px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const Body = ({ children }) => {
  return (
    <BodyWrapper>
      <Main>{children}</Main>
    </BodyWrapper>
  )
}

export default Body
