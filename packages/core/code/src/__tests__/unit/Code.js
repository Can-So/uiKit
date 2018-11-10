// @flow
import { mount } from 'enzyme';
import React from 'react';
import ThemedCode, { Code } from '../../Code';

const input = `
  const a = 'foo';
  const b = 'bar';
  const c = [a, b].map(item => item + item);
`;

const theme = { mode: 'dark' };

describe('Code', () => {
  const codeJavascript = <Code text={input} language="javascript" />;
  const codeLanguageNotSupported = <Code text={input} language="dde" />;
  test('should render with language javascript', () => {
    expect(mount(codeJavascript)).toBeDefined();
    expect(
      mount(codeJavascript)
        .find(Code)
        .prop('language'),
    ).not.toBe('');
  });
  test('should render with language that is not supported', () => {
    expect(mount(codeLanguageNotSupported).find(Code).length).toBe(1);
  });
  test('should apply theme', () => {
    expect(
      mount(<ThemedCode text={input} language="java" theme={theme} />)
        .find(Code)
        .prop('theme'),
    ).toBe('dark');
  });
});

// TODO:
// 1. Add more tests related to other props
// 2. Add more tests for code block
// 3. Add more examples for code
// 4. Add more examples for code block
