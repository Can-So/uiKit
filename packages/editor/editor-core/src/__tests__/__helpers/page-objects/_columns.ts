import { Page } from './_types';
import { selectors } from './_editor';

const columnsSelector = 'div[data-layout-column]';
const columnSelectedSelector = 'div[data-layout-section].selected';

function getColumnElementXPath(column: number, paragraph: number) {
  return `(//div[@data-layout-column])[${column}]//p[${paragraph}]`;
}

export const clickOnColumn = async (
  page: Page,
  column: number = 1,
  paragraph: number = 1,
) => {
  const elementPath = getColumnElementXPath(column, paragraph);
  await page.waitForXPath(elementPath, 5000);
  const target = await page.$x(elementPath);
  expect(target.length).toBeGreaterThan(0);
  await target[0].click();

  await page.waitForSelector(columnSelectedSelector);
};

export const scrollToColumn = async (
  page: Page,
  column: number = 0,
  offset: number = 0,
) => {
  await page.evaluate(
    (
      columnsSelector: string,
      column: number,
      scrollContainerSelector: string,
      offset: number,
    ) => {
      const $scrollContainerSelector: HTMLDivElement = document.querySelector(
        scrollContainerSelector,
      )! as HTMLDivElement;

      const $column: HTMLDivElement = document.querySelectorAll(
        columnsSelector,
      )[column]! as HTMLDivElement;
      const $section: HTMLDivElement = $column.offsetParent as HTMLDivElement;

      const { offsetTop } = $section;

      const top = offsetTop + offset;

      $scrollContainerSelector.scrollTo({
        top,
        left: 0,
        behavior: 'auto',
      });
    },
    columnsSelector,
    column,
    selectors.scrollContainer,
    offset,
  );

  await page.waitForFunction(
    (
      columnsSelector: string,
      column: number,
      scrollContainerSelector: string,
      offset: number,
    ) => {
      const $scrollContainerSelector: HTMLDivElement = document.querySelector(
        scrollContainerSelector,
      )! as HTMLDivElement;

      const $column: HTMLDivElement = document.querySelectorAll(
        columnsSelector,
      )[column]! as HTMLDivElement;
      const $section: HTMLDivElement = $column.offsetParent as HTMLDivElement;

      const { offsetTop } = $section;

      const top = offsetTop + offset;

      return $scrollContainerSelector.scrollTop === top;
    },
    undefined,
    columnsSelector,
    column,
    selectors.scrollContainer,
    offset,
  );
};
