import * as React from 'react';
import {
  Rectangle,
  Vector2,
  Bounds,
  dataURItoFile,
  FileInfo,
  getFileInfo,
  getFileInfoFromSrc,
} from '@atlaskit/media-ui';
import { ImagePlacerContainer } from './container';
import { ImagePlacerImage } from './image';
import { Margin } from './margin';
import { ImagePlacerWrapper, ImagePlacerErrorWrapper } from './styled';
import {
  initialiseImagePreview,
  renderImageAtCurrentView,
} from './imageProcessor';

/*
"container(Width|Height)" is the outputed size of the final image plus "margin"s.
"visibleBounds" is the exact output size of the final image
"imageBounds" is the scaled size of the image

+------------------------+
| container(Width/Height)|<---------- this is the size of the total viewing area (+ margins)
|  (0,0) -------------+  |
|  | visibleBounds <----------------- this is the visible inner area, also the exported size (container minus margin)
|  |  +------------+  |  |
|  |  | \        / |  |  |
|  |  | imageBounds| <--------------- this is the current scaled size of the image (this.imagesourceBounds for original size)
|  |  | /        \ |  |  |
|  |  +------------+  |  |
|  +------------------+  |
+------------------------+
*/

/* pass onSaveImage prop function to receive an object with this API to render/return image */
export interface ImageActions {
  toCanvas: () => HTMLCanvasElement;
  toDataURL: () => string;
  toFile: () => File;
}

export interface ImagePlacerProps {
  containerWidth: number;
  containerHeight: number;
  src?: string | File;
  margin: number;
  zoom: number;
  maxZoom: number;
  originX: number;
  originY: number;
  useConstraints: boolean;
  isCircular: boolean;
  useCircularClipWithActions: boolean;
  backgroundColor: string;
  onImageChange?: (imageElement: HTMLImageElement) => void;
  onZoomChange?: (zoom: number) => void;
  onImageActions?: (actions: ImageActions) => void;
  onRenderError?: (errorMessage: string) => JSX.Element;
}

export interface ImagePlacerState {
  imageWidth: number;
  imageHeight: number;
  originX: number;
  originY: number;
  zoom: number;
  errorMessage?: string;
  dragOrigin?: Vector2;
  src?: string | File;
}

/* immutable prop defaults */
export const DEFAULT_MAX_ZOOM = 2;
export const DEFAULT_MARGIN = 28;
export const DEFAULT_CONTAINER_SIZE = 200;
export const DEFAULT_ZOOM = 0;
export const DEFAULT_ORIGIN_X = 0;
export const DEFAULT_ORIGIN_Y = 0;
export const DEFAULT_USE_CONSTRAINTS = true;
export const DEFAULT_USE_CIRCULAR = false; /* whether or not to apply a circular margin to image while positioning */
export const DEFAULT_USE_CIRCULAR_CLIP_WITH_ACTIONS = false; /* whether or not to apply a circular clip when rendering via actions */
export const DEFAULT_BACKGROUND_COLOR = 'transparent';

export const defaultProps = {
  containerWidth: DEFAULT_CONTAINER_SIZE,
  containerHeight: DEFAULT_CONTAINER_SIZE,
  margin: DEFAULT_MARGIN,
  maxZoom: DEFAULT_MAX_ZOOM,
  zoom: DEFAULT_ZOOM,
  originX: DEFAULT_ORIGIN_X,
  originY: DEFAULT_ORIGIN_Y,
  useConstraints: DEFAULT_USE_CONSTRAINTS,
  isCircular: DEFAULT_USE_CIRCULAR,
  useCircularClipWithActions: DEFAULT_USE_CIRCULAR_CLIP_WITH_ACTIONS,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
};

export class ImagePlacer extends React.Component<
  ImagePlacerProps,
  ImagePlacerState
