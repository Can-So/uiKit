import { MediaCollection } from '@findable/media-store';
import { getHackerNoun } from './mockData';

export function createCollection(name?: string): MediaCollection {
  return {
    name: name || getHackerNoun(),
    createdAt: Date.now(),
  };
}
