import * as tslib_1 from "tslib";
import { isBlank, isDigit, isNotBlank, StringBuffer } from '../../utils/text';
/*
 * This implementation is ported from JIRA with minimal modifications
 * It uses a mutable "StringBuffer" to parse links. It would be ideal to
 *  move this to operating on immutable strings instead if possible
 *
 * TODO: CS-596 Replace string buffer usage with strings
 */
function trimIfPossible(s) {
    if (s === null) {
        return null;
    }
    return s.trim();
}
function extractLinkBody(buffer) {
    var indexOfBang = buffer.indexOf('!');
    var indexOfPipe = buffer.indexOf('|');
    var lastIndexOfBang = buffer.lastIndexOf('!');
    var notEscaped = indexOfBang === -1 ||
        indexOfBang > indexOfPipe ||
        indexOfBang === lastIndexOfBang;
    if (notEscaped) {
        return divideOn(buffer, '|');
    }
    var body = new StringBuffer();
    var inEscape = false;
    for (var i = 0; i < buffer.length(); i++) {
        var c = buffer.charAt(i);
        if (c === '!') {
            inEscape = !inEscape;
        }
        if (c === '|' && !inEscape) {
            buffer.delete(0, i + 1);
            return body.toString();
        }
        body.append(c);
    }
    return null;
}
function divideAfterLast(buffer, divider) {
    if (buffer.length() === 0) {
        return null;
    }
    return divideAfter(buffer, buffer.lastIndexOf(divider));
}
function divideAfter(buffer, index) {
    if (typeof index === 'string') {
        index = buffer.indexOf(index);
    }
    if (index < 0) {
        return null;
    }
    else if (index === buffer.length() - 1) {
        buffer.deleteCharAt(buffer.length() - 1);
        return null;
    }
    else {
        var body = buffer.substring(index + 1);
        buffer.delete(index, buffer.length());
        return body;
    }
}
/**
 * Split a StringBuffer on some dividing character. Return everything before the divider,
 * and remove that prefix _and_ the divider from the StringBuffer. If there is no divider,
 * return null.
 * <p/>
 * If the buffer begins with the divider, then the divider will be removed _and_ null returned.
 * If the buffer ends with the divider, everything before the divider is returned and the buffer
 * will remain empty.
 *
 * @param buffer  the text we want to divide. Will be modified during the operation
 * @param divider the character to divide the buffer on
 * @return the characters before the divider, or the default if there are none
 */
function divideOn(buffer, divider) {
    if (buffer.length() === 0) {
        return null;
    }
    var i = buffer.indexOf(divider);
    if (i < 0) {
        return null;
    }
    else if (i === 0) {
        buffer.deleteCharAt(0);
        return null;
    }
    else {
        var body = buffer.substring(0, i);
        buffer.delete(0, i + 1);
        return body;
    }
}
function extractNumber(buf) {
    var digits = new StringBuffer();
    var i = 0;
    for (; i < buf.length() && isDigit(buf.charAt(i)); i++) {
        digits.append(buf.charAt(i));
    }
    if (i > 0) {
        buf.delete(0, i);
    }
    try {
        return parseInt(digits.toString(), 10);
    }
    catch (e) {
        return 0;
    }
}
export function parseLink(linkText) {
    var originalLinkText = linkText;
    // we want to decode single quotes (represented by &#039;) back before parsing the link test
    if (linkText.indexOf('&#039;') !== -1) {
        linkText = linkText.replace('&#039;', "'");
    }
    var buf = new StringBuffer(linkText);
    var linkBody = extractLinkBody(buf);
    var linkTitle = trimIfPossible(divideAfter(buf, '|'));
    var notLinkBody = buf.toString().trim();
    return {
        originalLinkText: originalLinkText,
        linkBody: linkBody,
        linkTitle: linkTitle,
        notLinkBody: notLinkBody,
    };
}
export function parseContentLink(link) {
    if (typeof link === 'string') {
        link = parseLink(link);
    }
    var notLinkBody = link.notLinkBody;
    var shortcutName = null;
    var shortcutValue = null;
    var spaceKey = null;
    var attachmentName = null;
    var anchor = null;
    var destinationTitle = '';
    var contentId = 0;
    // Don't treat it as a short link when it starts with "~"
    if (!notLinkBody.startsWith('~')) {
        var shortcutBuf = new StringBuffer(notLinkBody);
        shortcutName = trimIfPossible(divideAfterLast(shortcutBuf, '@'));
        if (isNotBlank(shortcutName)) {
            shortcutValue = shortcutBuf.toString();
        }
    }
    var buf = new StringBuffer(notLinkBody);
    if (isBlank(shortcutName)) {
        spaceKey = trimIfPossible(divideOn(buf, ':'));
        if (buf.indexOf('$') === 0) {
            buf.deleteCharAt(0);
            contentId = extractNumber(buf);
            if (contentId === 0) {
                return tslib_1.__assign({}, link, { shortcutName: shortcutName,
                    shortcutValue: shortcutValue,
                    spaceKey: spaceKey,
                    contentId: contentId,
                    attachmentName: attachmentName,
                    anchor: anchor,
                    destinationTitle: destinationTitle });
            }
        }
        attachmentName = trimIfPossible(divideAfter(buf, '^'));
        anchor = trimIfPossible(divideAfter(buf, '#'));
    }
    if (contentId === 0) {
        destinationTitle = buf.toString().trim();
    }
    return tslib_1.__assign({}, link, { shortcutName: shortcutName,
        shortcutValue: shortcutValue,
        spaceKey: spaceKey,
        contentId: contentId,
        attachmentName: attachmentName,
        anchor: anchor,
        destinationTitle: destinationTitle });
}
//# sourceMappingURL=link-parser.js.map