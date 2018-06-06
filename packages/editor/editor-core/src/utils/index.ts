import { toggleMark } from 'prosemirror-commands';
import {
  Fragment,
  Mark,
  MarkType,
  Node,
  NodeType,
  ResolvedPos,
  Slice,
  Schema,
} from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import {
  EditorState,
  NodeSelection,
  Selection,
  TextSelection,
  Transaction,
} from 'prosemirror-state';
import { liftTarget, findWrapping } from 'prosemirror-transform';
import { LEFT } from '../keymaps';
import {
  JSONTransformer,
  JSONDocNode,
  JSONNode,
} from '@atlaskit/editor-json-transformer';
import { FakeTextCursorSelection } from '../plugins/fake-text-cursor/cursor';
import { stateKey as tableStateKey } from '../plugins/table/pm-plugins/main';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { GapCursorSelection, Side } from '../plugins/gap-cursor/selection';

export * from './document';
export * from './action';

export {
  default as ErrorReporter,
  ErrorReportingHandler,
} from './error-reporter';
export { JSONDocNode, JSONNode };

export { filterContentByType } from './filter';

function validateNode(node: Node): boolean {
  return false;
}

function isMarkTypeCompatibleWithMark(markType: MarkType, mark: Mark): boolean {
  return !mark.type.excludes(markType) && !markType.excludes(mark.type);
}

function isMarkTypeAllowedInNode(
  markType: MarkType,
  state: EditorState,
): boolean {
  return toggleMark(markType)(state);
}

function closest(node: HTMLElement | null, s: string): HTMLElement | null {
  let el = node as HTMLElement;
  if (!el) {
    return null;
  }
  if (!document.documentElement.contains(el)) {
    return null;
  }
  const matches = el.matches ? 'matches' : 'msMatchesSelector';

  do {
    if (el[matches](s)) {
      return el;
    }
    el = (el.parentElement || el.parentNode) as HTMLElement;
  } while (el !== null && el.nodeType === 1);
  return null;
}

export const isImage = (fileType?: string): boolean => {
  return !!fileType && fileType.indexOf('image/') > -1;
};

export function canMoveUp(state: EditorState): boolean {
  const { selection, doc } = state;

  /**
   * If there's a media element on the selection,
   * add text blocks with arrow navigation.
   * Also, the selection could be media | mediaGroup.
   */
  if (selection instanceof NodeSelection) {
    if (selection.node.type.name === 'media') {
      /** Weird way of checking if the previous element is a paragraph */
      const mediaAncestorNode = doc.nodeAt(selection.anchor - 3);
      return !!(
        mediaAncestorNode && mediaAncestorNode.type.name === 'paragraph'
      );
    } else if (selection.node.type.name === 'mediaGroup') {
      const mediaGroupAncestorNode = selection.$anchor.nodeBefore;
      return !!(
        mediaGroupAncestorNode &&
        mediaGroupAncestorNode.type.name === 'paragraph'
      );
    }
  }

  if (selection instanceof TextSelection) {
    if (!selection.empty) {
      return true;
    }
  }

  return !atTheBeginningOfDoc(state);
}

export function canMoveDown(state: EditorState): boolean {
  const { selection, doc } = state;

  /**
   * If there's a media element on the selection,
   * add text blocks with arrow navigation.
   * Also, the selection could be media | mediaGroup.
   */
  if (selection instanceof NodeSelection) {
    if (selection.node.type.name === 'media') {
      const nodeAfter = doc.nodeAt(selection.$head.after());
      return !!(nodeAfter && nodeAfter.type.name === 'paragraph');
    } else if (selection.node.type.name === 'mediaGroup') {
      return !(
        selection.$head.parentOffset === selection.$anchor.parent.content.size
      );
    }
  }
  if (selection instanceof TextSelection) {
    if (!selection.empty) {
      return true;
    }
  }

  return !atTheEndOfDoc(state);
}

export function atTheEndOfDoc(state: EditorState): boolean {
  const { selection, doc } = state;
  return doc.nodeSize - selection.$to.pos - 2 === selection.$to.depth;
}

