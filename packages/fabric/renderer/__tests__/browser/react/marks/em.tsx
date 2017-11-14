import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Em from '../../../../src/react/marks/em';

describe('Renderer - React/Marks/Em', () => {
  const mark = shallow(<Em>This is italic</Em>);

  it('should wrap content with <em>-tag', () => {
    expect(mark.is('em')).to.equal(true);
  });

  it('should output correct html', () => {
    expect(mark.html()).to.equal('<em>This is italic</em>');
  });
});
