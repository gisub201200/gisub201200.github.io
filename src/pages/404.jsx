import React from "react"
import styled from "styled-components"

import Layout from "components/Layout"
import SEO from "components/SEO"

import { title, description, siteUrl } from "../../blog-config"

const NotFound = styled.div`
  grid-column: 1 / -1;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.tertiaryText};

  & > h2 {
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 42px;
    font-family: ${props => props.theme.fonts.heading};
  }

  & > h3 {
    font-weight: 400;
    font-size: 22px;
  }

  @media (max-width: 860px) {
    height: 300px;
  }
`

const NotFoundPage = () => (
  <Layout>
    <SEO title={title} description={description} url={siteUrl} />
    <NotFound>
      <h2>404</h2>
      <h3>찾는 페이지가 없습니다.</h3>
    </NotFound>
  </Layout>
)

export default NotFoundPage
