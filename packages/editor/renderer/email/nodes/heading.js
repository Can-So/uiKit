import { typography } from '@atlaskit/theme';
import { createTag, applyMarks } from '../util';
var getTypoMixin = function (tagName) {
    switch (tagName) {
        case 'h1':
            return typography.h800();
        case 'h2':
            return typography.h700();
        case 'h3':
            return typography.h600();
        case 'h4':
            return typography.h500();
        case 'h5':
            return typography.h400();
        case 'h6':
            return typography.h300();
        default:
            throw new Error("Unknown tagName: " + tagName);
    }
};
export default function heading(_a) {
    var attrs = _a.attrs, marks = _a.marks, text = _a.text;
    var tagName = "h" + attrs.level;
    var css = getTypoMixin(tagName).join().trim();
    var headingTag = createTag(tagName, { style: css }, text);
    return applyMarks(marks, headingTag);
}
//# sourceMappingURL=heading.js.map