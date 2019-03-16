import { code } from '../marks/code';
import { textColor } from '../marks/color';
import { em } from '../marks/em';
import { link } from '../marks/link';
import { strike } from '../marks/strike';
import { strong } from '../marks/strong';
import { subsup } from '../marks/subsup';
import { underline } from '../marks/underline';
/**
 * The order of the mapping matters.
 * For example, textColor will be a macro {color} so
 * we want to process other marks before it.
 */
var markEncoderMapping = new Map([
    ['em', em],
    ['strike', strike],
    ['strong', strong],
    ['subsup', subsup],
    ['underline', underline],
    ['textColor', textColor],
    ['link', link],
    ['code', code],
]);
export var text = function (node, parent) {
    var result = parent && parent.type.name === 'codeBlock'
        ? node.text
        : escapingWikiFormatter(node.text);
    markEncoderMapping.forEach(function (encoder, markName) {
        var mark = node.marks.find(function (m) { return m.type.name === markName; });
        if (mark) {
            result = encoder(result, mark.attrs);
        }
    });
    return result;
};
function escapingWikiFormatter(text) {
    return text.replace(/[{\\![]/g, '\\$&');
}
//# sourceMappingURL=text.js.map