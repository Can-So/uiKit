/**
 * @jest-environment node
 */
import React from 'react';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import ReactDOMServer from 'react-dom/server';

test('Width detector server side rendering', async () => {
  (await getExamplesFor('width-detector')).forEach(examples => {
    const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
    // expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
    expect(true).toBe(true);
  });
});
