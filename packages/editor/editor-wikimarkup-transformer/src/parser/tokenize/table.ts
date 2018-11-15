import { Node as PMNode, Schema } from 'prosemirror-model';
import { AddCellArgs } from '../../interfaces';
import { TableBuilder } from '../builder/table-builder';
import { parseString } from '../text';
import { normalizePMNodes } from '../utils/normalize';
import { Token, TokenType, TokenErrCallback } from './';
import { parseNewlineOnly } from './whitespace';

// Exclude { micros
const CELL_REGEXP = /^[ \t]*([|]+)/;
const EMPTY_LINE_REGEXP = /^[ \t]*\r?\n/;
const EMPTY_CELL_REGEXP = /^([ \t]+)/;

const processState = {
  END_TABLE: 2,
  BUFFER: 4,
  CLOSE_ROW: 5,
  NEW_ROW: 6,
  LINE_BREAK: 7,
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
          const emptyCellMatch = input
            .substring(index)
            .match(EMPTY_CELL_REGEXP);
          if (emptyCellMatch) {
            index += emptyCellMatch[1].length;
            continue;
          }
          cellStyle = tableMatch[1];
          index += tableMatch[1].length;
          currentState = processState.BUFFER;
          continue;
        }

        currentState = processState.END_TABLE;
        continue;
      }
      case processState.LINE_BREAK: {
        const substring = input.substring(index);
        /**
         * If we encounter an empty line, we should end the list
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
        const length = parseNewlineOnly(input.substring(index));
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
            if (cellMatch) {
              cellStyle = cellMatch[1];
              index += cellMatch[1].length;
              /* Remove empty spaces after new cell */
              if (index < input.length) {
                const emptyCellMatch = input
                  .substring(index)
                  .match(EMPTY_CELL_REGEXP);
                if (emptyCellMatch) {
                  index += emptyCellMatch[1].length;
                }
              }
              continue;
            }
            break;
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
