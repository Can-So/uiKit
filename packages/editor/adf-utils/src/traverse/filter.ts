import { Entity } from '../types';
import { traverse } from './traverse';

export function filter(
  adf: Entity,
  callback: (node: Entity) => boolean,
): Array<Entity> {
  const result: Array<Entity> = [];

  traverse(adf, {
    any: node => {
      if (callback(node)) {
        result.push(node);
      }
    },
  });

  return result;
}
