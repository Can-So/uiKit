import { ssr_hydrate } from '@atlaskit/elements-test-helpers';
const SamplesPath = './samples';
const ExamplesPath = '../../../../examples';

describe('server side rendering and hydration', async () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'error');
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test.each([[`${SamplesPath}/_decision-inline.tsx`]])(
    'ssr("%s")',
    async (fileName: string) => {
      await ssr_hydrate(__dirname, fileName);

      // tslint:disable-next-line:no-console
      expect(console.error).not.toBeCalled();
    },
  );

  test.skip.each([
    [`${SamplesPath}/_decision-card.tsx`], // TODO: https://product-fabric.atlassian.net/browse/FS-3681
    [`${SamplesPath}/_task-card.tsx`], // TODO: https://product-fabric.atlassian.net/browse/FS-3681
    [`${SamplesPath}/_task-inline.tsx`], // TODO: https://product-fabric.atlassian.net/browse/FS-3688
    [`${ExamplesPath}/04-resourced-task-item`], // TODO: https://product-fabric.atlassian.net/browse/FS-3688
  ])('ssr("%s")', async (fileName: string) => {
    await ssr_hydrate(__dirname, fileName);

    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });
});
