var EmojiProviderImpl = /** @class */ (function () {
    function EmojiProviderImpl() {
    }
    EmojiProviderImpl.prototype.findByShortName = function () {
        return undefined;
    };
    EmojiProviderImpl.prototype.findByEmojiId = function () {
        return undefined;
    };
    EmojiProviderImpl.prototype.findById = function () {
        return undefined;
    };
    EmojiProviderImpl.prototype.findInCategory = function () {
        return Promise.resolve([]);
    };
    EmojiProviderImpl.prototype.getAsciiMap = function () {
        return Promise.resolve(new Map());
    };
    EmojiProviderImpl.prototype.getFrequentlyUsed = function () {
        return Promise.resolve([]);
    };
    EmojiProviderImpl.prototype.recordSelection = function () {
        return Promise.resolve();
    };
    EmojiProviderImpl.prototype.deleteSiteEmoji = function () {
        return Promise.resolve(false);
    };
    EmojiProviderImpl.prototype.loadMediaEmoji = function () {
        return undefined;
    };
    EmojiProviderImpl.prototype.optimisticMediaRendering = function () {
        return false;
    };
    EmojiProviderImpl.prototype.getSelectedTone = function () {
        return undefined;
    };
    EmojiProviderImpl.prototype.getCurrentUser = function () {
        return undefined;
    };
    EmojiProviderImpl.prototype.setSelectedTone = function () { };
    EmojiProviderImpl.prototype.filter = function () { };
    EmojiProviderImpl.prototype.subscribe = function () { };
    EmojiProviderImpl.prototype.unsubscribe = function () { };
    return EmojiProviderImpl;
}());
export default new EmojiProviderImpl();
//# sourceMappingURL=mockEmojiProvider.js.map