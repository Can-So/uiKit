import * as React from 'react';
import { mount } from 'enzyme';
import { MediaImage } from '../../mediaImage';
import { ImageComponent } from '../../mediaImage/styled';

interface SetupParams {
  isCoverStrategy: boolean;
  isImageMoreLandscapyThanContainer: boolean;
  isStretchingProhibited: boolean;
  loadImageImmediately?: boolean;
  previewOrientation?: number;
}

describe('MediaImage', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  const dimensionsMap = {
    isImageMoreLandscapyThanContainer: [[2000, 1000], [500, 500]],
    isImageMorePortraityThanContainer: [[100, 200], [500, 500]],
  };
  const defaultTransform = {
    transform: 'translate(-50%, -50%)',
  };

  const setup = (params: SetupParams) => {
    const {
      isCoverStrategy,
      isImageMoreLandscapyThanContainer,
      isStretchingProhibited,
      loadImageImmediately = true,
      previewOrientation,
    } = params;
    const [imageDimentions, containerDimentions] = dimensionsMap[
      isImageMoreLandscapyThanContainer
        ? 'isImageMoreLandscapyThanContainer'
        : 'isImageMorePortraityThanContainer'
    ];

    Element.prototype.getBoundingClientRect = () =>
      ({
        width: containerDimentions[0],
        height: containerDimentions[1],
      } as any);
    const component = mount(
      <MediaImage
        dataURI="data:image/png;base64,"
        stretch={!isStretchingProhibited}
        crop={isCoverStrategy}
        previewOrientation={previewOrientation}
      />,
    );
    const img = component.find('img');
    const imgInstance = img.instance();
    Object.defineProperty(imgInstance, 'naturalHeight', {
      value: imageDimentions[1],
    });
    Object.defineProperty(imgInstance, 'naturalWidth', {
      value: imageDimentions[0],
    });
    if (loadImageImmediately) {
      img.simulate('load');
    }
    return component.find(ImageComponent);
  };

  afterAll(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  describe("when image hasn't been loaded yet", () => {
    it('should not show image yet with cover strategy', () => {
      const component = setup({
        isCoverStrategy: true,
        isImageMoreLandscapyThanContainer: true,
        isStretchingProhibited: true,
        loadImageImmediately: false,
      });
      expect(component.props().style).toEqual(
        expect.objectContaining({
          display: 'none',
        }),
      );
    });
    it('should show image right away with fit strategy', () => {
      const component = setup({
        isCoverStrategy: false,
        isImageMoreLandscapyThanContainer: true,
        isStretchingProhibited: true,
        loadImageImmediately: false,
      });
      expect(component.props().style).not.toEqual(
        expect.objectContaining({
          display: 'none',
        }),
      );
    });
  });

  describe('when image is more landscapy than container', () => {
    describe('when image is smaller than container', () => {
      it('should have right style for cover strategy', () => {
        const component = setup({
          isCoverStrategy: true,
          isImageMoreLandscapyThanContainer: true,
          isStretchingProhibited: true,
        });
        expect(component.props().style).toEqual({
          maxHeight: '100%',
          ...defaultTransform,
        });
      });
      it('should have right style for fit strategy', () => {
        const component = setup({
          isCoverStrategy: false,
          isImageMoreLandscapyThanContainer: true,
          isStretchingProhibited: true,
        });
        expect(component.props().style).toEqual({
          maxWidth: '100%',
          maxHeight: '100%',
          ...defaultTransform,
        });
      });
    });
    describe('when image is bigger than container', () => {
      it('should have right style for cover strategy', () => {
        const component = setup({
          isCoverStrategy: true,
          isImageMoreLandscapyThanContainer: true,
          isStretchingProhibited: false,
        });
        expect(component.props().style).toEqual({
          height: '100%',
          ...defaultTransform,
        });
      });
      it('should have right style for fit strategy', () => {
        const component = setup({
          isCoverStrategy: false,
          isImageMoreLandscapyThanContainer: true,
          isStretchingProhibited: false,
        });
        expect(component.props().style).toEqual({
          width: '100%',
          ...defaultTransform,
        });
      });
    });
  });
  describe('when image is more portraity than container', () => {
    describe('when image is smaller than container', () => {
      it('should have right style for cover strategy', () => {
        const component = setup({
          isCoverStrategy: true,
          isImageMoreLandscapyThanContainer: false,
          isStretchingProhibited: true,
        });
        expect(component.props().style).toEqual({
          maxWidth: '100%',
          ...defaultTransform,
        });
      });
      it('should have right style for fit strategy', () => {
        const component = setup({
          isCoverStrategy: false,
          isImageMoreLandscapyThanContainer: false,
          isStretchingProhibited: true,
        });
        expect(component.props().style).toEqual({
          maxWidth: '100%',
          maxHeight: '100%',
          ...defaultTransform,
        });
      });
    });
    describe('when image is bigger than container', () => {
      it('should have right style for cover strategy', () => {
        const component = setup({
          isCoverStrategy: true,
          isImageMoreLandscapyThanContainer: false,
          isStretchingProhibited: false,
        });
        expect(component.props().style).toEqual({
          width: '100%',
          ...defaultTransform,
        });
      });
      it('should have right style for fit strategy', () => {
        const component = setup({
          isCoverStrategy: false,
          isImageMoreLandscapyThanContainer: false,
          isStretchingProhibited: false,
        });
        expect(component.props().style).toEqual({
          height: '100%',
          ...defaultTransform,
        });
      });
    });
    describe('image orientation', () => {
      it('should do nothing if orientation is 1', () => {
        const component = setup({
          isCoverStrategy: false,
          isImageMoreLandscapyThanContainer: false,
          isStretchingProhibited: false,
          loadImageImmediately: true,
          previewOrientation: 1,
        });

        expect(component.prop('style')!.transform).toEqual(
          defaultTransform.transform,
        );
      });
      it('should rotate the image when orientation is bigger than 1', () => {
        const component = setup({
          isCoverStrategy: false,
          isImageMoreLandscapyThanContainer: false,
          isStretchingProhibited: false,
          loadImageImmediately: true,
          previewOrientation: 6,
        });

        expect(component.prop('style')!.transform).toEqual(
          'translate(-50%, -50%) rotate(90deg)',
        );
      });
    });
  });
});
