import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Blockquote from '../../../../src/react/nodes/blockquote';

describe('Renderer - React/Nodes/Blockquote', () => {
  const blockquote = shallow(<Blockquote>This is a blockquote</Blockquote>);

  it('should wrap content with <blockquote>-tag', () => {
    expect(blockquote.is('blockquote')).to.equal(true);
  });
});
