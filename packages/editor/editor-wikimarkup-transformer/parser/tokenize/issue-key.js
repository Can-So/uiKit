import { isNotBlank } from '../utils/text';
/**
 * Inline Card From Text (ICFT).
 *
 * When we convert WikiMarkup to ADF we stamp all issue keys URLs with the
 * #icft= syntax to identify  which keys should be involved by brackets
 * [XX-999] from the ones which should be blue links in the ADF to WikiMarkup
 * convertion.
 */
export var INLINE_CARD_FROM_TEXT_STAMP = /(#icft=)([A-Z][A-Z]+-[0-9]+)/;
export var issueKey = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    // This scenario happens when context is empty
    if (!context.issueKeyRegex) {
        return fallback(input, position);
    }
    var match = input.substring(position).match(context.issueKeyRegex);
    if (!match) {
        return fallback(input, position);
    }
    var issue = getIssue(context, match[0]);
    // This scenario happens when context doesn't has all the issues inside a markup
    if (!issue) {
        return fallback(input, position);
    }
    var charBefore = input.charAt(position - 1);
    var charAfter = input.charAt(position + issue.key.length);
    if ((isNotBlank(charBefore) && isNotSpace(charBefore)) ||
        (isNotBlank(charAfter) && isNotSpace(charAfter))) {
        return fallback(input, position);
    }
    return {
        type: 'pmnode',
        nodes: buildInlineCard(schema, issue),
        length: match[0].length,
    };
};
var fallback = function (input, position) { return ({
    type: 'text',
    text: input.substr(position, 1),
    length: 1,
}); };
export var getIssue = function (context, key) {
    return context.inlineCardConversion && context.inlineCardConversion[key]
        ? { key: key, url: context.inlineCardConversion[key] }
        : null;
};
export var buildInlineCard = function (schema, issue) {
    return [
        schema.nodes.inlineCard.createChecked({
            url: withInlineCardFromTextStamp(issue),
        }),
    ];
};
var withInlineCardFromTextStamp = function (issue) {
    return INLINE_CARD_FROM_TEXT_STAMP.test(issue.url)
        ? issue.url
        : issue.url + "#icft=" + issue.key;
};
var isNotSpace = function (char) { return !/\s/.test(char); };
export var buildIssueKeyRegex = function (inlineCardConversion) {
    if (!inlineCardConversion) {
        return undefined;
    }
    var pattern = Object.keys(inlineCardConversion).join('|');
    return new RegExp("^(" + pattern + ")");
};
//# sourceMappingURL=issue-key.js.map