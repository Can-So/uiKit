import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';

declare global {
  interface Window {
    bridge: any;
  }
}

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

export const callNativeBridgeFn = async (browser, bridgeFn, ...args) => {
  return await browser.browser.execute(
    (bridgeFn, args, done) => {
      // browser context - you may not access client or console
      if (window.bridge && window.bridge[bridgeFn]) {
        window.bridge[bridgeFn].apply(window.bridge, args);
      }
    },
    bridgeFn,
    args || [],
  );
};

export const clearEditor = async browser => {
  await browser.browser.execute(() => {
    const dom = document.querySelector('.ProseMirror') as HTMLElement;
    dom.innerHTML = '<p><br /></p>';
  });
};
