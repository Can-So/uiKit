declare var global: any; // we need define an interface for the Node global object when overwriting global objects, in this case Image
jest.mock('../../../popup/src/tools/fileToBase64');

import { fileToBase64 } from '../../../popup/src/tools/fileToBase64';
import getPreview from '../getPreview';

describe('getPreview helper method', () => {
  const img = {
    width: 5,
    height: 5,
    onload: jest.fn(),
    onerror: jest.fn(),
    src: '',
  };
  const someImgSource = 'some-img';
  let fileToBase64Promise = Promise.resolve(someImgSource);
  (fileToBase64 as jest.Mock<void>).mockReturnValue(fileToBase64Promise);
  const file = new File([''], 'file.png');

  beforeEach(() => {
    const imageConstructorMock = jest.fn();

    imageConstructorMock.mockImplementation(() => img);
    global.Image = imageConstructorMock;
  });

  afterAll(() => {
    delete global.Image;
    jest.resetAllMocks();
  });

  describe('mediaType === "image"', () => {
    it('should return the img dimensions', () => {
      const promise = getPreview(file, 'image');
      fileToBase64Promise.then(() => img.onload());

      return expect(promise).resolves.toMatchObject(
        expect.objectContaining({ dimensions: { width: 5, height: 5 } }),
      );
    });

    it('should return error if image failed to load', () => {
      const promise = getPreview(file, 'image');
      fileToBase64Promise.then(() => img.onerror(new Error('some error')));

      return expect(promise).rejects.toBeInstanceOf(Error);
    });

    it('should return dimensions in addition to src', () => {
      const promise = getPreview(file, 'image');
      fileToBase64Promise.then(() => img.onload());

      return expect(promise).resolves.toMatchObject({
        src: someImgSource,
        dimensions: {
          width: 5,
          height: 5,
        },
      });
    });
  });

  describe('mediaType !== "image"', () => {
    it('should not return preview for non images', () => {
      const promise = getPreview(file, 'unknown');
      fileToBase64Promise.then(() => img.onload());

      return expect(promise).resolves.toMatchObject({ src: someImgSource });
    });
  });
});
