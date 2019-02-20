import { initFullPageEditorWithAdf, snapshot, Device } from './_utils';
import * as adf from './__fixtures__/code-block-adf.json';

describe('Snapshot Test: Breakout', () => {
  it('looks correct', async () => {
    // @ts-ignore
    const page = global.page;
    await initFullPageEditorWithAdf(page, adf, Device.LaptopMDPI);
    await snapshot(page);
  });
});
