import * as tslib_1 from "tslib";
import { inputRules } from 'prosemirror-inputrules';
import { analyticsService } from '../../../analytics';
import { createInputRule } from '../../../utils/input-rules';
import { LinkMatcher, normalizeUrl } from '../utils';
import { queueCards } from '../../card/pm-plugins/actions';
export function createLinkInputRule(regexp, formatUrl) {
    return createInputRule(regexp, function (state, match, start, end) {
        var schema = state.schema;
        if (state.doc.rangeHasMark(start, end, schema.marks.link)) {
            return null;
        }
        var _a = tslib_1.__read(match, 1), link = _a[0];
        var url = normalizeUrl(link.url);
        var markType = schema.mark('link', { href: url });
        analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');
        var tr = state.tr
            .addMark(start - (link.input.length - link.lastIndex), end - (link.input.length - link.lastIndex), markType)
            .insertText(' ');
        return queueCards([
            {
                url: link.url,
                pos: start - (link.input.length - link.lastIndex),
                appearance: 'inline',
            },
        ])(tr);
    });
}
export function createInputRulePlugin(schema) {
    if (!schema.marks.link) {
        return;
    }
    var urlWithASpaceRule = createLinkInputRule(new LinkMatcher(), function (match) { return (match[3] ? match[1] : "https?://" + match[1]); });
    // [something](link) should convert to a hyperlink
    var markdownLinkRule = createInputRule(/(^|[^!])\[(.*?)\]\((\S+)\)$/, function (state, match, start, end) {
        var schema = state.schema;
        var _a = tslib_1.__read(match, 4), prefix = _a[1], linkText = _a[2], linkUrl = _a[3];
        var url = normalizeUrl(linkUrl);
        var markType = schema.mark('link', { href: url });
        analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');
        return state.tr.replaceWith(start + prefix.length, end, schema.text(linkText, [markType]));
    });
    return inputRules({
        rules: [urlWithASpaceRule, markdownLinkRule],
    });
}
export default createInputRulePlugin;
//# sourceMappingURL=input-rule.js.map