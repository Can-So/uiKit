import { MediaGroupDefinition, MediaDefinition } from '@findable/adf-schema';

export const mediaGroup = (
  ...content: Array<MediaDefinition>
): MediaGroupDefinition => ({
  type: 'mediaGroup',
  content,
});
