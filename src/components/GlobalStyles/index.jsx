import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.bodyBackground};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSizes.md};
    line-height: ${props => props.theme.lineHeights.relaxed};
    letter-spacing: 0.01em;
    word-break: keep-all;
    overflow-wrap: break-word;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    background-image: ${props =>
      props.theme.name === "dark"
        ? `radial-gradient(rgba(255, 244, 225, 0.04) 0.45px, transparent 0.45px),
           linear-gradient(120deg, rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0))`
        : `radial-gradient(rgba(35, 28, 20, 0.035) 0.45px, transparent 0.45px),
           linear-gradient(120deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))`};
    background-size: 14px 14px, 100% 100%;
    background-attachment: fixed;
  }

  a {
    color: ${props => props.theme.colors.hrefLink};
  }

  ::selection {
    background: ${props => props.theme.colors.accentMuted};
    color: ${props => props.theme.colors.hoveredLinkText};
  }
`

export default GlobalStyles
