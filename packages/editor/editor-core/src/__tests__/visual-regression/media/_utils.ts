import { getBoundingRect, snapshot } from '../_utils';

export const layoutAvailable = (mode, width) => {
  if (mode === 'wide') {
    return width >= 960;
  } else if (mode === 'full-width') {
    return width >= 1280;
  }

  return true;
};

export type TestPageConfig = {
  viewport: {
    width: number;
    height: number;
  };

  dynamicTextSizing: boolean;
};

export const pickupHandle = async (page, side = 'right') => {
  let rect = await getBoundingRect(page, `.mediaSingle-resize-handle-${side}`);

  const resizeHandle = rect.left + rect.width / 2;
  const top = rect.top + rect.height / 2;

  await page.mouse.move(resizeHandle, top);

  await page.mouse.down();
};

export const moveHandle = async (page, distance, side = 'right') => {
  let rect = await getBoundingRect(page, `.mediaSingle-resize-handle-${side}`);

  const resizeHandle = rect.left + rect.width / 2;
  const top = rect.top + rect.height / 2;

  await page.mouse.move(resizeHandle + distance, top);
};

export const releaseHandle = async page => {
  await page.mouse.up();
};

export const resizeWithSnapshots = async (page, distance, side = 'right') => {
  await pickupHandle(page, side);
  await snapshot(page);

  await moveHandle(page, distance, side);
  await snapshot(page);

  await releaseHandle(page);
  await snapshot(page);
};
