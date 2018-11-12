import { Node as PMNode, Schema } from 'prosemirror-model';
import { AddCellArgs } from '../../interfaces';
import { TableBuilder } from '../builder/table-builder';
import { parseString } from '../text';
import { normalizePMNodes } from '../utils/normalize';
import { Token, TokenType, TokenErrCallback } from './';
import { parseNewlineOnly } from './whitespace';

// Exclude { micros
const TABLE_REGEXP = /^[ \t]*[|]+(\\\||\\\{|[^|{\n])*/;

const processState = {
  OPENING_CELL: 0,
  CLOSING_CELL: 1,
  MACRO: 2,
};

export function table(
  input: string,
  position: number,
  schema: Schema,
  tokenErrCallback: TokenErrCallback,
): Token {
  const output: PMNode[] = [];
  let index = position;
  let currentState = processState.OPENING_CELL;
  let tableBuffer = '';
  let builder: TableBuilder | null = null;

  while (index < input.length) {
    const char = input.charAt(index);
    const substring = input.substring(index);
    const length = parseNewlineOnly(input.substring(index));

    switch (currentState) {
      case processState.OPENING_CELL: {
        const tableMatch = substring.match(TABLE_REGEXP);
        if (tableMatch) {
          if (!builder) {
            builder = new TableBuilder(schema);
          }
          tableBuffer += input.substr(index, tableMatch[0].length);
          index += tableMatch[0].length;
          currentState = processState.CLOSING_CELL;
          if (index < input.length) {
            continue;
          }
        }
        currentState = processState.CLOSING_CELL;
        continue;
      }
      case processState.CLOSING_CELL: {
        // Looking for | to close the table
        if (length) {
          tableBuffer += '\n';
          index += length;
          if (index < input.length) {
            if (input.substring(index).match(TABLE_REGEXP) && builder) {
              builder.add(
                parseToTableCell(tableBuffer, schema, tokenErrCallback),
              );
              tableBuffer = '';
            }
            currentState = processState.OPENING_CELL;
            continue;
          }
        }
        if (char === '|' && builder) {
          if (
            index < input.length &&
            parseNewlineOnly(input.substring(index + 1))
          ) {
            index += parseNewlineOnly(input.substring(index + 1));
            tableBuffer += char;
            builder.add(
              parseToTableCell(tableBuffer, schema, tokenErrCallback),
            );
            tableBuffer = '';
            if (
              index < input.length &&
              !input.substring(index + 1).match(TABLE_REGEXP)
            ) {
              output.push(builder.buildPMNode());
              return {
                type: 'pmnode',
                nodes: output,
                length: index - position,
              };
            }
          }
          currentState = processState.OPENING_CELL;
          continue;
        } else {
          if (!length) {
            tableBuffer += char;
          }
        }
        break;
      }
    }
    index++;
  }

  if (builder) {
    builder.add(parseToTableCell(tableBuffer, schema, tokenErrCallback));
    output.push(builder.buildPMNode());
  }

  return {
    type: 'pmnode',
    nodes: output,
    length: index - position,
  };
}

function parseToTableCell(
  input: string,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
): AddCellArgs[] {
  /**
   * The following token types will be ignored in parsing
   * the content of a table cell
   */
  const ignoreTokenTypes = [
    TokenType.DOUBLE_DASH_SYMBOL,
    TokenType.TRIPLE_DASH_SYMBOL,
    TokenType.QUADRUPLE_DASH_SYMBOL,
    TokenType.TABLE,
    TokenType.RULER,
  ];

  const cells: AddCellArgs[] = [];

  /**
   * If separator is a regular expression that contains capturing parentheses,
   * then each time separator is matched, the results (including any undefined results)
   * of the capturing parentheses are spliced into the output array.
   */
  const slices = input.split(/([|]+)/);
  /**
   * After the split, the first item would always be a "" which we don't need
   * For example,
   * ||header||header||header
   * returns:
   * ["", "||", "header", "||", "header", "||", "header"]
   */
  slices.shift();

  for (let i = 0; i < slices.length; i += 2) {
    const style = slices[i];
    const rawContent = i + 1 < slices.length ? slices[i + 1] : null;
    /**
     * We don't want to display the trailing space as a new cell
     * https://jdog.jira-dev.com/browse/BENTO-2319
     */
    if (rawContent === null || /^\s*$/.test(rawContent)) {
      continue;
    }

    const contentNode = parseString(
      rawContent,
      schema,
      ignoreTokenTypes,
      tokenErrCallback,
    );

    cells.push({ style, content: normalizePMNodes(contentNode, schema) });
  }

  return cells;
}
