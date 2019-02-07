import * as React from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { Transaction, EditorState } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import {
  findDomRefAtPos,
  getSelectionRangeInRow,
  getSelectionRangeInColumn,
  findCellClosestToPos,
  findTable,
} from 'prosemirror-utils';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
} from '@atlaskit/editor-common';
import ContextualMenu from './ContextualMenu';
import { contextualMenuTriggerSize, tablePopupStyles } from '../styles';
import { pluginKey } from '../../pm-plugins/main';
import { PluginConfig } from '../../types';

const MenuWrapper = styled.div`
  ${tablePopupStyles}
`;

// offset of the contextual menu dropdown
const calculateOffset = (targetCellRef: HTMLElement, state: EditorState) => {
  const { tableRef } = pluginKey.getState(state);
  let top = -contextualMenuTriggerSize;

  if (tableRef && targetCellRef) {
    const targetOffset = targetCellRef.getBoundingClientRect();
    const tableOffset = tableRef.getBoundingClientRect();
    let topDiff = targetOffset.top - tableOffset.top;
    if (topDiff < 200) {
      top -= topDiff + 2;
    }
  }
  return [1, top];
};

export interface Props {
  editorView: EditorView;
  isOpen: boolean;
  targetCellPosition?: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  pluginConfig?: PluginConfig;
}

const FloatingContextualMenu = ({
  mountPoint,
  boundariesElement,
  scrollableElement,
  editorView,
  isOpen,
  targetCellPosition,
  pluginConfig,
}: Props) => {
  if (!isOpen || !targetCellPosition) {
    return null;
  }

  const { tr } = editorView.state;
  const columnSelectionRect = getColumnsRect(tr);
  const rowSelectionRect = getRowsRect(tr);

  if (!columnSelectionRect || !rowSelectionRect) {
    return null;
  }
  const domAtPos = editorView.domAtPos.bind(editorView);
  const targetCellRef = findDomRefAtPos(targetCellPosition, domAtPos);
  if (!targetCellRef) {
    return null;
  }

  return (
    <Popup
      alignX="right"
      alignY="top"
      target={targetCellRef as HTMLElement}
      mountTo={mountPoint}
      boundariesElement={boundariesElement}
      scrollableElement={scrollableElement}
      fitHeight={100}
      fitWidth={200}
      // z-index value below is to ensure that this menu is above other floating menu
      // in table, but below floating dialogs like typeaheads, pickers, etc.
      zIndex={akEditorFloatingOverlapPanelZIndex}
    >
      <MenuWrapper>
        <ContextualMenu
          editorView={editorView}
          offset={calculateOffset(
            targetCellRef as HTMLElement,
            editorView.state,
          )}
          isOpen={isOpen}
          targetCellPosition={targetCellPosition}
          allowMergeCells={pluginConfig!.allowMergeCells}
          allowBackgroundColor={pluginConfig!.allowBackgroundColor}
          columnSelectionRect={columnSelectionRect}
          rowSelectionRect={rowSelectionRect}
        />
      </MenuWrapper>
    </Popup>
  );
};

// returns a selection rect that spans merged cells
// TODO: ED-6348
function getColumnsRect(tr: Transaction) {
  const cell = findCellClosestToPos(tr.selection.$from);
  if (!cell) {
    return null;
  }
  const table = findTable(tr.selection)!;
  const pos = cell.pos - table.start;
  const map = TableMap.get(table.node);
  const rect = map.rectBetween(pos, pos);
  const { $anchor, $head } = getSelectionRangeInColumn(rect.left)(tr);
  return map.rectBetween($anchor.pos - table.start, $head.pos - table.start);
}

// TODO: ED-6348
function getRowsRect(tr: Transaction) {
  const cell = findCellClosestToPos(tr.selection.$from);
  if (!cell) {
    return null;
  }
  const table = findTable(tr.selection)!;
  const pos = cell.pos - table.start;
  const map = TableMap.get(table.node);
  const rect = map.rectBetween(pos, pos);
  const { $anchor, $head } = getSelectionRangeInRow(rect.top)(tr);
  return map.rectBetween($anchor.pos - table.start, $head.pos - table.start);
}

export default FloatingContextualMenu;
