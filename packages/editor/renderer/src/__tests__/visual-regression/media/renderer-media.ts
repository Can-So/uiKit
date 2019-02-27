import {
  snapshot,
  deviceViewPorts,
  Device,
  goToRendererTestingExample,
  mountRenderer,
} from '../_utils';
import * as adf from './__fixtures__/renderer-media.adf.json';
import { selectors as mediaSelectors } from '../../__helpers/page-objects/_media';
import { selectors as rendererSelectors } from '../../__helpers/page-objects/_renderer';

const devices = [
  Device.LaptopHiDPI,
  Device.LaptopMDPI,
  Device.iPad,
  Device.iPadPro,
  Device.iPhonePlus,
];

describe('Snapshot Test: Media', () => {
  describe('renderer', () => {
    let page;

    beforeAll(async () => {
      // @ts-ignore
      page = global.page;
      await goToRendererTestingExample(page);
    });

    describe('media layout', () => {
      devices.forEach(device => {
        it(`should correctly render ${device}`, async () => {
          await page.setViewport(deviceViewPorts[device]);
          await mountRenderer(page, {
            appearance: 'full-page',
            allowDynamicTextSizing: true,
            document: adf,
          });

          await page.waitForSelector(mediaSelectors.errorLoading); // In test should show overlay error

          await page.waitForSelector(rendererSelectors.document);
          await snapshot(page, undefined, rendererSelectors.document);
        });
      });
    });
  });
});
