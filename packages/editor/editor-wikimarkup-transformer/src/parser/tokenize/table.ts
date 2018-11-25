import { Node as PMNode, Schema } from 'prosemirror-model';
import { AddCellArgs } from '../../interfaces';
import { TableBuilder } from '../builder/table-builder';
import { parseString } from '../text';
import { normalizePMNodes } from '../utils/normalize';
import { linkFormat } from './links/link-format';
import { Token, TokenType, TokenErrCallback } from './';
import { parseNewlineOnly } from './whitespace';

/*
  The following are currently NOT supported
  1. Macros
  2. Escape |
  3. Table of table
*/
const CELL_REGEXP = /^([ \t]*)([|]+)([ \t]*)/;
const EMPTY_LINE_REGEXP = /^[ \t]*\r?\n/;
const EMPTY_CELL_REGEXP = /^([ \t]+)/;

const processState = {
  END_TABLE: 2,
  BUFFER: 4,
  CLOSE_ROW: 5,
  NEW_ROW: 6,
  LINE_BREAK: 7,
  LINK: 8,
};

export function table(
  input: string,
  position: number,
  schema: Schema,
  tokenErrCallback: TokenErrCallback,
): Token {
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

  const output: PMNode[] = [];
  let index = position;
  let currentState = processState.NEW_ROW;
  let buffer = '';
  let cellsBuffer: AddCellArgs[] = [];
  let cellStyle = '';

  let builder: TableBuilder | null = null;

  while (index < input.length) {
    const char = input.charAt(index);
    const substring = input.substring(index);

    switch (currentState) {
      case processState.NEW_ROW: {
        const tableMatch = substring.match(CELL_REGEXP);
        if (tableMatch) {
          if (!builder) {
            builder = new TableBuilder(schema);
          }
          /* Capture empty spaces */
          index += tableMatch[1].length;
          cellStyle = tableMatch[2];
          index += tableMatch[2].length;
          currentState = processState.BUFFER;
          continue;
        }

        currentState = processState.END_TABLE;
        continue;
      }
      case processState.LINE_BREAK: {
        /**
         * If we encounter an empty line, we should end the table
         */
        const emptyLineMatch = substring.match(EMPTY_LINE_REGEXP);
        if (emptyLineMatch) {
          bufferToCells(
            cellStyle,
            buffer,
            cellsBuffer,
            schema,
            ignoreTokenTypes,
            tokenErrCallback,
          );
          currentState = processState.END_TABLE;
          continue;
        }
        /**
         * If we enconter a new row
         */
        const cellMatch = substring.match(CELL_REGEXP);
        if (cellMatch) {
          currentState = processState.CLOSE_ROW;
        } else {
          currentState = processState.BUFFER;
        }
        continue;
      }
      case processState.BUFFER: {
        const length = parseNewlineOnly(substring);
        if (length) {
          const charBefore = input.charAt(index - 1);
          if (charBefore === '|' || charBefore.match(EMPTY_CELL_REGEXP)) {
            currentState = processState.CLOSE_ROW;
          } else {
            currentState = processState.LINE_BREAK;
            buffer += input.substr(index, length);
          }
          index += length;
          continue;
        }

        switch (char) {
          case '|': {
            /**
             * This is now end of a cell, we should wrap the buffer into a cell
             */
            bufferToCells(
              cellStyle,
              buffer,
              cellsBuffer,
              schema,
              ignoreTokenTypes,
              tokenErrCallback,
            );
            buffer = '';

            /**
             * Update cells tyle
             */
            const cellMatch = substring.match(CELL_REGEXP);
            /* The below if statement should aways be true, we leave it here to prevent any future code changes fall into infinite loop */
            if (cellMatch) {
              cellStyle = cellMatch[2];
              /* Move into the cell content */
              index += cellMatch[2].length;
              /* Remove empty spaces after new cell */
              index += cellMatch[3].length;
              continue;
            }
            break;
          }

          case '[': {
            currentState = processState.LINK;
            continue;
          }

          default: {
            buffer += char;
            index++;
            continue;
          }
        }
        break;
      }
      case processState.CLOSE_ROW: {
        bufferToCells(
          cellStyle,
          buffer,
          cellsBuffer,
          schema,
          ignoreTokenTypes,
          tokenErrCallback,
        );
        buffer = '';
        if (builder) {
          builder.add(cellsBuffer);
          cellsBuffer = [];
        }

        currentState = processState.NEW_ROW;
        continue;
      }
      case processState.END_TABLE: {
        if (builder) {
          if (cellsBuffer.length) {
            builder.add(cellsBuffer);
          }
          output.push(builder.buildPMNode());
        }
        return {
          type: 'pmnode',
          nodes: output,
          length: index - position,
        };
      }
      case processState.LINK: {
        /**
         * We should "fly over" the link format and we dont want
         * -awesome [link|https://www.atlass-ian.com] nice
         * to be a strike through because of the '-' in link
         */
        const token = linkFormat(input, index, schema);
        if (token.type === 'text') {
          buffer += token.text;
          index += token.length;
          currentState = processState.BUFFER;
          continue;
        } else if (token.type === 'pmnode') {
          buffer += input.substr(index, token.length);
          index += token.length;
          currentState = processState.BUFFER;
          continue;
        }
      }
    }
    index++;
  }

  bufferToCells(
    cellStyle,
    buffer,
    cellsBuffer,
    schema,
    ignoreTokenTypes,
    tokenErrCallback,
  );

  if (builder) {
    if (cellsBuffer.length) {
      builder.add(cellsBuffer);
    }
    output.push(builder.buildPMNode());
  }

  return {
    type: 'pmnode',
    nodes: output,
    length: index - position,
  };
}

function bufferToCells(
  style: string,
  buffer: string,
  cellsBuffer: AddCellArgs[],
  schema: Schema,
  ignoreTokenTypes: TokenType[],
  tokenErrCallback: TokenErrCallback,
) {
  if (buffer.length) {
    const contentNode = parseString(
      buffer,
      schema,
      ignoreTokenTypes,
      tokenErrCallback,
    );
    cellsBuffer.push({
      style,
      content: normalizePMNodes(contentNode, schema),
    });
  }
}
