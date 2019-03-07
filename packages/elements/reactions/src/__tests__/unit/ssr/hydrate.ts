import { SSRHydrationHelper } from '@atlaskit/elements-test-helpers';
import 'whatwg-fetch';
import { blackList } from './_ssr-config';

describe('server side rendering - hydrate', () => {
  const ssrHelper = new SSRHydrationHelper({ blackList });

  test('should ssr then hydrate tag correctly', async () => {
    await ssrHelper.hydrateSSRAndAssert('reactions');
  });
});
