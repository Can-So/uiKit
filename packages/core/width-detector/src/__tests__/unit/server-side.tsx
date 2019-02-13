/**
 * @jest-environment node
 */
import * as React from 'react';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import * as ReactDOMServer from 'react-dom/server';
import WidthDetector from '../..';

test('Width detector server side rendering', async () => {
  (await getExamplesFor('width-detector')).forEach(examples => {
    const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});

test('Width detector should render children immediately for SSR', async () => {
  const markup = <div id="foo123">Foo</div>;
  const markupString = ReactDOMServer.renderToStaticMarkup(markup);
  const html = ReactDOMServer.renderToString(
    <WidthDetector>{width => markup}</WidthDetector>,
  );
  expect(html).toContain(markupString);
});
