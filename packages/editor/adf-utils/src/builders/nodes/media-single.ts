import {
  MediaSingleDefinition,
  MediaDefinition,
  MediaSingleAttributes,
} from '@findable/adf-schema';

export const mediaSingle = (attrs: MediaSingleAttributes | undefined) => (
  content: MediaDefinition,
): MediaSingleDefinition => ({
  type: 'mediaSingle',
  attrs,
  content: [content],
});
