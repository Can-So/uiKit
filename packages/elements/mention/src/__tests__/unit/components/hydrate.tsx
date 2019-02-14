import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';
import * as exenv from 'exenv';

describe('SSR', () => {
  let oldCanUseDOM;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    oldCanUseDOM = exenv.canUseDOM;
    consoleErrorSpy = jest.spyOn(global.console, 'error');
  });

  afterEach(() => {
    jest.resetAllMocks();
    (exenv as any).canUseDOM = oldCanUseDOM;
  });

  test('should ssr then hydrate tag correctly', async () => {
    (await getExamplesFor('mention')).forEach(examples => {
      const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require

      // server-side
      (exenv as any).canUseDOM = false;
      const serverHTML = ReactDOMServer.renderToString(
        <IntlProvider locale="en">
          <Example />
        </IntlProvider>,
      );

      // client-side
      (exenv as any).canUseDOM = true;
      const elem = document.createElement('div');
      elem.innerHTML = serverHTML;

      ReactDOM.hydrate(
        <IntlProvider locale="en">
          <Example />
        </IntlProvider>,
        elem,
      );

      consoleErrorSpy.mock.calls.forEach(params => {
        if (params.length) {
          // HTML related warnings (can ignore)
          expect(params[0].indexOf('Warning') === -1);
        }
      });
    });
  });
});
