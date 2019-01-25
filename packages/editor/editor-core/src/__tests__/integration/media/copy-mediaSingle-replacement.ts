import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { editable, getDocFromElement, fullpageWithImport } from '../_helpers';

const baseADF = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'asdasdas',
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        width: 66.67,
        layout: 'wrap-left',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: 'a559980d-cd47-43e2-8377-27359fcb905f',
            type: 'file',
            collection: 'MediaServicesSample',
            width: '2378',
            height: '628',
          },
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        width: 66.67,
        layout: 'wrap-right',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: 'a559980d-cd47-43e2-8377-27359fcb905f',
            type: 'file',
            collection: 'MediaServicesSample',
            width: '2378',
            height: '628',
          },
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        width: 41.666666666666664,
        layout: 'wrap-left',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: 'a559980d-cd47-43e2-8377-27359fcb905f',
            type: 'file',
            collection: 'MediaServicesSample',
            width: '2378',
            height: '628',
          },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
  ],
};

const adfInputSelector = '.adf-input';
const importAdfBtnSelector = '.import-adf';

BrowserTestCase(
  'copy-mediaSingle-replacement.ts: Copies and pastes mediaSingle on fullpage',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const browser = new Page(client);
    await browser.goto(fullpageWithImport.path);

    // load ADF
    await browser.browser.execute(
      (selector, value) => {
        (document.querySelector(selector)! as HTMLInputElement).value = value;
      },
      adfInputSelector,
      JSON.stringify(baseADF),
    );

    await browser.click(importAdfBtnSelector);
    await browser.waitForSelector(editable);

    // select the middle one and copy it
    //
    // uses .overlay since these error without being signed into Media Services
    // use the .wrapper selector if we're able to resolve the image
    await browser.waitForSelector('.ProseMirror :nth-child(3) .overlay');
    await browser.click('.ProseMirror :nth-child(3) .overlay');
    await browser.copy(editable);

    // select the last one and replace it
    await browser.waitForSelector('.ProseMirror :nth-child(4) .overlay');
    await browser.click('.ProseMirror :nth-child(4) .overlay');
    await browser.paste(editable);

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
