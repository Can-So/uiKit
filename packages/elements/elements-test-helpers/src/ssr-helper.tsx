import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import * as ReactDOMServer from 'react-dom/server';
import * as exenv from 'exenv';
import * as ReactDOM from 'react-dom';

interface SSRConfig {
  blackList?: string[];
}

class SSRBase {
  protected config: SSRConfig;

  constructor(config: SSRConfig) {
    this.config = config;
  }

  protected renderComponent(TheComponent: any) {
    return (
      <IntlProvider locale="en">
        <TheComponent />
      </IntlProvider>
    );
  }

  protected renderToString(TheComponent: any) {
    return ReactDOMServer.renderToString(this.renderComponent(TheComponent));
  }

  private allowExample(example: any) {
    if (this.config.blackList) {
      const res = this.config.blackList.filter(f =>
        example.filePath.includes(f),
      );
      return res && res.length === 0;
    }
    return true;
  }

  async processExamples(
    componentName: string,
    callback: (example: any) => void,
  ) {
    (await getExamplesFor(componentName)).forEach((example: any) => {
      if (this.allowExample(example)) {
        callback(example);
      }
    });
  }
}

export class SSRHelper extends SSRBase {
  private beforeSSR() {
    if (global) {
      (global as any).window = {};
    }
  }

  private afterSSR() {
    if (global) {
      (global as any).window = undefined;
    }
  }

  async renderSSRAndAssert(componentName: string) {
    this.beforeSSR();
    try {
      await super.processExamples(componentName, example => {
        const Example = require(example.filePath).default; // eslint-disable-line import/no-dynamic-require
        expect(() => this.renderToString(Example)).not.toThrowError();
      });
    } finally {
      this.afterSSR();
    }
  }
}

export class SSRHydrationHelper extends SSRBase {
  private oldCanUseDOM: any;

  // @ts-ignore this variable is initialized in beforeAll()
  private consoleErrorSpy: jest.SpyInstance;

  private beforeHydration() {
    this.oldCanUseDOM = exenv.canUseDOM;
    this.consoleErrorSpy = jest.spyOn(global.console, 'error');
  }

  private afterHydration() {
    jest.resetAllMocks();
    (exenv as any).canUseDOM = this.oldCanUseDOM;
  }

  private hydrate(TheComponent: any, elem: any) {
    ReactDOM.hydrate(this.renderComponent(TheComponent), elem);
  }

  async hydrateSSRAndAssert(componentName: string) {
    this.beforeHydration();
    try {
      await this.processExamples(componentName, example => {
        const Example = require(example.filePath).default; // eslint-disable-line import/no-dynamic-require

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
    } finally {
      this.afterHydration();
    }
  }
}
