import * as tslib_1 from "tslib";
import { inputRules } from 'prosemirror-inputrules';
import { analyticsService } from '../../../analytics';
import { createInputRule, } from '../../../utils/input-rules';
import { Selection } from 'prosemirror-state';
import { ruleWithAnalytics, } from '../../analytics';
/**
 * Creates an InputRuleHandler that will match on a regular expression of the
 * form `(prefix, content, suffix?)`, and replace it with some given text,
 * maintaining prefix and suffix around the replacement.
 *
 * @param text text to replace with
 */
function replaceTextUsingCaptureGroup(text, trackingEventName) {
    return function (state, match, start, end) {
        var _a = tslib_1.__read(match, 4), prefix = _a[1], suffix = _a[3];
        var replacement = (prefix || '') + text + (suffix || '');
        if (trackingEventName) {
            analyticsService.trackEvent("atlassian.editor.format." + trackingEventName + ".autoformatting");
        }
        var tr = state.tr, $to = state.selection.$to;
        tr.replaceWith(start, end, state.schema.text(replacement, $to.marks()));
        tr.setSelection(Selection.near(tr.doc.resolve(tr.selection.to)));
        return tr;
    };
}
function createReplacementRule(to, from, trackingEventName) {
    return createInputRule(from, replaceTextUsingCaptureGroup(to, trackingEventName));
}
/**
 * Create replacement rules fiven a replacement map
 * @param replMap - Replacement map
 * @param trackingEventName - Analytics V2 tracking event name
 * @param replacementRuleWithAnalytics - Analytics GAS V3 middleware for replacement and rules.
 */
function createReplacementRules(replMap, trackingEventName, replacementRuleWithAnalytics) {
    return Object.keys(replMap).map(function (replacement) {
        var regex = replMap[replacement];
        var rule = createReplacementRule(replacement, regex, trackingEventName);
        if (replacementRuleWithAnalytics) {
            return replacementRuleWithAnalytics(replacement)(rule);
        }
        return rule;
    });
}
// We don't agressively upgrade single quotes to smart quotes because
// they may clash with an emoji. Only do that when we have a matching
// single quote, or a contraction.
function createSingleQuotesRules(trackingEventName) {
    return [
        // wrapped text
        createInputRule(/(\s+|^)'(\S+.*\S+)'$/, function (state, match, start, end) {
            var _a = tslib_1.__read(match, 3), spacing = _a[1], innerContent = _a[2];
            var replacement = spacing + '‘' + innerContent + '’';
            analyticsService.trackEvent("atlassian.editor.format." + trackingEventName + ".autoformatting");
            return state.tr.insertText(replacement, start, end);
        }),
        // apostrophe
        createReplacementRule('’', /(\w+)(')(\w+)$/, trackingEventName),
    ];
}
/**
 * Get replacement rules related to product
 */
function getProductRules() {
    var productRuleWithAnalytics = function (product) {
        return ruleWithAnalytics(function (state, match) { return ({
            action: "autoSubstituted" /* SUBSTITUTED */,
            actionSubject: "text" /* TEXT */,
            actionSubjectId: "productName" /* PRODUCT_NAME */,
            eventType: "track" /* TRACK */,
            attributes: {
                product: product,
                originalSpelling: match[2],
            },
        }); });
    };
    return createReplacementRules({
        Atlassian: /(\s+|^)(atlassian)(\s)$/,
        Jira: /(\s+|^)(jira|JIRA)(\s)$/,
        Bitbucket: /(\s+|^)(bitbucket|BitBucket)(\s)$/,
        Hipchat: /(\s+|^)(hipchat|HipChat)(\s)$/,
        Trello: /(\s+|^)(trello)(\s)$/,
    }, 'product', productRuleWithAnalytics);
}
/**
 * Get replacement rules related to symbol
 */
function getSymbolRules() {
    var symbolToString = {
        '→': "rightArrow" /* ARROW_RIGHT */,
        '←': "leftArrow" /* ARROW_LEFT */,
        '↔︎': "doubleArrow" /* ARROW_DOUBLE */,
    };
    var symbolRuleWithAnalytics = function (symbol) {
        return ruleWithAnalytics(function (state, match) { return ({
            action: "autoSubstituted" /* SUBSTITUTED */,
            actionSubject: "text" /* TEXT */,
            actionSubjectId: "symbol" /* SYMBOL */,
            eventType: "track" /* TRACK */,
            attributes: {
                symbol: symbolToString[symbol],
            },
        }); });
    };
    return createReplacementRules({
        '→': /(\s+|^)(--?>)(\s)$/,
        '←': /(\s+|^)(<--?)(\s)$/,
        '↔︎': /(\s+|^)(<->?)(\s)$/,
    }, 'arrow', symbolRuleWithAnalytics);
}
/**
 * Get replacement rules related to punctuation
 */
function getPunctuationRules() {
    var _a;
    var punctuationToString = (_a = {
            '–': "emDash" /* DASH */,
            '…': "ellipsis" /* ELLIPSIS */,
            '“': "doubleQuote" /* QUOTE_DOUBLE */,
            '”': "doubleQuote" /* QUOTE_DOUBLE */
        },
        _a["singleQuote" /* QUOTE_SINGLE */] = "singleQuote" /* QUOTE_SINGLE */,
        _a);
    var punctuationRuleWithAnalytics = function (punctuation) {
        return ruleWithAnalytics(function (state, match) { return ({
            action: "autoSubstituted" /* SUBSTITUTED */,
            actionSubject: "text" /* TEXT */,
            actionSubjectId: "punctuation" /* PUNC */,
            eventType: "track" /* TRACK */,
            attributes: {
                punctuation: punctuationToString[punctuation],
            },
        }); });
    };
    var dashEllipsisRules = createReplacementRules({
        '–': /(\s+|^)(--)(\s)$/,
        '…': /()(\.\.\.)$/,
    }, 'typography', punctuationRuleWithAnalytics);
    var doubleQuoteRules = createReplacementRules({
        '“': /((?:^|[\s\{\[\(\<'"\u2018\u201C]))(")$/,
        '”': /"$/,
    }, 'quote', punctuationRuleWithAnalytics);
    var singleQuoteRules = createSingleQuotesRules('quote');
    return tslib_1.__spread(dashEllipsisRules, doubleQuoteRules, singleQuoteRules.map(function (rule) {
        return punctuationRuleWithAnalytics("singleQuote" /* QUOTE_SINGLE */)(rule);
    }));
}
export default inputRules({
    rules: tslib_1.__spread(getProductRules(), getSymbolRules(), getPunctuationRules()),
});
//# sourceMappingURL=smart-input-rule.js.map