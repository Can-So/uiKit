import {
  initEditor,
  clearEditor,
  snapshot,
  changeSelectedNodeLayout,
} from './_utils';
import { setTableLayout } from './table/_table-utils';
import commonMessages from '../../messages';

const nodeLabel = node => {
  switch (node) {
    case 'code':
      return 'code block';
    case 'bodied':
      return 'bodied extension';
    default:
      return node;
  }
};

describe('Snapshot Test: Gap cursor', () => {
  let page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initEditor(page, 'full-page');
  });

  beforeEach(async () => {
    await clearEditor(page);
  });

  ['table', 'code', 'panel', 'action', 'decision', 'bodied', 'columns'].forEach(
    node => {
      [
        { key: 'ArrowLeft', side: 'Left' },
        { key: 'ArrowUp', side: 'Left' },
        { key: 'ArrowRight', side: 'Right' },
      ].forEach(({ key, side }) => {
        it(`should render gap cursor for node ${nodeLabel(
          node,
        )} on ${side} side when hitting ${key}`, async () => {
          await page.type('.ProseMirror p', `/${node}`);
          await page.waitFor('div[aria-label="Popup"] span[role="button"]');
          await page.click('div[aria-label="Popup"] span[role="button"]');
          if (node === 'table' && side === 'Right') {
            await page.keyboard.down(`ArrowDown`);
            await page.keyboard.down(`ArrowDown`);
            await page.keyboard.down(`ArrowDown`);
          }
          if (node === 'columns' && side === 'Right') {
            await page.keyboard.down(`ArrowRight`);
          }
          await page.keyboard.down(key);
          await page.waitForSelector('.ProseMirror-gapcursor');
          await snapshot(page);
        });
      });
    },
  );

  ['table', 'bodied'].forEach(node => {
    ['wide', 'full-width'].forEach(layout => {
      [
        { key: 'ArrowLeft', side: 'Left' },
        { key: 'ArrowUp', side: 'Left' },
        { key: 'ArrowRight', side: 'Right' },
      ].forEach(({ key, side }) => {
        it(`should render gap cursor in ${layout} layout for node ${nodeLabel(
          node,
        )} on ${side} side when hitting ${key}`, async () => {
          await page.setViewport({ width: 1920, height: 1080 });
          await page.type('.ProseMirror p', `/${node}`);
          await page.waitFor('div[aria-label="Popup"] span[role="button"]');
          await page.click('div[aria-label="Popup"] span[role="button"]');
          if (node === 'table') {
            await setTableLayout(page, layout);
            if (side === 'Right') {
              await page.keyboard.down(`ArrowDown`);
              await page.keyboard.down(`ArrowDown`);
              await page.keyboard.down(`ArrowDown`);
            }
          } else {
            const layoutSelector = {
              wide: commonMessages.layoutWide.defaultMessage,
              'full-width': commonMessages.layoutFullWidth.defaultMessage,
            };
            await changeSelectedNodeLayout(page, layoutSelector[layout]);
          }
          await page.keyboard.down(key);
          await page.waitForSelector('.ProseMirror-gapcursor');
          await snapshot(page);
        });
      });
    });
  });
});
