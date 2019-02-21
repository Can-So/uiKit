import { Page } from './_types';

export enum KeyboardKeys {
  arrowRight = 'ArrowRight',
  arrowLeft = 'ArrowLeft',
  arrowUp = 'ArrowUp',
  arrowDown = 'ArrowDown',
  shift = 'Shift',
  Return = 'Return',
  Enter = 'Enter',
}

export async function pressKey(page: Page, key: KeyboardKeys) {
  await page.keyboard.down(key);
}

export async function pressKeyup(page: Page, key: KeyboardKeys) {
  await page.keyboard.up(key);
}
