import { createTag, serializeStyle } from '../util';
export var emailAlignmentsMap = {
    end: 'right',
    right: 'right',
    center: 'center',
};
var css = function (alignment) {
    return serializeStyle({
        width: '100%',
        'text-align': emailAlignmentsMap[alignment],
    });
};
export default function alignment(_a) {
    var mark = _a.mark, text = _a.text;
    return createTag('div', { style: css(mark.attrs.align) }, text);
}
//# sourceMappingURL=alignment.js.map