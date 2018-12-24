import { FileState } from '@atlaskit/media-core';

// TODO: add test
export const getObjectUrlFromFileState = (
  state: FileState,
): string | undefined => {
  if (state.status !== 'error') {
    const { preview } = state;
    if (preview) {
      return URL.createObjectURL(preview.blob);
    }
  }
  return undefined;
};
