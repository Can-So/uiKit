import { Entity } from '../types';

export type visitor = (
  node: Entity,
  parent: EntityParent,
  index: number,
) => Entity | false | undefined | void;

export type EntityParent = { node?: Entity; parent?: EntityParent };

export function validateVisitors(_visitors: { [type: string]: visitor }) {
  return true;
}

export function traverse(adf: Entity, visitors: { [type: string]: visitor }) {
  if (!validateVisitors(visitors)) {
    throw new Error(
      `Visitors are not valid: "${Object.keys(visitors).join(', ')}"`,
    );
  }

  return traverseNode(adf, { node: undefined }, visitors, 0);
}

function traverseNode(
  adfNode: Entity,
  parent: EntityParent,
  visitors: { [type: string]: visitor },
  index: number,
): Entity | false {
  const visitor = visitors[adfNode.type] || visitors['any'];

  let newNode = { ...adfNode };
  if (visitor) {
    const processedNode = visitor({ ...newNode }, parent, index);

    if (processedNode === false) {
      return false;
    }

    newNode = processedNode || adfNode;
  }

  if (newNode.content) {
    newNode.content = newNode.content.reduce<Array<Entity>>(
      (acc, node, idx) => {
        const processedNode = traverseNode(
          node,
          { node: newNode, parent },
          visitors,
          idx,
        );
        if (processedNode !== false) {
          acc.push(processedNode);
        }
        return acc;
      },
      [],
    );
  }

  return newNode;
}
