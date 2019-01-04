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

export async function snapshot(page) {
  const renderer = await page.$('#RendererOutput');

  // Try to take a screenshot of only the renderer.
  // Otherwise take the whole page.
  let image;
  if (renderer) {
    image = await renderer.screenshot();
  } else {
    image = await page.screenshot();
  }

  // @ts-ignore
  expect(image).toMatchProdImageSnapshot();
}

export type RendererPropsOverrides = { [T in keyof Props]?: Props[T] };
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
