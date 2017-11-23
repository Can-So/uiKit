// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import SizeDetector from '../src';

const startSize = 100;
const endSize = startSize * 2;

const growAndShrink = keyframes`
  0% {
    width: ${startSize}px;
    height: ${startSize}px;
  }

  50% {
    width: ${endSize}px;
    height: ${endSize}px;
  }

  100% {
    width: ${startSize}px;
    height: ${startSize}px;
  }
`;

const ResizingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  color: #333;
  animation: ${growAndShrink} 3s ease-in-out infinite;
  width: ${startSize}px;
  height: ${startSize}px;
`;

const ResultBox = styled.div`
  align-items: center;
  background-color: rebeccapurple;
  color: white;
  display: flex;
  height: 100%;
  justify-content: center;
  white-space: nowrap;
`;

type SizeMetrics = {
  width: number,
  height: number,
};

const displayResults = ({ width, height }: SizeMetrics) => (
  <ResultBox>
    {width} x {height}
  </ResultBox>
);

export default function Example() {
  return (
    <div>
      <p>Inside a parent with set height</p>
      <div style={{ height: 100 }}>
        <SizeDetector>{displayResults}</SizeDetector>
      </div>
      <p>The height should be 100px and no scroll triggered.</p>
      <div style={{ height: 100 }}>
        <SizeDetector>{displayResults}</SizeDetector>
      </div>
      <p>
        The inner size should be 200px high, scrolling inside a 100px container
      </p>
      <div style={{ height: 100, overflow: 'auto' }}>
        <div style={{ height: 200 }}>
          <SizeDetector>{displayResults}</SizeDetector>
        </div>
      </div>
      <p>
        The box on the left is the only thing causing resize. The purple box
        should update in response.
      </p>
      <div style={{ display: 'flex' }}>
        <ResizingBox>I am resizing</ResizingBox>
        <SizeDetector containerStyle={{ height: 'auto' }}>
          {displayResults}
        </SizeDetector>
      </div>
    </div>
  );
}
