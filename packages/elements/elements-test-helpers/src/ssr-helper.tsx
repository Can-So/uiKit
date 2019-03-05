import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import * as ReactDOMServer from 'react-dom/server';
import * as exenv from 'exenv';
import * as ReactDOM from 'react-dom';

/**
 * Help class to test SSR and hidration within tests
 */
export class SSRHelper {
  private oldCanUseDOM: any;

  // @ts-ignore this variable is initialized in beforeAll()
  private consoleErrorSpy: jest.SpyInstance;

  beforeAll() {
    this.oldCanUseDOM = exenv.canUseDOM;
    this.consoleErrorSpy = jest.spyOn(global.console, 'error');
  }

  afterAll() {
    jest.resetAllMocks();
    (exenv as any).canUseDOM = this.oldCanUseDOM;
  }

  private renderComponent(TheComponent: any) {
    return (
      <IntlProvider locale="en">
        <TheComponent />
      </IntlProvider>
    );
  }

  private renderToString(TheComponent: any) {
    return ReactDOMServer.renderToString(this.renderComponent(TheComponent));
  }

  private hydrate(TheComponent: any, elem: any) {
    ReactDOM.hydrate(this.renderComponent(TheComponent), elem);
  }

  async renderSSRAndAssert(componentName: string) {
    (await getExamplesFor(componentName)).forEach((examples: any) => {
      const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
      expect(() => this.renderToString(Example)).not.toThrowError();
    });
  }

  async hidrateSSRAndAssert(componentName: string) {
    (await getExamplesFor(componentName)).forEach((examples: any) => {
      const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require

      // server-side
      (exenv as any).canUseDOM = false;
      const serverHTML = this.renderToString(Example);

      // client-side
      (exenv as any).canUseDOM = true;
      const elem = document.createElement('div');
      elem.innerHTML = serverHTML;

      this.hydrate(Example, elem);

      this.consoleErrorSpy.mock.calls.forEach(params => {
        if (params.length) {
          // HTML related warnings (can ignore)
          expect(params[0].indexOf('Warning') === -1);
        }
      });
    });
  }
}
