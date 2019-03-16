import { denormaliseEmojiServiceResponse, emojiRequest, } from './EmojiUtils';
/**
 * Emoji providers should return JSON in the format defined by EmojiServiceResponse.
 */
var EmojiLoader = /** @class */ (function () {
    function EmojiLoader(config) {
        this.config = config;
    }
    /**
     * Returns a promise with an array of Emoji from all providers.
     */
    EmojiLoader.prototype.loadEmoji = function () {
        var emojisPromise = emojiRequest(this.config);
        return emojisPromise.then(function (emojiServiceResponse) {
            return denormaliseEmojiServiceResponse(emojiServiceResponse);
        });
    };
    return EmojiLoader;
}());
export default EmojiLoader;
//# sourceMappingURL=EmojiLoader.js.map