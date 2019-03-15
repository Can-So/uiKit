import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';

declare global {
  interface Window {
    bridge: any;
  }
}

// FIXME Ideally these would be mobile browsers
// Safari & Chrome should suffice for now.
export const skipBrowsers: any = ['ie', 'firefox', 'edge'];

export const navigateOrClear = async (browser: any, path: string) => {
  const currentUrl = await browser.url();

  if (currentUrl === path) {
    await clearEditor(browser);
    await clearBridgeOutput(browser);
  } else {
    await browser.goto(path);
  }
};

export const getDocFromElement = (el: any) => el.pmViewDesc.node.toJSON();
export const editable = '.ProseMirror';

export const editor = {
  name: 'editor',
  path: getExampleUrl('editor', 'editor-mobile-bridge', 'editor'),
  placeholder: editable,
};

export const renderer = {
  name: 'renderer',
  path: getExampleUrl('editor', 'editor-mobile-bridge', 'renderer'),
  placeholder: '#examples', // FIXME lets add something better to renderer
};

export const copyIcon = 'span[aria-label="copy"]';
export const clipboardInput = '#input';

export const callNativeBridge = async (
  browser: any,
  bridgeFn: string,
  ...args: any[]
) => {
  return await browser.browser.execute(
    (bridgeFn: any, args: any[]) => {
      if (window.bridge && window.bridge[bridgeFn]) {
        window.bridge[bridgeFn].apply(window.bridge, args);
      }
    },
    bridgeFn,
    args || [],
  );
};

const clearBridgeOutput = async (browser: any) => {
  await browser.browser.execute(() => {
    // @ts-ignore
    window.logBridge = [];
  });
};

export const getBridgeOutput = async (
  browser: any,
  bridge: string,
  bridgeFn: string,
) => {
  const logs = await browser.browser.execute(
    (bridge: string, bridgeFn: string) => {
      // @ts-ignore
      let logs = window.logBridge;

      if (logs[`${bridge}:${bridgeFn}`]) {
        return logs[`${bridge}:${bridgeFn}`];
      }

      return logs;
    },
    bridge,
    bridgeFn,
  );

  return logs.value;
};

export const clearEditor = async (browser: any) => {
  await browser.browser.execute(() => {
    const dom = document.querySelector('.ProseMirror') as HTMLElement;
    dom.innerHTML = '<p><br /></p>';
  });
};
