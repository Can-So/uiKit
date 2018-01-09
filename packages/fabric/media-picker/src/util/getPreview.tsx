import { MediaType } from '@atlaskit/media-core';
import { Preview } from '../domain/preview';
import { fileToBase64 } from '../../popup/src/tools/fileToBase64';
import { ImagePreview } from '../index';

export default (file: Blob, mediaType: MediaType): Promise<Preview> =>
  new Promise((resolve, reject) => {
    fileToBase64(file)
      .then(src => {
        if (mediaType === 'image') {
          const img = new Image();
          img.src = src;

          img.onload = () => {
            const { src } = img;
            const dimensions = { width: img.width, height: img.height };

            resolve({ src, dimensions } as ImagePreview);
          };

          img.onerror = reject;
        } else {
          resolve({ src });
        }
      })
      .catch(reject);
  });
