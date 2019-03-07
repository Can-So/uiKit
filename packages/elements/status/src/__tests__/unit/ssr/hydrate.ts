import { SSRHydrationHelper } from '@atlaskit/elements-test-helpers';

describe('server side rendering - hydrate', () => {
  const ssrHelper = new SSRHydrationHelper({});

  test('should ssr then hydrate tag correctly', async () => {
    await ssrHelper.hydrateSSRAndAssert('status');
  });
});
