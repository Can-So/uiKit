import { Entity } from '../types';
import { traverse } from './traverse';

export function reduce<T = any>(
  adf: Entity,
  callback: (accunulator: T, node: Entity) => T,
  initial: T,
): T {
  let result = initial;

  traverse(adf, {
    any: node => {
      result = callback(result, node);
    },
  });

  return result;
}
