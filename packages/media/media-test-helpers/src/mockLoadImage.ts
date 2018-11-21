/* mock media-ui::loadImage */
import * as mediaUI from '@atlaskit/media-ui';
import { mockModule } from './mockModule';
const mockedMediaUI = mockModule('@atlaskit/media-ui', mediaUI);
// import { Vector2, FileInfo } from '@atlaskit/media-ui';

export const mockLoadImage = (
  naturalWidth: number,
  naturalHeight: number,
  orientation: number = 1,
) => {
  jest.spyOn(mockedMediaUI, 'getOrientation').mockResolvedValue(orientation);
  jest
    .spyOn(mockedMediaUI, 'loadImage')
    .mockResolvedValue({ naturalWidth, naturalHeight });
};

export const mockLoadImageError = (
  errorMessage: string = 'some-image-failed-to-load-reason',
) => {
  jest.spyOn(mockedMediaUI, 'getOrientation').mockResolvedValue(1);
  jest.spyOn(mockedMediaUI, 'loadImage').mockImplementation(() => {
    throw new Error(errorMessage);
  });
};

export const unMockLoadImage = () => {
  mockedMediaUI.getOrientation.mockClear();
  mockedMediaUI.loadImage.mockClear();
};
