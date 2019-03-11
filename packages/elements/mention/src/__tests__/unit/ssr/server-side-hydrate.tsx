import { ssr_hydrate } from '@atlaskit/elements-test-helpers';

const ExamplesPath = '../../../../examples';

describe('server side rendering and hydration', async () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'error');
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test.each([
    ['00-simple-mention-item.tsx'],
    ['01-mention-item.tsx'],
    ['03-error-mention-list.tsx'],
    ['04-resourced-mention-list.tsx'],
    ['05-mention-list-picker.tsx'],
    ['06-mention-list-picker-with-slow-providers.tsx'],
    ['07-dark-simple-mention.tsx'],
    ['07-simple-mention.tsx'],
    ['08-resourced-mention-on-n20-background.tsx'],
    ['09-mention-picker-external-asap.tsx'],
    ['10-mention-picker-external-cookie.tsx'],
  ])('ssr("%s")', async (fileName: string) => {
    await ssr_hydrate(__dirname, `${ExamplesPath}/${fileName}`);

    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });

  // TODO: https://product-fabric.atlassian.net/browse/FS-3667
  test.skip.each([
    ['02-mention-list.tsx'], // Warning: Prop `className` did not match. Server: "sc-cMljjf gGGOqx" Client: "sc-cMljjf gQKxVT"
  ])('ssr("%s")', async (fileName: string) => {
    await ssr_hydrate(__dirname, `${ExamplesPath}/${fileName}`);

    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });
});
