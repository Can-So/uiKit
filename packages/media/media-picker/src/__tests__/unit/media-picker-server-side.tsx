/**
 * @jest-environment node
 */
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';

test('media-picker server side rendering', async () => {
  (await getExamplesFor('media-picker')).forEach(examples => {
    const Example = require(examples.filePath).default;
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});
