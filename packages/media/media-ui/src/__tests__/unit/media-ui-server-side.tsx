/**
 * @jest-environment node
 */
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { getExamplesFor } from '@findable/build-utils/getExamples';

test('media-ui server side rendering', async () => {
  (await getExamplesFor('media-ui')).forEach(
    (examples: { filePath: string }) => {
      const Example = require(examples.filePath).default;

      expect(() =>
        ReactDOMServer.renderToString(<Example />),
      ).not.toThrowError();
    },
  );
});
