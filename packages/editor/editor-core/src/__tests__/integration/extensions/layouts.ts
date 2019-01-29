import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  getDocFromElement,
  editable,
  insertBlockMenuItem,
  changeSelectedNodeLayout,
} from '../_helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

import commonMessages from '../../../messages';

[
  commonMessages.layoutFixedWidth.defaultMessage,
  commonMessages.layoutWide.defaultMessage,
  commonMessages.layoutFullWidth.defaultMessage,
].forEach(layoutName => {
  BrowserTestCase(
    `layouts.ts: Extension: ${layoutName} Layout`,
    { skip: ['edge', 'ie'] },
    async client => {
      const page = await goToEditorTestingExample(client);
      await mountEditor(page, {
        appearance: 'full-page',
        allowExtension: {
          allowBreakout: true,
        },
      });

      await insertBlockMenuItem(page, 'Block macro (EH)');
      await changeSelectedNodeLayout(page, layoutName);

      const doc = await page.$eval(editable, getDocFromElement);
      expect(doc).toMatchDocSnapshot();
    },
  );
});
