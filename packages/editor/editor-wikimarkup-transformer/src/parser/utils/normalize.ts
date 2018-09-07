import { Node as PMNode, Schema } from 'prosemirror-model';
import {
  createParagraphNodeFromInlineNodes,
  createEmptyParagraphNode,
} from '../nodes/paragraph';
import {
  parseNewlineOnly,
  parseWhitespaceAndNewLine,
} from '../tokenize/whitespace';

export function normalizePMNodes(nodes: PMNode[], schema: Schema): PMNode[] {
  const output: PMNode[] = [];
  let inlineNodeBuffer: PMNode[] = [];
  for (const node of nodes) {
    if (!node.isBlock) {
      inlineNodeBuffer.push(node);
      continue;
    }
    const trimedInlineNodes = trimInlineNodes(inlineNodeBuffer);
    if (trimedInlineNodes.length > 0) {
      output.push(
        ...createParagraphNodeFromInlineNodes(trimedInlineNodes, schema),
      );
    }
    inlineNodeBuffer = []; // clear buffer
    output.push(node);
  }
  const trimedInlineNodes = trimInlineNodes(inlineNodeBuffer);
  if (trimedInlineNodes.length > 0) {
    output.push(
      ...createParagraphNodeFromInlineNodes(trimedInlineNodes, schema),
    );
  }
  if (output.length === 0) {
    return [createEmptyParagraphNode(schema)];
  }
  return output;
}

/**
 * Remove leading and trailing hardBreak
 */
function trimInlineNodes(nodes: PMNode[]) {
  let leadingNode = nodes.shift();
  while (leadingNode) {
    if (leadingNode.type.name !== 'hardBreak') {
      nodes.unshift(leadingNode);
      break;
    }
    leadingNode = nodes.shift();
  }

  let trailingNode = nodes.pop();
  while (trailingNode) {
    if (trailingNode.type.name !== 'hardBreak') {
      nodes.push(trailingNode);
      break;
    }
    trailingNode = nodes.pop();
  }

  return nodes;
}

export function isNextLineEmpty(input: string) {
  let index = 0;
  while (index < input.length) {
    const length = parseWhitespaceAndNewLine(input);

    if (length === 0) {
      return false;
    }
    if (parseNewlineOnly(input)) {
      return true;
    }

    index += length;
  }
  return true;
}
