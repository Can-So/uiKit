import { messages as insertBlockMessages } from '../../plugins/insert-block/ui/ToolbarInsertBlock';
import { messages as blockTypeMessages } from '../../plugins/block-type/ui/ToolbarBlockType';

export const table = `span[aria-label="${
  insertBlockMessages.table.defaultMessage
}"]`;

export const insertTable = async page => {
  await page.click(table);
  await page.waitForSelector('table td p');
  await page.click('table th p');
};

export const blockFormattingDropdown = `span[aria-label="${blockTypeMessages}"]`;
export const removeTablePopup = '.pm-table-column-controls__button-wrap';
export const dropList = 'div[data-role="droplistContent"]';
export const insertBlockDropdown = `span[aria-label="${
  insertBlockMessages.insertMenu.defaultMessage
}"]`;

export const emojiButton = `span[aria-label="${
  insertBlockMessages.emoji.defaultMessage
}"]`;
export const emojiPicker = 'div[data-emoji-picker-container="true"]';
export const mentionButton = `span[aria-label="${
  insertBlockMessages.mention.defaultMessage
}"]`;
export const mentionQuery = 'span[data-type-ahead-query]';
export const gapCursor = '.ProseMirror-gapcursor';
export const layoutDataSection = '[data-layout-section="true"]';
export const panelContent = '.ak-editor-panel__content';
export const codeContent = '.code-content';
export const arrowRight = 'ArrowRight';
export const arrowLeft = 'ArrowLeft';
export const arrowUp = 'ArrowUp';
export const arrowDown = 'ArrowDown';
