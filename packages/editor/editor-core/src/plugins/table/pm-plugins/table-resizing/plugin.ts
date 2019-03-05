import { Plugin, PluginKey } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import * as classnames from 'classnames';
import { akEditorTableToolbarSize } from '@atlaskit/editor-common';

import {
  updateControls,
  updateResizeHandle,
  updateColumnWidth,
  resizeColumn,
} from './actions';

import Resizer from './resizer/resizer';

import {
  getLayoutSize,
  pointsAtCell,
  edgeCell,
  currentColWidth,
  domCellAround,
} from './utils';

import {
  ColumnResizingPlugin,
  TableCssClassName as ClassName,
} from '../../types';

import {
  pluginKey as editorDisabledPluginKey,
  EditorDisabledPluginState,
} from '../../../editor-disabled';
import { pluginKey as widthPluginKey } from '../../../width';

import { Dispatch } from '../../../../event-dispatcher';
import { closestElement } from '../../../../utils';

export const pluginKey = new PluginKey('tableFlexiColumnResizing');

export function createPlugin(
  dispatch: Dispatch<ResizeState>,
  {
    handleWidth = 5,
    cellMinWidth = 25,
    lastColumnResizable = true,
  }: ColumnResizingPlugin = {},
) {
  return new Plugin({
    key: pluginKey,
    state: {
      init: () => new ResizeState(-1, null),
      apply(tr, pluginState: ResizeState, prevState, state) {
        const newPluginState = pluginState.apply(tr, state);

        if (
          (newPluginState &&
            pluginState.activeHandle !== newPluginState.activeHandle) ||
          pluginState.dragging !== newPluginState.dragging
        ) {
          dispatch(pluginKey, newPluginState);
          return newPluginState;
        }

        return pluginState;
      },
    },
    props: {
      attributes(state) {
        const pluginState = pluginKey.getState(state);

        return {
          class: classnames(ClassName.RESIZING_PLUGIN, {
            [ClassName.RESIZE_CURSOR]: pluginState.activeHandle > -1,
            [ClassName.IS_RESIZING]: !!pluginState.dragging,
          }),
        };
      },

      handleDOMEvents: {
        mousemove(view, event) {
          handleMouseMove(view, event, handleWidth, lastColumnResizable);
          if (pluginKey.getState(view.state).dragging) {
            updateControls(view.state);
            updateResizeHandle(view);
          }
          return false;
        },
        mouseleave(view) {
          handleMouseLeave(view);
          updateControls(view.state);
          return true;
        },
        mousedown(view, event) {
          const { activeHandle, dragging } = pluginKey.getState(view.state);
          if (activeHandle > -1 && !dragging) {
            handleMouseDown(view, event, cellMinWidth);
            updateResizeHandle(view);
            return true;
          }

          return false;
        },
      },
    },
  });
}

export class ResizeState {
  constructor(
    public activeHandle: number,
    public dragging: { startX: number; startWidth: number } | null,
  ) {
    return Object.freeze(this);
  }

  apply(tr, state) {
    const action = tr.getMeta(pluginKey);
    const { editorDisabled } = editorDisabledPluginKey.getState(
      state,
    ) as EditorDisabledPluginState;

    // Disable table resizing if the editor is disabled
    if (editorDisabled) {
      return new ResizeState(-1, null);
    }

    if (action && action.setHandle !== undefined) {
      return new ResizeState(action.setHandle, null);
    }

    if (action && action.setDragging !== undefined) {
      return new ResizeState(this.activeHandle, action.setDragging);
    }

    if (this.activeHandle > -1 && tr.docChanged) {
      let handle = tr.mapping.map(this.activeHandle, -1);
      if (!pointsAtCell(tr.doc.resolve(handle))) {
        handle = -1;
      }

      return new ResizeState(handle, this.dragging);
    }

    return this;
  }
}

