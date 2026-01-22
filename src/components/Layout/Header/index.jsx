import React, { useEffect, useRef, useState } from "react"
import styled, { useTheme } from "styled-components"

import { Link, navigate } from "gatsby"
import { useLocation } from "@reach/router"

import { title } from "../../../../blog-config"

import {
  FaSun,
  FaMoon,
  FaRss,
  FaSearch,
  FaArrowLeft,
} from "react-icons/fa"
import TextField from "components/TextField"

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.headerBackground};
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  box-shadow: 0 6px 12px ${props => props.theme.colors.headerShadow};
  backdrop-filter: blur(5px);
  transform: translateY(
    ${props => (props.isHidden ? "calc(-1 * var(--header-height))" : "0")}
  );
  opacity: ${props => (props.isHidden ? 0 : 1)};
  transition: transform 0.5s, opacity 0.5s;
  z-index: 999;
`

const HeaderInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin: 0 auto;
  padding: 2px 64px 2px;
  padding-left: calc(64px + var(--sidebar-width));
  max-width: 1400px;

  @media (max-width: 1024px) {
    padding: 2px 32px 2px;
    padding-left: calc(32px + var(--sidebar-width));
  }

  @media (max-width: 860px) {
    padding: 2px 18px;
    padding-left: 18px;
  }

  @media (max-width: 560px) {
    padding: 2px 14px;
  }
`

const MastheadRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 4px 0;
`

const TitleLink = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  display: inline-flex;
  align-items: center;
  font-size: 32px;
  line-height: 1;
  letter-spacing: 0.12em;
  color: ${props => props.theme.colors.boldText};
  text-decoration: none;
  justify-self: center;

  @media (max-width: 860px) {
    font-size: 24px;
    letter-spacing: 0.1em;
  }

  @media (max-width: 560px) {
    font-size: 20px;
  }
`

const ToolGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const LeftTools = styled(ToolGroup)`
  justify-self: start;
`

const RightTools = styled(ToolGroup)`
  justify-self: end;

  & a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: ${props => props.theme.radii.sm};
    text-decoration: none;
    color: ${props => props.theme.colors.icon};
    transition: color 0.2s, background 0.2s;
  }

  & a:hover {
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.tagBackground};
  }

  & svg {
    width: 18px;
    height: 18px;
  }
`

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: ${props => props.theme.radii.sm};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.icon};
  cursor: pointer;
  transition: color 0.2s, background 0.2s;

  & svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.tagBackground};
  }
`

const NavRow = styled.div`
  border-top: 1px solid ${props => props.theme.colors.divider};
  padding-top: 4px;
  max-height: ${props => (props.isCompact ? "0" : "40px")};
  opacity: ${props => (props.isCompact ? 0 : 1)};
  overflow: hidden;
  transition: max-height 0.25s ease, opacity 0.2s ease;
`

const NavList = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 18px;
  font-family: ${props => props.theme.fonts.ui};
  font-size: 14px;
  white-space: nowrap;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.scrollHandle};
    border-radius: 999px;
  }

  @media (max-width: 560px) {
    font-size: 13px;
    gap: 14px;
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  padding: 4px 2px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;

  &:hover,
  &.active {
    color: ${props => props.theme.colors.boldText};
    border-color: ${props => props.theme.colors.accent};
  }
`

const SearchSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0 6px;
`

const SearchButton = styled(IconButton)`
  background: none;
`

const DesktopOnly = styled.div`
  display: inline-flex;
  align-items: center;

  @media (max-width: 860px) {
    display: none;
  }
`

const MobileOnly = styled.div`
  display: inline-flex;
  align-items: center;

  @media (min-width: 861px) {
    display: none;
  }
`

const BackButton = styled(IconButton)`
  background: none;
`

const ToggleWrapper = styled.div`
  width: 20px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
