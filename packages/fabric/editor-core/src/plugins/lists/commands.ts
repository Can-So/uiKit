import { Schema, ResolvedPos } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import * as baseListCommand from 'prosemirror-schema-list';
import * as commands from '../../commands';
import { liftFollowingList } from '../../commands/lists';
import { isEmptyNode } from '../../editor/utils/document';

export const enterKeyCommand = (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
): boolean => {
  const { selection } = state;
  if (selection.empty) {
    const { $from } = selection;
    const { listItem } = state.schema.nodes;
    const node = $from.node($from.depth);
    const wrapper = $from.node($from.depth - 1);
    if (wrapper && wrapper.type === listItem) {
      if (isEmptyNode(node)) {
        return commands.outdentList()(state, dispatch);
      } else {
        return baseListCommand.splitListItem(listItem)(state, dispatch);
      }
    }
  }
  return false;
};

export const toggleList = (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
  view: EditorView,
  listType: 'bulletList' | 'orderedList',
): boolean => {
  const { selection } = state;
  const { bulletList, orderedList, listItem } = state.schema.nodes;
  const fromNode = selection.$from.node(selection.$from.depth - 2);
  const endNode = selection.$to.node(selection.$to.depth - 2);
  if (
    !fromNode ||
    fromNode.type.name !== listType ||
    (!endNode || endNode.type.name !== listType)
  ) {
    return commands.toggleList(listType)(state, dispatch, view);
  } else {
    let rootListDepth;
    for (let i = selection.$to.depth - 1; i > 0; i--) {
      const node = selection.$to.node(i);
      if (node.type === bulletList || node.type === orderedList) {
        rootListDepth = i;
      }
      if (
        node.type !== bulletList &&
        node.type !== orderedList &&
        node.type !== listItem
      ) {
        break;
      }
    }
    let tr = liftFollowingList(
      state,
      selection.$to.pos,
      selection.$to.end(rootListDepth),
      rootListDepth,
      state.tr,
    );
    tr = liftSelectionList(state, tr);
    dispatch(tr);
    return true;
  }
};

/**
 * The function will list paragraphs in selection out to level 1 below root list.
 */
function liftSelectionList(state: EditorState, tr: Transaction): Transaction {
  const { from, to } = state.selection;
  const { paragraph } = state.schema.nodes;
  const listCol: any[] = [];
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type === paragraph) {
      listCol.push({ node, pos });
    }
  });
  for (let i = listCol.length - 1; i >= 0; i--) {
    const paragraph = listCol[i];
    const start = tr.doc.resolve(tr.mapping.map(paragraph.pos));
    if (start.depth > 0) {
      let end;
      if (paragraph.node.textContent && paragraph.node.textContent.length > 0) {
        end = tr.doc.resolve(
          tr.mapping.map(paragraph.pos + paragraph.node.textContent.length),
        );
      } else {
        end = tr.doc.resolve(tr.mapping.map(paragraph.pos + 1));
      }
      const range = start.blockRange(end)!;
      tr.lift(range, listLiftTarget(state.schema, start));
    }
  }
  return tr;
}

/**
 * This will return (depth - 1) for root list parent of a list.
 */
function listLiftTarget(schema: Schema, resPos: ResolvedPos): number {
  let target = resPos.depth;
  const { bulletList, orderedList, listItem } = schema.nodes;
  for (let i = resPos.depth; i > 0; i--) {
    const node = resPos.node(i);
    if (node.type === bulletList || node.type === orderedList) {
      target = i;
    }
    if (
      node.type !== bulletList &&
      node.type !== orderedList &&
      node.type !== listItem
    ) {
      break;
    }
  }
  return target - 1;
}
