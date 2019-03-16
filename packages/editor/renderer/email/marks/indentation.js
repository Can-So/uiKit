import { withTable } from '../util';
export default function code(_a) {
    var mark = _a.mark, text = _a.text;
    // level 1 = 30px, level 2 = 60px, ...
    var style = {
        'padding-left': mark.attrs.level * 30 + 'px',
    };
    // Outlook accepts padding on <td> element, thus we wrap it with table here
    return withTable(text, style);
}
//# sourceMappingURL=indentation.js.map