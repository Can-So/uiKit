import { MediaType } from '@findable/media-core';

export const isLoadingImage = (
  mediaType?: MediaType,
  dataURI?: string,
): boolean => {
  return mediaType === 'image' && !dataURI;
};
