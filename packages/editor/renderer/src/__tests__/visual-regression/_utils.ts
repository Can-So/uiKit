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

export async function snapshot(page, tolerance?: number) {
  const renderer = await page.$('#RendererOutput');

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

  await page.goto(url);
}

export async function animationFrame(page) {
  // Give browser time to render, waitForFunction by default fires on RAF.
  await page.waitForFunction('1 === 1');
}
