import { ssr_hydrate } from '@atlaskit/elements-test-helpers';

const ExamplesPath = './samples';

describe('server side rendering and hydration', async () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'error');
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test.each([['_decision-inline.tsx']])(
    'ssr("%s")',
    async (fileName: string) => {
      await ssr_hydrate(__dirname, `${ExamplesPath}/${fileName}`);

      // tslint:disable-next-line:no-console
      expect(console.error).not.toBeCalled();
    },
  );

  // TODO: https://product-fabric.atlassian.net/browse/FS-3681
  test.skip.each([['_decision-card.tsx']])(
    'ssr("%s")',
    async (fileName: string) => {
      await ssr_hydrate(__dirname, `${ExamplesPath}/${fileName}`);

      // tslint:disable-next-line:no-console
      expect(console.error).not.toBeCalled();
    },
  );
});
