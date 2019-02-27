import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import { messages as insertBlockMessages } from '../../plugins/insert-block/ui/ToolbarInsertBlock';
import { ToolbarFeatures } from '../../../example-helpers/ToolsDrawer';
import { EditorAppearance } from '../../types';
import { pluginKey as tableResizingPluginKey } from '../../plugins/table/pm-plugins/table-resizing';

/**
 * This function will in browser context. Make sure you call `toJSON` otherwise you will get:
 * unknown error: Maximum call stack size exceeded
 * And, don't get too fancy with it ;)
 */
export const getDocFromElement = (el: any) => el.pmViewDesc.node.toJSON();
export const editable = '.ProseMirror';
export const LONG_WAIT_FOR = 5000;
export const typeAheadPicker = '.fabric-editor-typeahead';
export const lozenge = '[data-mention-id="0"]';
export const linkToolbar =
  '[placeholder="Paste link or search recently viewed"]';

export const insertMention = async (browser: any, query: string) => {
  await browser.type(editable, '@');
  await browser.waitForSelector(typeAheadPicker);
  await browser.type(editable, query);
  await browser.type(editable, 'Return');
};

export const gotoEditor = async (browser: any) => {
  await browser.goto(fullpage.path);
  await browser.waitForSelector(fullpage.placeholder);
  await browser.click(fullpage.placeholder);
  await browser.waitForSelector(editable);
};

export const insertMentionUsingClick = async (
  browser: any,
  mentionId: string,
) => {
  await browser.type(editable, '@');
  await browser.waitForSelector(typeAheadPicker);
  await browser.isVisible(`div[data-mention-id="${mentionId}"`);
  await browser.click(`div[data-mention-id="${mentionId}"`);
};

interface EditorHelper {
  name: string;
  appearance: EditorAppearance;
  path: string;
  placeholder: string;
}

export const comment: EditorHelper = {
  name: 'comment',
  appearance: 'comment',
  path: getExampleUrl('editor', 'editor-core', 'comment'),
  placeholder: '[placeholder="What do you want to say?"]',
};

export const fullpage: EditorHelper = {
  name: 'fullpage',
  appearance: 'full-page',
  path: getExampleUrl('editor', 'editor-core', 'full-page-with-toolbar'),
  placeholder: '.ProseMirror',
};

export const fullpageDisabled: EditorHelper = {
  name: 'fullpage-disabled',
  appearance: 'full-page',
  path: getExampleUrl(
    'editor',
    'editor-core',
    'full-page-with-content-disabled-flexi-tables',
  ),
  placeholder: '.ProseMirror',
};

export const fullpageWithImport: EditorHelper = {
  name: 'fullpage-with-import',
  appearance: 'full-page',
  path: getExampleUrl('editor', 'editor-core', 'full-page-with-adf-import'),
  placeholder: '.ProseMirror',
};

export const editors = [comment, fullpage];

export const clipboardHelper = getExampleUrl(
  'editor',
  'editor-core',
  'clipboard-helper',
);

export const clipboardInput = 'textarea';

export const copyAsPlaintextButton = '.copy-as-plaintext';
export const copyAsHTMLButton = '.copy-as-html';

export const mediaInsertDelay = 1000;

const mediaPickerMock = '.mediaPickerMock';
export const setupMediaMocksProviders = async (browser: any) => {
  // enable the media picker mock
  await browser.waitForSelector(mediaPickerMock);
  await browser.click(mediaPickerMock);

  // since we're mocking and aren't uploading a real endpoint, skip authenticating
  // (this also skips loading from a https endpoint which we can't do from inside the http-only netlify environment)
  await browser.click('.mediaProvider-resolved-no-auth-provider');

  // reload the editor so that media provider changes take effect
  await rerenderEditor(browser);
};

/**
 * Toggles a given feature on a page with a toolbar.
 */
