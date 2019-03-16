var _a;
import { media } from './media';
import { blockquote } from './blockquote';
import { citation } from './citation';
import { deleted } from './deleted';
import { doubleDashSymbol } from './double-dash-symbol';
import { emoji } from './emoji';
import { emphasis } from './emphasis';
import { hardbreak } from './hardbreak';
import { heading } from './heading';
import { inserted } from './inserted';
import { linkFormat } from './links/link-format';
import { linkText } from './link-text';
import { list } from './list';
import { monospace } from './monospace';
import { quadrupleDashSymbol } from './quadruple-dash-symbol';
import { ruler } from './ruler';
import { strong } from './strong';
import { subscript } from './subscript';
import { superscript } from './superscript';
import { table } from './table';
import { tripleDashSymbol } from './triple-dash-symbol';
import { panelMacro } from './panel-macro';
import { adfMacro } from './adf-macro';
import { anchorMacro } from './anchor-macro';
import { codeMacro } from './code-macro';
import { quoteMacro } from './quote-macro';
import { colorMacro } from './color-macro';
import { noformatMacro } from './noformat-macro';
import { forceLineBreak } from './force-line-break';
import { issueKey } from './issue-key';
export var TokenType;
(function (TokenType) {
    TokenType["ADF_MACRO"] = "ADF_MACRO";
    TokenType["ANCHOR_MACRO"] = "ANCHOR_MACRO";
    TokenType["CODE_MACRO"] = "CODE_MACRO";
    TokenType["QUOTE_MACRO"] = "QUOTE_MACRO";
    TokenType["NOFORMAT_MACRO"] = "NOFORMAT_MACRO";
    TokenType["PANEL_MACRO"] = "PANEL_MACRO";
    TokenType["COLOR_MACRO"] = "COLOR_MACRO";
    TokenType["LOREM_MACRO"] = "LOREM_MACRO";
    TokenType["QUOTE"] = "QUOTE";
    TokenType["STRING"] = "STRING";
    TokenType["ISSUE_KEY"] = "ISSUE_KEY";
    TokenType["LINK_FORMAT"] = "LINK_FORMAT";
    TokenType["LINK_TEXT"] = "LINK_TEXT";
    TokenType["MEDIA"] = "MEDIA";
    TokenType["HEADING"] = "HEADING";
    TokenType["LIST"] = "LIST";
    TokenType["TABLE"] = "TABLE";
    TokenType["RULER"] = "RULER";
    TokenType["HARD_BREAK"] = "HARD_BREAK";
    TokenType["DOUBLE_DASH_SYMBOL"] = "DOUBLE_DASH_SYMBOL";
    TokenType["TRIPLE_DASH_SYMBOL"] = "TRIPLE_DASH_SYMBOL";
    TokenType["QUADRUPLE_DASH_SYMBOL"] = "QUADRUPLE_DASH_SYMBOL";
    TokenType["STRONG"] = "STRONG";
    TokenType["MONOSPACE"] = "MONOSPACE";
    TokenType["SUPERSCRIPT"] = "SUPERSCRIPT";
    TokenType["SUBSCRIPT"] = "SUBSCRIPT";
    TokenType["EMPHASIS"] = "EMPHASIS";
    TokenType["CITATION"] = "CITATION";
    TokenType["DELETED"] = "DELETED";
    TokenType["INSERTED"] = "INSERTED";
    TokenType["EMOJI"] = "EMOJI";
    TokenType["FORCE_LINE_BREAK"] = "FORCE_LINE_BREAK";
})(TokenType || (TokenType = {}));
var tokenToTokenParserMapping = (_a = {},
    _a[TokenType.DOUBLE_DASH_SYMBOL] = doubleDashSymbol,
    _a[TokenType.TRIPLE_DASH_SYMBOL] = tripleDashSymbol,
    _a[TokenType.QUADRUPLE_DASH_SYMBOL] = quadrupleDashSymbol,
    _a[TokenType.RULER] = ruler,
    _a[TokenType.STRONG] = strong,
    _a[TokenType.MONOSPACE] = monospace,
    _a[TokenType.SUPERSCRIPT] = superscript,
    _a[TokenType.SUBSCRIPT] = subscript,
    _a[TokenType.EMPHASIS] = emphasis,
    _a[TokenType.CITATION] = citation,
    _a[TokenType.DELETED] = deleted,
    _a[TokenType.INSERTED] = inserted,
    _a[TokenType.HARD_BREAK] = hardbreak,
    _a[TokenType.LINK_FORMAT] = linkFormat,
    _a[TokenType.LINK_TEXT] = linkText,
    _a[TokenType.HEADING] = heading,
    _a[TokenType.MEDIA] = media,
    _a[TokenType.LIST] = list,
    _a[TokenType.QUOTE] = blockquote,
    _a[TokenType.TABLE] = table,
    _a[TokenType.EMOJI] = emoji,
    _a[TokenType.ADF_MACRO] = adfMacro,
    _a[TokenType.ANCHOR_MACRO] = anchorMacro,
    _a[TokenType.CODE_MACRO] = codeMacro,
    _a[TokenType.QUOTE_MACRO] = quoteMacro,
    _a[TokenType.NOFORMAT_MACRO] = noformatMacro,
    _a[TokenType.PANEL_MACRO] = panelMacro,
    _a[TokenType.COLOR_MACRO] = colorMacro,
    _a[TokenType.FORCE_LINE_BREAK] = forceLineBreak,
    _a[TokenType.ISSUE_KEY] = issueKey,
    _a);
export function parseToken(input, type, position, schema, context) {
    var tokenParser = tokenToTokenParserMapping[type];
    if (tokenParser) {
        try {
            return tokenParser({ input: input, position: position, schema: schema, context: context });
        }
        catch (err) {
            if (context.tokenErrCallback) {
                context.tokenErrCallback(err, type);
            }
            return fallback(input, position);
        }
    }
    return fallback(input, position);
}
function fallback(input, position) {
    return {
        type: 'text',
        text: input.substr(position, 1),
        length: 1,
    };
}
//# sourceMappingURL=index.js.map