import { Page } from './_types';

export enum ToolbarMenuItem {
  table,
  insertBlock,
  italic,
  bold,
  moreFormatting,
  alignment,
  alignmentLeft,
  alignmentCenter,
  textColor,
  bulletList,
  numberedList,
  action,
  link,
  filesAndImages,
  mention,
  emoji,
  removeTable,
}

const toolbarMenuItemsSelectors = {
  [ToolbarMenuItem.table]: `[aria-label="Table"]`,
  [ToolbarMenuItem.insertBlock]: `[aria-label="Insert"]`,
  [ToolbarMenuItem.italic]: `[aria-label="Italic"]`,
  [ToolbarMenuItem.bold]: `[aria-label="Bold"]`,
  [ToolbarMenuItem.moreFormatting]: `[aria-label="More formatting"]`,
  [ToolbarMenuItem.alignment]: `[aria-label="Text alignment"]`,
  [ToolbarMenuItem.alignmentLeft]: `[aria-label="Align left"]`,
  [ToolbarMenuItem.alignmentCenter]: `[aria-label="Align Center"]`,
  [ToolbarMenuItem.textColor]: `[aria-label="Text color"]`,
  [ToolbarMenuItem.bulletList]: `[aria-label="Bullet List"]`,
  [ToolbarMenuItem.numberedList]: `[aria-label="Numbered List"]`,
  [ToolbarMenuItem.action]: `[aria-label="Action item"]`,
  [ToolbarMenuItem.link]: `[aria-label="Link"]`,
  [ToolbarMenuItem.filesAndImages]: `[aria-label=""Files & images]`,
  [ToolbarMenuItem.mention]: `[aria-label="Mention"]`,
  [ToolbarMenuItem.emoji]: `[aria-label="Emoji"]`,
  [ToolbarMenuItem.removeTable]: `[aria-label="Remove"]`,
};

export async function clickToolbarMenu(page: Page, menu: ToolbarMenuItem) {
  await page.waitForSelector(toolbarMenuItemsSelectors[menu]);
  await page.click(toolbarMenuItemsSelectors[menu]);
}
