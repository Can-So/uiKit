import { getExampleUrl } from '@atlaskit/visual-regression/helper';

export const DEFAULT_WIDTH = 0;
export const DEFAULT_HEIGHT = 600;

export const dynamicTextViewportSizes = [
  { width: 1440, height: 4000 },
  { width: 1280, height: 4000 },
  { width: 768, height: 4000 },
  { width: 1024, height: 4000 },
];

export const deviceViewPorts = {
  LaptopHiDPI: { width: 1440, height: 900 },
  LaptopMDPI: { width: 1280, height: 800 },
  iPadPro: { width: 1024, height: 1366 },
  iPad: { width: 768, height: 1024 },
  iPhonePlus: { width: 414, height: 736 },
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

export const enableAllEditorProps = {
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

export async function mountEditor(page: any, props) {
  await page.evaluate(props => {
    (window as any).__mountEditor(props);
  }, props);
  await page.waitForSelector('.ProseMirror', 500);
}

export const initFullPageEditorWithAdf = async (page, adf: Object) => {
  const url = getExampleUrl('editor', 'editor-core', 'vr-testing');
  await page.goto(url);
  await mountEditor(page, {
    appearance: 'full-page',
    defaultValue: JSON.stringify(adf),
    primaryToolbarComponents: true,
    contentComponents: true,
    ...enableAllEditorProps,
  });
};

export const initCommentEditorWithAdf = async (page, adf: Object) => {
  const url = getExampleUrl('editor', 'editor-core', 'vr-testing');
  await page.goto(url);
  await mountEditor(page, {
    appearance: 'comment',
    defaultValue: JSON.stringify(adf),
    primaryToolbarComponents: true,
    ...enableAllEditorProps,
  });
};

export const clearEditor = async page => {
  await page.evaluate(() => {
    const dom = document.querySelector('.ProseMirror') as HTMLElement;
    dom.innerHTML = '<p><br /></p>';
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
