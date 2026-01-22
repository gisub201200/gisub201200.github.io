import React from "react"
import styled from "styled-components"

import {
  FaKaggle,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaLink,
} from "react-icons/fa"

import { siteUrl, description, author, links } from "../../../blog-config"

const BioWrapper = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 24px;
  padding: 28px 32px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.sm};
  background: ${props => props.theme.colors.surface};

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 22px;
  }
`

const profileImageRoot =
  typeof window !== "undefined" && window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : siteUrl

const Profile = styled.div`
  flex: 0 0 auto;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.border};
  background-image: url(${profileImageRoot}/profile1.png);
  background-size: cover;
  background-position: center;
`

const Author = styled.div`
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.colors.boldText};
  font-family: ${props => props.theme.fonts.heading};
`

const Description = styled.div`
  margin-bottom: 12px;
  line-height: 1.7;
  font-size: 16px;
  color: ${props => props.theme.colors.secondaryText};
`

const LinksWrapper = styled.div`
  & a {
    margin-right: 9.6px;
  }

  & svg {
    width: 22px;
    height: 22px;
    cursor: pointer;
  }

  & svg path {
    fill: ${props => props.theme.colors.icon};
    transition: fill 0.3s;
  }

  & a:hover svg path {
    fill: ${props => props.theme.colors.text};
  }
`

const Link = ({ link, children }) => {
  if (!link) return null
  return (
    <a href={link} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

const Bio = () => {
  const { kaggle, instagram, facebook, linkedIn, etc } = links

  return (
    <BioWrapper id="bio">
      <Profile />
      <div>
        <Author>@{author}</Author>
        <Description>{description}</Description>
        <LinksWrapper>
          <Link link={kaggle}>
            <FaKaggle />
          </Link>
          <Link link={instagram}>
            <FaInstagram />
          </Link>
          <Link link={facebook}>
            <FaFacebook />
          </Link>
          <Link link={linkedIn}>
            <FaLinkedin />
          </Link>
          <Link link={etc}>
            <FaLink />
          </Link>
        </LinksWrapper>
      </div>
    </BioWrapper>
  )
}

export default Bio
