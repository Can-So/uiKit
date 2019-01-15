import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  getDocFromElement,
  comment,
  fullpage,
  editable,
  insertBlockMenuItem,
} from '../_helpers';
import { messages } from '../../../plugins/block-type/types';

const selectQuery =
  'div[aria-label="CodeBlock floating controls"] input[aria-autocomplete="list"]';
const floatingToolbarLanguageSelector = 'div[aria-label="Floating Toolbar"]';

[comment, fullpage].forEach(editor => {
  // https://product-fabric.atlassian.net/browse/ED-5564
  // Fix wrong ADF for code block when language is selected
  BrowserTestCase(
    `code-block: produces correct ADF after language change for ${editor.name}`,
    { skip: ['ie', 'safari'] },
    async client => {
      const page = new Page(client);
      await page.goto(editor.path);
      await page.waitForSelector(editor.placeholder);
      await page.click(editor.placeholder);

      await insertBlockMenuItem(page, messages.codeblock.defaultMessage);
      await page.waitForSelector(selectQuery);
      await page.type(selectQuery, ['javascript', 'Return']);

      const doc = await page.$eval(editable, getDocFromElement);
      expect(doc).toMatchDocSnapshot();
    },
  );

  BrowserTestCase(
    `code-block: code block language is preserved after floating toolbar loses and gains focus for ${
      editor.name
    }`,
    { skip: ['ie', 'safari'] },
    async client => {
      const page = new Page(client);
      await page.goto(editor.path);
      await page.waitForSelector(editor.placeholder);
      await page.click(editor.placeholder);

      // Insert code block
      await insertBlockMenuItem(page, messages.codeblock.defaultMessage);
      await page.waitForSelector(selectQuery);
      // Change code block language
      await page.type(selectQuery, ['javascript', 'Return']);
      await page.click(editable);
      // Unfocus code block (so floating toolbar hides)
      await page.type(editable, ['ArrowRight', 'ArrowRight']);
      await page.type(editable, 'test paragraph');
      // Focus code block again
      await page.click('pre');
      // Check that the language is still selected
      await page.waitForSelector(floatingToolbarLanguageSelector);
      const language = await page.getText(floatingToolbarLanguageSelector);
      expect(language.trim()).toEqual('JavaScript');
    },
  );

  BrowserTestCase(
    `code-block: code block selected language correctly changes when moving selection directly from one code block to another for ${
      editor.name
    }`,
    { skip: ['ie', 'safari', 'edge'] },
    async client => {
      const page = new Page(client);
      await page.goto(editor.path);
      await page.waitForSelector(editor.placeholder);
      await page.click(editor.placeholder);
      // Insert code block
      await insertBlockMenuItem(page, messages.codeblock.defaultMessage);
      await page.waitForSelector(selectQuery);

      // Change code block language
      await page.type(selectQuery, ['javascript', 'Return']);
      await page.click(editable);
      // Move out of code block
      await page.type(editable, ['ArrowRight', 'Return']);
      // Insert a second code block
      await insertBlockMenuItem(page, messages.codeblock.defaultMessage);

      // Make sure the second code block doesn't have a language set.
      await page.waitForSelector(selectQuery);
      const secondCodeblockInitialLanguage = await page.getText(
        floatingToolbarLanguageSelector,
      );
      expect(secondCodeblockInitialLanguage.trim()).toEqual('Select language');
      // Set a language on the second code block
      await page.type(selectQuery, ['Arduino', 'Return']);

      // Check that the language on the first code block is still the same
      await page.click('code[data-language="javascript"]');
      await page.waitForSelector(floatingToolbarLanguageSelector);
      const firstCodeBlock = await page.getText(
        floatingToolbarLanguageSelector,
      );
      expect(firstCodeBlock.trim()).toEqual('JavaScript');

      // Check that the language on the second code block is still the same
      // not sure if this is working 100%
      await page.click('code[data-language="arduino"]');
      await page.waitForSelector(floatingToolbarLanguageSelector);
      const secondCodeBlock = await page.getText(
        floatingToolbarLanguageSelector,
      );
      expect(secondCodeBlock.trim()).toEqual('Arduino');
    },
  );

  // This bug isn't fixed. See ticket for details.
  // https://product-fabric.atlassian.net/browse/ED-5963
  /*
  BrowserTestCase(
    'code-block: code block selected language correctly changes when moving selection directly from one code block to another where one blocks selected is undefined',
    { skip: ['ie', 'safari'] },
    async client => {
      const page = new Page(client);
      await page.goto(editor.path);
      await page.waitForSelector(editor.placeholder);
      await page.click(editor.placeholder);
      // Insert code block
      await insertBlockMenuItem(page, messages.codeblock.defaultMessage);
      await page.waitForSelector(selectQuery);
      // Move out of code block
      await page.type(editor.placeholder, ['ArrowDown']);
      // Insert a second code block
      await insertBlockMenuItem(page, messages.codeblock.defaultMessage);
      // Make sure the second code block doesn't have a language set.
      await page.waitForSelector(selectQuery);
      const secondCodeblockInitialLanguage = await page.getText(
        floatingToolbarLanguageSelector,
      );
      expect(secondCodeblockInitialLanguage.trim()).toEqual('Select language');
      // Set a language on the second code block
      await page.type(selectQuery, ['C', 'Return']);

      // Check that the language on the first code block is still the same
      await page.click('code');
      await page.waitForSelector(floatingToolbarLanguageSelector);
      const firstBlockLanguage = await page.getText(
        floatingToolbarLanguageSelector,
      );
      expect(firstBlockLanguage.trim()).toEqual('Select language');
    },
  );
  */
});
