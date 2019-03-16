import { MediaDefinition, MediaAttributes } from '@findable/adf-schema';

export const media = (attrs: MediaAttributes): MediaDefinition => ({
  type: 'media',
  attrs,
});
