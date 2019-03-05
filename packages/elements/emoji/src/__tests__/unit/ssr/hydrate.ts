import { SSRHelper } from '@atlaskit/elements-test-helpers';
import 'whatwg-fetch';
import { whiteList } from './_ssr-config';

describe('server side rendering - hydrate', () => {
  const ssrHelper = new SSRHelper(whiteList);

  beforeAll(() => {
    ssrHelper.beforeHydration();
  });

  afterAll(() => {
    ssrHelper.afterHydration();
  });

  test('should ssr then hydrate tag correctly', async () => {
    await ssrHelper.hydrateSSRAndAssert('emoji');
  });
});