export const toggleFeature = async (
  browser: any,
  name: keyof ToolbarFeatures,
) => {
  const selector = `.toggleFeature-${name}`;
  await browser.waitForSelector(selector);
  await browser.click(selector);
};

/**
 * Enables or disables a given feature on a page with a toolbar.
 */
export const setFeature = async (
  browser: any,
  name: keyof ToolbarFeatures,
  enable: boolean,
) => {
  const enableSelector = `.disableFeature-${name}`;
  const isEnabled = get$$Length(await browser.$$(enableSelector));

  // toggle it if it requires enabling
  if ((enable && !isEnabled) || (!enable && isEnabled)) {
    await toggleFeature(browser, name);
  }
};

/**
 * Re-renders the current editor on a page with a toolbar.
 */
export const rerenderEditor = async (browser: any) => {
  await browser.click('.reloadEditorButton');
};

export const insertMedia = async (
  browser: any,
  filenames = ['one.svg'],
  fileSelector = 'div=%s',
) => {
  const openMediaPopup = `[aria-label="${
    insertBlockMessages.filesAndImages.defaultMessage
  }"]`;
  const insertMediaButton = '.e2e-insert-button';
  const mediaCardSelector = `${editable} .img-wrapper`;

  const existingMediaCards = await browser.$$(mediaCardSelector);

  await browser.click(openMediaPopup);

  // wait for media item, and select it
  await browser.waitForSelector(
    '.e2e-recent-upload-card [aria-label="one.svg"]',
  );
  if (filenames) {
    for (const filename of filenames) {
      const selector = fileSelector.replace('%s', filename);
      await browser.waitFor(selector);
      await browser.click(selector);
    }
  }
  // wait for insert button to show up and
  // insert it from the picker dialog
  await browser.waitForSelector(insertMediaButton);
  await browser.click(insertMediaButton);
  await browser.waitFor('.img-wrapper');

  // Wait until we have found media-cards for all inserted items.
  const mediaCardCount = get$$Length(existingMediaCards) + filenames.length;

  // Workaround - we need to use different wait methods depending on where we are running.
  if (browser.browser.desiredCapabilities) {
    await browser.browser.waitUntil(async () => {
      const mediaCards = await browser.$$(mediaCardSelector);

      // media picker can still be displayed after inserting an image after some small time
      // wait until it's completely disappeared before continuing
      const insertButtons = await browser.$$(insertMediaButton);
      return (
        get$$Length(mediaCards) === mediaCardCount &&
        get$$Length(insertButtons) === 0
      );
    });
  } else {
    await browser.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await browser.waitFor(
      (mediaCardSelector: any, mediaCardCount: any) => {
        const mediaCards = document.querySelectorAll(mediaCardSelector);
        return mediaCards.length === mediaCardCount;
      },
      {},
      mediaCardSelector,
      mediaCardCount,
    );
  }
};

/**
 * We use $$ in the context of selenium and puppeteer, which return different results.
 */
const get$$Length = (result: any) => {
  if (Array.isArray(result)) {
    // Puppeteer result
    return result.length;
  } else {
    // Webdriver result
    return result.value.length;
  }
};

/**
 * Insert a block using the menu item
 * @param browser Webdriver browser
 * @param menuTitle Search pattern (placeholder or aria-label)
 * @param tagName Tag to look
 * @param mainToolbar Flag to look the menu in the main toolbar instead of insert menu
 */
export const insertBlockMenuItem = async (
  browser: any,
  menuTitle: string,
  tagName = 'span',
  mainToolbar = false,
) => {
  let menuSelector: string;
  if (mainToolbar) {
    menuSelector = `[aria-label="${menuTitle}"]`;
  } else {
    // Open insert menu and try to look the menu there
    const openInsertBlockMenuSelector = `[aria-label="${
      insertBlockMessages.insertMenu.defaultMessage
    }"]`;

    await browser.click(openInsertBlockMenuSelector);

    menuSelector = `${tagName}=${menuTitle}`;
  }

  await browser.waitForSelector(menuSelector);
  await browser.click(menuSelector);
};

