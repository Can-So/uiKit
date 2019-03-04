import { SSRHelper } from '@atlaskit/elements-test-helpers';
import 'whatwg-fetch';

export const whiteList = [
  '00-simple-emoji.tsx',
  '01-skin-tone-emoji-by-shortcut.tsx',
  '02-content-resourced-emoji.tsx',
  '07-resourced-emoji-real-emoji-resource.tsx',
  '08-big-resourced-emoji-real-emoji-resource.tsx',
  '11-emoji-preview-with-description.tsx',
  '12-emoji-preview-with-long-name-description-tone-selector.tsx',
  '15-category-selector.tsx',
  '16-tone-selector.tsx',
  '17-emoji-upload-preview.tsx',
  '18-emoji-upload-preview-error.tsx',
];

describe('server side rendering - hydrate', () => {
  const ssrHelper = new SSRHelper(whiteList);

  beforeAll(() => {
    ssrHelper.beforeAll();
  });

  afterAll(() => {
    ssrHelper.afterAll();
  });

  test('should ssr then hydrate tag correctly', async () => {
    await ssrHelper.hidrateSSRAndAssert('emoji');
  });
});
