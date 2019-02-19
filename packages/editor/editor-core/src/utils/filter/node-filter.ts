import { traverse } from '@atlaskit/adf-utils';
import { JSONDocNode } from '@atlaskit/editor-json-transformer';

export function sanitizeNode(json: JSONDocNode): JSONDocNode {
  const sanitizedJSON = traverse(json as any, {
    text: node => {
      if (!node || !Array.isArray(node.marks)) {
        return node;
      }

      return {
        ...node,
        marks: node.marks.filter(
          mark => ['emojiQuery', 'typeAheadQuery'].indexOf(mark.type) === -1,
        ),
      };
    },
    status: node => {
      if (node.attrs && !!node.attrs.text) {
        return node;
      }
      return false; // empty status
    },
  }) as JSONDocNode;

  return sanitizedJSON;
}
