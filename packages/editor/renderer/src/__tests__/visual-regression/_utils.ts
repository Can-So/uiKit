import { getExampleUrl } from '@atlaskit/visual-regression/helper';
import { Props } from '../../ui/Renderer';

const renderValueInput = '#renderer-value-input';

export async function renderDocument(page, doc) {
  await page.$eval(renderValueInput, el => {
    el.value = '';
  });
  await page.click(renderValueInput);
  await page.keyboard.type(JSON.stringify(doc));
}

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

export enum Device {
  Default = 'Default',
  LaptopHiDPI = 'LaptopHiDPI',
  LaptopMDPI = 'LaptopMDPI',
  iPadPro = 'iPadPro',
  iPad = 'iPad',
  iPhonePlus = 'iPhonePlus',
}

export const deviceViewPorts = {
  [Device.Default]: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
  [Device.LaptopHiDPI]: { width: 1440, height: 900 },
  [Device.LaptopMDPI]: { width: 1280, height: 800 },
  [Device.iPadPro]: { width: 1024, height: 1366 },
  [Device.iPad]: { width: 768, height: 1024 },
  [Device.iPhonePlus]: { width: 414, height: 736 },
};

export async function snapshot(
  page,
  tolerance?: number,
  selector = '#RendererOutput',
) {
  const renderer = await page.$(selector);

  // Try to take a screenshot of only the renderer.
  // Otherwise take the whole page.
  let image;
  if (renderer) {
    image = await renderer.screenshot();
  } else {
    image = await page.screenshot();
  }

  if (tolerance) {
    // @ts-ignore
    expect(image).toMatchProdImageSnapshot({
      failureThreshold: `${tolerance}`,
      failureThresholdType: 'percent',
    });
    return;
  }
  // @ts-ignore
  expect(image).toMatchProdImageSnapshot();
}

export type RendererPropsOverrides = { [T in keyof Props]?: Props[T] } & {
  showSidebar?: boolean;
};
export async function mountRenderer(page, props: RendererPropsOverrides) {
  await page.$eval(
    '#renderer-container',
    (e, props) => {
      (window as Window & {
        __mountRenderer: (props: RendererPropsOverrides) => void;
      }).__mountRenderer(props);
    },
    props,
  );
}

export async function goToRendererTestingExample(page) {
  const url = getExampleUrl(
    'editor',
    'renderer',
    'testing',
    // @ts-ignore
    global.__BASEURL__,
  );

  await page.goto(url, { waitUntil: 'networkidle0' });
}

export async function animationFrame(page) {
  // Give browser time to render, waitForFunction by default fires on RAF.
  await page.waitForFunction('1 === 1');
}
