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
    ['00-picker-and-reactions.tsx'],
    ['01-picker-with-all-emojis-enabled.tsx'],
    ['02-reactions.tsx'],
    ['03-empty-reactions.tsx'],
    ['04-reactions-with-all-emoji-enabled.tsx'],
    ['05-reactions-with-all-emoji-enabled-overflow.tsx'],
    ['07-multiple-reactions.tsx'],
  ])('ssr("%s")', async (fileName: string) => {
    await ssr_hydrate(__dirname, `${ExamplesPath}/${fileName}`);

    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });
});
