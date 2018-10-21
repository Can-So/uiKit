import * as React from 'react';
import {
  Rectangle,
  Vector2,
  Bounds,
  dataURItoFile,
  loadImage,
  getOrientation,
  FileInfo,
  getFileInfo,
  getFileInfoFromSrc,
} from '@atlaskit/media-ui';
import { Container } from './container';
import { Image } from './image';
import { Margin } from './margin';
import { ImagePlacerWrapper, ImagePlacerErrorWrapper } from './styled';

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
|  |  | imageBounds| <--------------- this is the current scaled size of the image (this.imageSourceRect for original size)
|  |  | /        \ |  |  |
|  |  +------------+  |  |
|  +------------------+  |
+------------------------+
*/

/* pass onSaveImage prop function to receive an object with this API to render/return image */
export interface ImagePlacerAPI {
  toCanvas: () => HTMLCanvasElement;
  toDataURL: () => string;
  toFile: () => File;
}

/* returned when pre-processing loaded images */
export interface ImageInfo {
  fileInfo: FileInfo;
  width: number;
  height: number;
}

/* props for main component */
export interface ImagePlacerProps {
  containerWidth: number;
  containerHeight: number;
  src?: string;
  file?: File;
  margin: number;
  zoom: number;
  maxZoom: number;
  originX: number;
  originY: number;
  useConstraints: boolean;
  circular: boolean;
  useCircularMask: boolean;
  backgroundColor: string;
  onImageChange?: (imageElement: HTMLImageElement) => void;
  onZoomChange?: (zoom: number) => void;
  onSaveImage?: (api: ImagePlacerAPI) => void;
  errorRenderer?: (errorMessage: string) => JSX.Element;
}

/* state for main component */
export interface ImagePlacerState {
  imageWidth: number;
  imageHeight: number;
  originX: number;
  originY: number;
  zoom: number;
  errorMessage?: string;
  dragOrigin?: Vector2;
  src?: string;
}

/* immutable prop defaults */
export const DEFAULT_MAX_ZOOM = 2;
export const DEFAULT_MARGIN = 28;
export const DEFAULT_CONTAINER_SIZE = 200;
export const DEFAULT_ZOOM = 0;
export const DEFAULT_ORIGIN_X = 0;
export const DEFAULT_ORIGIN_Y = 0;
export const DEFAULT_USE_CONSTRAINTS = true;
export const DEFAULT_CIRCULAR = false;
export const DEFAULT_USE_CIRCULAR_MASK = false;
export const DEFAULT_BACKGROUND_COLOR = 'transparent';

/* prop defaults */
export const DefaultProps = {
  containerWidth: DEFAULT_CONTAINER_SIZE,
  containerHeight: DEFAULT_CONTAINER_SIZE,
  margin: DEFAULT_MARGIN,
  maxZoom: DEFAULT_MAX_ZOOM,
  zoom: DEFAULT_ZOOM,
  originX: DEFAULT_ORIGIN_X,
  originY: DEFAULT_ORIGIN_Y,
  useConstraints: DEFAULT_USE_CONSTRAINTS,
  circular: DEFAULT_CIRCULAR,
  useCircularMask: DEFAULT_USE_CIRCULAR_MASK,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
};

export function radians(deg: number) {
  return deg * (Math.PI / 180);
}

/* main component */
export class ImagePlacer extends React.Component<
  ImagePlacerProps,
  ImagePlacerState
