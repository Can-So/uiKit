import { snapshot, initFullPageEditorWithAdf, Device } from '../_utils';
import * as adf from '../__fixtures__/noData-adf.json';
import {
  deleteColumn,
  resizeColumn,
  insertTable,
} from '../../__helpers/page-objects/_table';
import { TableCssClassName as ClassName } from '../../../plugins/table/types';

describe('Snapshot Test: table resizing', () => {
  describe('Re-sizing', () => {
    let page;
    beforeEach(async () => {
      // @ts-ignore
      page = global.page;
      await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
      await insertTable(page);
    });

    it(`resize a column with content width`, async () => {
      await resizeColumn(page, { colIdx: 2, amount: 123, row: 2 });
      await snapshot(page);
      await resizeColumn(page, { colIdx: 2, amount: -100, row: 2 });
      await snapshot(page);
    });

    it(`snaps back to layout width after column removal`, async () => {
      await snapshot(page);
      await deleteColumn(page, 1);
      await snapshot(page);
    });

    it('overflow table', async () => {
      await snapshot(page);
      await resizeColumn(page, { colIdx: 2, amount: 500, row: 2 });
      await snapshot(page);

      // Scroll to the end of col we are about to resize
      // Its in overflow.
      await page.evaluate(ClassName => {
        const element = document.querySelector(
          `.${ClassName.TABLE_NODE_WRAPPER}`,
        ) as HTMLElement;

        if (element) {
          element.scrollTo(element.offsetWidth, 0);
        }
      }, ClassName);

      await resizeColumn(page, { colIdx: 2, amount: -550, row: 2 });

      // Scroll back so we can see the result of our resize.
      await page.evaluate(ClassName => {
        const element = document.querySelector(
          `.${ClassName.TABLE_NODE_WRAPPER}`,
        ) as HTMLElement;

        if (element) {
          element.scrollTo(0, 0);
        }
      }, ClassName);

      await snapshot(page, 0.01);
    });
  });
});
