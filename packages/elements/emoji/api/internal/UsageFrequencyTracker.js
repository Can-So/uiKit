import * as tslib_1 from "tslib";
import { isEmojiVariationDescription } from '../../type-helpers';
import { localStoragePrefix } from '../../constants';
import DuplicateLimitedQueue from '../../DuplicateLimitedQueue';
import StoredDuplicateLimitedQueue from '../../StoredDuplicateLimitedQueue';
/**
 * Keeps track of the last 150 emoji usages, although limiting the maximum count for a single emoji to 25 to
 * ensure we don't end up with only a single emoji being recorded. Usage is persisted to local storage for
 * consistency between 'sessions'.
 *
 * Skin tone variations for an emoji will be 'collapsed' so they are tracked as their base emoji. Gender
 * variations are not collapsed in this way and will be tracked per gender. This decision reflects the UI of
 * the EmojiPicker component.
 */
var UsageFrequencyTracker = /** @class */ (function () {
    function UsageFrequencyTracker(useStorageIfPossible) {
        if (useStorageIfPossible === void 0) { useStorageIfPossible = true; }
        var options = UsageFrequencyTracker.queueOptions;
        if (useStorageIfPossible && options.storage) {
            var queueOptions = tslib_1.__assign({}, options, { storage: options.storage });
            this.queue = new StoredDuplicateLimitedQueue(queueOptions);
        }
        else {
            this.queue = new DuplicateLimitedQueue(options);
        }
        this.gateway = new Gateway(10);
    }
    /**
     * Record the fact that the supplied emoji was used. You should note that usage is updated asynchronously so you can not
     * count on getOrder() reflecting this usage immediately.
     *
     * @param emoji the emoji who's usage is to be recorded. If the emoji has no id then no usage will be recorded
     */
    UsageFrequencyTracker.prototype.recordUsage = function (emoji) {
        var _this = this;
        var emojiId = emoji.id;
        if (emojiId) {
            if (isEmojiVariationDescription(emoji)) {
                emojiId = emoji.baseId;
            }
            this.gateway.submit(function () {
                if (emojiId) {
                    _this.queue.enqueue(emojiId);
                }
            });
        }
    };
    /**
     * Returns an array of emoji id (without skin tone variations) sorted by most used to least used. If there
     * are no usages then an empty array will be returned.
     */
    UsageFrequencyTracker.prototype.getOrder = function () {
        return this.queue.getItemsOrderedByDuplicateCount();
    };
    /**
     * Exposed for testing only. Clear any recorded usage.
     */
    UsageFrequencyTracker.prototype.clear = function () {
        this.queue.clear();
    };
    UsageFrequencyTracker.queueOptions = {
        storage: typeof window !== 'undefined' && window.localStorage,
        storagePrefix: localStoragePrefix,
        maxDuplicates: 25,
        minUniqueItems: 5,
    };
    return UsageFrequencyTracker;
}());
export { UsageFrequencyTracker };
var Gateway = /** @class */ (function () {
    function Gateway(maximumPermitted) {
        if (maximumPermitted < 1) {
            throw new RangeError('The maximumPermitted parameter must be 1 or more.');
        }
        this.maximumPermitted = maximumPermitted;
        this.count = 0;
    }
    /**
     * Run the supplied function if the count of already submitted work allows it. Drop the work
     * if it's not allowed to run.
     *
     * Will return true if the function has been submitted or false if it was not submitted.
     */
    Gateway.prototype.submit = function (f) {
        var _this = this;
        if (this.count >= this.maximumPermitted) {
            return false;
        }
        this.count++;
        var wrappedFunc = function () {
            try {
                f();
            }
            finally {
                _this.completed();
            }
        };
        window.setTimeout(wrappedFunc);
        return true;
    };
    Gateway.prototype.completed = function () {
        this.count--;
    };
    return Gateway;
}());
export { Gateway };
//# sourceMappingURL=UsageFrequencyTracker.js.map