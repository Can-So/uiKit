import { SSRHelper } from '@atlaskit/elements-test-helpers';

describe('SSR', () => {
  const ssrHelper = new SSRHelper();

  beforeAll(() => {
    ssrHelper.beforeAll();
  });

  afterAll(() => {
    ssrHelper.afterAll();
  });

  test('should ssr then hydrate tag correctly', async () => {
    await ssrHelper.hidrateSSRAndAssert('date');
  });
});
