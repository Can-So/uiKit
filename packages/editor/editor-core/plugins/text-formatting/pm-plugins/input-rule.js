import * as tslib_1 from "tslib";
import { inputRules } from 'prosemirror-inputrules';
import { analyticsService } from '../../../analytics';
import { transformToCodeAction } from '../commands/transform-to-code';
import { createInputRule } from '../../../utils/input-rules';
import { ruleWithAnalytics } from '../../analytics/utils';
var validCombos = {
    '**': ['_', '~~'],
    '*': ['__', '~~'],
    __: ['*', '~~'],
    _: ['**', '~~'],
    '~~': ['__', '_', '**', '*'],
};
var validRegex = function (char, str) {
    for (var i = 0; i < validCombos[char].length; i++) {
        var ch = validCombos[char][i];
        if (ch === str) {
            return true;
        }
        var matchLength = str.length - ch.length;
        if (str.substr(matchLength, str.length) === ch) {
            return validRegex(ch, str.substr(0, matchLength));
        }
    }
    return false;
};
function addMark(markType, schema, charSize, char) {
    return function (state, match, start, end) {
        var _a = tslib_1.__read(match, 3), prefix = _a[1], textWithCombo = _a[2];
        var to = end;
        // in case of *string* pattern it matches the text from beginning of the paragraph,
        // because we want ** to work for strong text
        // that's why "start" argument is wrong and we need to calculate it ourselves
        var from = textWithCombo ? start + prefix.length : start;
        var nodeBefore = state.doc.resolve(start + prefix.length).nodeBefore;
        if (prefix &&
            prefix.length > 0 &&
            !validRegex(char, prefix) &&
            !(nodeBefore && nodeBefore.type === state.schema.nodes.hardBreak)) {
            return null;
        }
        // fixes the following case: my `*name` is *
        // expected result: should ignore special characters inside "code"
        if (state.schema.marks.code &&
            state.schema.marks.code.isInSet(state.doc.resolve(from + 1).marks())) {
            return null;
        }
        // Prevent autoformatting across hardbreaks
        var containsHardBreak;
        state.doc.nodesBetween(from, to, function (node) {
            if (node.type === schema.nodes.hardBreak) {
                containsHardBreak = true;
                return false;
            }
            return !containsHardBreak;
        });
        if (containsHardBreak) {
            return null;
        }
        // fixes autoformatting in heading nodes: # Heading *bold*
        // expected result: should not autoformat *bold*; <h1>Heading *bold*</h1>
        if (state.doc.resolve(from).sameParent(state.doc.resolve(to))) {
            if (!state.doc.resolve(from).parent.type.allowsMarkType(markType)) {
                return null;
            }
        }
        analyticsService.trackEvent("atlassian.editor.format." + markType.name + ".autoformatting");
        // apply mark to the range (from, to)
        var tr = state.tr.addMark(from, to, markType.create());
        if (charSize > 1) {
            // delete special characters after the text
            // Prosemirror removes the last symbol by itself, so we need to remove "charSize - 1" symbols
            tr = tr.delete(to - (charSize - 1), to);
        }
        return (tr
            // delete special characters before the text
            .delete(from, from + charSize)
            .removeStoredMark(markType));
    };
}
function addCodeMark(markType, schema, specialChar) {
    return function (state, match, start, end) {
        if (match[1] && match[1].length > 0) {
            var nodeBefore = state.doc.resolve(start + match[1].length).nodeBefore;
            if (!(nodeBefore && nodeBefore.type === state.schema.nodes.hardBreak)) {
                return null;
            }
        }
        // fixes autoformatting in heading nodes: # Heading `bold`
        // expected result: should not autoformat *bold*; <h1>Heading `bold`</h1>
        if (state.doc.resolve(start).sameParent(state.doc.resolve(end))) {
            if (!state.doc.resolve(start).parent.type.allowsMarkType(markType)) {
                return null;
            }
        }
        analyticsService.trackEvent('atlassian.editor.format.code.autoformatting');
        var regexStart = end - match[2].length + 1;
        var tr = transformToCodeAction(regexStart, end, state.tr)
            .delete(regexStart, regexStart + specialChar.length)
            .removeStoredMark(markType);
        return tr;
    };
}
export var strongRegex1 = /(\S*)(\_\_([^\_\s](\_(?!\_)|[^\_])*[^\_\s]|[^\_\s])\_\_)$/;
export var strongRegex2 = /(\S*)(\*\*([^\*\s](\*(?!\*)|[^\*])*[^\*\s]|[^\*\s])\*\*)$/;
export var italicRegex1 = /(\S*[^\s\_]*)(\_([^\s\_][^\_]*[^\s\_]|[^\s\_])\_)$/;
export var italicRegex2 = /(\S*[^\s\*]*)(\*([^\s\*][^\*]*[^\s\*]|[^\s\*])\*)$/;
export var strikeRegex = /(\S*)(\~\~([^\s\~](\~(?!\~)|[^\~])*[^\s\~]|[^\s\~])\~\~)$/;
export var codeRegex = /(\S*)(`[^\s][^`]*`)$/;
/**
 * Create input rules for strong mark
 *
 * @param {Schema} schema
 * @returns {InputRule[]}
 */
function getStrongInputRules(schema) {
    var ruleWithStrongAnalytics = ruleWithAnalytics(function () { return ({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        actionSubjectId: "strong" /* FORMAT_STRONG */,
        eventType: "track" /* TRACK */,
        attributes: {
            inputMethod: "autoformatting" /* FORMATTING */,
        },
    }); });
    // **string** or __strong__ should bold the text
    var markLength = 2;
    var doubleUnderscoreRule = createInputRule(strongRegex1, addMark(schema.marks.strong, schema, markLength, '__'));
    var doubleAsterixRule = createInputRule(strongRegex2, addMark(schema.marks.strong, schema, markLength, '**'));
    return [
        ruleWithStrongAnalytics(doubleUnderscoreRule),
        ruleWithStrongAnalytics(doubleAsterixRule),
    ];
}
/**
 * Create input rules for em mark
 *
 * @param {Schema} schema
 * @returns {InputRule[]}
 */
function getItalicInputRules(schema) {
    var ruleWithItalicAnalytics = ruleWithAnalytics(function () { return ({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        actionSubjectId: "italic" /* FORMAT_ITALIC */,
        eventType: "track" /* TRACK */,
        attributes: {
            inputMethod: "autoformatting" /* FORMATTING */,
        },
    }); });
    // *string* or _string_ should italic the text
    var markLength = 1;
    var underscoreRule = createInputRule(italicRegex1, addMark(schema.marks.em, schema, markLength, '_'));
    var asterixRule = createInputRule(italicRegex2, addMark(schema.marks.em, schema, markLength, '*'));
    return [
        ruleWithItalicAnalytics(underscoreRule),
        ruleWithItalicAnalytics(asterixRule),
    ];
}
/**
 * Create input rules for strike mark
 *
 * @param {Schema} schema
 * @returns {InputRule[]}
 */
function getStrikeInputRules(schema) {
    var ruleWithStrikeAnalytics = ruleWithAnalytics(function () { return ({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        actionSubjectId: "strike" /* FORMAT_STRIKE */,
        eventType: "track" /* TRACK */,
        attributes: {
            inputMethod: "autoformatting" /* FORMATTING */,
        },
    }); });
    var markLength = 2;
    var doubleTildeRule = createInputRule(strikeRegex, addMark(schema.marks.strike, schema, markLength, '~~'));
    return [ruleWithStrikeAnalytics(doubleTildeRule)];
}
/**
 * Create input rules for code mark
 *
 * @param {Schema} schema
 * @returns {InputRule[]}
 */
function getCodeInputRules(schema) {
    var ruleWithCodeAnalytics = ruleWithAnalytics(function () { return ({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        actionSubjectId: "code" /* FORMAT_CODE */,
        eventType: "track" /* TRACK */,
        attributes: {
            inputMethod: "autoformatting" /* FORMATTING */,
        },
    }); });
    var backTickRule = createInputRule(codeRegex, addCodeMark(schema.marks.code, schema, '`'));
    return [ruleWithCodeAnalytics(backTickRule)];
}
export function inputRulePlugin(schema) {
    var rules = [];
    if (schema.marks.strong) {
        rules.push.apply(rules, tslib_1.__spread(getStrongInputRules(schema)));
    }
    if (schema.marks.em) {
        rules.push.apply(rules, tslib_1.__spread(getItalicInputRules(schema)));
    }
    if (schema.marks.strike) {
        rules.push.apply(rules, tslib_1.__spread(getStrikeInputRules(schema)));
    }
    if (schema.marks.code) {
        rules.push.apply(rules, tslib_1.__spread(getCodeInputRules(schema)));
    }
    if (rules.length !== 0) {
        return inputRules({ rules: rules });
    }
}
export default inputRulePlugin;
//# sourceMappingURL=input-rule.js.map