export const changeSelectedNodeLayout = async (
  page: any,
  layoutName: string,
) => {
  const buttonSelector = `div[aria-label="Floating Toolbar"] span[aria-label="${layoutName}"]`;
  await page.waitForSelector(buttonSelector, 3000);
  await page.click(buttonSelector);
};

export const quickInsert = async (browser: any, insertTitle: string) => {
  await browser.type(editable, `/${insertTitle.split(' ')[0]}`);
  await browser.waitForSelector('div[aria-label="Popup"]');
  await browser.waitForSelector(
    `[aria-label="Popup"] [role="button"][aria-describedby="${insertTitle}"]`,
  );

  await browser.click(`[aria-label="Popup"] [role="button"]`);
};

export const forEach = async (
  array: Array<any>,
  cb: (item: any, index: number) => Promise<void>,
) => {
  let idx = 0;
  for (let item of array) {
    await cb(item, idx++);
  }
};

export const insertMenuItem = async (browser: any, title: string) => {
  await browser.waitForSelector(`button span[aria-label="${title}"]`);
  await browser.click(`button span[aria-label="${title}"]`);
};

export const currentSelectedEmoji = '.emoji-typeahead-selected';
export const typeahead = '.ak-emoji-typeahead';

export const insertEmoji = async (browser: any, query: string) => {
  await browser.type(editable, ':');
  await browser.waitForSelector(typeahead);
  await browser.type(editable, query);
  await browser.type(editable, ':');
};

export const insertEmojiBySelect = async (browser: any, select: string) => {
  await browser.type(editable, ':');
  await browser.waitForSelector(typeahead);
  await browser.type(editable, [select]);
  await browser.isVisible(`span=:${select}:`);
  await browser.click(`span=:${select}:`);
};

export const currentSelectedEmojiShortName = async (browser: any) => {
  return await browser.$(currentSelectedEmoji).getProperty('data-emoji-id');
};

export const highlightEmojiInTypeahead = async (
  browser: any,
  emojiShortName: string,
  depth = 5,
) => {
  for (let i = 0; i < depth; i++) {
    let selectedEmojiShortName = await currentSelectedEmojiShortName(browser);
    if (selectedEmojiShortName === `:${emojiShortName}:`) {
      break;
    }
    await browser.type(editable, 'ArrowDown');
  }
};

export const emojiItem = (emojiShortName: string): string => {
  return `span[data-emoji-short-name=":${emojiShortName}:"]`;
};

interface ResizeOptions {
  cellHandlePos: number;
  // TODO could make this an array, to simulate dragging back and forth.
  resizeWidth: number;
  startX?: number;
}

export const resizeColumn = async (page: any, resizeOptions: ResizeOptions) => {
  await page.browser.execute(
    (
      tableResizingPluginKey: any,
      resizeWidth: any,
      cellHandlePos: any,
      startX: any,
    ) => {
      const view = (window as any).__editorView;

      if (!view) {
        return;
      }

      view.dispatch(
        view.state.tr.setMeta(tableResizingPluginKey, {
          setHandle: cellHandlePos,
        }),
      );

      view.dom.dispatchEvent(new MouseEvent('mousedown', { clientX: startX }));

      // Visually resize table
      for (
        let i = Math.min(0, resizeWidth);
        i < Math.max(0, resizeWidth);
        i++
      ) {
        window.dispatchEvent(
          new MouseEvent('mousemove', { clientX: startX + i }),
        );
      }

      // Trigger table resizing finish handlers
      window.dispatchEvent(
        new MouseEvent('mouseup', { clientX: startX + resizeWidth }),
      );
    },
    tableResizingPluginKey,
    resizeOptions.resizeWidth,
    resizeOptions.cellHandlePos,
    resizeOptions.startX || 600,
  );
};
