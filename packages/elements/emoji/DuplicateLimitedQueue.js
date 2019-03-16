/**
 * A queue which will limit the number of duplicates of type T that it holds. When the duplicate limit is
 * reached the earliest inserted duplicate (the "original") is removed to make room for the new insertion.
 */
var DuplicateLimitedQueue = /** @class */ (function () {
    /**
     * Construct a new DuplicateLimitedQueue.
     *
     * @param options the options for this queue.
     */
    function DuplicateLimitedQueue(options) {
        if (options.maxDuplicates < 1) {
            throw new RangeError('The maxDuplicates option must be at least 1');
        }
        if (options.minUniqueItems < 1) {
            throw new RangeError('The minUniqueItems option must be at least 1');
        }
        this.maximumSize = options.maxDuplicates * options.minUniqueItems;
        this.perItemSize = options.maxDuplicates;
        this.createEmptyState();
    }
    /**
     * @param item the item to add to the queue.
     */
    DuplicateLimitedQueue.prototype.enqueue = function (item) {
        this.enqueueWithoutOrdering(item);
        // enqueues are less time sensitive (and may happen less frequently) than queries against the queue
        // so do the ordering work on each enqueue.
        this.itemsOrderedByFrequency = this.orderItemsByFrequency();
    };
    /**
     * Return the items in the queue, ordered by how often they are duplicated. The items with the
     * most duplicates come first in the returned Array.
     *
     * If there are no items in the queue then an empty Array will be returned.
     */
    DuplicateLimitedQueue.prototype.getItemsOrderedByDuplicateCount = function () {
        return this.itemsOrderedByFrequency;
    };
    /**
     * Exposed for storybook/testing purposes only. Clear the contents of the queue.
     */
    DuplicateLimitedQueue.prototype.clear = function () {
        this.createEmptyState();
    };
    /**
     * A more efficient mechanism for adding multiple items. Ordering is only performed once all
     * the items have been added.
     *
     * @param items the items to be enqueued, which happens in their presented order.
     */
    DuplicateLimitedQueue.prototype.bulkEnqueue = function (items) {
        var _this = this;
        items.map(function (item) { return _this.enqueueWithoutOrdering(item); });
        this.itemsOrderedByFrequency = this.orderItemsByFrequency();
    };
    /**
     * Return the items currently stored in the queue.
     */
    DuplicateLimitedQueue.prototype.getItems = function () {
        return this.items;
    };
    DuplicateLimitedQueue.prototype.createEmptyState = function () {
        this.items = new Array();
        this.itemCountMap = new Map();
        this.itemsOrderedByFrequency = new Array();
    };
    /**
     * Enqueue the supplied item, keeping consistency with the limits configured. However no ordering is
     * performed by this enqueuing. You must trigger that manually if required.
     *
     * @param item the item to be queued
     */
    DuplicateLimitedQueue.prototype.enqueueWithoutOrdering = function (item) {
        var count = this.itemCountMap.get(item);
        if (count && count >= this.perItemSize) {
            // find the first item with that key in the array and remove it
            this.removeFirstOccurrence(item);
        }
        else {
            if (this.items.length >= this.maximumSize) {
                this.remove();
            }
        }
        this.add(item);
    };
    /**
     * Get an array of items from the queue ordered by how often they are duplicated in the queue.
     */
    DuplicateLimitedQueue.prototype.orderItemsByFrequency = function () {
        var orderedEntries = Array.from(this.itemCountMap.entries()).sort(function (a, b) {
            return b[1] - a[1];
        });
        return orderedEntries.map(function (value) { return value[0]; });
    };
    DuplicateLimitedQueue.prototype.decrementCount = function (item) {
        var count = this.itemCountMap.get(item);
        if (count) {
            count--;
            if (count > 0) {
                this.itemCountMap.set(item, count);
            }
            else {
                this.itemCountMap.delete(item);
            }
        }
    };
    /**
     * Walk the list of items and remove the first occurrence of the matching item.
     *
     * @param item the item to be removed.
     */
    DuplicateLimitedQueue.prototype.removeFirstOccurrence = function (item) {
        var index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.decrementCount(item);
        }
    };
    /**
     * Remove the first item from the queue and update the itemCountMap accordingly.
     * @return the item add the front of the queue or undefined if the queue is empty
     */
    DuplicateLimitedQueue.prototype.remove = function () {
        var removed = this.items.shift();
        if (removed !== undefined) {
            this.decrementCount(removed);
        }
        return removed;
    };
    /**
     * Add the supplied item to the end of the queue and update the itemCountMap accordingly.
     * @param item the item to be added to the queue
     */
    DuplicateLimitedQueue.prototype.add = function (item) {
        this.items.push(item);
        var count = this.itemCountMap.get(item);
        if (count) {
            this.itemCountMap.set(item, count + 1);
        }
        else {
            this.itemCountMap.set(item, 1);
        }
    };
    return DuplicateLimitedQueue;
}());
export default DuplicateLimitedQueue;
//# sourceMappingURL=DuplicateLimitedQueue.js.map