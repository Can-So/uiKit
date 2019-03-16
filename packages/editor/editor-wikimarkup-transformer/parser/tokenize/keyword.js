import * as tslib_1 from "tslib";
import { TokenType } from './';
import { EMOJIS } from './emoji';
var macroKeywordTokenMap = [
    {
        type: TokenType.ADF_MACRO,
        regex: /^{adf/i,
    },
    {
        type: TokenType.ANCHOR_MACRO,
        regex: /^{anchor/i,
    },
    {
        type: TokenType.CODE_MACRO,
        regex: /^{code/i,
    },
    {
        type: TokenType.QUOTE_MACRO,
        regex: /^{quote/i,
    },
    {
        type: TokenType.NOFORMAT_MACRO,
        regex: /^{noformat/i,
    },
    {
        type: TokenType.PANEL_MACRO,
        regex: /^{panel/i,
    },
    {
        type: TokenType.COLOR_MACRO,
        regex: /^{color/,
    },
    {
        type: TokenType.LOREM_MACRO,
        regex: /^{loremipsum/i,
    },
];
/**
 * The order of this mapping determind which keyword
 * will be checked first, so it matters.
 */
var keywordTokenMap = {
    '[': TokenType.LINK_FORMAT,
    http: TokenType.LINK_TEXT,
    irc: TokenType.LINK_TEXT,
    mailto: TokenType.LINK_TEXT,
    '\\\\': TokenType.FORCE_LINE_BREAK,
    '\r': TokenType.HARD_BREAK,
    '\n': TokenType.HARD_BREAK,
    '\r\n': TokenType.HARD_BREAK,
    '!': TokenType.MEDIA,
    '----': TokenType.QUADRUPLE_DASH_SYMBOL,
    '---': TokenType.TRIPLE_DASH_SYMBOL,
    '--': TokenType.DOUBLE_DASH_SYMBOL,
    '-': TokenType.DELETED,
    '+': TokenType.INSERTED,
    '*': TokenType.STRONG,
    '^': TokenType.SUPERSCRIPT,
    '~': TokenType.SUBSCRIPT,
    _: TokenType.EMPHASIS,
    '{{': TokenType.MONOSPACE,
    '??': TokenType.CITATION,
};
export function parseMacroKeyword(input) {
    var e_1, _a;
    try {
        for (var macroKeywordTokenMap_1 = tslib_1.__values(macroKeywordTokenMap), macroKeywordTokenMap_1_1 = macroKeywordTokenMap_1.next(); !macroKeywordTokenMap_1_1.done; macroKeywordTokenMap_1_1 = macroKeywordTokenMap_1.next()) {
            var keyword = macroKeywordTokenMap_1_1.value;
            if (keyword.regex.test(input)) {
                return {
                    type: keyword.type,
                };
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (macroKeywordTokenMap_1_1 && !macroKeywordTokenMap_1_1.done && (_a = macroKeywordTokenMap_1.return)) _a.call(macroKeywordTokenMap_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return null;
}
export function parseOtherKeyword(input) {
    var e_2, _a, e_3, _b;
    for (var name_1 in keywordTokenMap) {
        if (keywordTokenMap.hasOwnProperty(name_1) && input.startsWith(name_1)) {
            return {
                type: keywordTokenMap[name_1],
            };
        }
    }
    // Look for a emoji
    var char = input.charAt(0);
    if ([':', '(', ';'].indexOf(char) !== -1) {
        try {
            for (var EMOJIS_1 = tslib_1.__values(EMOJIS), EMOJIS_1_1 = EMOJIS_1.next(); !EMOJIS_1_1.done; EMOJIS_1_1 = EMOJIS_1.next()) {
                var emoji = EMOJIS_1_1.value;
                try {
                    for (var _c = tslib_1.__values(emoji.markup), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var text = _d.value;
                        if (input.startsWith(text)) {
                            return {
                                type: TokenType.EMOJI,
                            };
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (EMOJIS_1_1 && !EMOJIS_1_1.done && (_a = EMOJIS_1.return)) _a.call(EMOJIS_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return null;
}
/**
 * These keywords only take effect when it's at the
 * beginning of the line
 * The order of the mapping matters. We should not put
 * LIST in front of RULER for example.
 */
var leadingKeywordTokenMap = [
    {
        type: TokenType.QUOTE,
        regex: /^bq\./,
    },
    {
        type: TokenType.HEADING,
        regex: /^h[1-6]\./,
    },
    {
        type: TokenType.RULER,
        regex: /^-{4,5}(\s|$)/,
    },
    {
        type: TokenType.TRIPLE_DASH_SYMBOL,
        regex: /^-{3}\s/,
    },
    {
        type: TokenType.DOUBLE_DASH_SYMBOL,
        regex: /^-{2}\s/,
    },
    {
        type: TokenType.LIST,
        regex: /^([*#]+|-) /,
    },
    {
        type: TokenType.TABLE,
        regex: /^\|{1,2}/,
    },
];
export function parseLeadingKeyword(input) {
    var e_4, _a;
    try {
        for (var leadingKeywordTokenMap_1 = tslib_1.__values(leadingKeywordTokenMap), leadingKeywordTokenMap_1_1 = leadingKeywordTokenMap_1.next(); !leadingKeywordTokenMap_1_1.done; leadingKeywordTokenMap_1_1 = leadingKeywordTokenMap_1.next()) {
            var keyword = leadingKeywordTokenMap_1_1.value;
            if (keyword.regex.test(input)) {
                return {
                    type: keyword.type,
                };
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (leadingKeywordTokenMap_1_1 && !leadingKeywordTokenMap_1_1.done && (_a = leadingKeywordTokenMap_1.return)) _a.call(leadingKeywordTokenMap_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return null;
}
export function parseIssueKeyword(input, issueKeyRegex) {
    if (issueKeyRegex && issueKeyRegex.test(input)) {
        return {
            type: TokenType.ISSUE_KEY,
        };
    }
    return null;
}
//# sourceMappingURL=keyword.js.map