import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';

declare global {
  interface Window {
    bridge: any;
  }
}

// FIXME Ideally these would be mobile browsers
// Safari & Chrome should suffice for now.
export const skipBrowsers: any = ['ie', 'firefox', 'edge'];

export const navigateOrClear = async (browser, path) => {
  const currentUrl = await browser.url();

  if (currentUrl === path) {
    await clearEditor(browser);
    await clearBridgeOutput(browser);
  } else {
    await browser.goto(path);
  }
};

export const getDocFromElement = el => el.pmViewDesc.node.toJSON();
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

export const callNativeBridge = async (browser, bridgeFn, ...args) => {
  return await browser.browser.execute(
    (bridgeFn, args) => {
      if (window.bridge && window.bridge[bridgeFn]) {
        window.bridge[bridgeFn].apply(window.bridge, args);
      }
    },
    bridgeFn,
    args || [],
  );
};

const clearBridgeOutput = async browser => {
  await browser.browser.execute(() => {
    // @ts-ignore
    window.logBridge = [];
  });
};

export const getBridgeOutput = async (browser, bridge, bridgeFn) => {
  const logs = await browser.browser.execute(
    (bridge, bridgeFn) => {
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

export const clearEditor = async browser => {
  await browser.browser.execute(() => {
    const dom = document.querySelector('.ProseMirror') as HTMLElement;
    dom.innerHTML = '<p><br /></p>';
  });
};