export function atTheBeginningOfDoc(state: EditorState): boolean {
  const { selection } = state;
  return selection.$from.pos === selection.$from.depth;
}

export function atTheEndOfBlock(state: EditorState): boolean {
  const { selection } = state;
  const { $to } = selection;
  if (selection instanceof GapCursorSelection) {
    return false;
  }
  if (selection instanceof NodeSelection && selection.node.isBlock) {
    return true;
  }
  return endPositionOfParent($to) === $to.pos + 1;
}

export function atTheBeginningOfBlock(state: EditorState): boolean {
  const { selection } = state;
  const { $from } = selection;
  if (selection instanceof GapCursorSelection) {
    return false;
  }
  if (selection instanceof NodeSelection && selection.node.isBlock) {
    return true;
  }
  return startPositionOfParent($from) === $from.pos;
}

export function startPositionOfParent(resolvedPos: ResolvedPos): number {
  return resolvedPos.start(resolvedPos.depth);
}

export function endPositionOfParent(resolvedPos: ResolvedPos): number {
  return resolvedPos.end(resolvedPos.depth) + 1;
}

export function getCursor(selection: Selection): ResolvedPos | undefined {
  return (selection as TextSelection).$cursor || undefined;
}

/**
 * Check if a mark is allowed at the current selection / cursor based on a given state.
 * This method looks at both the currently active marks on the transaction, as well as
 * the node and marks at the current selection to determine if the given mark type is
 * allowed.
 */
export function isMarkTypeAllowedInCurrentSelection(
  markType: MarkType,
  state: EditorState,
) {
  if (state.selection instanceof FakeTextCursorSelection) {
    return true;
  }

  if (!isMarkTypeAllowedInNode(markType, state)) {
    return false;
  }

  const { empty, $cursor, ranges } = state.selection as TextSelection;
  if (empty && !$cursor) {
    return false;
  }

  let isCompatibleMarkType = mark =>
    isMarkTypeCompatibleWithMark(markType, mark);

  // Handle any new marks in the current transaction
  if (
    state.tr.storedMarks &&
    !state.tr.storedMarks.every(isCompatibleMarkType)
  ) {
    return false;
  }

  if ($cursor) {
    return $cursor.marks().every(isCompatibleMarkType);
  }

  // Check every node in a selection - ensuring that it is compatible with the current mark type
  return ranges.every(({ $from, $to }) => {
    let allowedInActiveMarks =
      $from.depth === 0 ? state.doc.marks.every(isCompatibleMarkType) : true;

    state.doc.nodesBetween($from.pos, $to.pos, node => {
      allowedInActiveMarks =
        allowedInActiveMarks && node.marks.every(isCompatibleMarkType);
    });

    return allowedInActiveMarks;
  });
}

/**
 * Step through block-nodes between $from and $to and returns false if a node is
 * found that isn't of the specified type
 */
export function isRangeOfType(
  doc,
  $from: ResolvedPos,
  $to: ResolvedPos,
  nodeType: NodeType,
): boolean {
  return (
    getAncestorNodesBetween(doc, $from, $to).filter(
      node => node.type !== nodeType,
    ).length === 0
  );
}

export function createSliceWithContent(content: string, state: EditorState) {
  return new Slice(Fragment.from(state.schema.text(content)), 0, 0);
}

/**
 * Determines if content inside a selection can be joined with the next block.
 * We need this check since the built-in method for "joinDown" will join a orderedList with bulletList.
 */
export function canJoinDown(
  selection: Selection,
  doc: any,
  nodeType: NodeType,
): boolean {
  const res = doc.resolve(
    selection.$to.after(findAncestorPosition(doc, selection.$to).depth),
  );
  return res.nodeAfter && res.nodeAfter.type === nodeType;
}

export const setNodeSelection = (view: EditorView, pos: number) => {
  const { state, dispatch } = view;

  if (!isFinite(pos)) {
    return;
  }

  const tr = state.tr.setSelection(NodeSelection.create(state.doc, pos));
  dispatch(tr);
};

