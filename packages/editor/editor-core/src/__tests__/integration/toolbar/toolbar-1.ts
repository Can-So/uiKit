import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getDocFromElement, comment, fullpage, editable } from '../_helpers';
import { messages as textFormattingMessages } from '../../../plugins/text-formatting/ui/ToolbarTextFormatting';
import { messages as advancedTextFormattingMessages } from '../../../plugins/text-formatting/ui/ToolbarAdvancedTextFormatting';
import { messages as blockTypeToolbarMessages } from '../../../plugins/block-type/ui/ToolbarBlockType';
import { messages as blockTypeMessages } from '../../../plugins/block-type/types';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

const input = 'helloworld ';
// https://product-fabric.atlassian.net/browse/ED-4531
[comment, fullpage].forEach(editor => {
  BrowserTestCase(
    `toolbar-1.ts: should be able to select normal text, bold, italics, underline style for ${
      editor.name
    } editor`,
    { skip: ['ie', 'safari', 'edge'] },
    async client => {
      const bold = `[aria-label="${
        textFormattingMessages.bold.defaultMessage
      }"]`;
      const italic = `[aria-label="${
        textFormattingMessages.italic.defaultMessage
      }"]`;
      const changeFormatting = `[aria-label="${
        blockTypeToolbarMessages.textStyles.defaultMessage
      }"]`;
      const normalText = `span=${blockTypeMessages.normal.defaultMessage}`;
      const more = `[aria-label="${
        advancedTextFormattingMessages.moreFormatting.defaultMessage
      }"]`;
      const underline = `span=${
        advancedTextFormattingMessages.underline.defaultMessage
      }`;
      const page = await goToEditorTestingExample(client);
      await mountEditor(page, { appearance: editor.appearance });

      await page.click(editable);
      await page.type(editable, input);
      await page.click(changeFormatting);
      await page.click(normalText);
      await page.waitForSelector(bold);
      await page.click(bold);
      await page.type(editable, input);
      await page.waitForSelector('strong');
      await page.click(bold);

      await page.click(italic);
      await page.type(editable, input);
      await page.waitForSelector('em');
      await page.click(italic);

      await page.waitForSelector(more);
      await page.click(more);
      await page.waitForSelector(underline);
      await page.click(underline);
      await page.type(editable, input);
      const doc = await page.$eval(editable, getDocFromElement);
      expect(doc).toMatchDocSnapshot();
    },
  );
});
