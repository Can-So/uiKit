import { Entity } from '../types';
import { traverse } from './traverse';

export function map<T = any>(
  adf: Entity,
  callback: (node: Entity) => T,
): Array<T> {
  const result: Array<T> = [];

  traverse(adf, {
    any: node => {
      result.push(callback(node));
    },
  });

  return result;
}