> {
  imageSourceRect = new Rectangle(
    0,
    0,
  ); /* original size of image (un-scaled) */
  imageElement?: HTMLImageElement; /* image element used to load */
  currentFile?: File; /* used to detect file change, but not necessary for state */

  static defaultProps = DefaultProps;

  state: ImagePlacerState = {
    imageWidth: 0,
    imageHeight: 0,
    zoom: this.props.zoom,
    originX: this.props.originX,
    originY: this.props.originY,
    src: this.props.src,
  };

  /* the local rect of the container size plus margins */
  get containerRect(): Rectangle {
    const { containerWidth, containerHeight, margin } = this.props;
    return new Rectangle(
      containerWidth + margin * 2,
      containerHeight + margin * 2,
    );
  }

  /* the bounds of the scaled/panned image, relative to container */
  get imageBounds(): Bounds {
    const { margin, maxZoom } = this.props;
    const { originX, originY, imageWidth, imageHeight, zoom } = this.state;
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
  get sourceRect(): Bounds {
    const { containerWidth, containerHeight } = this.props;
    const { x: originX, y: originY } = this.mapCoords(0, 0);
    const { x: cornerX, y: cornerY } = this.mapCoords(
      containerWidth,
      containerHeight,
    );
    return new Bounds(originX, originY, cornerX - originX, cornerY - originY);
  }

  componentWillMount() {
    const { onSaveImage } = this.props;
    /* update consumer with export methods */
    if (onSaveImage) {
      onSaveImage({
        toCanvas: () => this.toCanvas(),
        toDataURL: () => this.toDataURL(),
        toFile: () => this.toFile(),
      });
    }
  }

  /* respond to prop changes */
  async UNSAFE_componentWillReceiveProps(nextProps: ImagePlacerProps) {
    const { imageSourceRect, state, props, currentFile } = this;
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
      file: nextFile,
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

    const zoomReset = { zoom: 0 };

    if (isZoomChange) {
      this.setZoom(nextZoom);
    }

    if (isUseConstraintsChange) {
      this.setState(
        {
          zoom: 0,
          imageWidth: imageSourceRect.width,
          imageHeight: imageSourceRect.height,
        },
        this.update,
      );
    }

    if (isContainerWidthChange || isContainerHeightChange || isMarginChange) {
      this.setState(zoomReset, this.update);
      this.updateZoomProp();
    }

    let fileInfo;

    if (nextFile !== undefined && nextFile !== currentFile) {
      /* if passed file and src, take file only */
      fileInfo = await getFileInfo(nextFile);
    } else if (
      nextSrc !== undefined &&
      nextSrc.length &&
      nextSrc !== currentSrc
    ) {
      fileInfo = await getFileInfoFromSrc(nextSrc);
    }

    if (fileInfo) {
      await this.preprocessFile(fileInfo);
    }
  }

  async preprocessFile(fileInfo: FileInfo) {
    const filePreview = await this.initialiseImagePreview(fileInfo);
    if (filePreview) {
      this.setFile(filePreview.fileInfo);
    } else {
      this.setState({ errorMessage: 'Cannot load image' });
    }
  }

  setFile(fileInfo: FileInfo) {
    this.currentFile = fileInfo.file;
    this.setState({
      errorMessage: undefined,
      src: fileInfo.src,
      zoom: 0,
      originX: 0,
      originY: 0,
    });
    this.updateZoomProp();
  }

  /* pre-process the incoming image for optimisations
     - resample image to min size required to fit zoomed view
     - apply exif orientation (rotate image if needed) so that coords don't need transforming when zooming, panning, or getting image
     - return size info about image (in case of rotation)
 */
  async initialiseImagePreview(fileInfo: FileInfo): Promise<ImageInfo | null> {
    try {
      const orientation = await getOrientation(fileInfo.file);
      const img = await loadImage(fileInfo.src);

      if (img) {
        const { containerWidth, containerHeight, maxZoom } = this.props;
        const { naturalWidth, naturalHeight } = img;
        const srcRect = new Rectangle(naturalWidth, naturalHeight);
        const maxRect = new Rectangle(
          containerWidth * maxZoom,
          containerHeight * maxZoom,
        );
        const scaleFactor = srcRect.scaleToFitLargestSide(maxRect);
        const scaledRect =
          scaleFactor < 1 ? srcRect.scaled(scaleFactor) : srcRect;
        const { width: imageWidth, height: imageHeight } = scaledRect;

        let canvasRect = scaledRect.clone();

        if (orientation >= 5) {
          canvasRect = canvasRect.flipped();
        }

        const { width: canvasWidth, height: canvasHeight } = canvasRect;

        this.getCanvas(
          canvasWidth,
          canvasHeight,
          (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
            switch (orientation) {
              case 2:
                context.translate(imageWidth, 0);
                context.scale(-1, 1);
                break;
              case 3:
                context.translate(imageWidth, imageHeight);
                context.scale(-1, -1);
                break;
              case 4:
                context.translate(0, imageHeight);
                context.scale(1, -1);
                break;
              case 5:
                context.translate(imageHeight, 0);
                context.rotate(radians(90));
                context.translate(0, imageHeight);
                context.scale(1, -1);
                break;
              case 6:
                context.translate(imageHeight, 0);
                context.rotate(radians(90));
                break;
              case 7:
                context.translate(imageHeight, 0);
                context.rotate(radians(90));
                context.translate(imageWidth, 0);
                context.scale(-1, 1);
                break;
              case 8:
                context.translate(imageHeight, 0);
                context.rotate(radians(90));
                context.translate(imageWidth, imageHeight);
                context.scale(-1, -1);
                break;
            }

            context.drawImage(
              img,
              0,
              0,
              naturalWidth,
              naturalHeight,
              0,
              0,
              imageWidth,
              imageHeight,
            );

            fileInfo.src = canvas.toDataURL();
          },
        );

        this.imageSourceRect = new Rectangle(canvasWidth, canvasHeight);
        return { fileInfo, width: canvasWidth, height: canvasHeight };
      }
    } catch (e) {
      //
    }
    return null;
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
      imageSourceRect: { width: imageWidth, height: imageHeight },
    } = this;
    this.setState({
      imageWidth,
      imageHeight,
      zoom: 0,
      originX: 0,
      originY: 0,
    });
  }

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
      () => this.applyConstraints(),
    );
    this.updateZoomProp();
  }

  /* assuming zoom level is correct, move origin to ensure imageBounds edges stay within visibleBounds */
  applyConstraints() {
    const { useConstraints } = this.props;
    const { originX: currentOriginX, originY: currentOriginY } = this.state;
    const { visibleBounds, imageBounds } = this;

    let originX = currentOriginX;
    let originY = currentOriginY;

    if (useConstraints) {
      /* stop imageBounds edges from going inside visibleBounds */
      const deltaLeft = visibleBounds.left - imageBounds.left;
      const deltaTop = visibleBounds.top - imageBounds.top;
      const deltaBottom = visibleBounds.bottom - imageBounds.bottom;
      const deltaRight = visibleBounds.right - imageBounds.right;

      if (
        imageBounds.right > visibleBounds.right &&
        imageBounds.left > visibleBounds.left
      ) {
        originX += deltaLeft;
      }
      if (
        imageBounds.bottom > visibleBounds.bottom &&
        imageBounds.top > visibleBounds.top
      ) {
        originY += deltaTop;
      }
      if (
        imageBounds.top < visibleBounds.top &&
        imageBounds.bottom < visibleBounds.bottom
      ) {
        originY += deltaBottom;
      }
      if (
        imageBounds.left < visibleBounds.left &&
        imageBounds.right < visibleBounds.right
      ) {
        originX += deltaRight;
      }
    } else {
      /* stop imageBounds edges from going outside visibleBounds */
      const deltaTop = visibleBounds.top - imageBounds.bottom;
      const deltaBottom = visibleBounds.bottom - imageBounds.top;
      const deltaLeft = visibleBounds.left - imageBounds.right;
      const deltaRight = visibleBounds.right - imageBounds.left;

      if (imageBounds.right < visibleBounds.left) {
        originX += deltaLeft;
      }
      if (imageBounds.bottom < visibleBounds.top) {
        originY += deltaTop;
      }
      if (imageBounds.top > visibleBounds.bottom) {
        originY += deltaBottom;
      }
      if (imageBounds.left > visibleBounds.right) {
        originX += deltaRight;
      }
    }

    this.setState({
      originX,
      originY,
    });
  }

  /* set zoom but apply constraints */
  setZoom(newZoom: number) {
    const { originX, originY } = this.state;
    /* itemBounds is a getter, so get it before and after changing zoom */
    const lastItemBounds = this.imageBounds;
    /* temporarily change zoom, which next call to imageBounds will read */
    this.state.zoom = newZoom;
    const imageBounds = this.imageBounds;
    const { x: deltaX, y: deltaY } = lastItemBounds.center.sub(
      imageBounds.center,
    );
    const origin = new Vector2(originX + deltaX, originY + deltaY);
    /* adjust zoom and origin to apply constraints */
    this.setState(
      {
        zoom: newZoom,
        originX: origin.x,
        originY: origin.y,
      },
      () => this.applyConstraints(),
    );
  }

  /* transformation between visibleBounds local coords to image source rect (factoring in zoom and pan) */
  mapCoords(visibleBoundsX: number, visibleBoundsY: number): Vector2 {
    const { imageSourceRect, visibleBounds, imageBounds } = this;
    const offset = visibleBounds.origin.sub(imageBounds.origin);
    const rect = imageBounds.rect;
    const x = (offset.x + visibleBoundsX) / rect.width;
    const y = (offset.y + visibleBoundsY) / rect.height;
    return new Vector2(
      imageSourceRect.width * x,
      imageSourceRect.height * y,
    ).rounded();
  }

  /* helper method to return new sized canvas for drawing */
  getCanvas(
    width: number,
    height: number,
    fn: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void,
  ) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    if (context) {
      fn(context, canvas);
    }

    return canvas;
  }

  /* convert the current visible region (zoomed / panned) to a correctly sized canvas with that view drawn */
  toCanvas(): HTMLCanvasElement {
    const {
      containerWidth,
      containerHeight,
      backgroundColor,
      useConstraints,
      circular,
      useCircularMask,
    } = this.props;

    return this.getCanvas(containerWidth, containerHeight, context => {
      const { imageElement } = this;

      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, containerWidth, containerHeight);

      if (imageElement) {
        if (circular && useCircularMask) {
          const cx = containerWidth * 0.5;
          const cy = containerHeight * 0.5;
          const rx = cx;
          const ry = cy;

          context.save();
          context.beginPath();
          context.translate(cx - rx, cy - ry);
          context.scale(rx, ry);
          context.arc(1, 1, 1, 0, 2 * Math.PI, false);
          context.restore();
          context.fill();
          context.clip();
        }

        if (useConstraints) {
          /* draw sourceRect mapped to container size */
          const { sourceRect } = this;

          context.drawImage(
            imageElement,
            sourceRect.left,
            sourceRect.top,
            sourceRect.width,
            sourceRect.height,
            0,
            0,
            containerWidth,
            containerHeight,
          );
        } else {
          /* draw imageBounds as is inside container size */
          const { visibleBounds, imageBounds } = this;
          const { naturalWidth, naturalHeight } = imageElement;
          const { left, top, width, height } = imageBounds.relativeTo(
            visibleBounds,
          );

          context.drawImage(
            imageElement,
            0,
            0,
            naturalWidth,
            naturalHeight,
            left,
            top,
            width,
            height,
          );
        }
      }
    });
  }

  /* convert current visible view to dataURL for image */
  toDataURL(): string {
    return this.toCanvas().toDataURL();
  }

  /* convert current visible view to File */
  toFile(): File {
    return dataURItoFile(this.toDataURL());
  }

  /* image has loaded */
  onImageLoad = (
    imageElement: HTMLImageElement,
    width: number,
    height: number,
  ) => {
    const { onImageChange } = this.props;
    this.imageSourceRect = new Rectangle(width, height);
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
      let newOriginX = dragOrigin.x + delta.x;
      let newOriginY = dragOrigin.y + delta.y;
      this.setState(
        {
          originX: newOriginX,
          originY: newOriginY,
        },
        () => this.applyConstraints(),
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
      circular,
      errorRenderer,
    } = this.props;
    const { errorMessage, src } = this.state;
    const { imageBounds } = this;

    return (
      <ImagePlacerWrapper backgroundColor={backgroundColor}>
        <Container
          width={containerWidth}
          height={containerHeight}
          margin={margin}
          onDragStart={this.onDragStart}
          onDragMove={this.onDragMove}
          onWheel={this.onWheel}
        >
          {errorMessage ? (
            <ImagePlacerErrorWrapper>
              {errorRenderer ? errorRenderer(errorMessage) : errorMessage}
            </ImagePlacerErrorWrapper>
          ) : (
            <div>
              <Image
                src={src}
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
                circular={circular}
                size={margin}
              />
            </div>
          )}
        </Container>
      </ImagePlacerWrapper>
    );
  }
}
