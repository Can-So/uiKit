/**
 * @jest-environment node
 */

import { SSRHelper } from '@atlaskit/elements-test-helpers';
import { whiteList } from '../../_ssr-config';
import 'whatwg-fetch';

describe('server side rendering', () => {
  const ssrHelper = new SSRHelper(whiteList);
  let _window: any;

  beforeAll(() => {
    if (global) {
      _window = (global as any).window;
      // note: emoji resource uses localStorage if available so gotta mock window to avoid errors there
      (global as any).window = {};
    }
  });

  afterAll(() => {
    if (global) {
      (global as any).window = _window;
    }
  });

  test('emoji server side rendering', async () => {
    await ssrHelper.renderSSRAndAssert('emoji');
  });
});
