import { editorUrl } from '../_helpers';

export const messageEditor = `${editorUrl}=message-renderer`;
export const editable = `.ProseMirror`;
export const typeahead = '.ak-emoji-typeahead';

export const insertEmoji = async (browser, query: string) => {
  await browser.type(editable, ':');
  await browser.waitForSelector(typeahead);
  await browser.type(editable, query);
  await browser.type(editable, ':');
};

export const insertEmojiBySelect = async (browser, select: string) => {
  await browser.type(editable, ':');
  await browser.waitForSelector(typeahead);
  await browser.type(editable, [select]);
  await browser.isVisible(`span=:${select}:`);
  await browser.click(`span=:${select}:`);
};

export const emojiItem = (emojiShortName: string): string => {
  return `span[shortname=":${emojiShortName}:"]`;
};
