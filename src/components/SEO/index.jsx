import React from "react"
import { Helmet } from "react-helmet"
import { withPrefix } from "gatsby"
import { siteUrl } from "../../../blog-config"

const resolveOgImage = image => {
  if (!image) return `${siteUrl}og-image.png`
  if (/^https?:\/\//i.test(image)) return image

  const normalized = image.startsWith("/")
    ? image
    : `/${image.replace(/^\.?\//, "")}`
  const prefixed = withPrefix(normalized)

  return `${siteUrl.replace(/\/$/, "")}${prefixed}`
}

const SEO = ({ title, description, url, image }) => {
  const ogImage = resolveOgImage(image)

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={ogImage} />
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  )
}

export default SEO
