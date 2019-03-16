import * as tslib_1 from "tslib";
import { markSerializers } from './serializers';
import { commonStyle } from '.';
export var createTag = function (tagName, attrs, content) {
    var attrsList = [];
    Object.keys(attrs || {}).forEach(function (key) {
        var value = attrs[key];
        if (value === undefined) {
            return;
        }
        attrsList.push(key + "=\"" + String(value).replace(/"/g, "'") + "\"");
    });
    var attrsSerialized = attrsList.length ? " " + attrsList.join(' ') : '';
    return content
        ? "<" + tagName + attrsSerialized + ">" + content + "</" + tagName + ">"
        : "<" + tagName + attrsSerialized + "/>";
};
export var serializeStyle = function (style) {
    return Object.keys(style).reduce(function (memo, key) {
        if (style[key] === undefined) {
            return memo;
        }
        var value = String(style[key]).replace(/"/g, "'");
        return (memo += key + ": " + value + ";");
    }, '');
};
export var applyMarks = function (marks, text) {
    var e_1, _a;
    var output = text;
    try {
        for (var marks_1 = tslib_1.__values(marks), marks_1_1 = marks_1.next(); !marks_1_1.done; marks_1_1 = marks_1.next()) {
            var mark = marks_1_1.value;
            // ignore marks with unknown type
            if (markSerializers[mark.type.name]) {
                output = markSerializers[mark.type.name]({ mark: mark, text: output });
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (marks_1_1 && !marks_1_1.done && (_a = marks_1.return)) _a.call(marks_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return output;
};
// For older Outlook clients, padding can be worked around with tables
export var withTable = function (text, style) {
    if (style === void 0) { style = {}; }
    // Tables override font size, weight and other stuff, thus we reset it here with commonStyle
    var nullifyCss = serializeStyle(tslib_1.__assign({}, commonStyle, { margin: '0px', padding: '0px', 'border-spacing': '0px' }));
    var css = serializeStyle(style);
    var td = createTag('td', { style: css }, text);
    var table = createTag('table', { style: nullifyCss }, td);
    return table;
};
//# sourceMappingURL=util.js.map