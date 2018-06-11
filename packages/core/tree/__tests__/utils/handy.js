//@flow

import { range } from '../../src/utils/handy';

describe('@atlaskit/tree - utils/handy', () => {
  describe('#range', () => {
    it('generates numbers', () => {
      expect(range(3)).toEqual([0, 1, 2]);
    });
  });
});