export function setTextSelection(
  view: EditorView,
  anchor: number,
  head?: number,
) {
  const { state } = view;
  const tr = state.tr.setSelection(
    TextSelection.create(state.doc, anchor, head),
  );
  view.dispatch(tr);
}

export function setGapCursorSelection(
  view: EditorView,
  pos: number,
  side: Side,
) {
  const { state } = view;
  view.dispatch(
    state.tr.setSelection(new GapCursorSelection(state.doc.resolve(pos), side)),
  );
}

/**
 * Determines if content inside a selection can be joined with the previous block.
 * We need this check since the built-in method for "joinUp" will join a orderedList with bulletList.
 */
export function canJoinUp(
  selection: Selection,
  doc: any,
  nodeType: NodeType,
): boolean {
  const res = doc.resolve(
    selection.$from.before(findAncestorPosition(doc, selection.$from).depth),
  );
  return res.nodeBefore && res.nodeBefore.type === nodeType;
}

/**
 * Returns all top-level ancestor-nodes between $from and $to
 */
export function getAncestorNodesBetween(
  doc,
  $from: ResolvedPos,
  $to: ResolvedPos,
): Node[] {
  const nodes = Array<Node>();
  const maxDepth = findAncestorPosition(doc, $from).depth;
  let current = doc.resolve($from.start(maxDepth));

  while (current.pos <= $to.start($to.depth)) {
    const depth = Math.min(current.depth, maxDepth);
    const node = current.node(depth);

    if (node) {
      nodes.push(node);
    }

    if (depth === 0) {
      break;
    }

    let next: ResolvedPos = doc.resolve(current.after(depth));
    if (next.start(depth) >= doc.nodeSize - 2) {
      break;
    }

    if (next.depth !== current.depth) {
      next = doc.resolve(next.pos + 2);
    }

    if (next.depth) {
      current = doc.resolve(next.start(next.depth));
    } else {
      current = doc.resolve(next.end(next.depth));
    }
  }

  return nodes;
}

/**
 * Finds all "selection-groups" within a range. A selection group is based on ancestors.
 *
 * Example:
 * Given the following document and selection ({<} = start of selection and {>} = end)
 *  doc
 *    blockquote
 *      ul
 *        li
 *        li{<}
 *        li
 *     p
 *     p{>}
 *
 * The output will be two selection-groups. One within the ul and one with the two paragraphs.
 */
export function getGroupsInRange(
  doc,
  $from: ResolvedPos,
  $to: ResolvedPos,
  isNodeValid: (node: Node) => boolean = validateNode,
): Array<{ $from: ResolvedPos; $to: ResolvedPos }> {
  const groups = Array<{ $from: ResolvedPos; $to: ResolvedPos }>();
  const commonAncestor = hasCommonAncestor(doc, $from, $to);
  const fromAncestor = findAncestorPosition(doc, $from);

  if (
    commonAncestor ||
    (fromAncestor.depth === 1 && isNodeValid($from.node(1)!))
  ) {
    groups.push({ $from, $to });
  } else {
    let current = $from;

    while (current.pos < $to.pos) {
      let ancestorPos = findAncestorPosition(doc, current);
      while (ancestorPos.depth > 1) {
        ancestorPos = findAncestorPosition(doc, ancestorPos);
      }

      const endPos = doc.resolve(
        Math.min(
          // should not be smaller then start position in case of an empty paragraph for example.
          Math.max(
            ancestorPos.start(ancestorPos.depth),
            ancestorPos.end(ancestorPos.depth) - 3,
          ),
          $to.pos,
        ),
      );

      groups.push({
        $from: current,
        $to: endPos,
      });

      current = doc.resolve(Math.min(endPos.after(1) + 1, doc.nodeSize - 2));
    }
  }

  return groups;
}

/**
 * Traverse the document until an "ancestor" is found. Any nestable block can be an ancestor.
 */
export function findAncestorPosition(doc: Node, pos: any): any {
  const nestableBlocks = ['blockquote', 'bulletList', 'orderedList'];

  if (pos.depth === 1) {
    return pos;
  }

  let node: Node | undefined = pos.node(pos.depth);
  let newPos = pos;
  while (pos.depth >= 1) {
    pos = doc.resolve(pos.before(pos.depth));
    node = pos.node(pos.depth);

    if (node && nestableBlocks.indexOf(node.type.name) !== -1) {
      newPos = pos;
    }
  }

  return newPos;
}

