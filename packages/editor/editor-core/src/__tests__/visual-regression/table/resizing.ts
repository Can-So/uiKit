import { snapshot, initFullPageEditorWithAdf, Device } from '../_utils';
import * as resziedTableWithMergedCells from './__fixtures__/resized-table-with-merged-cells.adf.json';
import * as adf from '../common/__fixtures__/noData-adf.json';
import {
  deleteColumn,
  resizeColumn,
  insertTable,
  grabResizeHandle,
  clickFirstCell,
  toggleBreakout,
  getSelectorForTableCell,
} from '../../__helpers/page-objects/_table';
import { TableCssClassName as ClassName } from '../../../plugins/table/types';
import { animationFrame } from '../../__helpers/page-objects/_editor';
import {
  clickBlockMenuItem,
  BlockMenuItem,
} from '../../__helpers/page-objects/_blocks';
import { KeyboardKeys } from '../../__helpers/page-objects/_keyboard';

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
      await animationFrame(page);
      await snapshot(page, 0.002);
      await resizeColumn(page, { colIdx: 2, amount: -100, row: 2 });
      await animationFrame(page);
      await snapshot(page, 0.002);
    });

    it(`snaps back to layout width after column removal`, async () => {
      await deleteColumn(page, 1);
      await animationFrame(page);
      await snapshot(page);
    });

    it('overflow table', async () => {
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

describe('Snapshot Test: table resize handle', () => {
  let page;
  beforeEach(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, adf, Device.LaptopMDPI);
    await insertTable(page);
  });

  describe('when table has merged cells', () => {
    it(`should render resize handle spanning all rows`, async () => {
      await grabResizeHandle(page, { colIdx: 2, row: 2 });
      await snapshot(page, 0.01);
    });
  });
});

describe('Snapshot Test: table scale', () => {
  let page;
  beforeEach(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI, undefined, {
      allowDynamicTextSizing: true,
    });
    await insertTable(page);
    await clickFirstCell(page);
  });

  it(`should not overflow the table with dynamic text sizing enabled`, async () => {
    await toggleBreakout(page, 1);
    await snapshot(page, 0.005);
  });
});

// ED-6496 - Temporarily skipping while we resolve a date and column issue.
describe.skip('Snapshot Test: table breakout content', () => {
  let page;
  beforeEach(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(
      page,
      resziedTableWithMergedCells,
      Device.LaptopHiDPI,
      undefined,
      {
        allowDynamicTextSizing: true,
      },
    );
  });

  it(`should resize the column based on the content`, async () => {
    const selector = getSelectorForTableCell({ row: 2, cell: 1 });
    await page.click(selector);
    await clickBlockMenuItem(page, BlockMenuItem.blockExtension);
    await page.keyboard.press(KeyboardKeys.enter);
    await snapshot(page);
  });
});
