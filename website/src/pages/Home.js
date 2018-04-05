// // @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { gridSize, math, colors } from '@atlaskit/theme';
import Cards from './Home/Cards';
import { TABLET_BREAKPOINT_MIN } from './Home/config';

const fonts =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const Title = styled.h1`
  color: ${colors.N0};
  font-family: 'LLCircularWeb-Medium', ${fonts}; /* stylelint-disable-line */
  font-size: 52px;
  margin: 80px 0 0 !important;
`;
const Intro = styled.div`
  color: ${colors.N0};
  display: inline-block;
  font-size: 24px;
  font-family: 'LLCircularWeb-Book', ${fonts}; /* stylelint-disable-line */
  font-weight: 300;
  margin-bottom: 80px;
  margin-top: 24px;
  max-width: 640px;

  a {
    color: ${colors.B75};

    &:hover {
      color: ${colors.N0};
    }
  }
`;

const HomePageWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  color: ${colors.N0};
  margin-top: ${math.add(gridSize, 3)}px;

  @media (min-width: ${TABLET_BREAKPOINT_MIN}px) {
    margin-top: ${math.add(gridSize, 10)}px;
  }

  @media (min-width: 800px) {
    margin-right: 64px;
  }
`;

const Style = () => (
  <style>{`
  body {
    background-color: ${colors.B500};
  }
`}</style>
);

export default class HomePage extends Component {
  render() {
    return (
      <HomePageWrapper>
        <Style />
        <Title>Atlaskit</Title>
        <Intro>
          Atlassian&#39;s official UI library, built according to the
          Atlassian&nbsp;Design&nbsp;Guidelines.
        </Intro>
        <Cards />
      </HomePageWrapper>
    );
  }
}
