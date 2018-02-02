// @flow
// eslint-disable-next-line import/prefer-default-export
import type { HeadType, RowType, RankEnd } from '../types';

export const getPageRows = (
  pageNumber?: number,
  allRows: Array<RowType>,
  rowsPerPage?: number,
): Array<RowType> => {
  if (!pageNumber || !rowsPerPage || !allRows.length) {
    return [];
  }
  return allRows.slice(
    (pageNumber - 1) * rowsPerPage,
    pageNumber * rowsPerPage,
  );
};

export const assertIsSortable = (head?: HeadType) => {
  if (!head || !head.cells) return null;

  head.cells.forEach(cell => {
    if (cell.isSortable && !cell.key) {
      try {
        throw Error(
          "isSortable can't be set to true, if the 'key' prop is missing.",
        );
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    }
    return null;
  });
  return null;
};

export const validateSortKey = (
  sortKey?: string | null,
  head?: HeadType | null,
) => {
  if (!sortKey) return null;
  const headHasKey = head && head.cells.map(cell => cell.key).includes(sortKey);

  if (!headHasKey) {
    try {
      throw Error(`Cell with ${sortKey} key not found in head.`);
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  }
  return null;
};

// creates inline styles if flag ranking is true
export const inlineStylesIfRanking = (
  isRanking: boolean,
  width: number,
  height?: number,
): {} => {
  if (!isRanking) {
    return {};
  }

  if (height) {
    return { width, height };
  }
  return { width };
};

// computes index of dropped item after ranking
export const computeIndex = (
  index: number,
  page: number,
  rowsPerPage?: number,
): number => {
  const itemOnPreviousPages =
    rowsPerPage && isFinite(rowsPerPage) ? (page - 1) * rowsPerPage : 0;

  return index + itemOnPreviousPages;
};

// reorder rows in table after ranking
export const reorderRows = (
  rankEnd: RankEnd,
  rows: RowType[],
  page?: number = 1,
  rowsPerPage?: number,
): RowType[] => {
  const { destination, sourceIndex } = rankEnd;

  if (!destination) {
    return rows;
  }

  const fromIndex = computeIndex(sourceIndex, page, rowsPerPage);
  const toIndex = computeIndex(destination.index, page, rowsPerPage);

  const reordered = rows.slice();
  const [removed] = reordered.splice(fromIndex, 1);
  reordered.splice(toIndex, 0, removed);

  return reordered;
};