`

const IconRail = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 36px;
  top: ${props => (props.theme === "light" ? "-10px" : "8px")};
  transition: top 0.4s;

  & > svg {
    transition: opacity 0.25s;
  }

  & > svg:first-child {
    opacity: ${props => (props.theme === "light" ? 0 : 1)};
  }

  & > svg:last-child {
    opacity: ${props => (props.theme === "dark" ? 0 : 1)};
  }
`

const Header = ({
  toggleTheme,
  isSearchPage = false,
}) => {
  const theme = useTheme()
  const location = useLocation()
  const headerRef = useRef(null)
  const [scrollY, setScrollY] = useState()
  const [hidden, setHidden] = useState(false)
  const [query, setQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  const navItems = ["한자성어", "한자어휘", "고사성어", "한자학습"]

  useEffect(() => {
    const handleScroll = () => {
      setHidden(false)
      setScrollY(window.scrollY)
      setIsCompact(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const search = location?.search || ""
    const params = new URLSearchParams(search)
    const nextQuery = params.get("q") || ""
    setQuery(nextQuery)
  }, [location?.search])

  const handleSearchSubmit = () => {
    const trimmed = query.trim()
    const target = trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search"
    navigate(target)
    setIsSearchOpen(false)
  }

  const handleSearchKeyDown = event => {
    if (event.key !== "Enter") return
    handleSearchSubmit()
  }

  const showSearch = isSearchPage || isSearchOpen

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (!headerRef.current) return
      const nextHeight = `${headerRef.current.offsetHeight}px`
      document.documentElement.style.setProperty("--header-height", nextHeight)
    }

    updateHeaderHeight()
    window.addEventListener("resize", updateHeaderHeight)

    let observer
    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      observer = new ResizeObserver(() => updateHeaderHeight())
      observer.observe(headerRef.current)
    }
    return () => {
      window.removeEventListener("resize", updateHeaderHeight)
      if (observer) observer.disconnect()
    }
  }, [showSearch])

  return (
    <HeaderWrapper ref={headerRef} isHidden={hidden}>
      <HeaderInner>
        {showSearch ? (
          <SearchSlot>
            <BackButton
              type="button"
              onClick={() =>
                isSearchPage ? navigate(-1) : setIsSearchOpen(false)
              }
              aria-label="뒤로가기"
            >
              <FaArrowLeft />
            </BackButton>
            <TextField
              autoFocus
              value={query}
              onChange={event => setQuery(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="한자, 뜻, 예문 검색"
              aria-label="한자교실 검색"
            />
            <SearchButton
              type="button"
              onClick={handleSearchSubmit}
              aria-label="검색"
            >
              <FaSearch />
            </SearchButton>
          </SearchSlot>
        ) : (
          <>
            <MastheadRow>
              <LeftTools>
                <MobileOnly>
                  <SearchButton
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="검색"
                  >
                    <FaSearch />
                  </SearchButton>
                </MobileOnly>
              </LeftTools>
              <TitleLink to="/">{title}</TitleLink>
              <RightTools>
                <ToggleWrapper>
                  <IconRail theme={theme.name}>
                    <FaSun onClick={toggleTheme} />
                    <FaMoon onClick={toggleTheme} />
                  </IconRail>
                </ToggleWrapper>
                <DesktopOnly>
                  <SearchButton
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="검색"
                  >
                    <FaSearch />
                  </SearchButton>
                </DesktopOnly>
                <DesktopOnly>
                  <Link to="/rss.xml" aria-label="RSS">
                    <FaRss />
                  </Link>
                </DesktopOnly>
              </RightTools>
            </MastheadRow>
            <NavRow isCompact={isCompact}>
              <NavList>
                {navItems.map(item => (
                  <NavLink
                    key={item}
                    to={`/tags?q=${encodeURIComponent(item)}`}
                    activeClassName="active"
                  >
                    {item}
                  </NavLink>
                ))}
              </NavList>
            </NavRow>
          </>
        )}
      </HeaderInner>
    </HeaderWrapper>
  )
}

export default Header
