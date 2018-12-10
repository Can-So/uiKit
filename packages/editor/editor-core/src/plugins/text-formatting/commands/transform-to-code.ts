import { Transaction } from 'prosemirror-state';
import { filterChildrenBetween } from '../../../utils';

const SMART_TO_ASCII = {
  '…': '...',
  '→': '->',
  '←': '<-',
  '–': '--',
  '“': '"',
  '”': '"',
  '‘': "'",
  '’': "'",
};

const FIND_SMART_CHAR = new RegExp(
  `[${Object.keys(SMART_TO_ASCII).join('')}]`,
  'g',
);

const replaceMentionOrEmojiForTextContent = (
  position: number,
  nodeSize: number,
  textContent: string,
  tr: Transaction,
): void => {
  const currentPos = tr.mapping.map(position);
  const { schema } = tr.doc.type;

  tr.replaceWith(currentPos, currentPos + nodeSize, schema.text(textContent));
};

const replaceSmartCharsToAscii = (
  position: number,
  textContent: string,
  tr: Transaction,
): void => {
  const textExtracted = textContent.substr(position - 1);
  const { schema } = tr.doc.type;
  let match: RegExpExecArray | null;

  while ((match = FIND_SMART_CHAR.exec(textExtracted))) {
    const { 0: smartChar, index: offset } = match;
    const replacePos = tr.mapping.map(position + offset);
    const replacementText = schema.text(SMART_TO_ASCII[smartChar]);
    tr.replaceWith(replacePos, replacePos + smartChar.length, replacementText);
  }
};

const transformSmartCharsMentionsAndEmojis = (
  from: number,
  to: number,
  tr: Transaction,
): void => {
  const { schema } = tr.doc.type;
  const { mention, text, emoji } = schema.nodes;
  const isNodeTextBlock = (node, _, parent) => {
    if (node.type === mention || node.type === emoji || node.type === text) {
      return parent.isTextblock;
    }
  };

  // Traverse through all the nodes within the range and replace them with their plaintext counterpart
  const children = filterChildrenBetween(tr.doc, from, to, isNodeTextBlock);

  children.forEach(({ node, pos }) => {
    if (node.type === mention || node.type === emoji) {
      replaceMentionOrEmojiForTextContent(
        pos,
        node.nodeSize,
        node.attrs.text,
        tr,
      );
    } else if (node.type === text && node.text) {
      const replacePosition = pos > from ? pos : from;

      replaceSmartCharsToAscii(replacePosition, node.text, tr);
    }
  });
};

const applyCodeBlock = (from: number, to: number, tr: Transaction): void => {
  const { schema } = tr.doc.type;

  if (schema.marks.code) {
    const codeMark = schema.marks.code.create();
    tr.addMark(
      tr.mapping.map(from),
      tr.mapping.map(to),
      codeMark,
    ).setStoredMarks([codeMark]);
  }
};

export function transformToCodeAction(
  from: number,
  to: number,
  tr: Transaction,
): Transaction {
  transformSmartCharsMentionsAndEmojis(from, to, tr);

  applyCodeBlock(from, to, tr);

  return tr;
}
