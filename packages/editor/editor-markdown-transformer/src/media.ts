export interface Token {
  new (type: string, tag: string, level: number);
  type: string;
  content: string;
  level: number;
  tag: string;
}

export interface MdState {
  Token: Token;
  tokens: Token[];
  md: any;
}

function createRule() {
  const regx = /!\[[^\]]*\]\([^)]+\)/g;
  const validParentTokens = ['th_open', 'td_open', 'list_item_open'];

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
  return function media(
    state: MdState,
    startLine: number,
    endLine: number,
    silent?: boolean,
  ) {
    const getUrl = (str: string) => {
      const res = state.md.helpers.parseLinkDestination(
        str,
        str.indexOf('(') + 1,
        str.length,
      );
      if (res.ok) {
        const href = state.md.normalizeLink(res.str);
        if (state.md.validateLink(href)) {
          return href;
        }
      }

      return '';
    };

    const createMediaTokens = (url: string) => {
      const mediaSingleOpen = new state.Token('media_single_open', '', 1);
      const media = new state.Token('media', '', 0);
      media.attrs = [['url', getUrl(url)], ['type', 'external']];
      const mediaSingleClose = new state.Token('media_single_close', '', -1);

      return [mediaSingleOpen, media, mediaSingleClose];
    };

    const createInlineTokens = (
      str: string,
      openingTokens: Token[],
      closingTokens: Token[],
    ) => {
      if (!str || str.length === 0) {
        return [];
      }

      const inlineBefore = new state.Token('inline', '', 1);
      inlineBefore.content = str;
      inlineBefore.children = [];

      return [...openingTokens, inlineBefore, ...closingTokens];
    };

    let processedTokens: string[] = [];
    const newTokens = state.tokens.reduce(
      (tokens: Token[], token: Token, i: number, arr: Token[]) => {
        if (token.type === 'inline' && regx.test(token.content)) {
          const openingTokens: Token[] = [];
          let cursor = i - 1;
          let previousToken = arr[cursor];
          let subTree: Token[] = [];

          while (
            previousToken &&
            previousToken.level > 0 &&
            validParentTokens.indexOf(previousToken.type) === -1
          ) {
            openingTokens.unshift(previousToken);
            cursor--;
            previousToken = arr[cursor];
          }

          if (validParentTokens.indexOf(previousToken.type) === -1) {
            openingTokens.unshift(previousToken);
          } else {
            cursor++;
          }

          const closingTokens = openingTokens
            .map(
              token =>
                new state.Token(
                  token.type.replace('_open', '_close'),
                  token.tag,
                  -1,
                ),
            )
            .reverse();

          const matches = token.content.match(regx)!;
          let inlineContentStack = token.content;
          matches.forEach(match => {
            const start = inlineContentStack.indexOf(match);
            const contentBefore = inlineContentStack.substr(0, start);
            inlineContentStack = inlineContentStack.substr(
              start + match.length,
            );

            subTree = [
              ...subTree,
              ...createInlineTokens(
                contentBefore,
                openingTokens,
                closingTokens,
              ),
              ...createMediaTokens(match),
            ];
          });

          if (inlineContentStack.length) {
            subTree = [
              ...subTree,
              ...createInlineTokens(
                inlineContentStack,
                openingTokens,
                closingTokens,
              ),
            ];
          }

          processedTokens = [
            ...processedTokens,
            ...closingTokens.map(c => c.type),
          ];

          tokens = [...tokens.slice(0, cursor), ...subTree];
        } else if (processedTokens.indexOf(token.type) !== -1) {
          // Ignore token if it's already processed
          processedTokens.splice(processedTokens.indexOf(token.type), 1);
        } else {
          tokens.push(token);
        }

        return tokens;
      },
      [],
    );

    state.tokens = newTokens;
    return true;
  };
}

export const markdownItMedia = (md: any) => {
  md.core.ruler.before('inline', 'media', createRule());
};
