import { md, code } from '@atlaskit/docs';

export default md`
  ## Usage

  Utility library for testing Fabric Elements
  
  ## Installation in your component/package

${code`
  bolt add @atlaskit/elements-test-helpers --dev  
`}

  ## Using the component

  ### Creating a SSR unit test

  To SSR/Hydrate a Status example:

${code`
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
      await ssr_hydrate(__dirname, \`$\{ExamplesPath\}/\$\{fileName\}\`);

      // tslint:disable-next-line:no-console
      expect(console.error).not.toBeCalled();
    },
  );
});
`}

### Debugging SSR/Hydration some example in the browser

Create a new example file, use createHydrateExample wrapper and then run the examples to see the SSR and hydration:

${code`
import Example from './01-mention-item.tsx';
import createHydrateExample from '@atlaskit/elements-test-helpers/src/demo-ssr-hydrate';

export default createHydrateExample(Example);
`}

`;
