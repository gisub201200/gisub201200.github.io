import React, { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux"
import { setLight, setDark } from "reducers/theme"

import { light, dark } from "assets/theme"

import GlobalStyles from "components/GlobalStyles"

import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  --sidebar-width: 0px;
  --header-height: 88px;

  @media (max-width: 860px) {
    --header-height: 80px;
  }

  @media (max-width: 560px) {
    --header-height: 72px;
  }
`;
const Layout = ({ children, headerProps }) => {
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.theme)

  let isSystemDarkMode = null
  if (typeof window !== "undefined") {
    isSystemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  let localTheme = null
  if (typeof localStorage !== "undefined") {
    localTheme = localStorage.getItem("theme")
  }

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    dispatch(nextTheme === "dark" ? setDark : setLight)
    localStorage.setItem("theme", nextTheme)
  }

  useEffect(() => {
    if (isSystemDarkMode && !localTheme)
      dispatch(isSystemDarkMode ? setDark : setLight)
    else if (localTheme) dispatch(localTheme === "dark" ? setDark : setLight)
  }, [])

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <PageWrapper>
      <Header
        toggleTheme={toggleTheme}
        {...headerProps}
      />
      <Body>
        {children}
      </Body>
      <Footer />
      </PageWrapper>
    </ThemeProvider>
  )
}

export default Layout
