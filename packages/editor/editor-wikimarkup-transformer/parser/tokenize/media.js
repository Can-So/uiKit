import * as tslib_1 from "tslib";
import getMediaSingleNodeView from '../nodes/mediaSingle';
import { parseAttrs } from '../utils/attrs';
import { commonFormatter } from './common-formatter';
export var media = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    var rawContentProcessor = function (raw, length) {
        /**
         * !image.gif|align=right, vspace=4|ignore-this!
         * If it splits into more than 2 items, we ignore the rest
         */
        var _a = tslib_1.__read(raw.split('|'), 2), rawContent = _a[0], _b = _a[1], rawAttrs = _b === void 0 ? '' : _b;
        var node = getMediaSingleNodeView(schema, rawContent, parseAttrs(rawAttrs, ','));
        return {
            type: 'pmnode',
            nodes: [node],
            length: length,
        };
    };
    return commonFormatter(input, position, schema, {
        opening: '!',
        closing: '!',
        context: context,
        rawContentProcessor: rawContentProcessor,
    });
};
//# sourceMappingURL=media.js.map