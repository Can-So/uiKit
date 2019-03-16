import { createTag, serializeStyle, applyMarks } from '../util';
var css = serializeStyle({
    'white-space': 'pre-wrap',
    'word-wrap': 'break-word',
});
export default function paragraph(_a) {
    var text = _a.text, marks = _a.marks;
    var paragraph = createTag('p', { style: css }, text);
    return applyMarks(marks, paragraph);
}
//# sourceMappingURL=paragraph.js.map