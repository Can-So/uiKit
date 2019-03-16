import DuplicateLimitedQueue, { QueueOptions } from './DuplicateLimitedQueue';
/**
 * The options used to configure a newly constructed queue.
 */
export interface StoredQueueOptions extends QueueOptions {
    /**
     * The Storage that will be used to persist the queue contents.
     */
    storage: Storage;
    /**
     * An identifier to be prefixed on the keys used to store data.
     */
    storagePrefix: string;
}
/**
 * An extension to the DuplicateLimitedQueue that will initialise its contents from the
 * supplied Storage and will also update the storage for every new item enqueued.
 */
export default class StoredDuplicateLimitedQueue<T> extends DuplicateLimitedQueue<T> {
    private static readonly storageKey;
    private storage;
    private prefixedStorageKey;
    constructor(options: StoredQueueOptions);
    /**
     * Enqueue the supplied item and also persist the new contents of the queue to storage.
     *
     * @param item the item to be enqueued
     */
    enqueue(item: T): void;
    /**
     * Exposed for storybook/testing purposes only. Clear the contents of the queue, and localStorage.
     */
    clear(): void;
    /**
     * Initialise the queue contents from the configured Storage. If there is no data found in
     * storage then the queue will have no items added. Likewise, a failure to read or parse stored
     * data will be swallowed and no items are added to the queue.
     */
    private load;
    /**
     * Save the current items in the queue, overwriting any previously stored queue.
     * Any failure in saving will be silently ignored with the likely outcome that any previous
     * saved items will remain unchanged in storage.
     */
    private save;
}
