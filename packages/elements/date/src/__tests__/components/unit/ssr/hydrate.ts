import { SSRHelper } from '@atlaskit/elements-test-helpers';

describe('SSR', () => {
  const ssrHelper = new SSRHelper();

  beforeAll(() => {
    ssrHelper.beforeHydration();
  });

  afterAll(() => {
    ssrHelper.afterHydration();
  });

  test('should ssr then hydrate tag correctly', async () => {
    await ssrHelper.hydrateSSRAndAssert('date');
  });
});
