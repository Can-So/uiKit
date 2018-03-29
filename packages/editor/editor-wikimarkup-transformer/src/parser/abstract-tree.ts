import { Node as PMNode, Schema } from 'prosemirror-model';
import { Builder } from './builder/builder';
import ListBuilder from './builder/list-builder';
import TableBuilder, { AddCellArgs } from './builder/table-builder';

import { MacroName, RichInterval } from '../interfaces';
import { findTextAndInlineNodes } from './text';
import { getCodeLanguage } from './code-language';
import {
  getResolvedMacroIntervals,
  getResolvedTextIntervals,
} from './intervals';
import { isSpecialMacro } from './special';

// E.g. bq. foo -> [ "foo" ]
const BLOCKQUOTE_LINE_REGEXP = /^bq\.\s(.+)/;

// E.g. h1. foo -> [ "1", "foo" ]
const HEADING_REGEXP = /^h([1|2|3|4|5|6]+)\.\s(.+)/;

// E.g. * foo -> [ "*", "foo" ]
const LIST_REGEXP = /^\s*([*\-#]+)\s+(.+)/;

// E.g. | foo -> [ "|" ] (line STARTS WITH table)
const TABLE_REGEXP = /^\s*[|]+/;

// E.g. || foo || bar -> [ "|| foo", "||", "foo" ] (invoke multiple times with .exec)
const TABLE_CELL_REGEXP = /([|]+)([^|]*)/g;

// E.g. foo || -> [ "foo ||", "foo " ] - Match content from a multiline row up to the cell line
const NEWLINE_CELL_REGEXP = /^([^|]*)[|]/;

const HORIZONTAL_RULE = '----';
const NEWLINE = '\n';
const DOUBLE_BACKSLASH = '\\\\';

export default class AbstractTree {
  private schema: Schema;
  private wikiMarkup: string;

  constructor(schema: Schema, wikiMarkup: string) {
    this.schema = schema;
    this.wikiMarkup = wikiMarkup;
  }

  /**
   * Build text intervals list from wiki markup
   */
  getTextIntervals(): RichInterval[] {
    const textIntervals = getResolvedMacroIntervals(this.wikiMarkup);

    return textIntervals.map(({ macros, text }) => {
      const simpleMacro = macros.pop();
      const treatChildrenAsText = Boolean(
        simpleMacro && isSpecialMacro(simpleMacro.macro),
      );

      return {
        text,
        macro: simpleMacro,
        content: this.getTextNodes(text, treatChildrenAsText),
      };
    });
  }

  getTextWithMarks(text: string): PMNode[] {
    const intervals = getResolvedTextIntervals(text);
    const output: PMNode[] = [];

    for (const { effects, text } of intervals) {
      const textWithLineBreaks = text.split(DOUBLE_BACKSLASH);

      textWithLineBreaks.forEach((chunk, i) => {
        const inlineNodes = findTextAndInlineNodes(this.schema, chunk, effects);
        output.push(...inlineNodes);

        if (i + 1 < textWithLineBreaks.length) {
          const hardBreakNode = this.schema.nodes.hardBreak.createChecked();
          output.push(hardBreakNode);
        }
      });
    }

    return output;
  }

  /**
   * Convert reduced macros tree into prosemirror model tree
   */
  getProseMirrorModel(): PMNode {
    const textIntervals = this.getTextIntervals();

    return this.schema.nodes.doc.createChecked(
      {},
      this.getProseMirrorNodes(textIntervals),
    );
  }

  /**
   * Creates prosemirror node from macro
   */
  private getProseMirrorMacroNode(
    macro: MacroName,
    attrs: { [key: string]: string },
    content: PMNode[],
  ): PMNode {
    const { blockquote, codeBlock, panel } = this.schema.nodes;

    if (macro === 'code') {
      return codeBlock.createChecked(
        { language: getCodeLanguage(attrs) },
        content,
      );
    }

    if (macro === 'noformat') {
      return codeBlock.createChecked({}, content);
    }

    if (macro === 'panel') {
      return panel.createChecked({ panelType: 'info' }, content);
    }

    if (macro === 'quote') {
      return blockquote.createChecked({}, content);
    }

    throw new Error(`Unknown macro type: ${macro}`);
  }

  /**
   * Convert macros tree into prosemirror tree
   * Main recursive function
   */
  private getProseMirrorNodes(intervals: RichInterval[]): PMNode[] {
    const output: PMNode[] = [];

    for (const interval of intervals) {
      const { macro, content } = interval;

      if (macro) {
        const { attrs, macro: macroName } = macro;
        const macroPMNode = this.getProseMirrorMacroNode(
          macroName,
          attrs,
          content,
        );

        output.push(macroPMNode);
      } else {
        output.push(...content);
      }
    }

    return output;
  }

  /**
   * Combine text nodes with hardBreaks between them
   */
  private buildTextNodes(lines: string[]): PMNode[] {
    const { hardBreak } = this.schema.nodes;
    const output: PMNode[] = [];

    lines.forEach((line, index) => {
      const textNodes = this.getTextWithMarks(line);
      output.push(...textNodes);

      if (index + 1 < lines.length) {
        const brNode = hardBreak.createChecked();
        output.push(brNode);
      }
    });

    return output;
  }

  /**
   * Parse text which doesn't contain macros
   */
  private getTextNodes(str: string, treatChildrenAsText: boolean): PMNode[] {
    const { blockquote, heading, paragraph, rule } = this.schema.nodes;
    const output: PMNode[] = [];

    if (treatChildrenAsText) {
      const textNode = this.schema.text(str);
      output.push(textNode);

      return output;
    }

    const lines = str.split(NEWLINE);
    let textContainer: string[] = [];

    const processAndEmptyStoredText = () => {
      if (textContainer.length) {
        const paragraphNode = paragraph.createChecked(
          {},
          this.buildTextNodes(textContainer),
        );
        output.push(paragraphNode);

        textContainer = [];
      }
    };

    // Flag if currently processing a block of content
    let isBuilding: boolean = false;
    let builder: Builder | null | undefined;
    for (const line of lines) {
      // convert HORIZONTAL_RULE to rule
      if (line === HORIZONTAL_RULE) {
        processAndEmptyStoredText();

        const hrNode = rule.createChecked();
        output.push(hrNode);

        continue;
      }

      // empty line means the end of the paragraph
      if (!line.length) {
        processAndEmptyStoredText();

        if (isBuilding) {
          output.push(builder!.buildPMNode());
          isBuilding = false;
          builder = null;
        }

        continue;
      }

      let lineUpdated = line.replace(/---/g, '—').replace(/--/g, '–');

      // search for headings
      const headingMatches = lineUpdated.match(HEADING_REGEXP);
      if (headingMatches) {
        processAndEmptyStoredText();

        const headingNode = heading.createChecked(
          { level: headingMatches[1] },
          this.getTextWithMarks(headingMatches[2]),
        );

        output.push(headingNode);
        continue;
      }

      // search for blockquote line
      const lineBlockQuoteMatches = lineUpdated.match(BLOCKQUOTE_LINE_REGEXP);
      if (lineBlockQuoteMatches) {
        processAndEmptyStoredText();

        const paragraphNode = paragraph.createChecked(
          {},
          this.getTextWithMarks(lineBlockQuoteMatches[1]),
        );
        const blockquoteNode = blockquote.createChecked({}, paragraphNode);

        output.push(blockquoteNode);
        continue;
      }

      // search for lists
      const listMatches = lineUpdated.match(LIST_REGEXP);
      if (listMatches) {
        const [, /* discard */ style, content] = listMatches;
        isBuilding = true;

        if (!builder) {
          builder = new ListBuilder(this.schema, style);
        } else {
          const type = ListBuilder.getType(style);

          // If it's top level and doesn't match, create a new list
          if (type !== builder.type && style.length === 1) {
            output.push(builder.buildPMNode());
            builder = new ListBuilder(this.schema, style);
          }
        }

        const contentNode = this.getTextWithMarks(content);
        builder.add([{ style, content: contentNode }]);
        continue;
      }

      // search for tables
      const tableMatches = lineUpdated.match(TABLE_REGEXP);
      if (tableMatches) {
        isBuilding = true;

        if (!builder) {
          builder = new TableBuilder(this.schema);
        }

        // Iterate over the cells
        builder.add(this.getTableCells(lineUpdated));
        continue;
      }

      // If it's not a match, but the last loop was part of a block, continue adding to it
      if (isBuilding) {
        let content: string;
        let additionalFields: any[] = [];

        if (builder instanceof TableBuilder) {
          const matches = lineUpdated.match(NEWLINE_CELL_REGEXP);
          // If it doesn't have a closing cell line, the whole line is part of the content
          content = (matches && matches[1]) || lineUpdated;

          // Get the other cells if any
          additionalFields = this.getTableCells(lineUpdated);
        } else {
          content = lineUpdated;
        }

        const contentNode = this.getTextWithMarks(content!);
        builder!.add([
          { style: null, content: contentNode },
          ...additionalFields,
        ]);
        continue;
      }

      // TODO process images/attachments
      // TODO process {color} macro
      // TODO process \\ hardBreak
      // TODO process text effects and links

      textContainer.push(lineUpdated);
    }

    // If a block of content was the last item, make sure to push it
    if (isBuilding) {
      output.push(builder!.buildPMNode());
    }

    // there can be some text stored after processing
    processAndEmptyStoredText();

    return output;
  }

  /**
   * Parse a line and split it into table cell args
   * @param {string} line
   * @returns {AddCellArgs[]}
   */
  private getTableCells(line: string): AddCellArgs[] {
    let match;
    const cells: AddCellArgs[] = [];
    while ((match = TABLE_CELL_REGEXP.exec(line)) !== null) {
      const [, /* discard */ style, content] = match;
      const contentNode = this.getTextWithMarks(content);
      cells.push({ style, content: contentNode });
    }
    return cells;
  }
}
