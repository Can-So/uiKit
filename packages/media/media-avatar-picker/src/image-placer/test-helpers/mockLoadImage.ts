const media_ui = require.requireActual('@atlaskit/media-ui');

export const mockLoadImage = (
  naturalWidth: number,
  naturalHeight: number,
  orientation: number = 1,
) => {
  jest.spyOn(media_ui, 'getOrientation').mockResolvedValue(orientation);
  jest
    .spyOn(media_ui, 'loadImage')
    .mockResolvedValue({ naturalWidth, naturalHeight });
};

export const mockLoadImageError = (
  errorMessage: string = 'some-image-failed-to-load-reason',
) => {
  jest.spyOn(media_ui, 'getOrientation').mockResolvedValue(1);
  jest.spyOn(media_ui, 'loadImage').mockImplementation(() => {
    throw new Error(errorMessage);
  });
};

export const unMockLoadImage = () => {
  media_ui.getOrientation.mockClear();
  media_ui.loadImage.mockClear();
};
