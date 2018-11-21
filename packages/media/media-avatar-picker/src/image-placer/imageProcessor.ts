import {
  Rectangle,
  Bounds,
  loadImage,
  getOrientation,
  FileInfo,
} from '@atlaskit/media-ui';
import { getCanvas } from './util';

export function radians(deg: number) {
  return deg * (Math.PI / 180);
}

export function applyOrientation(
  img: HTMLImageElement,
  context: CanvasRenderingContext2D,
  orientation: number,
  sourceWidth: number,
  sourceHeight: number,
  destWidth: number,
  destHeight: number,
) {
  switch (orientation) {
    case 2:
      context.translate(destWidth, 0);
      context.scale(-1, 1);
      break;
    case 3:
      context.translate(destWidth, destHeight);
      context.scale(-1, -1);
      break;
    case 4:
      context.translate(0, destHeight);
      context.scale(1, -1);
      break;
    case 5:
      context.translate(destHeight, 0);
      context.rotate(radians(90));
      context.translate(0, destHeight);
      context.scale(1, -1);
      break;
    case 6:
      context.translate(destHeight, 0);
      context.rotate(radians(90));
      break;
    case 7:
      context.translate(destHeight, 0);
      context.rotate(radians(90));
      context.translate(destWidth, 0);
      context.scale(-1, 1);
      break;
    case 8:
      context.translate(destHeight, 0);
      context.rotate(radians(90));
      context.translate(destWidth, destHeight);
      context.scale(-1, -1);
      break;
  }

  context.drawImage(
    img,
    0,
    0,
    sourceWidth,
    sourceHeight,
    0,
    0,
    destWidth,
    destHeight,
  );
}

export interface PreviewInfo {
  fileInfo: FileInfo;
  width: number;
  height: number;
}

/* pre-process the incoming image for optimisations
     - resample image to min size required to fit zoomed view
     - apply exif orientation (rotate image if needed) so that coords don't need transforming when zooming, panning, or getting image
     - return size info about image (in case of rotation)
 */
export async function initialiseImagePreview(
  fileInfo: FileInfo,
  containerRect: Rectangle,
  maxZoom: number,
): Promise<PreviewInfo | null> {
  let orientation: number = 1;
  let img: HTMLImageElement;

  try {
    orientation = await getOrientation(fileInfo.file);
    img = await loadImage(fileInfo.src);
  } catch (e) {
    return null;
  }

  if (img) {
    const { naturalWidth, naturalHeight } = img;
    const srcRect = new Rectangle(naturalWidth, naturalHeight);
    const maxRect = new Rectangle(
      containerRect.width * maxZoom,
      containerRect.height * maxZoom,
    );
    const scaleFactor = srcRect.scaleToFitLargestSide(maxRect);
    const scaledRect = scaleFactor < 1 ? srcRect.scaled(scaleFactor) : srcRect;
    const { width: imageWidth, height: imageHeight } = scaledRect;

    let canvasRect = scaledRect.clone();

    if (orientation >= 5) {
      /* any of the Exif orientation values >= 5 require flipping the rect.
        any of the lower values are just mirrored/rotated within the same rect */
      canvasRect = canvasRect.flipped();
    }

    const { width: canvasWidth, height: canvasHeight } = canvasRect;

    const { canvas, context } = getCanvas(canvasWidth, canvasHeight);

    if (context) {
      applyOrientation(
        img,
        context,
        orientation,
        naturalWidth,
        naturalHeight,
        imageWidth,
        imageHeight,
      );
      fileInfo.src = canvas.toDataURL();
    }

    return { fileInfo, width: canvasWidth, height: canvasHeight };
  }

  return null;
}

export function renderImageAtCurrentView(
  imageElement: HTMLImageElement | undefined,
  sourceRect: Bounds,
  visibleBounds: Bounds,
  imageBounds: Bounds,
  containerRect: Rectangle,
  useConstraints: boolean,
  circular: boolean,
  renderCircularMask: boolean,
  backgroundColor: string,
): HTMLCanvasElement {
  const { width: containerWidth, height: containerHeight } = containerRect;
  const { canvas, context } = getCanvas(containerWidth, containerHeight);

  if (context) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, containerWidth, containerHeight);

    if (imageElement) {
      if (circular && renderCircularMask) {
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
  }

  return canvas;
}
