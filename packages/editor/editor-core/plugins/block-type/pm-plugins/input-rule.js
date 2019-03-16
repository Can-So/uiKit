import * as tslib_1 from "tslib";
import { textblockTypeInputRule, wrappingInputRule, inputRules, } from 'prosemirror-inputrules';
import { analyticsService, trackAndInvoke } from '../../../analytics';
import { createInputRule, defaultInputRuleHandler, leafNodeReplacementCharacter, } from '../../../utils/input-rules';
import { isConvertableToCodeBlock, transformToCodeBlockAction, } from '../commands/transform-to-code-block';
import { insertBlock } from '../commands/insert-block';
import { safeInsert } from 'prosemirror-utils';
import { addAnalytics, ruleWithAnalytics, } from '../../analytics';
var MAX_HEADING_LEVEL = 6;
function getHeadingLevel(match) {
    return {
        level: match[1].length,
    };
}
export function headingRule(nodeType, maxLevel) {
    return textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, getHeadingLevel);
}
export function blockQuoteRule(nodeType) {
    return wrappingInputRule(/^\s*>\s$/, nodeType);
}
export function codeBlockRule(nodeType) {
    return textblockTypeInputRule(/^```$/, nodeType);
}
/**
 * Get heading rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */
function getHeadingRules(schema) {
    // '# ' for h1, '## ' for h2 and etc
    var hashRule = defaultInputRuleHandler(headingRule(schema.nodes.heading, MAX_HEADING_LEVEL), true);
    var leftNodeReplacementHashRule = createInputRule(new RegExp(leafNodeReplacementCharacter + "(#{1,6})\\s$"), function (state, match, start, end) {
        var level = match[1].length;
        return insertBlock(state, schema.nodes.heading, "heading" + level, start, end, { level: level });
    }, true);
    // Old analytics stuff
    var currentHandler = hashRule.handler;
    hashRule.handler = function (state, match, start, end) {
        analyticsService.trackEvent("atlassian.editor.format.heading" + match[1].length + ".autoformatting");
        return currentHandler(state, match, start, end);
    };
    // New analytics handler
    var ruleWithHeadingAnalytics = ruleWithAnalytics(function (state, match) { return ({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        eventType: "track" /* TRACK */,
        actionSubjectId: "heading" /* FORMAT_HEADING */,
        attributes: {
            inputMethod: "autoformatting" /* FORMATTING */,
            newHeadingLevel: getHeadingLevel(match).level,
        },
    }); });
    return [
        ruleWithHeadingAnalytics(hashRule),
        ruleWithHeadingAnalytics(leftNodeReplacementHashRule),
    ];
}
/**
 * Get all block quote input rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */
function getBlockQuoteRules(schema) {
    // '> ' for blockquote
    var greatherThanRule = defaultInputRuleHandler(blockQuoteRule(schema.nodes.blockquote), true);
    greatherThanRule.handler = trackAndInvoke('atlassian.editor.format.blockquote.autoformatting', greatherThanRule.handler);
    var leftNodeReplacementGreatherRule = createInputRule(new RegExp(leafNodeReplacementCharacter + "\\s*>\\s$"), function (state, match, start, end) {
        return insertBlock(state, schema.nodes.blockquote, 'blockquote', start, end);
    }, true);
    // Analytics V3 handler
    var ruleWithBlockQuoteAnalytics = ruleWithAnalytics(function () { return ({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        eventType: "track" /* TRACK */,
        actionSubjectId: "blockQuote" /* FORMAT_BLOCK_QUOTE */,
        attributes: {
            inputMethod: "autoformatting" /* FORMATTING */,
        },
    }); });
    return [
        ruleWithBlockQuoteAnalytics(greatherThanRule),
        ruleWithBlockQuoteAnalytics(leftNodeReplacementGreatherRule),
    ];
}
/**
 * Get all code block input rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */
function getCodeBlockRules(schema) {
    var analyticsPayload = {
        action: "inserted" /* INSERTED */,
        actionSubject: "document" /* DOCUMENT */,
        actionSubjectId: "codeBlock" /* CODE_BLOCK */,
        attributes: { inputMethod: "autoformatting" /* FORMATTING */ },
        eventType: "track" /* TRACK */,
    };
    var threeTildeRule = createInputRule(/((^`{3,})|(\s`{3,}))(\S*)$/, function (state, match, start, end) {
        var attributes = {};
        if (match[4]) {
            attributes.language = match[4];
        }
        var newStart = match[0][0] === ' ' ? start + 1 : start;
        if (isConvertableToCodeBlock(state)) {
            analyticsService.trackEvent("atlassian.editor.format.codeblock.autoformatting");
            var tr_1 = transformToCodeBlockAction(state, attributes)
                // remove markdown decorator ```
                .delete(newStart, end)
                .scrollIntoView();
            return addAnalytics(tr_1, analyticsPayload);
        }
        var tr = state.tr;
        tr = tr.delete(newStart, end);
        var codeBlock = state.schema.nodes.codeBlock.createChecked();
        return safeInsert(codeBlock)(tr);
    }, true);
    var leftNodeReplacementThreeTildeRule = createInputRule(new RegExp("((" + leafNodeReplacementCharacter + "`{3,})|(\\s`{3,}))(\\S*)$"), function (state, match, start, end) {
        var attributes = {};
        if (match[4]) {
            attributes.language = match[4];
        }
        var tr = insertBlock(state, schema.nodes.codeBlock, 'codeblock', start, end, attributes);
        if (tr) {
            tr = addAnalytics(tr, analyticsPayload);
        }
        return tr;
    }, true);
    return [threeTildeRule, leftNodeReplacementThreeTildeRule];
}
export function inputRulePlugin(schema) {
    var rules = [];
    if (schema.nodes.heading) {
        rules.push.apply(rules, tslib_1.__spread(getHeadingRules(schema)));
    }
    if (schema.nodes.blockquote) {
        rules.push.apply(rules, tslib_1.__spread(getBlockQuoteRules(schema)));
    }
    if (schema.nodes.codeBlock) {
        rules.push.apply(rules, tslib_1.__spread(getCodeBlockRules(schema)));
    }
    if (rules.length !== 0) {
        return inputRules({ rules: rules });
    }
}
export default inputRulePlugin;
//# sourceMappingURL=input-rule.js.map