import WikiMarkupTransformer from '../../../index';

describe('JIRA wiki markup - Misc', () => {
  const testCases: Array<[string, string]> = [
    [
      'should find emojis in text',
      'this is a string with :) emojis in it (*) tada',
    ],
    [
      'should find emojis in text with marks',
      'this is a string ~with :) emojis~ in it (*) tada',
    ],
    [
      'should find emojis and mentions in text',
      'this is a string with :) emojis and [~username] mentions',
    ],
    ['should escape macros', 'this is a \\{panel} text, not a macro{panel}'],
    [
      'should escape monospace text',
      'this is a \\{{normal text}}, not a monospaced',
    ],
  ];

  for (const [testCaseDescription, markup] of testCases) {
    it(testCaseDescription, () => {
      const transformer = new WikiMarkupTransformer();
      expect(transformer.parse(markup)).toMatchSnapshot();
    });
  }
});
