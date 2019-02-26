import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { renderer, skipBrowsers as skip, getBridgeOutput } from '../_utils';

BrowserTestCase(
  `renderer.ts: call onContentRendered() on native bridge.`,
  { skip },
  async (client: any) => {
    const browser = new Page(client);
    await browser.goto(renderer.path);

    const onContentRendererOutput = await getBridgeOutput(
      browser,
      'renderBridge',
      'onContentRendered',
    );

    expect(onContentRendererOutput).toMatchSnapshot();
  },
);
