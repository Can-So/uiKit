import { Page } from './_types';

export enum KeyboardKeys {
  arrowRight = 'ArrowRight',
  arrowLeft = 'ArrowLeft',
  arrowUp = 'ArrowUp',
  arrowDown = 'ArrowDown',
  shift = 'Shift',
  return = 'Return',
  enter = 'Enter',
}

export async function pressKey(page: Page, key: KeyboardKeys | KeyboardKeys[]) {
  const keys = Array.isArray(key) ? key : [key];

  for (let key of keys) {
    await page.keyboard.down(key);
  }
}

export async function pressKeyup(page: Page, key: KeyboardKeys) {
  await page.keyboard.up(key);
}
