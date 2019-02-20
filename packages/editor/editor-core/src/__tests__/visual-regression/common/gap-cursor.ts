import { initFullPageEditorWithAdf, snapshot } from '../_utils';
import * as gapcursor from '../__fixtures__/gap-cursor-adf.json';
import * as pageObject from '../_pageObjects';

describe('Gap cursor', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, gapcursor);
  });

  it('should render gap cursor for code when ArrowRight', async () => {
    await page.click(pageObject.codeContent);
    await page.keyboard.down(pageObject.arrowRight);
    await page.waitForSelector(pageObject.gapCursor);
    await snapshot(page);
  });

  it(' should render gap cursor on panel when ArrowLeft', async () => {
    await page.click(pageObject.panelContent);
    await page.keyboard.down(pageObject.arrowLeft);
    await page.waitForSelector(pageObject.gapCursor);
    await snapshot(page);
  });

  it(' should render gap cursor on table on ArrowUp', async () => {
    await page.click(pageObject.panelContent);
    await page.keyboard.down(pageObject.arrowLeft);
    await page.keyboard.down(pageObject.arrowUp);
    await page.waitForSelector(pageObject.gapCursor);
    await snapshot(page);
  });

  it(' should render gap cursor on table on ArrowDown', async () => {
    await page.click(pageObject.codeContent);
    await page.keyboard.down(pageObject.arrowRight);
    await page.keyboard.down(pageObject.arrowDown);
    await page.waitForSelector(pageObject.gapCursor);
    await snapshot(page);
  });

  // TODO - redo this test
  // ['table', 'bodied'].forEach(node => {
  //   ['wide', 'full-width'].forEach(layout => {
  //     [
  //       { key: 'ArrowLeft', side: 'Left' },
  //       { key: 'ArrowUp', side: 'Left' },
  //       { key: 'ArrowRight', side: 'Right' },
  //     ].forEach(({ key, side }) => {
  //       it(`should render gap cursor in ${layout} layout for node ${nodeLabel(
  //         node,
  //       )} on ${side} side when hitting ${key}`, async () => {
  //         await page.setViewport({ width: 1920, height: 1080 });
  //         await page.type('.ProseMirror p', `/${node}`);
  //         await page.waitFor('div[aria-label="Popup"] span[role="button"]');
  //         await page.click('div[aria-label="Popup"] span[role="button"]');
  //         if (node === 'table') {
  //           await setTableLayout(page, layout);
  //           if (side === 'Right') {
  //             await page.keyboard.down(`ArrowDown`);
  //             await page.keyboard.down(`ArrowDown`);
  //             await page.keyboard.down(`ArrowDown`);
  //           }
  //         } else {
  //           const layoutSelector = {
  //             wide: commonMessages.layoutWide.defaultMessage,
  //             'full-width': commonMessages.layoutFullWidth.defaultMessage,
  //           };
  //           await changeSelectedNodeLayout(page, layoutSelector[layout]);
  //         }
  //         await page.keyboard.down(key);
  //         await page.waitForSelector('.ProseMirror-gapcursor');
  //         await snapshot(page);
  //       });
  //     });
  //   });
  // });
});
