import { EditorState, Selection } from 'prosemirror-state';
import { isCellSelection } from 'prosemirror-utils';

export const isHeaderRowSelected = (state: EditorState): boolean => {
  let isSelected = false;
  if (isCellSelection(state.selection)) {
    (state.selection as any).forEachCell(cell => {
      if (cell.type === state.schema.nodes.tableHeader) {
        isSelected = true;
      }
    });
  }
  return isSelected;
};

export const isSelectionUpdated = (
  oldSelection: Selection,
  newSelection: Selection,
) =>
  isCellSelection(oldSelection) !== isCellSelection(newSelection) ||
  (isCellSelection(oldSelection) &&
    isCellSelection(newSelection) &&
    oldSelection.ranges !== newSelection.ranges);
