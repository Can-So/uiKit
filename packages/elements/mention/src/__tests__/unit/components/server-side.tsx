/**
 * @jest-environment node
 */
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import * as ReactDOMServer from 'react-dom/server';

describe('server side rendering', () => {
  let oldWindow;

  beforeAll(() => {
    oldWindow = (global as any).window;
    (global as any).window = global;
  });

  afterAll(() => {
    if (oldWindow) {
      (global as any).window = oldWindow;
    } else {
      delete (global as any).window;
    }
  });

  test('mention server side rendering', async () => {
    (await getExamplesFor('mention')).forEach(examples => {
      const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
      expect(() =>
        ReactDOMServer.renderToString(
          <IntlProvider locale="en">
            <Example />
          </IntlProvider>,
        ),
      ).not.toThrowError();
    });
  });
});
