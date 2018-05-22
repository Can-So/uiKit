import WikiMarkupTransformer from '../../src';

describe('JIRA wiki markup - Other', () => {
  const testCases: Array<[string, string]> = [
    [
      'should begin with hardBreak if it begins with a new line',
      `
foo`,
    ],
    [
      'should process second empty line as a new paragraph',
      `foo


bar`,
    ],
  ];

  for (const [testCaseDescription, markup] of testCases) {
    it(testCaseDescription, () => {
      const transformer = new WikiMarkupTransformer();
      expect(transformer.parse(markup)).toMatchSnapshot();
    });
  }
});
