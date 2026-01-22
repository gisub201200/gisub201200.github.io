import styled from "styled-components"

import Header from "./Header"
import Series from "./Series"
import Body from "./Body"
import Footer from "./Footer"

const Article = styled.article`
  grid-column: 1 / -1;
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

Article.Header = Header
Article.Series = Series
Article.Body = Body
Article.Footer = Footer

export default Article
