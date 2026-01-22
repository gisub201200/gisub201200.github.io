import React, { useState, useEffect } from "react"
import styled from "styled-components"
import _ from "lodash"

import { Link } from "gatsby"

import Title from "components/Title"
import Divider from "components/Divider"

const SeriesListWrapper = styled.div`
  grid-column: 1 / -1;
  margin-bottom: 60px;
`

const SeriesWrapper = styled.div`
  position: relative;
  top: 0;
  transition: all 0.5s;

  @media (max-width: 860px) {
    padding: 0 5px;
  }
`

const SeriesInform = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.tertiaryText};
  font-size: 13px;
  letter-spacing: 0.04em;

  & > span {
    margin: 0 5px;
  }
`

const Date = styled.p``

const PostCount = styled.p``

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  )
}

const SeriesList = ({ seriesList }) => {
  const [seriesCount, setSeriesCount] = useState(10)

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && seriesCount < seriesList.length) {
      setTimeout(() => setSeriesCount(seriesCount + 10), 300)
    }
  }, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad)

    return () => {
      window.removeEventListener("scroll", handleMoreLoad)
    }
  }, [seriesCount, seriesList])

  useEffect(() => {
    setSeriesCount(10)
  }, [seriesList])

  return (
    <SeriesListWrapper>
      {seriesList.slice(0, seriesCount).map((series, i) => {
        return (
          <React.Fragment key={series.name || i}>
            <SeriesWrapper>
              <Title size="bg">
                <Link to={`/series/${_.replace(series.name, /\s/g, "-")}`}>
                  {series.name}
                </Link>
              </Title>
              <SeriesInform>
                <PostCount>글 {series.posts.length}편</PostCount>
                <span>·</span>
                <Date>최신 업데이트 {series.lastUpdated}</Date>
              </SeriesInform>
            </SeriesWrapper>

            {seriesCount - 1 !== i && seriesList.length - 1 !== i && (
              <Divider mt="48px" mb="32px" />
            )}
          </React.Fragment>
        )
      })}
    </SeriesListWrapper>
  )
}

export default SeriesList
