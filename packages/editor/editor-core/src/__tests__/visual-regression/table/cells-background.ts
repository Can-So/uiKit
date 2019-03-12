import { Device, initFullPageEditorWithAdf, snapshot } from '../_utils';

import {
  selectCellBackground,
  clickFirstCell,
} from '../../__helpers/page-objects/_table';

import * as adf from './__fixtures__/default-table.adf.json';

describe('Table context menu: cells background', () => {
  let page: any;
  const tolerance = 0.01;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  beforeEach(async () => {
    await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
    await clickFirstCell(page);
  });

  it(`should set background color to cells`, async () => {
    await selectCellBackground({
      page,
      colorIndex: 2,
      from: {
        row: 1,
        column: 1,
      },
      to: {
        row: 1,
        column: 3,
      },
    });
    await snapshot(page, tolerance);

    await selectCellBackground({
      page,
      colorIndex: 3,
      from: {
        row: 2,
        column: 1,
      },
      to: {
        row: 2,
        column: 3,
      },
    });
    await snapshot(page, tolerance);

    await selectCellBackground({
      page,
      colorIndex: 4,
      from: {
        row: 3,
        column: 1,
      },
      to: {
        row: 3,
        column: 3,
      },
    });
    await snapshot(page, tolerance);
  });
});
