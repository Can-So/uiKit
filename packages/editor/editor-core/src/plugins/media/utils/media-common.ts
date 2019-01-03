import { deleteSelection, splitBlock } from 'prosemirror-commands';
import { Node as PMNode, ResolvedPos, Fragment } from 'prosemirror-model';
import { EditorState, NodeSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  createParagraphNear,
  createNewParagraphBelow,
} from '../../../commands';
import {
  moveLeft,
  atTheBeginningOfDoc,
  isTemporary,
  atTheEndOfBlock,
  atTheBeginningOfBlock,
  endPositionOfParent,
  startPositionOfParent,
} from '../../../utils';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { MediaState } from '../types';

export const posOfMediaGroupNearby = (
  state: EditorState,
): number | undefined => {
  return (
    posOfParentMediaGroup(state) ||
    posOfFollowingMediaGroup(state) ||
    posOfPrecedingMediaGroup(state)
  );
};

export const isSelectionNonMediaBlockNode = (state: EditorState): boolean => {
  const { node } = state.selection as NodeSelection;

  return node && node.type !== state.schema.nodes.media && node.isBlock;
};

export const posOfPrecedingMediaGroup = (
  state: EditorState,
): number | undefined => {
  if (!atTheBeginningOfBlock(state)) {
    return;
  }

  return posOfMediaGroupAbove(state, state.selection.$from);
};

const posOfFollowingMediaGroup = (state: EditorState): number | undefined => {
  if (!atTheEndOfBlock(state)) {
    return;
  }
  return posOfMediaGroupBelow(state, state.selection.$to);
};

const posOfMediaGroupAbove = (
  state: EditorState,
  $pos: ResolvedPos,
): number | undefined => {
  let adjacentPos;
  let adjacentNode;

  if (isSelectionNonMediaBlockNode(state)) {
    adjacentPos = $pos.pos;
    adjacentNode = $pos.nodeBefore;
  } else {
    adjacentPos = startPositionOfParent($pos) - 1;
    adjacentNode = state.doc.resolve(adjacentPos).nodeBefore;
  }

  if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
    return adjacentPos - adjacentNode.nodeSize + 1;
  }
};

/**
 * Determine whether the cursor is inside empty paragraph
 * or the selection is the entire paragraph
 */
export const isInsidePotentialEmptyParagraph = (
  state: EditorState,
): boolean => {
  const { $from } = state.selection;

  return (
    $from.parent.type === state.schema.nodes.paragraph &&
    atTheBeginningOfBlock(state) &&
    atTheEndOfBlock(state)
  );
};

export const posOfMediaGroupBelow = (
  state: EditorState,
  $pos: ResolvedPos,
  prepend: boolean = true,
): number | undefined => {
  let adjacentPos;
  let adjacentNode;

  if (isSelectionNonMediaBlockNode(state)) {
    adjacentPos = $pos.pos;
    adjacentNode = $pos.nodeAfter;
  } else {
    adjacentPos = endPositionOfParent($pos);
    adjacentNode = state.doc.nodeAt(adjacentPos);
  }

  if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
    return prepend ? adjacentPos + 1 : adjacentPos + adjacentNode.nodeSize - 1;
  }
};

export const posOfParentMediaGroup = (
  state: EditorState,
  $pos?: ResolvedPos,
  prepend: boolean = true,
): number | undefined => {
  const { $from } = state.selection;
  $pos = $pos || $from;

  if ($pos.parent.type === state.schema.nodes.mediaGroup) {
    return prepend
      ? startPositionOfParent($pos)
      : endPositionOfParent($pos) - 1;
  }
};

/**
 * Typescript only supports `padStart` with target ES2017
 */
const padZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);

/**
 * Append timestamp to a filename, this function assumes `name` will have
 * filename and extension. eg.- 123.xyz (valid), 123 (invalid)
 * @param name filename with extension
 * @param time unix timestamp
 */
export const appendTimestamp = (name: string, time: number) => {
  const pos = name.lastIndexOf('.');
  const fileName = name.substring(0, pos);
  const extension = name.substring(pos);

  const date = new Date(time);
  const formattedDate = `${date.getUTCFullYear()}${padZero(
    date.getUTCMonth() + 1,
  )}${padZero(date.getUTCDate())}`;
  const formattedTime = `${padZero(date.getUTCHours())}${padZero(
    date.getUTCMinutes(),
  )}${padZero(date.getUTCSeconds())}`;

  return `${fileName}-${formattedDate}-${formattedTime}${extension}`;
};

/**
 * The function will return the position after current selection where mediaGroup can be inserted.
 */
export function endPositionForMedia(
  state: EditorState,
  resolvedPos: ResolvedPos,
): number {
  const { mediaGroup } = state.schema.nodes;
  let i = resolvedPos.depth;
  for (; i > 1; i--) {
    const nodeType = resolvedPos.node(i).type;
    if (nodeType.validContent(Fragment.from(mediaGroup.create()))) {
      break;
    }
  }
  return resolvedPos.end(i) + 1;
}

export const removeMediaNode = (
  view: EditorView,
  node: PMNode,
  getPos: ProsemirrorGetPosHandler,
) => {
  const { id } = node.attrs;
  const { state } = view;
  const { tr, selection, doc } = state;

  const currentMediaNodePos = getPos();
  tr.deleteRange(currentMediaNodePos, currentMediaNodePos + node.nodeSize);

  if (isTemporary(id)) {
    tr.setMeta('addToHistory', false);
  }

  view.dispatch(tr);

  const $currentMediaNodePos = doc.resolve(currentMediaNodePos);
  const isLastMediaNode =
    $currentMediaNodePos.index() === $currentMediaNodePos.parent.childCount - 1;

  // If deleting a selected media node, we need to tell where the cursor to go next.
  // Prosemirror didn't gave us the behaviour of moving left if the media node is not the last one.
  // So we handle it ourselves.
  if (
    selection.from === currentMediaNodePos &&
    !isLastMediaNode &&
    !atTheBeginningOfDoc(state)
  ) {
    moveLeft(view);
  }
};

export const splitMediaGroup = (view: EditorView): boolean => {
  const { selection } = view.state;

  // if selection is not a media node, do nothing.
  if (
    !(selection instanceof NodeSelection) ||
    selection.node.type !== view.state.schema.nodes.media
  ) {
    return false;
  }

  deleteSelection(view.state, view.dispatch);

  if (selection.$to.nodeAfter) {
    splitBlock(view.state, view.dispatch);
    createParagraphNear(false)(view.state, view.dispatch);
  } else {
    createNewParagraphBelow(view.state, view.dispatch);
  }

  return true;
};

const isOptionalAttr = (attr: string) =>
  attr.length > 1 && attr[0] === '_' && attr[1] === '_';

export const copyOptionalAttrsFromMediaState = (
  mediaState: MediaState,
  node: PMNode,
) => {
  Object.keys(node.attrs)
    .filter(isOptionalAttr)
    .forEach(key => {
      const mediaStateKey = key.substring(2);
      const attrValue = mediaState[mediaStateKey];
      if (attrValue !== undefined) {
        node.attrs[key] = attrValue;
      }
    });
};
