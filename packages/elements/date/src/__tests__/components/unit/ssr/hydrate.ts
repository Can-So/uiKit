import { SSRHydrationHelper } from '@atlaskit/elements-test-helpers';

describe('SSR', () => {
  const ssrHelper = new SSRHydrationHelper({});

  test('should ssr then hydrate tag correctly', async () => {
    await ssrHelper.hydrateSSRAndAssert('date');
  });
});