> {
  imagesourceBounds = new Rectangle(
    0,
    0,
  ); /* original size of image (un-scaled) */
  imageElement?: HTMLImageElement; /* image element used to load */

  static defaultProps = defaultProps;

  state: ImagePlacerState = {
    imageWidth: 0,
    imageHeight: 0,
    zoom: this.props.zoom,
    originX: this.props.originX,
    originY: this.props.originY,
    src: this.props.src,
  };

  /* the local rect of the container with margins */
  get containerRectWithMargins(): Rectangle {
    const { containerWidth, containerHeight, margin } = this.props;
    return new Rectangle(
      containerWidth + margin * 2,
      containerHeight + margin * 2,
    );
  }

  /* the local rect of the container without margins */
  get containerRect(): Rectangle {
    const { containerWidth, containerHeight } = this.props;
    return new Rectangle(containerWidth, containerHeight);
  }

  /* the bounds of the scaled/panned image, relative to container */
  get imageBounds(): Bounds {
    const { zoom } = this.state;
    return this.calcImageBounds(zoom);
  }

  private calcImageBounds(zoom: number): Bounds {
    const { margin, maxZoom } = this.props;
    const { originX, originY, imageWidth, imageHeight } = this.state;
    const x = margin + originX;
    const y = margin + originY;
    const maxWidthDiff = imageWidth * maxZoom - imageWidth;
    const maxHeightDiff = imageHeight * maxZoom - imageHeight;
    const width = imageWidth + maxWidthDiff * zoom;
    const height = imageHeight + maxHeightDiff * zoom;
    return new Bounds(x, y, width, height);
  }

  /* the bounds of the visible area (container - margins), relative to container */
  get visibleBounds(): Bounds {
    const { containerWidth, containerHeight, margin } = this.props;
    return new Bounds(margin, margin, containerWidth, containerHeight);
  }

  /* a coordinate mapping from visibleBounds to local rect of image */
  get sourceBounds(): Bounds {
    const { containerWidth, containerHeight } = this.props;
    const { x: originX, y: originY } = this.transformVisibleBoundsToImageCoords(
      0,
      0,
    );
    const { x: cornerX, y: cornerY } = this.transformVisibleBoundsToImageCoords(
      containerWidth,
      containerHeight,
    );
    return new Bounds(originX, originY, cornerX - originX, cornerY - originY);
  }

  componentWillMount() {
    const { onImageActions } = this.props;
    if (onImageActions) {
      /* provide actions which will return current image at current view */
      onImageActions({
        toCanvas: this.toCanvas,
        toDataURL: this.toDataURL,
        toFile: this.toFile,
      });
    }
  }

  /* respond to prop changes */
  async UNSAFE_componentWillReceiveProps(nextProps: ImagePlacerProps) {
    const { imagesourceBounds, state, props } = this;
    const { zoom } = state;
    const {
      useConstraints: currentUseConstraints,
      containerWidth: currentContainerWidth,
      containerHeight: currentContainerHeight,
      margin: currentMargin,
      src: currentSrc,
    } = props;
    const {
      zoom: nextZoom,
      useConstraints: nextUseConstraints,
      containerWidth: nextContainerWidth,
      containerHeight: nextContainerHeight,
      margin: nextMargin,
      src: nextSrc,
    } = nextProps;

    const isZoomChange = nextZoom !== undefined && nextZoom !== zoom;
    const isUseConstraintsChange =
      nextUseConstraints !== undefined &&
      nextUseConstraints !== currentUseConstraints;
    const isContainerWidthChange =
      nextContainerWidth !== undefined &&
      nextContainerWidth !== currentContainerWidth;
    const isContainerHeightChange =
      nextContainerHeight !== undefined &&
      nextContainerHeight !== currentContainerHeight;
    const isMarginChange =
      nextMargin !== undefined && nextMargin !== currentMargin;
    const isSrcChanged = typeof nextSrc === 'string' && nextSrc !== currentSrc;
    const isFileChanged = nextSrc instanceof File && nextSrc !== currentSrc;

    const zoomReset = { zoom: 0 };

    if (isZoomChange) {
      this.setZoom(nextZoom);
    }

    if (isUseConstraintsChange) {
      this.setState(
        {
          zoom: 0,
          imageWidth: imagesourceBounds.width,
          imageHeight: imagesourceBounds.height,
        },
        this.update,
      );
    }

    if (isContainerWidthChange || isContainerHeightChange || isMarginChange) {
      this.setState(zoomReset, this.update);
      this.updateZoomProp();
    }

    let fileInfo;

    if (isFileChanged) {
      fileInfo = await getFileInfo(nextSrc as File);
    }

    if (isSrcChanged) {
      fileInfo = await getFileInfoFromSrc(nextSrc as string);
    }

    if (fileInfo) {
      await this.preprocessFile(fileInfo);
    }
  }

  async preprocessFile(fileInfo: FileInfo) {
    const { maxZoom } = this.props;
    const previewInfo = await initialiseImagePreview(
      fileInfo,
      this.containerRect,
      maxZoom,
    );
    if (previewInfo) {
      const { width, height } = previewInfo;
      this.imagesourceBounds = new Rectangle(width, height);
      this.setSrc(previewInfo.fileInfo);
    } else {
      this.setState({ errorMessage: 'Cannot load image' });
    }
  }

  setSrc(fileInfo: FileInfo) {
    this.setState({
      errorMessage: undefined,
      src: fileInfo.src,
      zoom: 0,
      originX: 0,
      originY: 0,
    });
    this.updateZoomProp();
  }

  /* tell consumer that zoom has changed */
  private updateZoomProp(value: number = 0) {
    const { onZoomChange } = this.props;
    if (onZoomChange) {
      onZoomChange(value);
    }
  }

  /* reset view  */
  reset() {
    const {
      imagesourceBounds: { width: imageWidth, height: imageHeight },
    } = this;
    this.setState({
      imageWidth,
      imageHeight,
      zoom: 0,
      originX: 0,
      originY: 0,
    });
  }

  /* apply zoom if required */
  update() {
    const { useConstraints } = this.props;
    const { imageWidth, imageHeight } = this.state;
    if (!useConstraints || imageWidth === 0 || imageHeight === 0) {
      /* don't apply unless using constraints or image size is non-zero */
      return;
    }
    this.zoomToFit();
  }

  /* zoom image up or down to fit visibleBounds */
  zoomToFit() {
    const { imageWidth, imageHeight } = this.state;
    const itemRect = new Rectangle(imageWidth, imageHeight);
    const { visibleBounds } = this;
    const scaleFactor = itemRect.scaleToFitSmallestSide(visibleBounds);
    const {
      width: newItemRectWidth,
      height: newItemRectHeight,
    } = itemRect.scaled(scaleFactor);
    this.setState(
      {
        imageWidth: newItemRectWidth,
        imageHeight: newItemRectHeight,
        originX: 0,
        originY: 0,
        zoom: 0,
      },
      this.applyConstraints,
    );
    this.updateZoomProp();
  }

  /* assuming zoom level is correct, move origin to ensure imageBounds edges stay within visibleBounds */
  applyConstraints() {
    const { useConstraints } = this.props;
    const { originX: currentOriginX, originY: currentOriginY } = this.state;

    let originX = currentOriginX;
    let originY = currentOriginY;
    let delta = new Vector2(0, 0);

    if (useConstraints) {
      delta = this.applyFullConstraints();
    } else {
      delta = this.applyPartialConstraints();
    }

    this.setState({
      originX: originX + delta.x,
      originY: originY + delta.y,
    });
  }

  /* stop imageBounds edges from going inside visibleBounds - this is when useConstraints is true */
  private applyFullConstraints(): Vector2 {
    const { visibleBounds, imageBounds } = this;
    const deltaLeft = visibleBounds.left - imageBounds.left;
    const deltaTop = visibleBounds.top - imageBounds.top;
    const deltaBottom = visibleBounds.bottom - imageBounds.bottom;
    const deltaRight = visibleBounds.right - imageBounds.right;

    let deltaX = 0;
    let deltaY = 0;

    if (
      imageBounds.right > visibleBounds.right &&
      imageBounds.left > visibleBounds.left
    ) {
      deltaX += deltaLeft;
    }
    if (
      imageBounds.bottom > visibleBounds.bottom &&
      imageBounds.top > visibleBounds.top
    ) {
      deltaY += deltaTop;
    }
    if (
      imageBounds.top < visibleBounds.top &&
      imageBounds.bottom < visibleBounds.bottom
    ) {
      deltaY += deltaBottom;
    }
    if (
      imageBounds.left < visibleBounds.left &&
      imageBounds.right < visibleBounds.right
    ) {
      deltaX += deltaRight;
    }

    return new Vector2(deltaX, deltaY);
  }

  /* stop imageBounds edges from going outside visibleBounds - this is when useConstraints is false */
  private applyPartialConstraints(): Vector2 {
    const { visibleBounds, imageBounds } = this;
    const deltaTop = visibleBounds.top - imageBounds.bottom;
    const deltaBottom = visibleBounds.bottom - imageBounds.top;
    const deltaLeft = visibleBounds.left - imageBounds.right;
    const deltaRight = visibleBounds.right - imageBounds.left;

    let deltaX = 0;
    let deltaY = 0;

    if (imageBounds.right < visibleBounds.left) {
      deltaX += deltaLeft;
    }
    if (imageBounds.bottom < visibleBounds.top) {
      deltaY += deltaTop;
    }
    if (imageBounds.top > visibleBounds.bottom) {
      deltaY += deltaBottom;
    }
    if (imageBounds.left > visibleBounds.right) {
      deltaX += deltaRight;
    }

    return new Vector2(deltaX, deltaY);
  }

  /* set zoom but apply constraints */
  setZoom(newZoom: number) {
    const { originX, originY, zoom } = this.state;
    const lastItemBounds = this.calcImageBounds(zoom);
    const imageBounds = this.calcImageBounds(newZoom);
    const { x: deltaX, y: deltaY } = lastItemBounds.center.sub(
      imageBounds.center,
    );
    const origin = new Vector2(originX + deltaX, originY + deltaY);
    this.setState(
      {
        zoom: newZoom,
        originX: origin.x,
        originY: origin.y,
      },
      this.applyConstraints,
    );
  }

  /* transformation between visibleBounds local coords to image source rect (factoring in zoom and pan) */
  transformVisibleBoundsToImageCoords(
    visibleBoundsX: number,
    visibleBoundsY: number,
  ): Vector2 {
    const { imagesourceBounds, visibleBounds, imageBounds } = this;
    const offset = visibleBounds.origin.sub(imageBounds.origin);
    const rect = imageBounds.rect;
    const x = (offset.x + visibleBoundsX) / rect.width;
    const y = (offset.y + visibleBoundsY) / rect.height;
    return new Vector2(
      imagesourceBounds.width * x,
      imagesourceBounds.height * y,
    ).rounded();
  }

  /* convert the current visible region (zoomed / panned) to a correctly sized canvas with that view drawn */
  toCanvas = (): HTMLCanvasElement => {
    const {
      imageElement,
      sourceBounds,
      visibleBounds,
      imageBounds,
      containerRect,
      props,
    } = this;
    const {
      useConstraints,
      useCircularClipWithActions,
      backgroundColor,
    } = props;
    const viewInfo = {
      containerRect,
      imageBounds,
      sourceBounds,
      visibleBounds,
    };
    return renderImageAtCurrentView(
      imageElement,
      viewInfo,
      useConstraints,
      useCircularClipWithActions,
      backgroundColor,
    );
  };

  /* convert current visible view to dataURL for image */
  toDataURL = (): string => {
    return this.toCanvas().toDataURL();
  };

  /* convert current visible view to File */
  toFile = (): File => {
    return dataURItoFile(this.toDataURL());
  };

  /* image has loaded */
  onImageLoad = (
    imageElement: HTMLImageElement,
    width: number,
    height: number,
  ) => {
    const { onImageChange } = this.props;
    this.imagesourceBounds = new Rectangle(width, height);
    this.imageElement = imageElement;
    this.setState({ imageWidth: width, imageHeight: height }, this.update);
    if (onImageChange) {
      onImageChange(imageElement);
    }
  };

  /* image had an error */
  onImageError = (errorMessage: string) => {
    this.setState({ errorMessage });
  };

  /* drag within container has started */
  onDragStart = () => {
    const { originX, originY } = this.state;
    this.setState({
      dragOrigin: new Vector2(originX, originY),
    });
  };

  /* drag within container has started */
  onDragMove = (delta: Vector2) => {
    const { dragOrigin } = this.state;
    if (dragOrigin) {
      const newOriginX = dragOrigin.x + delta.x;
      const newOriginY = dragOrigin.y + delta.y;
      this.setState(
        {
          originX: newOriginX,
          originY: newOriginY,
        },
        this.applyConstraints,
      );
    }
  };

  /* wheel event was passed from container */
  onWheel = (delta: number) => {
    const { zoom } = this.state;
    const clampedZoom = Math.min(Math.max(0, zoom + delta / 100), 1);
    this.setZoom(clampedZoom);
    this.updateZoomProp(clampedZoom);
  };

  /* make it so */
  render() {
    const {
      backgroundColor,
      containerWidth,
      containerHeight,
      margin,
      isCircular,
      onRenderError,
    } = this.props;
    const { errorMessage, src } = this.state;
    const { imageBounds } = this;
    const imgSrc = typeof src === 'string' ? src : undefined;

    return (
      <ImagePlacerWrapper backgroundColor={backgroundColor}>
        <ImagePlacerContainer
          width={containerWidth}
          height={containerHeight}
          margin={margin}
          onDragStart={this.onDragStart}
          onDragMove={this.onDragMove}
          onWheel={this.onWheel}
        >
          {errorMessage ? (
            <ImagePlacerErrorWrapper>
              {onRenderError ? onRenderError(errorMessage) : errorMessage}
            </ImagePlacerErrorWrapper>
          ) : (
            <div>
              <ImagePlacerImage
                src={imgSrc}
                x={imageBounds.x}
                y={imageBounds.y}
                width={imageBounds.width}
                height={imageBounds.height}
                onLoad={this.onImageLoad}
                onError={this.onImageError}
              />
              <Margin
                width={containerWidth}
                height={containerHeight}
                circular={isCircular}
                size={margin}
              />
            </div>
          )}
        </ImagePlacerContainer>
      </ImagePlacerWrapper>
    );
  }
}
