/**
 * @jest-environment node
 */
import { SSRHelper } from '@atlaskit/elements-test-helpers';

describe('server side rendering', () => {
  const ssrHelper = new SSRHelper({});

  test('date server side rendering', async () => {
    await ssrHelper.renderSSRAndAssert('date');
  });
});
