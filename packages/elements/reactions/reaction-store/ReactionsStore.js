import * as tslib_1 from "tslib";
import { ReactionStatus, } from '../types';
import { batch, batchByKey } from './batched';
import * as utils from './utils';
var MemoryReactionsStore = /** @class */ (function () {
    function MemoryReactionsStore(client, state) {
        if (state === void 0) { state = {
            reactions: {},
            flash: {},
        }; }
        var _this = this;
        this.callbacks = [];
        this.setState = function (newState) {
            _this.state = tslib_1.__assign({}, _this.state, newState);
            _this.triggerOnChange();
        };
        // batch calls to onChange using the latest state in it.
        this.triggerOnChange = batch(function () {
            return _this.callbacks.forEach(function (callback) { return callback(_this.state); });
        });
        this.setReactions = function (containerAri, ari, reactions) {
            var _a;
            _this.setState({
                reactions: tslib_1.__assign({}, _this.state.reactions, (_a = {}, _a[containerAri + "|" + ari] = reactions, _a)),
            });
        };
        this.handleDetailedReactionResponse = function (detailedReaction) {
            var containerAri = detailedReaction.containerAri, ari = detailedReaction.ari, emojiId = detailedReaction.emojiId;
            _this.withReaction(function (reaction) { return (tslib_1.__assign({}, reaction, { users: detailedReaction.users })); })(containerAri, ari, emojiId);
        };
        this.flash = function (reaction) {
            _this.setFlash(reaction.containerAri, reaction.ari, reaction.emojiId, true);
            window.setTimeout(function () {
                return _this.setFlash(reaction.containerAri, reaction.ari, reaction.emojiId, false);
            }, 700);
        };
        this.optmisticUpdate = function (containerAri, ari, emojiId) { return function (updater) {
            _this.withReadyReaction(containerAri, ari)(function (reactionState) {
                var found = false;
                var reactions = reactionState.reactions.map(function (reaction) {
                    if (reaction.emojiId === emojiId) {
                        found = true;
                        var updated = updater(reaction);
                        if (updated) {
                            return tslib_1.__assign({}, updated, { optimisticallyUpdated: true });
                        }
                    }
                    return reaction;
                });
                if (!found) {
                    var updated = updater({
                        containerAri: containerAri,
                        ari: ari,
                        emojiId: emojiId,
                        count: 0,
                        reacted: false,
                    });
                    if (updated) {
                        reactions.push(tslib_1.__assign({}, updated, { optimisticallyUpdated: true }));
                    }
                }
                return utils.readyState(reactions);
            });
        }; };
        this.doAddReaction = function (reaction) {
            var containerAri = reaction.containerAri, ari = reaction.ari, emojiId = reaction.emojiId;
            _this.optmisticUpdate(containerAri, ari, emojiId)(utils.addOne);
            _this.flash(reaction);
            _this.client.addReaction(containerAri, ari, emojiId);
        };
        this.doRemoveReaction = function (reaction) {
            var containerAri = reaction.containerAri, ari = reaction.ari, emojiId = reaction.emojiId;
            _this.optmisticUpdate(containerAri, ari, emojiId)(utils.removeOne);
            _this.client.deleteReaction(containerAri, ari, emojiId);
        };
        this.getReactions = batchByKey(function (containerAri, aris) {
            _this.client
                .getReactions(containerAri, aris.reduce(utils.flattenAris))
                .then(function (value) {
                Object.keys(value).map(function (ari) {
                    var reactionsState = _this.getReactionsState(containerAri, ari);
                    var reactions = reactionsState && reactionsState.status === ReactionStatus.ready
                        ? reactionsState.reactions
                        : undefined;
                    _this.setReactions(containerAri, ari, utils.readyState(value[ari].sort(utils.getReactionsSortFunction(reactions))));
                });
            });
        });
        this.toggleReaction = this.withReaction(this.doRemoveReaction, this.doAddReaction);
        this.addReaction = this.withReaction(this.flash, this.doAddReaction);
        this.getDetailedReaction = function (containerAri, ari, emojiId) {
            _this.client
                .getDetailedReaction(containerAri, ari, emojiId)
                .then(_this.handleDetailedReactionResponse);
        };
        this.getState = function () { return _this.state; };
        this.onChange = function (callback) {
            _this.callbacks.push(callback);
        };
        this.removeOnChangeListener = function (toRemove) {
            _this.callbacks = _this.callbacks.filter(function (callback) { return callback !== toRemove; });
        };
        this.client = client;
        this.state = state;
    }
    MemoryReactionsStore.prototype.getReactionsState = function (containerAri, ari) {
        return this.state.reactions[containerAri + "|" + ari];
    };
    MemoryReactionsStore.prototype.setFlash = function (containerAri, ari, emojiId, flash) {
        var _a, _b;
        this.setState({
            flash: tslib_1.__assign({}, this.state.flash, (_a = {}, _a[containerAri + "|" + ari] = tslib_1.__assign({}, this.state.flash[containerAri + "|" + ari], (_b = {}, _b[emojiId] = flash, _b)), _a)),
        });
    };
    /**
     * Utility function to help execute a callback to Reaction if its state is ready.
     *
     *
     * @param containerAri
     * @param ari
     *
     * @returns (updater: Updater<ReactionsReadyState>) => ReactionsState?
     *  A function that will execute the received callback with the ReactionsState if
     *  ready. If some state is returned, the new state will be applied.
     */
    MemoryReactionsStore.prototype.withReadyReaction = function (containerAri, ari) {
        var _this = this;
        return function (updater) {
            var reactionsState = _this.getReactionsState(containerAri, ari);
            if (reactionsState.status === ReactionStatus.ready) {
                var updated = updater(reactionsState);
                if (updated) {
                    _this.setReactions(containerAri, ari, updated);
                }
            }
        };
    };
    /**
     * Utility function to help execute actions with a reaction. It handles reaction discovery
     * and branching between reacted and not reacted.
     *
     * @param reactedCallback callback that will be executed when the user has already reacted
     * with the emoji
     * @param notReactedCallback callback that will be executed when the user hasn't reacted
     * with the emoji
     *
     * @returns (containerAri: string, ari: string, emojiId: string) => ReactionsState?
     *  A function that will execute the correct callback to the triple containerAri, ari and
     *  emojiId. If some state is returned, the new state will be applied.
     */
    MemoryReactionsStore.prototype.withReaction = function (reactedCallback, notReactedCallback) {
        var _this = this;
        return function (containerAri, ari, emojiId) {
            _this.withReadyReaction(containerAri, ari)(function (reactionsState) {
                var reaction = reactionsState.reactions.find(utils.byEmojiId(emojiId)) || {
                    containerAri: containerAri,
                    ari: ari,
                    emojiId: emojiId,
                    count: 0,
                    reacted: false,
                };
                var callback = reaction.reacted || !notReactedCallback
                    ? reactedCallback
                    : notReactedCallback;
                var updatedReaction = callback(reaction);
                if (updatedReaction && !(updatedReaction instanceof Function)) {
                    return utils.readyState(reactionsState.reactions.map(utils.updateByEmojiId(emojiId, updatedReaction)));
                }
                return;
            });
        };
    };
    return MemoryReactionsStore;
}());
export { MemoryReactionsStore };
//# sourceMappingURL=ReactionsStore.js.map