import { expect } from 'chai';

import DuplicateLimitedQueue from '../src/DuplicateLimitedQueue';

describe('DuplicateLimitedQueue', () => {
  describe('initialisation', () => {
    it('should throw for illegal constructor parameters', () => {
      expect(
        () =>
          new DuplicateLimitedQueue<string>({
            maxDuplicates: 0,
            minUniqueItems: 2,
          }),
      ).to.throw(RangeError);
      expect(
        () =>
          new DuplicateLimitedQueue<string>({
            maxDuplicates: 3,
            minUniqueItems: 0,
          }),
      ).to.throw(RangeError);
    });

    it('should behave correctly when empty', () => {
      const queue = new DuplicateLimitedQueue<string>({
        maxDuplicates: 10,
        minUniqueItems: 5,
      });
      const items = queue.getItemsOrderedByDuplicateCount();
      // tslint:disable-next-line
      expect(items).to.be.empty;
    });

    it('should empty on clear', () => {
      const queue = new DuplicateLimitedQueue<string>({
        maxDuplicates: 10,
        minUniqueItems: 5,
      });
      queue.enqueue('monkey trousers');
      expect(queue.getItemsOrderedByDuplicateCount()).to.be.lengthOf(1);
      queue.clear();
      expect(queue.getItemsOrderedByDuplicateCount()).to.be.lengthOf(0);
    });
  });

  describe('limits', () => {
    it('should respect maximum size for unique set of items', () => {
      const itemsToAdd = [
        'Dopey',
        'Bashful',
        'Sneezy',
        'Grumpy',
        'Sleepy',
        'Doc',
        'Happy',
      ];
      const queue = new DuplicateLimitedQueue<string>({
        maxDuplicates: 3,
        minUniqueItems: 2,
      }); /// queue size of 6
      itemsToAdd.slice(0, 6).map(value => queue.enqueue(value));

      let queuedItems = queue.getItemsOrderedByDuplicateCount();
      expect(queuedItems).to.have.lengthOf(6);
      expect(queuedItems).to.have.members(itemsToAdd.slice(0, 6));

      // add one more item and 'Dopey' should be evicted
      queue.enqueue(itemsToAdd[6]);
      queuedItems = queue.getItemsOrderedByDuplicateCount();
      expect(queuedItems).to.have.lengthOf(6);
      expect(queuedItems).to.have.members(itemsToAdd.slice(1, 7));
    });

    it('should respect maximum size of one', () => {
      const queue = new DuplicateLimitedQueue<string>({
        maxDuplicates: 1,
        minUniqueItems: 1,
      }); /// queue size of 1
      queue.enqueue('apple');
      queue.enqueue('banana');

      let queuedItems = queue.getItemsOrderedByDuplicateCount();
      expect(queuedItems).to.have.lengthOf(1);
      expect(queuedItems[0]).to.equal('banana');

      queue.enqueue('pear');
      queuedItems = queue.getItemsOrderedByDuplicateCount();
      expect(queuedItems).to.have.lengthOf(1);
      expect(queuedItems[0]).to.equal('pear');
    });

    it('should respect maximum duplicate size', () => {
      const itemsToAdd = ['b', 'a', 'a', 'a', 'c', 'c'];

      const queue = new DuplicateLimitedQueue<string>({
        maxDuplicates: 3,
        minUniqueItems: 2,
      });
      itemsToAdd.map(value => queue.enqueue(value));

      let queuedItems = queue.getItemsOrderedByDuplicateCount();
      expect(queuedItems).to.have.lengthOf(3);
      expect(queuedItems).to.have.members(['a', 'b', 'c']);

      // add one more 'a'. 'b' should not be evicted.
      queue.enqueue('a');
      queuedItems = queue.getItemsOrderedByDuplicateCount();
      expect(queuedItems).to.have.lengthOf(3);
      expect(queuedItems).to.have.members(['a', 'b', 'c']);

      // add one more 'c'. 'b' should now be evicted
      queue.enqueue('c');
      queuedItems = queue.getItemsOrderedByDuplicateCount();
      expect(queuedItems).to.have.lengthOf(2);
      expect(queuedItems).to.have.members(['a', 'c']);
    });
  });

  describe('ordering', () => {
    it('should order most duplicated items first', () => {
      const itemsToAdd = ['b', 'a', 'a', 'a', 'c', 'c', 'd'];

      const queue = new DuplicateLimitedQueue<string>({
        maxDuplicates: 3,
        minUniqueItems: 3,
      });
      itemsToAdd.map(value => queue.enqueue(value));

      let queuedItems = queue.getItemsOrderedByDuplicateCount();
      expect(queuedItems).to.have.lengthOf(4);
      expect(queuedItems[0]).to.equal('a');
      expect(queuedItems[1]).to.equal('c');

      let equalFrequencyItems = ['b', 'd'];
      expect(equalFrequencyItems.indexOf(queuedItems[2])).to.not.equal(-1);

      // removed the item we just matched
      equalFrequencyItems = equalFrequencyItems.filter(
        value => value !== queuedItems[2],
      );
      expect(queuedItems[3]).to.equal(equalFrequencyItems[0]);
    });

    it('should re-order when some item becomes more duplicated', () => {
      const itemsToAdd = ['b', 'a', 'a', 'c'];

      const queue = new DuplicateLimitedQueue<string>({
        maxDuplicates: 4,
        minUniqueItems: 3,
      });
      itemsToAdd.map(value => queue.enqueue(value));

      let queuedItems = queue.getItemsOrderedByDuplicateCount();
      expect(queuedItems).to.have.lengthOf(3);
      expect(queuedItems[0]).to.equal('a');

      queue.enqueue('c');
      queue.enqueue('c');

      queuedItems = queue.getItemsOrderedByDuplicateCount();
      expect(queuedItems).to.have.lengthOf(3);
      expect(queuedItems[0]).to.equal('c');
      expect(queuedItems[1]).to.equal('a');
      expect(queuedItems[2]).to.equal('b');
    });
  });
});
