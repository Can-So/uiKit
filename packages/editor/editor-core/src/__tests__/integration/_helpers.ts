import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import { messages as insertBlockMessages } from '../../plugins/insert-block/ui/ToolbarInsertBlock';
import { ToolbarFeatures } from '../../../example-helpers/ToolsDrawer';
import { EditorAppearance } from '../../types';

/**
 * This function will in browser context. Make sure you call `toJSON` otherwise you will get:
 * unknown error: Maximum call stack size exceeded
 * And, don't get too fancy with it ;)
 */
export const getDocFromElement = el => el.pmViewDesc.node.toJSON();
export const editable = '.ProseMirror';
export const LONG_WAIT_FOR = 5000;
export const typeAheadPicker = '.fabric-editor-typeahead';
export const lozenge = '[data-mention-id="0"]';
export const linkToolbar =
  '[placeholder="Paste link or search recently viewed"]';

export const insertMention = async (browser, query: string) => {
  await browser.type(editable, '@');
  await browser.waitForSelector(typeAheadPicker);
  await browser.type(editable, query);
  await browser.type(editable, 'Return');
};

export const gotoEditor = async browser => {
  await browser.goto(fullpage.path);
  await browser.waitForSelector(fullpage.placeholder);
  await browser.click(fullpage.placeholder);
  await browser.waitForSelector(editable);
};

export const insertMentionUsingClick = async (browser, mentionId: string) => {
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
  path: getExampleUrl('editor', 'editor-core', 'full-page-with-content'),
  placeholder: '.ProseMirror',
};

export const fullpageWithImport: EditorHelper = {
  name: 'fullpage-with-import',
  appearance: 'full-page',
  path: getExampleUrl('editor', 'editor-core', 'full-page-with-adf-import'),
  placeholder: '.ProseMirror',
};

export const message: EditorHelper = {
  name: 'message',
  appearance: 'message',
  path: getExampleUrl('editor', 'editor-core', 'message'),
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
export const setupMediaMocksProviders = async browser => {
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
export const toggleFeature = async (browser, name: keyof ToolbarFeatures) => {
  const selector = `.toggleFeature-${name}`;
  await browser.waitForSelector(selector);
  await browser.click(selector);
};

/**
 * Enables or disables a given feature on a page with a toolbar.
 */
export const setFeature = async (
  browser,
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
export const rerenderEditor = async browser => {
  await browser.click('.reloadEditorButton');
};

export const insertMedia = async (
  browser,
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
      (mediaCardSelector, mediaCardCount) => {
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
const get$$Length = result => {
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
  browser,
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

export const changeSelectedNodeLayout = async (page, layoutName) => {
  const buttonSelector = `div[aria-label="Floating Toolbar"] span[aria-label="${layoutName}"]`;
  await page.waitForSelector(buttonSelector, 3000);
  await page.click(buttonSelector);
};

/**
 * When using quick insert, `insertTitle` should match exactly to the typeahead wording.
 * We need to filter down the typeahead, as we select the first result.
 * Edge appears to have a problem with await browser.browser.waitUntil().
 * The statement at the bottom of the async function returns `firstInsertText && firstInsertText.startsWith(firstTitleWord)`
 * Even when this is true the waitUntil doesn’t return.
 */

export const quickInsert = async (browser, insertTitle) => {
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

export const insertMenuItem = async (browser, title) => {
  await browser.waitForSelector(`button span[aria-label="${title}"]`);
  await browser.click(`button span[aria-label="${title}"]`);
};
