import { initFullPageEditorWithAdf, snapshot } from './_utils';
import * as gapcursor from './__fixtures__/gap-cursor-adf.json';
// import { setTableLayout } from './table/_table-utils';
// import commonMessages from '../../messages';

describe('Snapshot Test: Gap cursor', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, gapcursor);
  });

  it('should render gap cursor for code when ArrowRight', async () => {
    await page.click('.code-content');
    await page.keyboard.down('ArrowRight');
    await page.waitForSelector('.ProseMirror-gapcursor');
    await snapshot(page);
  });

  it(' should render gap cursor on panel when ArrowLeft', async () => {
    await page.click('.ak-editor-panel__content');
    await page.keyboard.down('ArrowLeft');
    await page.waitForSelector('.ProseMirror-gapcursor');
    await snapshot(page);
  });

  it(' should render gap cursor on table on ArrowUp', async () => {
    await page.click('.ak-editor-panel__content');
    await page.keyboard.down('ArrowLeft');
    await page.keyboard.down('ArrowUp');
    await page.waitForSelector('.ProseMirror-gapcursor');
    await snapshot(page);
  });

  it(' should render gap cursor on table on ArrowDown', async () => {
    await page.click('.code-content');
    await page.keyboard.down('ArrowRight');
    await page.keyboard.down('ArrowDown');
    await page.waitForSelector('.ProseMirror-gapcursor');
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
