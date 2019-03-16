import * as tslib_1 from "tslib";
import { createTextNode } from './nodes/text';
import { parseOtherKeyword, parseLeadingKeyword, parseMacroKeyword, parseIssueKeyword, } from './tokenize/keyword';
import { parseToken, TokenType } from './tokenize';
import { parseWhitespaceOnly } from './tokenize/whitespace';
import { escapeHandler } from './utils/escape';
var processState = {
    NEWLINE: 0,
    BUFFER: 1,
    TOKEN: 2,
    ESCAPE: 3,
};
export function parseString(_a) {
    var input = _a.input, schema = _a.schema, _b = _a.ignoreTokenTypes, ignoreTokenTypes = _b === void 0 ? [] : _b, context = _a.context;
    var index = 0;
    var state = processState.NEWLINE;
    var buffer = '';
    var tokenType = TokenType.STRING;
    var output = [];
    while (index < input.length) {
        var char = input.charAt(index);
        switch (state) {
            case processState.NEWLINE: {
                /**
                 * During this state, the parser will trim leading
                 * spaces and looking for any leading keywords.
                 */
                var substring = input.substring(index);
                var length_1 = parseWhitespaceOnly(substring);
                if (length_1) {
                    index += length_1;
                    continue;
                }
                var match = parseLeadingKeyword(substring) ||
                    parseMacroKeyword(substring) ||
                    parseOtherKeyword(substring) ||
                    parseIssueKeyword(substring, context.issueKeyRegex);
                if (match && ignoreTokenTypes.indexOf(match.type) === -1) {
                    tokenType = match.type;
                    state = processState.TOKEN;
                    continue;
                }
                else {
                    state = processState.BUFFER;
                    continue;
                }
            }
            case processState.BUFFER: {
                /**
                 * During this state, the parser will start
                 * saving plantext into the buffer until it hits
                 * a keyword
                 */
                var substring = input.substring(index);
                /**
                 * If the previous char is not a alphanumeric, we will parse
                 * format keywords.
                 * If the previous char is '{', we need to skip parse macro
                 * keyword
                 */
                var match = null;
                if (buffer.endsWith('{')) {
                    match = parseOtherKeyword(substring);
                }
                else {
                    match =
                        parseMacroKeyword(substring) ||
                            parseOtherKeyword(substring) ||
                            parseIssueKeyword(substring, context.issueKeyRegex);
                }
                if (match && ignoreTokenTypes.indexOf(match.type) === -1) {
                    tokenType = match.type;
                    state = processState.TOKEN;
                    continue;
                }
                if (char === '\\') {
                    state = processState.ESCAPE;
                    continue;
                }
                buffer += char;
                break;
            }
            case processState.TOKEN: {
                var token = parseToken(input, tokenType, index, schema, context);
                if (token.type === 'text') {
                    buffer += token.text;
                }
                else if (token.type === 'pmnode') {
                    output.push.apply(output, tslib_1.__spread(createTextNode(buffer, schema)));
                    buffer = ''; // clear the buffer
                    output.push.apply(// clear the buffer
                    output, tslib_1.__spread(token.nodes));
                }
                index += token.length;
                if (tokenType === TokenType.HARD_BREAK) {
                    state = processState.NEWLINE;
                }
                else {
                    state = processState.BUFFER;
                }
                continue;
            }
            case processState.ESCAPE: {
                var token = escapeHandler(input, index);
                buffer += token.text;
                index += token.length;
                state = processState.BUFFER;
                continue;
            }
            default:
        }
        index++;
    }
    if (buffer.length > 0) {
        // Wrapping the rest of the buffer into a text node
        output.push.apply(output, tslib_1.__spread(createTextNode(buffer, schema)));
    }
    return output;
}
//# sourceMappingURL=text.js.map