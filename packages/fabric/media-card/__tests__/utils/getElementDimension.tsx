jest.mock('react-dom');
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getElementDimension } from '../../src/utils/getElementDimension';

describe('getElementDimension', () => {
  it('should return a rounded value for the passed dimension', () => {
    const element = {
      getBoundingClientRect() {
        return {
          width: 1.1,
          height: 10.2,
        };
      },
    };
    (ReactDOM.findDOMNode as jest.Mock<void>).mockReturnValue(element);
    const dummyComponent = <div /> as any; // This casting is done to avoid having to create a new React class here
    const width = getElementDimension(dummyComponent, 'width');
    const height = getElementDimension(dummyComponent, 'height');

    expect(width).toEqual(1);
    expect(height).toEqual(10);
  });
});
