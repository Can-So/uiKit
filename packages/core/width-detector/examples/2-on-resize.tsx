// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import WidthDetector from '../src';

const ResultBox = styled.div`
  align-items: center;
  background-color: rebeccapurple;
  color: white;
  display: flex;
  height: 100%;
  justify-content: center;
  white-space: nowrap;
`;

export default class Example extends Component {
  state = {
    width: Number,
  };

  onResize = (width: Number) => {
    console.log('[onResize] width:', width);
    this.setState({
      width,
    });
  };

  displayResults = () => <ResultBox>{this.state.width}</ResultBox>;

  render() {
    return (
      <div>
        <div style={{ height: 100 }}>
          <WidthDetector onResize={this.onResize}>
            {this.displayResults}
          </WidthDetector>
        </div>
      </div>
    );
  }
}
