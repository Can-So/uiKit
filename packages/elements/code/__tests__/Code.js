// @flow
import { shallow } from 'enzyme';
import React from 'react';
import Code from '../src/Code';

const input = `
  const a = 'foo';
  const b = 'bar';
  const c = [a, b].map(item => item + item);
`;

describe('Code', () => {
  it('should have "markdown" as default language', () => {
    expect(shallow(<Code text={input} />).prop('language')).toBe('markdown');
  });
});
