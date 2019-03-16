var toneEmojiShortName = ':raised_hand:';
var byShortName = function (emojis, shortName) { return emojis.filter(function (emoji) { return emoji.shortName === shortName; })[0]; };
var toneEmoji = function (emojis) {
    return byShortName(emojis, toneEmojiShortName);
};
export var getToneEmoji = function (provider) {
    return provider.findByShortName(toneEmojiShortName);
};
export default {
    byShortName: byShortName,
    toneEmoji: toneEmoji,
};
//# sourceMappingURL=filters.js.map