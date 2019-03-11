/**
 * @jest-environment node
 */
import { SSRHelper } from '@atlaskit/elements-test-helpers';
import { blackList } from './_ssr-config';

describe('server side rendering', () => {
  const ssrHelper = new SSRHelper({ blackList });

  test('emoji server side rendering', async () => {
    await ssrHelper.renderSSRAndAssert('emoji');
  });
});
