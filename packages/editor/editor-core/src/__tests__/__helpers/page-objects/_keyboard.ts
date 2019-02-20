import { Page } from './_types';

export enum KeyboardKeys {
  arrowRight = 'ArrowRight',
  arrowLeft = 'ArrowLeft',
  arrowUp = 'ArrowUp',
  arrowDown = 'ArrowDown',
}

export async function pressKey(page: Page, key: KeyboardKeys) {
  await page.keyboard.down(key);
}