/**
 * Determine if two positions have a common ancestor.
 */
export function hasCommonAncestor(
  doc,
  $from: ResolvedPos,
  $to: ResolvedPos,
): boolean {
  let current;
  let target;

  if ($from.depth > $to.depth) {
    current = findAncestorPosition(doc, $from);
    target = findAncestorPosition(doc, $to);
  } else {
    current = findAncestorPosition(doc, $to);
    target = findAncestorPosition(doc, $from);
  }

  while (current.depth > target.depth && current.depth > 1) {
    current = findAncestorPosition(doc, current);
  }

  return current.node(current.depth) === target.node(target.depth);
}

/**
 * Takes a selection $from and $to and lift all text nodes from their parents to document-level
 */
export function liftSelection(tr, doc, $from: ResolvedPos, $to: ResolvedPos) {
  let startPos = $from.start($from.depth);
  let endPos = $to.end($to.depth);
  const target = Math.max(0, findAncestorPosition(doc, $from).depth - 1);

  tr.doc.nodesBetween(startPos, endPos, (node, pos) => {
    if (
      node.isText || // Text node
      (node.isTextblock && !node.textContent) // Empty paragraph
    ) {
      const res = tr.doc.resolve(tr.mapping.map(pos));
      const sel = new NodeSelection(res);
      const range = sel.$from.blockRange(sel.$to)!;

      if (liftTarget(range) !== undefined) {
        tr.lift(range, target);
      }
    }
  });

  startPos = tr.mapping.map(startPos);
  endPos = tr.mapping.map(endPos);
  endPos = tr.doc.resolve(endPos).end(tr.doc.resolve(endPos).depth); // We want to select the entire node

  tr.setSelection(
    new TextSelection(tr.doc.resolve(startPos), tr.doc.resolve(endPos)),
  );

  return {
    tr: tr,
    $from: tr.doc.resolve(startPos),
    $to: tr.doc.resolve(endPos),
  };
}

/**
 * Lift nodes in block to one level above.
 */
export function liftSiblingNodes(view: EditorView) {
  const { tr } = view.state;
  const { $from, $to } = view.state.selection;
  const blockStart = tr.doc.resolve($from.start($from.depth - 1));
  const blockEnd = tr.doc.resolve($to.end($to.depth - 1));
  const range = blockStart.blockRange(blockEnd)!;
  view.dispatch(tr.lift(range, blockStart.depth - 1));
}

/**
 * Lift sibling nodes to document-level and select them.
 */
export function liftAndSelectSiblingNodes(view: EditorView): Transaction {
  const { tr } = view.state;
  const { $from, $to } = view.state.selection;
  const blockStart = tr.doc.resolve($from.start($from.depth - 1));
  const blockEnd = tr.doc.resolve($to.end($to.depth - 1));
  const range = blockStart.blockRange(blockEnd)!;
  tr.setSelection(new TextSelection(blockStart, blockEnd));
  tr.lift(range, blockStart.depth - 1);
  return tr;
}

export function wrapIn(
  nodeType: NodeType,
  tr: Transaction,
  $from: ResolvedPos,
  $to: ResolvedPos,
): Transaction {
  const range = $from.blockRange($to) as any;
  const wrapping = range && (findWrapping(range, nodeType) as any);
  if (wrapping) {
    tr = tr.wrap(range, wrapping).scrollIntoView();
  }
  return tr;
}

const transformer = new JSONTransformer();
export function toJSON(node: Node): JSONDocNode {
  return transformer.encode(node);
}

/**
 * Repeating string for multiple times
 */
export function stringRepeat(text: string, length: number): string {
  let result = '';
  for (let x = 0; x < length; x++) {
    result += text;
  }
  return result;
}

/**
 * A replacement for `Array.from` until it becomes widely implemented.
 */
export function arrayFrom(obj: any): any[] {
  return Array.prototype.slice.call(obj);
}

