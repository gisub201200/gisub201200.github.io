/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="adsbygoogle"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1472895926659868"
      crossOrigin="anonymous"
    />,
  ])
}
