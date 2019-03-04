import { SSRHelper } from '@atlaskit/elements-test-helpers';
import 'whatwg-fetch';
import { whiteList } from '../../_ssr-config';

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
