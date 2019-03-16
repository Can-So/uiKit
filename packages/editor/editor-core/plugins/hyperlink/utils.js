import * as LinkifyIt from 'linkify-it';
import { mapSlice } from '../../utils/slice';
import { isSafeUrl } from '@findable/adf-schema';
export var LINK_REGEXP = /(https?|ftp):\/\/[^\s]+/;
var linkify = LinkifyIt();
linkify.add('sourcetree:', 'http:');
var tlds = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');
var tlds2Char = 'a[cdefgilmnoqrtuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrtuvwxyz]|n[acefgilopruz]|om|p[aefghkmnrtw]|qa|r[eosuw]|s[abcdegijklmnrtuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';
tlds.push(tlds2Char);
linkify.tlds(tlds, false);
export function getLinkMatch(str) {
    if (!str) {
        return null;
    }
    var match = linkifyMatch(str);
    if (!match.length) {
        match = linkify.match(str);
    }
    return match && match[0];
}
/**
 * Instance of class LinkMatcher are used in autoformatting in place of Regex.
 * Hence it has been made similar to regex with an exec method.
 * Extending it directly from class Regex was introducing some issues, thus that has been avoided.
 */
var LinkMatcher = /** @class */ (function () {
    function LinkMatcher() {
    }
    LinkMatcher.prototype.exec = function (str) {
        if (str.endsWith(' ')) {
            var chunks = str.slice(0, str.length - 1).split(' ');
            var lastChunk = chunks[chunks.length - 1];
            var links = linkify.match(lastChunk);
            if (links && links.length > 0) {
                var lastLink = links[links.length - 1];
                lastLink.input = lastChunk;
                lastLink.length = lastLink.lastIndex - lastLink.index + 1;
                return [lastLink];
            }
        }
        return null;
    };
    return LinkMatcher;
}());
export { LinkMatcher };
/**
 * Adds protocol to url if needed.
 */
export function normalizeUrl(url) {
    if (!url) {
        return '';
    }
    if (isSafeUrl(url)) {
        return url;
    }
    var match = getLinkMatch(url);
    return (match && match.url) || '';
}
export function linkifyContent(schema) {
    return function (slice) {
        return mapSlice(slice, function (node, parent) {
            var isAllowedInParent = !parent || parent.type !== schema.nodes.codeBlock;
            if (isAllowedInParent && node.isText) {
                var linkified_1 = [];
                var link_1 = node.type.schema.marks['link'];
                var text = node.text;
                var matches = findLinkMatches(text);
                var pos_1 = 0;
                matches.forEach(function (match) {
                    if (match.start > 0) {
                        linkified_1.push(node.cut(pos_1, match.start));
                    }
                    linkified_1.push(node
                        .cut(match.start, match.end)
                        .mark(link_1
                        .create({ href: normalizeUrl(match.href) })
                        .addToSet(node.marks)));
                    pos_1 = match.end;
                });
                if (pos_1 < text.length) {
                    linkified_1.push(node.cut(pos_1));
                }
                return linkified_1;
            }
            return node;
        });
    };
}
function findLinkMatches(text) {
    var matches = [];
    var linkMatches = text && linkify.match(text);
    if (linkMatches && linkMatches.length > 0) {
        linkMatches.forEach(function (match) {
            matches.push({
                start: match.index,
                end: match.lastIndex,
                title: match.raw,
                href: match.url,
            });
        });
    }
    return matches;
}
export var linkifyMatch = function (text) {
    var matches = [];
    if (!LINK_REGEXP.test(text)) {
        return matches;
    }
    var startpos = 0;
    var substr;
    while ((substr = text.substr(startpos))) {
        var link = (substr.match(LINK_REGEXP) || [''])[0];
        if (link) {
            var index = substr.search(LINK_REGEXP);
            var start = index >= 0 ? index + startpos : index;
            var end = start + link.length;
            matches.push({
                index: start,
                lastIndex: end,
                raw: link,
                url: link,
                text: link,
                schema: '',
            });
            startpos += end;
        }
        else {
            break;
        }
    }
    return matches;
};
//# sourceMappingURL=utils.js.map