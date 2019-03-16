import * as tslib_1 from "tslib";
function createRule() {
    var regx = /!\[[^\]]*\]\([^)]+\)/g;
    var validParentTokens = ['th_open', 'td_open', 'list_item_open'];
    /**
     * This function looks for strings that matches ![description](url) inside Inline-tokens.
     * It will then split the Inline-token with content before and after the image, example:
     *
     * Input (tokens):
     *   paragraph_open
     *   inline - content: Hello ![](image.jpg) World!
     *   paragraph_close
     * Output (tokens):
     *   paragraph_open
     *   inline - content: Hello
     *   paragraph_close
     *   media_single_open
     *   media
     *   media_single_close
     *   paragraph_open
     *   inline - content: World!
     *   paragraph_close
     *
     * This is applied before the inline content is parsed, to ensure that the formatting of
     * remaining inline content (bold, links, etc.) is kept intact!
     */
    return function media(State, startLine, endLine, silent) {
        var getUrl = function (str) {
            var res = State.md.helpers.parseLinkDestination(str, str.indexOf('(') + 1, str.length);
            if (res.ok) {
                var href = State.md.normalizeLink(res.str);
                if (State.md.validateLink(href)) {
                    return href;
                }
            }
            return '';
        };
        var createMediaTokens = function (url) {
            var mediaSingleOpen = new State.Token('media_single_open', '', 1);
            var media = new State.Token('media', '', 0);
            media.attrs = [['url', getUrl(url)], ['type', 'external']];
            var mediaSingleClose = new State.Token('media_single_close', '', -1);
            return [mediaSingleOpen, media, mediaSingleClose];
        };
        var createInlineTokens = function (str, openingTokens, closingTokens) {
            if (!str || str.length === 0) {
                return [];
            }
            var inlineBefore = new State.Token('inline', '', 1);
            inlineBefore.content = str;
            inlineBefore.children = [];
            return tslib_1.__spread(openingTokens, [inlineBefore], closingTokens);
        };
        var processedTokens = [];
        var newTokens = State.tokens.reduce(function (tokens, token, i, arr) {
            if (token.type === 'inline' && regx.test(token.content)) {
                var openingTokens_1 = [];
                var cursor = i - 1;
                var previousToken = arr[cursor];
                var subTree_1 = [];
                while (previousToken &&
                    previousToken.level > 0 &&
                    validParentTokens.indexOf(previousToken.type) === -1) {
                    openingTokens_1.unshift(previousToken);
                    cursor--;
                    previousToken = arr[cursor];
                }
                if (validParentTokens.indexOf(previousToken.type) === -1) {
                    openingTokens_1.unshift(previousToken);
                }
                else {
                    cursor++;
                }
                var closingTokens_1 = openingTokens_1
                    .map(function (token) {
                    return new State.Token(token.type.replace('_open', '_close'), token.tag, -1);
                })
                    .reverse();
                var matches = token.content.match(regx);
                var inlineContentStack_1 = token.content;
                matches.forEach(function (match) {
                    var start = inlineContentStack_1.indexOf(match);
                    var contentBefore = inlineContentStack_1.substr(0, start);
                    inlineContentStack_1 = inlineContentStack_1.substr(start + match.length);
                    subTree_1 = tslib_1.__spread(subTree_1, createInlineTokens(contentBefore, openingTokens_1, closingTokens_1), createMediaTokens(match));
                });
                if (inlineContentStack_1.length) {
                    subTree_1 = tslib_1.__spread(subTree_1, createInlineTokens(inlineContentStack_1, openingTokens_1, closingTokens_1));
                }
                processedTokens = tslib_1.__spread(processedTokens, closingTokens_1.map(function (c) { return c.type; }));
                tokens = tslib_1.__spread(tokens.slice(0, cursor), subTree_1);
            }
            else if (processedTokens.indexOf(token.type) !== -1) {
                // Ignore token if it's already processed
                processedTokens.splice(processedTokens.indexOf(token.type), 1);
            }
            else {
                tokens.push(token);
            }
            return tokens;
        }, []);
        State.tokens = newTokens;
        return true;
    };
}
export var markdownItMedia = function (md) {
    md.core.ruler.before('inline', 'media', createRule());
};
//# sourceMappingURL=media.js.map