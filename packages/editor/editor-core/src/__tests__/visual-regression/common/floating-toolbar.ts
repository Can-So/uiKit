import { initFullPageEditorWithAdf, snapshot } from '../_utils';
import { getSelectorForTableCell } from '../../__helpers/page-objects/_table';
import * as table from './__fixtures__/toolbar-adf.json';

describe('Floating toolbars:', () => {
  let page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, table);
  });

  afterEach(async () => {
    await snapshot(page, 0.01);
  });

  describe('', () => {
    it('should render the table toolbar', async () => {
      const endCellSelector = getSelectorForTableCell({ row: 3, cell: 2 });
      await page.click(endCellSelector);
    });

    it('should render the block extension toolbar inside table', async () => {
      const endCellSelector = getSelectorForTableCell({ row: 2, cell: 3 });
      await page.click(`${endCellSelector} .extensionView-content-wrap`);
    });

    it('should render the inline extension toolbar inside table', async () => {
      const endCellSelector = getSelectorForTableCell({ row: 2, cell: 2 });
      await page.click(`${endCellSelector} .inlineExtensionView-content-wrap`);
    });

    it('should render the info extension toolbar inside table', async () => {
      const endCellSelector = getSelectorForTableCell({ row: 3, cell: 3 });
      await page.click(`${endCellSelector} .inlineExtensionView-content-wrap`);
    });

    it('should render toolbar for macro', async () => {
      await page.click('[data-layout="full-width"]');
    });
  });
});
