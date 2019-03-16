/**
 * A function that will wrap any configured Emoji 'onSelection' function to ensure recordSelection is always
 * called.
 *
 * @param provider the EmojiProvider which will be called on each emoji selection
 * @param onSelect the onSelect function that is explicitly configured on the Emoji component.
 */
export var createRecordSelectionDefault = function (provider, onSelect) {
    return function (emojiId, emoji, event) {
        try {
            if (provider.recordSelection && emoji) {
                provider.recordSelection(emoji);
            }
        }
        finally {
            if (onSelect) {
                onSelect(emojiId, emoji, event);
            }
        }
    };
};
//# sourceMappingURL=RecordSelectionDefault.js.map