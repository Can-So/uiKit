/**
 * @jest-environment node
 */
import { SSRHelper } from '@atlaskit/elements-test-helpers';
import 'whatwg-fetch';
import { whiteList } from './hydrate';

describe('server side rendering', () => {
  const ssrHelper = new SSRHelper(whiteList);

  beforeAll(() => {
    ssrHelper.beforeAll();
  });

  afterAll(() => {
    ssrHelper.afterAll();
  });

  test('emoji server side rendering', async () => {
    await ssrHelper.renderSSRAndAssert('emoji');
  });
});
