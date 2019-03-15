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

  test.each([['00-simple-status.tsx']])(
    'ssr("%s")',
    async (fileName: string) => {
      await ssr_hydrate(__dirname, `${ExamplesPath}/${fileName}`);

      // tslint:disable-next-line:no-console
      expect(console.error).not.toBeCalled();
    },
  );
});
