import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ImageWrapper } from '../../image-placer/styled';

// mock @atlaskit/media-ui::isImageRemote() ...
const isImageRemote = jest.fn();
jest.mock('@atlaskit/media-ui', () => ({
  isImageRemote,
}));

// ...before importing Image
import { Image, ImageProps } from '../../image-placer/image';

interface SetupInfo {
  wrapper: ShallowWrapper;
  instance: Image;
  onLoad: () => void;
  onError: () => void;
}

const setup = (props: Partial<ImageProps> = {}): SetupInfo => {
  const onLoad = jest.fn();
  const onError = jest.fn();

  let wrapper = shallow(<div />);
  try {
    wrapper = shallow(
      <Image
        x={1}
        y={2}
        width={3}
        height={4}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />,
    );
  } catch (e) {}

  const instance = wrapper.instance() as Image;
  return { wrapper, instance, onLoad, onError };
};

describe('Image Placer Image', () => {
  describe('Loading', () => {
    it('should call onError prop if bad url', async () => {
      isImageRemote.mockImplementation(() => {
        throw new Error();
      });
      const { onError } = setup({ src: 'some-very-bad-src' });

      expect(onError).toBeCalledWith('Bad Url');
    });

    describe('Image Events', () => {
      const target = {
        naturalWidth: 1,
        naturalHeight: 2,
      };

      beforeAll(() => {
        isImageRemote.mockImplementation(() => true);
      });

      it('should pass image load event to props', () => {
        const { wrapper, onLoad } = setup({ src: 'some-src' });

        wrapper.find(ImageWrapper).simulate('load', {
          target,
        });
        expect(onLoad).toHaveBeenCalledWith(target, 1, 2);
      });

      it('should pass image error event to props', () => {
        const { wrapper, onError } = setup({ src: 'some-src' });

        wrapper.find(ImageWrapper).simulate('error');
        expect(onError).toHaveBeenCalled();
      });
    });
  });

  describe('Rendering', () => {
    it('should not render image if no src', () => {
      const { wrapper } = setup();
      expect(wrapper.find(ImageWrapper)).toHaveLength(0);
    });

    it('should render image with given coordinates', () => {
      const { wrapper } = setup({ src: 'some-src' });
      const img = wrapper.find(ImageWrapper).get(0);
      const { x, y, width, height } = img.props;

      expect(x).toEqual(1);
      expect(y).toEqual(2);
      expect(width).toEqual(3);
      expect(height).toEqual(4);
    });
  });
});
