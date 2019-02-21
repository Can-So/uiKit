import { insertMedia as integrationInsertMedia } from '../../integration/_helpers';
import { Page } from './_types';

// Selectors
const mediaUploadCard = '.e2e-recent-upload-card';
const mediaImage = '.media-single .img-wrapper';

export const insertMedia = async (page: Page, filenames = ['one.svg']) => {
  // We need to wrap this as the xpath selector used in integration tests
  // isnt valid in puppeteer
  await integrationInsertMedia(page, filenames, 'div[aria-label="%s"]');
};

export async function waitForMediaToBeLoaded(page: Page) {
  await page.waitForSelector(mediaImage);
  await page.waitForSelector(mediaUploadCard, {
    // We need to wait for the upload card to dissapear
    hidden: true,
  });
}
