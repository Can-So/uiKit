import * as tslib_1 from "tslib";
import { messages } from './components/i18n';
import { customCategory, dataURLPrefix } from './constants';
export var isSpriteServiceRepresentation = function (rep) {
    return !!(rep && rep.spriteRef);
};
export var isSpriteRepresentation = function (rep) { return !!(rep && rep.sprite); };
export var isImageRepresentation = function (rep) {
    return !!(rep && rep.imagePath);
};
export var isMediaRepresentation = function (rep) {
    return !!(rep && rep.mediaPath);
};
export var isPromise = function (p) {
    return !!(p && p.then);
};
export var isEmojiDescription = function (possibleEmojiDescription) {
    return possibleEmojiDescription &&
        possibleEmojiDescription.shortName &&
        possibleEmojiDescription.type;
};
export var isMediaEmoji = function (emoji) {
    return isMediaRepresentation(emoji.representation);
};
export var hasDataURLImage = function (rep) {
    return isImageRepresentation(rep) && rep.imagePath.indexOf(dataURLPrefix) === 0;
};
export var isLoadedMediaEmoji = function (emoji) {
    return emoji.category === customCategory && hasDataURLImage(emoji.representation);
};
export var isEmojiDescriptionWithVariations = function (emoji) {
    return !!(emoji && emoji.skinVariations);
};
export var isEmojiVariationDescription = function (object) {
    return 'baseId' in object;
};
export var isMessagesKey = function (key) {
    return key in messages;
};
export var toEmojiId = function (emoji) { return ({
    shortName: emoji.shortName,
    id: emoji.id,
    fallback: emoji.fallback,
}); };
export var toOptionalEmojiId = function (emoji) {
    if (!emoji) {
        return undefined;
    }
    return toEmojiId(emoji);
};
export var isEmojiIdEqual = function (l, r) {
    return l === r || (l && r && l.id === r.id && l.shortName === r.shortName);
};
export var containsEmojiId = function (emojis, emojiId) {
    if (!emojiId) {
        return false;
    }
    for (var i = 0; i < emojis.length; i++) {
        if (isEmojiIdEqual(emojis[i], emojiId)) {
            return true;
        }
    }
    return false;
};
export var convertImageToMediaRepresentation = function (rep) { return ({
    mediaPath: rep.imagePath,
    height: rep.height,
    width: rep.width,
}); };
export var convertMediaToImageRepresentation = function (rep, newImagePath) { return ({
    imagePath: newImagePath || rep.mediaPath,
    height: rep.height,
    width: rep.width,
}); };
export var convertMediaToImageEmoji = function (emoji, newImagePath, useAlt) {
    var mediaRepresentation = emoji.representation;
    var mediaAltRepresentation = emoji.altRepresentation;
    var imgPath = !useAlt ? newImagePath : undefined;
    var altImgPath = useAlt ? newImagePath : undefined;
    if (!isMediaRepresentation(mediaRepresentation) &&
        !isMediaRepresentation(mediaAltRepresentation)) {
        return emoji;
    }
    var representation = isMediaRepresentation(mediaRepresentation)
        ? convertMediaToImageRepresentation(mediaRepresentation, imgPath)
        : mediaRepresentation;
    var altRepresentation = isMediaRepresentation(mediaAltRepresentation)
        ? convertMediaToImageRepresentation(mediaAltRepresentation, altImgPath)
        : mediaAltRepresentation;
    var baseEmoji = tslib_1.__assign({}, emoji, { representation: representation });
    return buildEmojiDescriptionWithAltRepresentation(baseEmoji, altRepresentation);
};
// Prevent altRepresentation: undefined from being returned in EmojiDescription
export var buildEmojiDescriptionWithAltRepresentation = function (emoji, altRepresentation) {
    if (!altRepresentation) {
        return emoji;
    }
    return tslib_1.__assign({}, emoji, { altRepresentation: altRepresentation });
};
export var getCategoryId = function (emoji) {
    return emoji.category;
};
//# sourceMappingURL=type-helpers.js.map