import { baseMarkPattern } from './__base';
export var subsup = function (text, attrs) {
    if (attrs.type === 'sub') {
        return baseMarkPattern(text, '~');
    }
    else {
        return baseMarkPattern(text, '^');
    }
};
//# sourceMappingURL=subsup.js.map