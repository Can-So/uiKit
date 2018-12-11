/**
 * @jest-environment node
 */
import * as React from 'react';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import * as ReactDOMServer from 'react-dom/server';

test('TextArea server side rendering', async () => {
  (await getExamplesFor('textarea')).forEach(examples => {
    const Example = require(examples.filePath).default;
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});
