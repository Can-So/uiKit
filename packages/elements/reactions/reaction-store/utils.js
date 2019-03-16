import * as tslib_1 from "tslib";
import { ReactionStatus } from '../types/ReactionStatus';
export var compareEmojiId = function (l, r) {
    return l.localeCompare(r);
};
export var sortByRelevance = function (a, b) {
    if (a.count > b.count) {
        return -1;
    }
    else if (a.count < b.count) {
        return 1;
    }
    else {
        return compareEmojiId(a.emojiId, b.emojiId);
    }
};
export var sortByPreviousPosition = function (reactions) {
    var indexes = reactions.reduce(function (map, reaction, index) {
        map[reaction.emojiId] = index;
        return map;
    }, {});
    var getPosition = function (_a) {
        var emojiId = _a.emojiId;
        return indexes[emojiId] === undefined ? reactions.length : indexes[emojiId];
    };
    return function (a, b) { return getPosition(a) - getPosition(b); };
};
export var readyState = function (reactions) { return ({
    status: ReactionStatus.ready,
    reactions: reactions.filter(function (reaction) { return reaction.count > 0; }),
}); };
export var byEmojiId = function (emojiId) { return function (reaction) {
    return reaction.emojiId === emojiId;
}; };
export var addOne = function (reaction) { return (tslib_1.__assign({}, reaction, { count: reaction.count + 1, reacted: true })); };
export var removeOne = function (reaction) { return (tslib_1.__assign({}, reaction, { count: reaction.count - 1, reacted: false })); };
export var updateByEmojiId = function (emojiId, updater) { return function (reaction) {
    return reaction.emojiId === emojiId
        ? updater instanceof Function
            ? updater(reaction)
            : updater
        : reaction;
}; };
export var getReactionsSortFunction = function (reactions) {
    return reactions && reactions.length
        ? sortByPreviousPosition(reactions)
        : sortByRelevance;
};
export var flattenAris = function (a, b) { return a.concat(b); };
//# sourceMappingURL=utils.js.map