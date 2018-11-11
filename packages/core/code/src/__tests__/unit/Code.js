// @flow
import { mount, shallow } from 'enzyme';
import React from 'react';
import ThemedCode, { Code } from '../../Code';

const code = `
  const a = 'foo';
  const b = 'bar';
  const c = [a, b].map(item => item + item);
`;

const theme = { mode: 'dark' };

describe('Code', () => {
  const codeJavascript = <Code text={code} language="javascript" />;
  const codeLanguageNotSupported = <Code text={code} language="dde" />;
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
      mount(<ThemedCode text={code} language="java" theme={theme} />)
        .find(Code)
        .prop('theme'),
    ).toBe(theme);
  });
  test('should not show the line numbers', () => {
    expect(
      mount(<ThemedCode text={code} language="java" />)
        .find(Code)
        .prop('showLineNumbers'),
    ).toBe(false);
  });
  test('should render a div instead of a span', () => {
    expect(
      mount(<ThemedCode PreTag="div" text={code} language="python" />)
        .find(Code)
        .prop('PreTag'),
    ).not.toBe('span');
  });
  test('should render a div with a red color', () => {
    const wrapperRed = shallow(
      <ThemedCode
        PreTag="div"
        codeTagProps={{ style: { color: 'red' } }}
        text={code}
        language="python"
      />,
    );
    expect(wrapperRed).toMatchSnapshot();
  });
  test('should render a container with a blue color', () => {
    const wrapperBlue = shallow(
      <ThemedCode
        PreTag="div"
        lineNumberContainerStyle={{ style: { color: 'blue' } }}
        text={code}
        showLineNumbers
        language="python"
      />,
    );
    expect(wrapperBlue).toMatchSnapshot();
  });
  test('should passe along code style to LineNumbers', () => {
    const wrapperLineNumbers = shallow(
      <ThemedCode
        text={code}
        language="python"
        codeStyle={{ style: { color: 'blue' } }}
        showLineNumbers
      />,
    );
    expect(wrapperLineNumbers).toMatchSnapshot();
  });
});

// TODO:
// 3. Add more examples for code
// 4. Add more examples for code block