function handleMouseMove(view, event, handleWidth, lastColumnResizable) {
  let pluginState = pluginKey.getState(view.state);

  if (!pluginState.dragging) {
    let target = domCellAround(event.target);
    let cell = -1;

    if (target) {
      let { left, right } = target.getBoundingClientRect();
      if (event.clientX - left <= handleWidth) {
        cell = edgeCell(view, event, 'left', handleWidth);
      } else if (right - event.clientX <= handleWidth) {
        cell = edgeCell(view, event, 'right', handleWidth);
      }
    }

    if (typeof cell === 'number' && cell !== pluginState.activeHandle) {
      if (!lastColumnResizable && cell !== -1) {
        let $cell = view.state.doc.resolve(cell);
        let table = $cell.node(-1);
        let map = TableMap.get(table);
        let start = $cell.start(-1);
        let col =
          map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;

        if (col === map.width - 1) {
          return;
        }
      }

      view.dispatch(view.state.tr.setMeta(pluginKey, { setHandle: cell }));
    }
  }
}

function handleMouseLeave(view) {
  let pluginState = pluginKey.getState(view.state);
  if (pluginState.activeHandle > -1 && !pluginState.dragging) {
    view.dispatch(view.state.tr.setMeta(pluginKey, { setHandle: -1 }));
  }
}

function createResizeHandle(tableRef: HTMLTableElement): HTMLDivElement | null {
  const resizeHandleRef = document.createElement('div');
  resizeHandleRef.className = ClassName.COLUMN_RESIZE_HANDLE;
  tableRef.parentNode!.appendChild(resizeHandleRef);
  const tableActive = closestElement(tableRef, `.${ClassName.WITH_CONTROLS}`);
  resizeHandleRef.style.height = `${
    tableActive
      ? tableRef.offsetHeight + akEditorTableToolbarSize
      : tableRef.offsetHeight
  }px`;

  return resizeHandleRef;
}

function handleMouseDown(view, event, cellMinWidth) {
  const { state } = view;
  const { activeHandle } = pluginKey.getState(state);

  let cell = view.state.doc.nodeAt(activeHandle);
  let $cell = view.state.doc.resolve(activeHandle);
  let $originalTable = $cell.node(-1);
  let start = $cell.start(-1);
  let dom = view.domAtPos(start).node;
  while (dom.nodeName !== 'TABLE') {
    dom = dom.parentNode;
  }

  let resizeHandleRef: HTMLDivElement | null = createResizeHandle(dom);

  const containerWidth = widthPluginKey.getState(view.state).width;
  const resizer = Resizer.fromDOM(view, dom, {
    minWidth: cellMinWidth,
    maxSize: getLayoutSize(dom.getAttribute('data-layout'), containerWidth),
    node: $cell.node(-1),
    start,
  });

  resizer.apply(resizer.currentState);

  const width = currentColWidth(view, activeHandle, cell.attrs);
  view.dispatch(
    view.state.tr.setMeta(pluginKey, {
      setDragging: { startX: event.clientX, startWidth: width },
    }),
  );

  function finish(event) {
    const { clientX } = event;

    window.removeEventListener('mouseup', finish);
    window.removeEventListener('mousemove', move);

    const { activeHandle, dragging } = pluginKey.getState(view.state);
    // activeHandle could be remapped via a collab change.
    // Fetch a fresh reference of the table.
    const $cell = view.state.doc.resolve(activeHandle);
    const $table = $cell.node(-1);

    if (resizeHandleRef && resizeHandleRef.parentNode) {
      resizeHandleRef.parentNode.removeChild(resizeHandleRef);
      resizeHandleRef = null;
    }

    // If we let go in the same place we started, dont need to do anything.
    if (dragging && clientX === dragging.startX) {
      view.dispatch(view.state.tr.setMeta(pluginKey, { setDragging: null }));
      return;
    }

    if (dragging) {
      const { startX } = dragging;

      // If the table has changed (via collab for example) don't apply column widths
      // For example, if a table col is deleted we won't be able to reliably remap the new widths
      // There may be a more elegant solution to this, to avoid a jarring experience.
      if ($table.eq($originalTable)) {
        updateColumnWidth(view, activeHandle, clientX - startX, resizer);
      }

      view.dispatch(view.state.tr.setMeta(pluginKey, { setDragging: null }));
    }
  }

  function move(event) {
    const { clientX, which } = event;

    if (!which) {
      return finish(event);
    }

    const {
      activeHandle,
      dragging: { startX },
    } = pluginKey.getState(view.state);

    resizeColumn(view, activeHandle, clientX - startX, resizer);
  }

  window.addEventListener('mouseup', finish);
  window.addEventListener('mousemove', move);
  event.preventDefault();
  return true;
}
