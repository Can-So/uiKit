import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Paragraph from '../../../../react/nodes/paragraph';

describe('Renderer - React/Nodes/Paragraph', () => {
  const paragraph = shallow(<Paragraph>This is a paragraph</Paragraph>);

  it('should wrap content with <p>-tag', () => {
    expect(paragraph.is('p')).to.equal(true);
  });
});
