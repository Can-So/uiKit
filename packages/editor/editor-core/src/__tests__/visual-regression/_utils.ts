import { getExampleUrl } from '@atlaskit/visual-regression/helper';
import { insertMedia as integrationInsertMedia } from '../integration/_helpers';
import { messages as insertBlockMessages } from '../../plugins/insert-block/ui/ToolbarInsertBlock';
import { messages as blockTypeMessages } from '../../plugins/block-type/types';
import { messages as textFormattingMessages } from '../../plugins/text-formatting/ui/ToolbarTextFormatting';
import { messages as advancedTextFormattingMessages } from '../../plugins/text-formatting/ui/ToolbarAdvancedTextFormatting';
import { messages as listsMessages } from '../../plugins/lists/messages';
import { messages as textColorMessages } from '../../plugins/text-color/ui/ToolbarTextColor';
export {
  setupMediaMocksProviders,
  editable,
  changeSelectedNodeLayout,
  rerenderEditor,
  setFeature,
  toggleFeature,
} from '../integration/_helpers';

export const DEFAULT_WIDTH = 800;
export const DEFAULT_HEIGHT = 600;

export const dynamicTextViewportSizes = [
  { width: 1440, height: 4000 },
  { width: 1280, height: 4000 },
  { width: 768, height: 4000 },
  { width: 1024, height: 4000 },
];

