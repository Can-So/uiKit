import { messages as blockTypeMessages } from '../../plugins/block-type/ui/ToolbarBlockType';
import { insertMedia as integrationInsertMedia } from '../integration/_helpers';

// Drop down
export const blockFormattingDropdown = `span[aria-label="${blockTypeMessages}"]`;
export const dropList = 'div[data-role="droplistContent"]';
export const insertBlockDropdown = `[aria-label="Insert"]`;
export const tableButton = `[aria-label="Table"]`;
export const italicButton = `[aria-label="Italic"]`;
export const boldButton = `[aria-label="Bold"]`;
export const moreFormatting = `[aria-label="More formatting"]`;
export const alignment = `[aria-label="Text alignment"]`;
export const alignLeft = `[aria-label="Align left"]`;
export const alignCenter = `[aria-label="Align center"]`;
export const textColor = `[aria-label="Text color"]`;
export const bulletList = `[aria-label="Bullet list"]`;
export const numberedList = `[aria-label="Numbered list"]`;
export const actionButton = `[aria-label="Action item"]`;
export const linkButton = `[aria-label="Link"]`;
export const filesAndImages = `[aria-label="Files & images"]`;
export const mentionButton = `[aria-label="Mention"]`;
export const emojiButton = `[aria-label="Emoji"]`;
export const removeTableButton = '[aria-label="Remove"]';

// table basics
export const tableTd = 'table td p';
export const tableTh = 'table th p';

// elements
export const emojiPicker = 'div[data-emoji-picker-container="true"]';
export const mentionQuery = 'span[data-type-ahead-query]';

// Content editable
export const gapCursor = '.ProseMirror-gapcursor';
export const layoutDataSection = '[data-layout-section="true"]';
export const panelContent = '.ak-editor-panel__content';
export const codeContent = '.code-content';

// Keyboard inputs
export const arrowRight = 'ArrowRight';
export const arrowLeft = 'ArrowLeft';
export const arrowUp = 'ArrowUp';
export const arrowDown = 'ArrowDown';

// common page functions
export const insertTable = async page => {
  await page.click(tableButton);
  await page.waitForSelector(tableTd);
  await page.click(tableTh);
};

const replaceInputStr = (str: string) => {
  return `concat('${str.replace(/'/g, `', "'", '`)}', '')`;
};

export const clickOnElementWithText = async ({ page, elementTag, text }) => {
  await page.waitForXPath(
    `//${elementTag}[contains(text(), ${replaceInputStr(text)})]`,
    5000,
  );
  const target = await page.$x(
    `//${elementTag}[contains(text(), ${replaceInputStr(text)})]`,
  );
  expect(target.length).toBeGreaterThan(0);
  await target[0].click();
};

export const getBoundingRect = async (page, selector) => {
  return await page.evaluate(selector => {
    const element = document.querySelector(selector);
    const { x, y, width, height } = element.getBoundingClientRect();
    return { left: x, top: y, width, height, id: element.id };
  }, selector);
};

export const insertMedia = async (page, filenames = ['one.svg']) => {
  // We need to wrap this as the xpath selector used in integration tests
  // isnt valid in puppeteer
  await integrationInsertMedia(page, filenames, 'div[aria-label="%s"]');
};

// Execute the click using page.evaluate
// There appears to be a bug in Puppeteer which causes the
// "Node is either not visible or not an HTMLElement" error.
// https://product-fabric.atlassian.net/browse/ED-5688
export const evaluateClick = (page, selector) => {
  return page.evaluate(selector => {
    document.querySelector(selector).click();
  }, selector);
};