/**
 * Replacement for Element.closest, until it becomes widely implemented
 * Returns the ancestor element of a particular type if exists or null
 */
export function closestElement(
  node: HTMLElement | null,
  s: string,
): HTMLElement | null {
  return closest(node, s);
}

export function moveLeft(view: EditorView) {
  const event = new CustomEvent('keydown', {
    bubbles: true,
    cancelable: true,
  });
  (event as any).keyCode = LEFT;

  (view as any).dispatchEvent(event);
}

/**
 * Function will create a list of wrapper blocks present in a selection.
 */
function getSelectedWrapperNodes(state: EditorState): NodeType[] {
  const nodes: any[] = [];
  if (state.selection) {
    const { $from, $to } = state.selection;
    const {
      blockquote,
      panel,
      orderedList,
      bulletList,
      listItem,
      codeBlock,
    } = state.schema.nodes;
    state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (
        (node.isBlock &&
          [blockquote, panel, orderedList, bulletList, listItem].indexOf(
            node.type,
          ) >= 0) ||
        node.type === codeBlock
      ) {
        nodes.push(node.type);
      }
    });
  }
  return nodes;
}

/**
 * Function will check if changing block types: Paragraph, Heading is enabled.
 */
export function areBlockTypesDisabled(state: EditorState): boolean {
  const nodesTypes: NodeType[] = getSelectedWrapperNodes(state);
  const { panel } = state.schema.nodes;
  return nodesTypes.filter(type => type !== panel).length > 0;
}

export const isTemporary = (id: string): boolean => {
  return id.indexOf('temporary:') === 0;
};

// @see: https://github.com/ProseMirror/prosemirror/issues/710
// @see: https://bugs.chromium.org/p/chromium/issues/detail?id=740085
// Chrome >= 58
export const isChromeWithSelectionBug =
  parseInt((navigator.userAgent.match(/Chrome\/(\d{2})/) || [])[1], 10) >= 58;

export const isEmptyNode = (schema: Schema) => {
  const {
    doc,
    paragraph,
    codeBlock,
    blockquote,
    panel,
    heading,
    listItem,
    bulletList,
    orderedList,
    taskList,
    taskItem,
    decisionList,
    decisionItem,
    media,
    mediaGroup,
    mediaSingle,
  } = schema.nodes;
  const innerIsEmptyNode = (node: Node) => {
    switch (node.type) {
      case media:
      case mediaGroup:
      case mediaSingle:
        return false;
      case paragraph:
      case codeBlock:
      case heading:
      case taskItem:
      case decisionItem:
        return node.content.size === 0;
      case blockquote:
      case panel:
      case listItem:
        return (
          node.content.size === 2 && innerIsEmptyNode(node.content.firstChild!)
        );
      case bulletList:
      case orderedList:
        return (
          node.content.size === 4 && innerIsEmptyNode(node.content.firstChild!)
        );
      case taskList:
      case decisionList:
        return (
          node.content.size === 2 && innerIsEmptyNode(node.content.firstChild!)
        );
      case doc:
        let isEmpty = true;
        node.content.forEach(child => {
          isEmpty = isEmpty && innerIsEmptyNode(child);
        });
        return isEmpty;
      default:
        throw new Error(`${node.type.name} node is not implemented`);
    }
  };
  return innerIsEmptyNode;
};

export const isTableCell = (state: EditorState) => {
  const pluginState = tableStateKey.getState(state);
  return !!(pluginState && pluginState.tableNode);
};

export const isElementInTableCell = (
  element: HTMLElement | null,
): HTMLElement | null => {
  return closest(element, 'td') || closest(element, 'th');
};

export const isLastItemMediaGroup = (node: Node): boolean => {
  const { content } = node;
  return !!content.lastChild && content.lastChild.type.name === 'mediaGroup';
};

export const isInListItem = (state: EditorState): boolean => {
  return hasParentNodeOfType(state.schema.nodes.listItem)(state.selection);
};

export const hasOpenEnd = (slice: Slice): boolean => {
  return slice.openStart > 0 || slice.openEnd > 0;
};
