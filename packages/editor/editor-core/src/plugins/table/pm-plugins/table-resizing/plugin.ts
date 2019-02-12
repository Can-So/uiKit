import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { TableMap } from 'prosemirror-tables';
import { findParentNodeOfType, hasParentNodeOfType } from 'prosemirror-utils';
import * as classnames from 'classnames';

import {
  updateControls,
  handleBreakoutContent,
  updateColumnWidth,
  resizeColumn,
} from './actions';

import Resizer from './resizer/resizer';
import { contentWidth } from './resizer/contentWidth';

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
    view: () => ({
      update(view) {
        const { selection, schema } = view.state;
        const table = findParentNodeOfType(schema.nodes.table)(selection);
        const isInsideCells = hasParentNodeOfType([
          schema.nodes.tableCell,
          schema.nodes.tableHeader,
        ])(selection);

        if (table && isInsideCells) {
          const cell = findParentNodeOfType([
            schema.nodes.tableCell,
            schema.nodes.tableHeader,
          ])(selection);
          const elem = view.domAtPos(cell!.start).node as HTMLElement; // nodeview
          const elemOrWrapper =
            closestElement(
              elem,
              `.${ClassName.TABLE_HEADER_NODE_WRAPPER}, .${
                ClassName.TABLE_CELL_NODE_WRAPPER
              }`,
            ) || elem;
          const { minWidth } = contentWidth(elem, elem);

          // if the contents of the element are wider than the cell
          // we resize the cell to the new min cell width.
          // which should cater to the nowrap element and wrap others.
          if (elemOrWrapper && elemOrWrapper.offsetWidth < minWidth) {
            handleBreakoutContent(
              view,
              elemOrWrapper,
              table.pos + 1,
              minWidth,
              table.node,
            );
          }
        }
      },
    }),
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
          const { dragging } = pluginKey.getState(view.state);
          if (dragging) {
            updateControls(view.state);
          }
          return false;
        },
        mouseleave(view) {
          handleMouseLeave(view);
          updateControls(view.state);
          return true;
        },
        mousedown(view, event) {
          return handleMouseDown(view, event, cellMinWidth);
        },
      },

      decorations(state) {
        const { activeHandle } = pluginKey.getState(state);
        if (typeof activeHandle === 'number' && activeHandle > -1) {
          return handleDecorations(state, activeHandle);
        }
      },

      nodeViews: {},
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
        cell = edgeCell(view, event, 'left');
      } else if (right - event.clientX <= handleWidth) {
        cell = edgeCell(view, event, 'right');
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

function handleMouseDown(view, event, cellMinWidth) {
  const { state } = view;
  const { activeHandle, dragging } = pluginKey.getState(state) as ResizeState;

  if (activeHandle === -1 || dragging) {
    return false;
  }

  let cell = view.state.doc.nodeAt(activeHandle);
  let $cell = view.state.doc.resolve(activeHandle);
  let $originalTable = $cell.node(-1);
  let dom = view.domAtPos($cell.start(-1)).node;
  while (dom.nodeName !== 'TABLE') {
    dom = dom.parentNode;
  }

  const containerWidth = widthPluginKey.getState(view.state).width;
  const resizer = Resizer.fromDOM(dom, {
    minWidth: cellMinWidth,
    maxSize: getLayoutSize(dom.getAttribute('data-layout'), containerWidth),
    node: $cell.node(-1),
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

function handleDecorations(state, cell) {
  let decorations = [] as Decoration[];
  let $cell = state.doc.resolve(cell);
  let table = $cell.node(-1);
  let map = TableMap.get(table);
  let start = $cell.start(-1);
  let col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan;
  for (let row = 0; row < map.height; row++) {
    let index = col + row * map.width - 1;
    // For positions that are have either a different cell or the end
    // of the table to their right, and either the top of the table or
    // a different cell above them, add a decoration
    if (
      (col === map.width || map.map[index] !== map.map[index + 1]) &&
      (row === 0 || map.map[index - 1] !== map.map[index - 1 - map.width])
    ) {
      let cellPos = map.map[index];
      let pos = start + cellPos + table.nodeAt(cellPos).nodeSize - 1;
      let dom = document.createElement('div');
      dom.className = ClassName.COLUMN_RESIZE_HANDLE;
      decorations.push(Decoration.widget(pos, dom));
    }
  }
  return DecorationSet.create(state.doc, decorations);
}
