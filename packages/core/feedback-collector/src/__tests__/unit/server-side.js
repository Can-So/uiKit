/**
 * @jest-environment node
 */
// @flow
import React from 'react';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import ReactDOMServer from 'react-dom/server';
// TODO: https://hello.atlassian.net/browse/CEN-82
// The app switcher new released in the global navigation breaks the test.
test('Feedback collector server side rendering', async () => {
  (await getExamplesFor('feedback-collector')).forEach(examples => {
    // $StringLitteral
    if (!examples.filePath.includes('nav')) {
      // $StringLitteral
      const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
      expect(() =>
        ReactDOMServer.renderToString(<Example />),
      ).not.toThrowError();
    }
  });
});
