import * as tslib_1 from "tslib";
import { utils as serviceUtils, } from '@atlaskit/util-service-support';
import { isImageRepresentation, isSpriteServiceRepresentation, convertImageToMediaRepresentation, buildEmojiDescriptionWithAltRepresentation, } from '../type-helpers';
import debug from '../util/logger';
export var emojiRequest = function (provider, options) {
    var _a = provider.getRatio, getRatio = _a === void 0 ? getPixelRatio : _a, serviceConfig = tslib_1.__rest(provider, ["getRatio"]);
    var scaleQueryParams = calculateScale(getRatio);
    var _b = options || {}, _c = _b.queryParams, queryParams = _c === void 0 ? {} : _c, otherOptions = tslib_1.__rest(_b, ["queryParams"]);
    var requestOptions = tslib_1.__assign({}, otherOptions, { queryParams: tslib_1.__assign({}, scaleQueryParams, queryParams) });
    return serviceUtils.requestService(serviceConfig, requestOptions);
};
var calculateScale = function (getRatio) {
    // Retina display
    if (getRatio() > 1) {
        return { scale: 'XHDPI', altScale: 'XXXHDPI' };
    }
    // Default set used for desktop
    return { altScale: 'XHDPI' };
};
export var getPixelRatio = function () {
    return window.devicePixelRatio;
};
export var getAltRepresentation = function (reps) {
    // Invalid reps handled outside function - logic may change depending what the service returns
    return reps[calculateScale(getPixelRatio).altScale];
};
export var isMediaApiUrl = function (url, meta) {
    return !!(meta && meta.mediaApiToken && url.indexOf(meta.mediaApiToken.url) === 0);
};
export var denormaliseServiceRepresentation = function (representation, meta) {
    if (isSpriteServiceRepresentation(representation) &&
        meta &&
        meta.spriteSheets) {
        var _a = representation, height = _a.height, width = _a.width, x = _a.x, y = _a.y, xIndex = _a.xIndex, yIndex = _a.yIndex, spriteRef = _a.spriteRef;
        var spriteSheet = meta.spriteSheets[spriteRef];
        if (spriteSheet) {
            return {
                sprite: spriteSheet,
                height: height,
                width: width,
                x: x,
                y: y,
                xIndex: xIndex,
                yIndex: yIndex,
            };
        }
    }
    else if (isImageRepresentation(representation)) {
        var height = representation.height, width = representation.width, imagePath = representation.imagePath;
        if (isMediaApiUrl(imagePath, meta)) {
            return convertImageToMediaRepresentation(representation);
        }
        return {
            height: height,
            width: width,
            imagePath: imagePath,
        };
    }
    debug('failed conversion for representation', representation, meta);
    return undefined;
};
export var denormaliseServiceAltRepresentation = function (altReps, meta) {
    return !altReps || altReps === {}
        ? undefined
        : denormaliseServiceRepresentation(getAltRepresentation(altReps), meta);
};
export var denormaliseSkinEmoji = function (emoji, meta) {
    if (!emoji.skinVariations) {
        return [];
    }
    var skinEmoji = emoji.skinVariations;
    var baseId = emoji.id;
    return skinEmoji.map(function (skin) {
        var representation = skin.representation, altRepresentations = skin.altRepresentations, other = tslib_1.__rest(skin, ["representation", "altRepresentations"]);
        return tslib_1.__assign({ baseId: baseId, representation: denormaliseServiceRepresentation(representation, meta), altRepresentation: denormaliseServiceAltRepresentation(altRepresentations, meta) }, other);
    });
};
/**
 * Denormalised an emoji response (emojis + sprite references) into an array of
 * emoji with local sprite definitions.
 */
export var denormaliseEmojiServiceResponse = function (emojiData) {
    var emojis = emojiData.emojis.map(function (emoji) {
        var newRepresentation = denormaliseServiceRepresentation(emoji.representation, emojiData.meta);
        var altRepresentation = denormaliseServiceAltRepresentation(emoji.altRepresentations, emojiData.meta);
        var newSkinVariations = denormaliseSkinEmoji(emoji, emojiData.meta);
        // create trimmedServiceDesc which is emoji with no representations or skinVariations
        var representation = emoji.representation, skinVariations = emoji.skinVariations, altRepresentations = emoji.altRepresentations, trimmedServiceDesc = tslib_1.__rest(emoji, ["representation", "skinVariations", "altRepresentations"]);
        var response = tslib_1.__assign({}, trimmedServiceDesc, { representation: newRepresentation, skinVariations: newSkinVariations });
        return buildEmojiDescriptionWithAltRepresentation(response, altRepresentation);
    });
    var mediaApiToken = emojiData.meta && emojiData.meta.mediaApiToken;
    return {
        emojis: emojis,
        mediaApiToken: mediaApiToken,
    };
};
var getHeight = function (fitToHeight) {
    return getPixelRatio() > 1 ? fitToHeight * 2 : fitToHeight;
};
export var shouldUseAltRepresentation = function (emoji, fitToHeight) {
    return !!(fitToHeight &&
        emoji.altRepresentation &&
        getHeight(fitToHeight) > emoji.representation.height);
};
//# sourceMappingURL=EmojiUtils.js.map