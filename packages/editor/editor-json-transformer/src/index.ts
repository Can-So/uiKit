import {
  codeBlockToJSON,
  defaultSchema,
  linkToJSON,
  mediaToJSON,
  mediaSingleToJSON,
  mentionToJSON,
  tableToJSON,
  toJSONTableCell,
  toJSONTableHeader,
  Transformer,
} from '@atlaskit/editor-common';
import { Node as PMNode, Mark as PMMark } from 'prosemirror-model';

export type JSONNode = {
  type: string;
  attrs?: object;
  content?: JSONNode[];
  marks?: any[];
  text?: string;
};

export type JSONDocNode = {
  version: number;
  type: 'doc';
  content: JSONNode[];
};

const isType = (type: string) => (node: PMNode | PMMark) =>
  node.type.name === type;

const isCodeBlock = isType('codeBlock');
const isMediaNode = isType('media');
const isMediaSingleNode = isType('mediaSingle');
const isMentionNode = isType('mention');
const isParagraph = isType('paragraph');
const isHeading = isType('heading');
const isTable = isType('table');
const isTableCell = isType('tableCell');
const isTableHeader = isType('tableHeader');
const isLinkMark = isType('link');
const isUnsupportedNode = (node: PMNode) =>
  isType('unsupportedBlock')(node) || isType('unsupportedInline')(node);

const filterNull = subject => {
  return Object.keys(subject).reduce((acc, key) => {
    let current = subject[key];

    if (current === null) {
      return acc;
    }

    if (typeof current === 'object' && !Array.isArray(current)) {
      current = filterNull(current);
    }

    return { ...acc, [key]: current };
  }, {});
};

const toJSON = (node: PMNode): JSONNode => {
  const obj: JSONNode = { type: node.type.name };
  if (isUnsupportedNode(node)) {
    return node.attrs.originalValue;
  } else if (isMediaNode(node)) {
    obj.attrs = mediaToJSON(node).attrs;
  } else if (isMediaSingleNode(node)) {
    obj.attrs = mediaSingleToJSON(node).attrs;
  } else if (isMentionNode(node)) {
    obj.attrs = mentionToJSON(node).attrs;
  } else if (isCodeBlock(node)) {
    obj.attrs = codeBlockToJSON(node).attrs;
  } else if (isTable(node)) {
    obj.attrs = tableToJSON(node).attrs;
  } else if (isTableCell(node)) {
    obj.attrs = toJSONTableCell(node).attrs;
  } else if (isTableHeader(node)) {
    obj.attrs = toJSONTableHeader(node).attrs;
  } else if (Object.keys(node.attrs).length) {
    obj.attrs = node.attrs;
  }

  if (obj.attrs) {
    obj.attrs = filterNull(obj.attrs);
  }

  if (node.isText) {
    obj.text = node.textContent;
  } else {
    node.content.forEach((child: PMNode) => {
      obj.content = obj.content || [];
      obj.content.push(toJSON(child));
    });
  }

  if (isParagraph(node) || isHeading(node)) {
    obj.content = obj.content || [];
  }

  if (node.marks.length) {
    obj.marks = node.marks.map(n => {
      if (isLinkMark(n)) {
        return linkToJSON(n);
      }
      return n.toJSON();
    });
  }
  return obj;
};

export class JSONTransformer implements Transformer<JSONDocNode> {
  encode(node: PMNode): JSONDocNode {
    const content: JSONNode[] = [];

    node.content.forEach(child => {
      content.push(toJSON(child));
    });

    return {
      version: 1,
      type: 'doc',
      content,
    };
  }

  parse(content: JSONDocNode): PMNode {
    if (content.type !== 'doc') {
      throw new Error('Expected content format to be ADF');
    }
    const doc = defaultSchema.nodeFromJSON(content);
    doc.check();
    return doc;
  }
}
