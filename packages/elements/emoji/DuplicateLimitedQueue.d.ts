/**
 * The options used to configure a newly constructed queue.
 */
export interface QueueOptions {
    /**
     * The maximum number of duplicates allowed per item in the queue.
     */
    maxDuplicates: number;
    /**
     * The minimum number of unique items the queue should try to contain.
     * This number constrains the absolute size of the queue. It needs to be
     * large enough to contain maxDuplicates * minUniqueItems.
     */
    minUniqueItems: number;
}
/**
 * A queue which will limit the number of duplicates of type T that it holds. When the duplicate limit is
 * reached the earliest inserted duplicate (the "original") is removed to make room for the new insertion.
 */
export default class DuplicateLimitedQueue<T> {
    private maximumSize;
    private perItemSize;
    private items;
    private itemCountMap;
    /**
     * An array derived from items and itemCountMap which holds each item once and is ordered by
     * how often an item is duplicated in the items array.
     */
    private itemsOrderedByFrequency;
    /**
     * Construct a new DuplicateLimitedQueue.
     *
     * @param options the options for this queue.
     */
    constructor(options: QueueOptions);
    /**
     * @param item the item to add to the queue.
     */
    enqueue(item: T): void;
    /**
     * Return the items in the queue, ordered by how often they are duplicated. The items with the
     * most duplicates come first in the returned Array.
     *
     * If there are no items in the queue then an empty Array will be returned.
     */
    getItemsOrderedByDuplicateCount(): Array<T>;
    /**
     * Exposed for storybook/testing purposes only. Clear the contents of the queue.
     */
    clear(): void;
    /**
     * A more efficient mechanism for adding multiple items. Ordering is only performed once all
     * the items have been added.
     *
     * @param items the items to be enqueued, which happens in their presented order.
     */
    protected bulkEnqueue(items: T[]): void;
    /**
     * Return the items currently stored in the queue.
     */
    protected getItems(): T[];
    private createEmptyState;
    /**
     * Enqueue the supplied item, keeping consistency with the limits configured. However no ordering is
     * performed by this enqueuing. You must trigger that manually if required.
     *
     * @param item the item to be queued
     */
    private enqueueWithoutOrdering;
    /**
     * Get an array of items from the queue ordered by how often they are duplicated in the queue.
     */
    private orderItemsByFrequency;
    private decrementCount;
    /**
     * Walk the list of items and remove the first occurrence of the matching item.
     *
     * @param item the item to be removed.
     */
    private removeFirstOccurrence;
    /**
     * Remove the first item from the queue and update the itemCountMap accordingly.
     * @return the item add the front of the queue or undefined if the queue is empty
     */
    private remove;
    /**
     * Add the supplied item to the end of the queue and update the itemCountMap accordingly.
     * @param item the item to be added to the queue
     */
    private add;
}
