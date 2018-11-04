import { Node as PMNode, Schema } from 'prosemirror-model';
import { media } from './media';
import { fileLink } from './file-link';
import { blockquote } from './blockquote';
import { citation } from './citation';
import { deleted } from './deleted';
import { doubleDashSymbol } from './double-dash-symbol';
import { emoji } from './emoji';
import { emphasis } from './emphasis';
import { hardbreak } from './hardbreak';
import { heading } from './heading';
import { inserted } from './inserted';
import { linkFormat } from './link-format';
import { linkText } from './link-text';
import { list } from './list';
import { mention } from './mention';
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

export enum TokenType {
  ADF_MACRO = 'ADF_MACRO', // {adf}
  ANCHOR_MACRO = 'ANCHOR_MACRO', // {anchor}
  CODE_MACRO = 'CODE_MACRO', // {code}
  QUOTE_MACRO = 'QUOTE_MACRO', // {quote}
  NOFORMAT_MACRO = 'NOFORMAT_MACRO', // {noformat}
  PANEL_MACRO = 'PANEL_MACRO', // {panel}
  COLOR_MACRO = 'COLOR_MACRO', // {color}
  LOREM_MACRO = 'LOREM_MACRO', // {loremipsum}
  QUOTE = 'QUOTE',
  STRING = 'STRING',
  LINK_FORMAT = 'LINK_FORMAT',
  LINK_TEXT = 'LINK_TEXT',
  MEDIA = 'MEDIA',
  FLIE_LINK = 'FILE_LINK',
  HEADING = 'HEADING',
  LIST = 'LIST',
  TABLE = 'TABLE',
  RULER = 'RULER',
  HARD_BREAK = 'HARD_BREAK', // \\, \r, \n, \r\n
  DOUBLE_DASH_SYMBOL = 'DOUBLE_DASH_SYMBOL', // --
  TRIPLE_DASH_SYMBOL = 'TRIPLE_DASH_SYMBOL', // ---
  QUADRUPLE_DASH_SYMBOL = 'QUADRUPLE_DASH_SYMBOL', // ----
  STRONG = 'STRONG', // *strong*
  MONOSPACE = 'MONOSPACE', // {{text}}
  SUPERSCRIPT = 'SUPERSCRIPT', // ^superscript^
  SUBSCRIPT = 'SUBSCRIPT', // ^subscript^
  EMPHASIS = 'EMPHASIS', // _emphasis_
  CITATION = 'CITATION', // ??citation??
  DELETED = 'DELETED', // -deleted-
  INSERTED = 'INSERTED', // +deleted+
  EMOJI = 'EMOJI', // :)
  MENTION = 'MENTION', // [~username]
}

export interface TextToken {
  type: 'text';
  text: string;
  length: number;
}

export interface PMNodeToken {
  type: 'pmnode';
  nodes: PMNode[];
  length: number;
}

export type Token = TextToken | PMNodeToken;
export type TokenErrCallback = (err: Error, tokenType: string) => void;
export type TokenParser = (
  input: string,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
) => Token;

const tokenToTokenParserMapping: {
  [key: string]: TokenParser;
} = {
  [TokenType.DOUBLE_DASH_SYMBOL]: doubleDashSymbol,
  [TokenType.TRIPLE_DASH_SYMBOL]: tripleDashSymbol,
  [TokenType.QUADRUPLE_DASH_SYMBOL]: quadrupleDashSymbol,
  [TokenType.RULER]: ruler,
  [TokenType.STRONG]: strong,
  [TokenType.MONOSPACE]: monospace,
  [TokenType.SUPERSCRIPT]: superscript,
  [TokenType.SUBSCRIPT]: subscript,
  [TokenType.EMPHASIS]: emphasis,
  [TokenType.CITATION]: citation,
  [TokenType.DELETED]: deleted,
  [TokenType.INSERTED]: inserted,
  [TokenType.HARD_BREAK]: hardbreak,
  [TokenType.LINK_FORMAT]: linkFormat,
  [TokenType.LINK_TEXT]: linkText,
  [TokenType.HEADING]: heading,
  [TokenType.MEDIA]: media,
  [TokenType.FLIE_LINK]: fileLink,
  [TokenType.LIST]: list,
  [TokenType.QUOTE]: blockquote,
  [TokenType.TABLE]: table,
  [TokenType.EMOJI]: emoji,
  [TokenType.MENTION]: mention,
  [TokenType.ADF_MACRO]: adfMacro,
  [TokenType.ANCHOR_MACRO]: anchorMacro,
  [TokenType.CODE_MACRO]: codeMacro,
  [TokenType.QUOTE_MACRO]: quoteMacro,
  [TokenType.NOFORMAT_MACRO]: noformatMacro,
  [TokenType.PANEL_MACRO]: panelMacro,
  [TokenType.COLOR_MACRO]: colorMacro,
};

export function parseToken(
  input: string,
  type: TokenType,
  schema: Schema,
  errCallback?: TokenErrCallback,
): Token {
  const tokenParser = tokenToTokenParserMapping[type];
  if (tokenParser) {
    try {
      return tokenParser(input, schema, errCallback);
    } catch (err) {
      if (errCallback) {
        errCallback(err, type);
      }
      return fallback(input);
    }
  }
  return fallback(input);
}

function fallback(input: string): Token {
  return {
    type: 'text',
    text: input.substr(0, 1),
    length: 1,
  };
}
