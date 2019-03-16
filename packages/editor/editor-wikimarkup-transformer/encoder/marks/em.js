import { baseMarkPattern } from './__base';
export var em = function (text) {
    if (text.startsWith('— ')) {
        // This is a citation
        return baseMarkPattern(text.substring(2), '??');
    }
    return baseMarkPattern(text, '_');
};
//# sourceMappingURL=em.js.map