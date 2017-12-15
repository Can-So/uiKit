import * as React from 'react';
import { mount } from 'enzyme';
import { ImageCropper, ImageCropperProp } from '../src/image-cropper';
import { Container, DragOverlay } from '../src/image-cropper/styled';
import { smallImage } from '@atlaskit/media-test-helpers';

const imageWidth = 600;
const imageHeight = 400;
const imageSource = smallImage;
const top = 10;
const left = 20;
const containerSize = 400;
const scale = 0.8;

describe('Image cropper', () => {
  let component;
  let img;
  let container;
  let dragOverlay;
  let onDragStartedSpy;
  let onImageSizeSpy;

  const createComponent = (props = {}) => {
    onDragStartedSpy = jest.fn();
    onImageSizeSpy = jest.fn();
    const allProps: ImageCropperProp = {
      imageSource,
      scale,
      containerSize,
      top,
      left,
      onDragStarted: onDragStartedSpy,
      onImageSize: onImageSizeSpy,
      ...props,
    };
    component = mount(<ImageCropper {...allProps} />);
    img = component.find('img');
    container = component.find(Container);
    dragOverlay = component.find(DragOverlay);
  };

  describe('with image width', () => {
    beforeEach(() => {
      createComponent({ imageWidth });
    });

    describe('image tag', () => {
      it('should have defined source', () => {
        expect(img.props().src).toBe(imageSource);
      });

      it('should have defined position', () => {
        expect(img.props().style.top).toBe(`${top}px`);
        expect(img.props().style.left).toBe(`${left}px`);
      });

      it('should have scaled width', () => {
        expect(img.props().style.width).toBe(`${imageWidth * scale}px`);
      });
    });

    describe('container', () => {
      it('should have defined size', () => {
        expect(container.props().style.height).toBe(`${containerSize}px`);
        expect(container.props().style.width).toBe(`${containerSize}px`);
      });
    });

    it('should call onDragging callback', () => {
      dragOverlay.simulate('mousedown');
      expect(onDragStartedSpy).toHaveBeenCalledTimes(1);
      expect(onDragStartedSpy.mock.calls[0]).toHaveLength(0);
    });
  });

  describe('without image width', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should call onImageSize when image is loaded', () => {
      img.simulate('load', {
        target: { naturalWidth: imageWidth, naturalHeight: imageHeight },
      });
      expect(onImageSizeSpy).toHaveBeenCalledTimes(1);
      expect(onImageSizeSpy).toHaveBeenCalledWith(imageWidth, imageHeight);
    });
  });
});
