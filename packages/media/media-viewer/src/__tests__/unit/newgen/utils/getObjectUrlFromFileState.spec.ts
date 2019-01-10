import { getObjectUrlFromFileState } from '../../../../newgen/utils/getObjectUrlFromFileState';
import { FileState } from '@atlaskit/media-core';

describe('getObjectUrlFromFileState()', () => {
  it('should return an objectUrl if there is available preview in the state', () => {
    const fileState: FileState = {
      status: 'processing',
      name: '',
      id: '',
      mediaType: 'image',
      mimeType: '',
      size: 1,
      preview: {
        blob: new Blob(),
      },
    };

    expect(getObjectUrlFromFileState(fileState)).toEqual(
      'mock result of URL.createObjectURL()',
    );
  });

  it('should return undefined if preview is not available', () => {
    const errorState: FileState = {
      status: 'error',
      id: '',
    };
    const processedState: FileState = {
      status: 'processed',
      id: '',
      artifacts: {},
      mediaType: 'image',
      mimeType: '',
      name: '',
      size: 1,
    };

    expect(getObjectUrlFromFileState(errorState)).toBeUndefined();
    expect(getObjectUrlFromFileState(processedState)).toBeUndefined();
  });
});