export const resetViewport = async page => {
  await page.setViewport({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
};

export const escapeStr = (str: string) => {
  return `concat('${str.replace(/'/g, `', "'", '`)}', '')`;
};

export const viewportSizes = [{ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }];

export const selectByTextAndClick = async ({ page, tagName, text }) => {
  const target = await page.$x(
    `//${tagName}[contains(text(), ${escapeStr(text)})]`,
  );
  if (target.length > 0) {
    await target[0].click();
  } else {
    throw new Error(`Target element is not found: ${text}`);
  }
};

// TODO: remove this gotoExample step
export const initEditor = async (page, appearance: string) => {
  const editor = '.ProseMirror';
  const url = getExampleUrl(
    'editor',
    'editor-core',
    appearance,
    // @ts-ignore
    global.__BASEURL__,
  );
  await page.goto(url);
  if (appearance === 'comment') {
    const placeholder = 'input[placeholder="What do you want to say?"]';
    await page.waitForSelector(placeholder);
    await page.click(placeholder);
  }

  await page.setViewport({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  await page.waitForSelector(editor);
  await page.click(editor);
  await page.addStyleTag({
    content: `
      .json-output { display: none; }
      .ProseMirror { caret-color: transparent; }
      .ProseMirror-gapcursor span::after { animation-play-state: paused !important; }
    `,
  });
};

export enum Device {
  Default = 'Default',
  LaptopHiDPI = 'LaptopHiDPI',
  LaptopMDPI = 'LaptopMDPI',
  iPadPro = 'iPadPro',
  iPad = 'iPad',
  iPhonePlus = 'iPhonePlus',
}

export const deviceViewPorts = {
  [Device.Default]: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
  [Device.LaptopHiDPI]: { width: 1440, height: 900 },
  [Device.LaptopMDPI]: { width: 1280, height: 800 },
  [Device.iPadPro]: { width: 1024, height: 1366 },
  [Device.iPad]: { width: 768, height: 1024 },
  [Device.iPhonePlus]: { width: 414, height: 736 },
};

function getEditorProps(appearance: Appearance) {
  const enableAllEditorProps = {
    allowPanel: true,
    allowLists: true,
    allowTextColor: true,
    allowTextAlignment: true,
    quickInsert: true,
    allowCodeBlocks: { enableKeybindingsForIDE: true },
    allowTables: {
      advanced: true,
    },
    allowBreakout: true,
    allowJiraIssue: true,
    allowUnsupportedContent: true,
    allowExtension: {
      allowBreakout: true,
    },
    allowRule: true,
    allowDate: true,
    allowLayouts: {
      allowBreakout: true,
    },
    allowIndentation: true,
    allowTemplatePlaceholders: { allowInserting: true },
    allowStatus: true,
    media: true, // add true here since the testing example would handle providers
    placeholder:
      'Use markdown shortcuts to format your page as you type, like * for lists, # for headers, and *** for a horizontal rule.',
    shouldFocus: false,
    UNSAFE_cards: true,
  };

  if (appearance === Appearance.fullPage) {
    return {
      ...enableAllEditorProps,
      primaryToolbarComponents: true,
      contentComponents: true,
    };
  }

  if (appearance === Appearance.comment) {
    return {
      ...enableAllEditorProps,
      media: {
        allowMediaSingle: false,
        allowMediaGroup: true,
      },
    };
  }

  return enableAllEditorProps;
}

async function mountEditor(page: any, props) {
  await page.evaluate(props => {
    (window as any).__mountEditor(props);
  }, props);
  await page.waitForSelector('.ProseMirror', 500);
}

export enum Appearance {
  fullPage = 'full-page',
  comment = 'comment',
}

type InitEditorWithADFOptions = {
  appearance: Appearance;
  adf?: Object;
  device?: Device;
};

export const initEditorWithAdf = async (
  page,
  { appearance, adf = {}, device = Device.Default }: InitEditorWithADFOptions,
) => {
  const url = getExampleUrl('editor', 'editor-core', 'vr-testing');

  const currentUrl = page.url();

  if (currentUrl !== url) {
    // We don't have to load the already existing page
    await page.goto(url);
  }

  // Set the viewport to the right one
  await page.setViewport(deviceViewPorts[device]);

  // Mount the editor with the right attributes
  await mountEditor(page, {
    appearance: appearance,
    defaultValue: JSON.stringify(adf),
    ...getEditorProps(appearance),
  });
};

export const initFullPageEditorWithAdf = async (page, adf: Object) => {
  await initEditorWithAdf(page, {
    adf,
    appearance: Appearance.fullPage,
  });
};

export const initCommentEditorWithAdf = async (page, adf: Object) => {
  await initEditorWithAdf(page, {
    adf,
    appearance: Appearance.comment,
  });
};

export const clearEditor = async page => {
  await page.evaluate(() => {
    const dom = document.querySelector('.ProseMirror') as HTMLElement;
    dom.innerHTML = '<p><br /></p>';
  });
};

export const insertBlockMenuItem = async (
  page,
  menuTitle,
  tagName = 'span',
) => {
  const openInsertBlockMenuSelector = `[aria-label="${
    insertBlockMessages.insertMenu.defaultMessage
  }"]`;

  await page.click(openInsertBlockMenuSelector);
  // Do we need to wait for something here?
  await selectByTextAndClick({ page, text: menuTitle, tagName });
};

export const insertTable = async page => {
  await page.click(
    `span[aria-label="${insertBlockMessages.table.defaultMessage}"]`,
  );
  await page.waitForSelector('table td p');
};

type CellSelectorOpts = {
  row: number;
  cell?: number;
  cellType?: 'td' | 'th';
};

export const getSelectorForTableCell = ({
  row,
  cell,
  cellType = 'td',
}: CellSelectorOpts) => {
  const rowSelector = `table tr:nth-child(${row})`;
  if (!cell) {
    return rowSelector;
  }

  return `${rowSelector} > ${cellType}:nth-child(${cell})`;
};

export const getSelectorForTableRow = (row: number) => {
  return `table tr:nth-child(${row})`;
};

export const insertMenuSelector = `span[aria-label="${
  insertBlockMessages.insertMenu.defaultMessage
}"]`;

export const advanceFormattingMenuSelector = `span[aria-label="${
  advancedTextFormattingMessages.moreFormatting.defaultMessage
}"]`;

export const insertMenuTests = [
  // -----------------
  // Insert menu items
  // -----------------
  {
    name: 'Quote',
    // click selector (dropdown menu or toolbar icon)
    clickSelector: insertMenuSelector,
    // menu item selector - when given, it should match item inner text
    menuItemText: blockTypeMessages.blockquote.defaultMessage,
    // inserted node selector - wait for the node to be inserted
    nodeSelector: 'blockquote p',
    // is used for testing marks and typing inside content nodes
    content: 'text',
    // where to test
    appearance: ['full-page', 'comment'],
  },
  {
    name: 'Code snippet',
    menuItemText: blockTypeMessages.codeblock.defaultMessage,
    clickSelector: insertMenuSelector,
    nodeSelector: 'div.code-block code',
    content: 'text',
    appearance: ['full-page', 'comment'],
  },
  {
    name: 'Panel',
    menuItemText: blockTypeMessages.panel.defaultMessage,
    clickSelector: insertMenuSelector,
    nodeSelector: 'div[paneltype] p',
    content: 'text',
    appearance: ['full-page'],
  },
  {
    name: 'Divider',
    menuItemText: insertBlockMessages.horizontalRule.defaultMessage,
    clickSelector: insertMenuSelector,
    nodeSelector: 'hr',
    appearance: ['full-page', 'comment'],
  },
  {
    name: 'Date',
    menuItemText: insertBlockMessages.date.defaultMessage,
    clickSelector: insertMenuSelector,
    nodeSelector: 'span[timestamp]',
    appearance: ['full-page'],
  },
  {
    name: 'Columns',
    menuItemText: insertBlockMessages.columns.defaultMessage,
    clickSelector: insertMenuSelector,
    nodeSelector: 'div[data-layout-type] p',
    content: 'text',
    appearance: ['full-page'],
  },
];

export const toolBarItemsTests = [
  // -----------------
  // Toolbar items
  // -----------------
  {
    name: 'Table',
    clickSelector: `span[aria-label="${
      insertBlockMessages.table.defaultMessage
    }"]`,
    nodeSelector: 'table th p',
    content: 'text',
    appearance: ['full-page', 'comment'],
  },
  {
    name: 'Action',
    clickSelector: `span[aria-label="${
      insertBlockMessages.action.defaultMessage
    }"]`,
    nodeSelector: 'ol[data-task-list-local-id] div',
    content: 'text',
    appearance: ['full-page', 'message'],
  },
  {
    name: 'Decision',
    clickSelector: `span[aria-label="${
      insertBlockMessages.decision.defaultMessage
    }"]`,
    nodeSelector: 'ol[data-decision-list-local-id] div',
    content: 'text',
    appearance: ['message'],
  },
  {
    name: 'Ordered list',
    clickSelector: `span[aria-label="${
      listsMessages.orderedList.defaultMessage
    }"]`,
    nodeSelector: 'ol li p',
    content: 'text',
    appearance: ['full-page', 'comment'],
  },
  {
    name: 'Unordered list',
    clickSelector: `span[aria-label="${
      listsMessages.unorderedList.defaultMessage
    }"]`,
    nodeSelector: 'ul li p',
    content: 'text',
    appearance: ['full-page', 'comment'],
  },
  Array.from(Array(6).keys()).map(key => {
    const level = key + 1;
    return {
      name: `Heading ${level}`,
      clickSelector: 'button[aria-haspopup="true"]',
      menuItemText: blockTypeMessages[`heading${level}`].defaultMessage,
      nodeSelector: `h${level}`,
      tagName: `h${level}`,
      content: 'text',
      appearance: ['full-page'], // TODO add comment mode back
      // removing comment since throwing error Node is detached from document
    };
  }),
];

export const baseTests = [
  // -----------------
  // Marks
  // -----------------
  ['bold', 'italic']
    .map(k => textFormattingMessages[k].defaultMessage)
    .map(key => ({
      name: key,
      clickSelector: `span[aria-label="${key}"]`,
      nodeSelector: '.ProseMirror p',
      content: 'text',
      appearance: ['full-page', 'comment'],
    })),
  ['underline', 'strike', 'code', 'subscript', 'superscript']
    .map(k => advancedTextFormattingMessages[k].defaultMessage)
    .map(key => ({
      name: key,
      menuItemText: key,
      clickSelector: advanceFormattingMenuSelector,
      nodeSelector: '.ProseMirror p',
      content: 'text',
      appearance: ['full-page', 'comment'],
    })),
  // TODO run this after the fix for 'Light grey' on master
  // Array.from(colorPalette.values()).map(key => {
  //   return {
  //     name: `Text color: ${key}`,
  //     clickSelector: `span[aria-label="${
  //       textColorMessages.textColor.defaultMessage
  //     }"]`,
  //     menuItemSelector: `button[title="${key}"]`,
  //     nodeSelector: '.ProseMirror p',
  //     content: 'text',
  //     appearance: ['full-page', 'comment'],
  //   };
  // }),
];

const dropdowns = [
  // -----------------
  // Dropdowns
  // -----------------
  {
    name: 'Normal text dropdown',
    clickSelector: 'button[aria-haspopup="true"]',
    appearance: ['full-page', 'comment'],
  },
  {
    name: 'Insert menu',
    clickSelector: insertMenuSelector,
    appearance: ['full-page', 'comment'],
  },
  {
    name: 'Advance formatting menu',
    clickSelector: advanceFormattingMenuSelector,
    appearance: ['full-page', 'comment'],
  },
  {
    name: 'Text color picker',
    clickSelector: `span[aria-label="${
      textColorMessages.textColor.defaultMessage
    }"]`,
    appearance: ['full-page', 'comment'],
  },
  {
    name: 'Mention picker',
    clickSelector: `span[aria-label="${
      insertBlockMessages.mention.defaultMessage
    }"]`,
    nodeSelector: 'span[data-type-ahead-query]',
    appearance: ['full-page', 'comment', 'message'],
  },
  {
    name: 'Hyperlink Recent Search',
    clickSelector: `span[aria-label="${
      insertBlockMessages.link.defaultMessage
    }"]`,
    appearance: ['full-page', 'comment'],
  },
];

// group tests by appearances
export const testsByAppearance = {};

const addToAppearance = test => {
  test.appearance.forEach(appearance => {
    if (!testsByAppearance[appearance]) {
      testsByAppearance[appearance] = [];
    }
    testsByAppearance[appearance].push(test);
  });
};

export const setTests = forInput => {
  let testArr: any[] = baseTests;
  if (forInput === 'insertMenu') {
    testArr = insertMenuTests;
  } else if (forInput === 'toolbar') {
    testArr = toolBarItemsTests;
  } else if (forInput === 'dropdown') {
    testArr = dropdowns;
  }
  testArr.forEach(test => {
    if (Array.isArray(test)) {
      test.forEach(addToAppearance);
    } else {
      addToAppearance(test);
    }
  });
};

export const snapshot = async (
  page,
  tolerance?: number,
  selector = '.akEditor',
) => {
  const editor = await page.$(selector);

  // Try to take a screenshot of only the editor.
  // Otherwise take the whole page.
  let image;
  if (editor) {
    image = await editor.screenshot();
  } else {
    image = await page.screenshot();
  }

  if (tolerance !== undefined) {
    // @ts-ignore
    expect(image).toMatchProdImageSnapshot({
      failureThreshold: `${tolerance}`,
      failureThresholdType: 'percent',
    });
  } else {
    // @ts-ignore
    expect(image).toMatchProdImageSnapshot();
  }
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

export const getBoundingRect = async (page, selector) => {
  return await page.evaluate(selector => {
    const element = document.querySelector(selector);
    const { x, y, width, height } = element.getBoundingClientRect();
    return { left: x, top: y, width, height, id: element.id };
  }, selector);
};
