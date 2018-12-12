import {
  Fragment,
  Slice,
  Node as PMNode,
  NodeType,
  MarkType,
  Schema,
} from 'prosemirror-model';
import { EditorState, NodeSelection, TextSelection } from 'prosemirror-state';
import {
  canMoveDown,
  canMoveUp,
  atTheEndOfDoc,
  atTheBeginningOfBlock,
  isTableCell,
} from '../utils';
import { Command } from '../types';

export function preventDefault(): Command {
  return function(state, dispatch) {
    return true;
  };
}

export function insertNewLine(): Command {
  return function(state, dispatch) {
    const { $from } = state.selection;
    const parent = $from.parent;
    const { hardBreak } = state.schema.nodes;

    if (hardBreak) {
      const hardBreakNode = hardBreak.create();

      if (parent && parent.type.validContent(Fragment.from(hardBreakNode))) {
        if (dispatch) {
          dispatch(state.tr.replaceSelectionWith(hardBreakNode));
        }
        return true;
      }
    }

    if (state.selection instanceof TextSelection) {
      if (dispatch) {
        dispatch(state.tr.insertText('\n'));
      }
      return true;
    }

    return false;
  };
}

export function insertRule(): Command {
  return function(state, dispatch) {
    const { to } = state.selection;
    const { rule } = state.schema.nodes;
    if (rule) {
      const ruleNode = rule.create();
      if (dispatch) {
        dispatch(state.tr.insert(to + 1, ruleNode));
      }
      return true;
    }
    return false;
  };
}

export function shouldAppendParagraphAfterBlockNode(state: EditorState) {
  return atTheEndOfDoc(state) && atTheBeginningOfBlock(state);
}

export function insertNodesEndWithNewParagraph(nodes: PMNode[]): Command {
  return function(state, dispatch) {
    const { tr, schema } = state;
    const { paragraph } = schema.nodes;
    const { head } = state.selection;

    if (shouldAppendParagraphAfterBlockNode(state)) {
      nodes.push(paragraph.create());
    }

    /** If table cell, the default is to move to the next cell, override to select paragraph */
    tr.replaceSelection(new Slice(Fragment.from(nodes), 0, 0));
    if (isTableCell(state)) {
      tr.setSelection(TextSelection.create(state.doc, head, head));
    }

    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}

export const createNewParagraphAbove: Command = (state, dispatch) => {
  const append = false;
  if (!canMoveUp(state) && canCreateParagraphNear(state)) {
    createParagraphNear(append)(state, dispatch);
    return true;
  }

  return false;
};

export const createNewParagraphBelow: Command = (state, dispatch) => {
  const append = true;
  if (!canMoveDown(state) && canCreateParagraphNear(state)) {
    createParagraphNear(append)(state, dispatch);
    return true;
  }

  return false;
};

function canCreateParagraphNear(state: EditorState): boolean {
  const {
    selection: { $from },
  } = state;
  const node = $from.node($from.depth);
  const insideCodeBlock = !!node && node.type === state.schema.nodes.codeBlock;
  const isNodeSelection = state.selection instanceof NodeSelection;
  return $from.depth > 1 || isNodeSelection || insideCodeBlock;
}

export function createParagraphNear(append: boolean = true): Command {
  return function(state, dispatch) {
    const paragraph = state.schema.nodes.paragraph;

    if (!paragraph) {
      return false;
    }

    let insertPos;

    if (state.selection instanceof TextSelection) {
      if (topLevelNodeIsEmptyTextBlock(state)) {
        return false;
      }
      insertPos = getInsertPosFromTextBlock(state, append);
    } else {
      insertPos = getInsertPosFromNonTextBlock(state, append);
    }

    const tr = state.tr.insert(insertPos, paragraph.createAndFill() as PMNode);
    tr.setSelection(TextSelection.create(tr.doc, insertPos + 1));

    if (dispatch) {
      dispatch(tr);
    }

    return true;
  };
}

function getInsertPosFromTextBlock(
  state: EditorState,
  append: boolean,
): number {
  const { $from, $to } = state.selection;
  let pos;
  if (!append) {
    pos = $from.start(0);
  } else {
    pos = $to.end(0);
  }
  return pos;
}

function getInsertPosFromNonTextBlock(
  state: EditorState,
  append: boolean,
): number {
  const { $from, $to } = state.selection;
  const nodeAtSelection =
    state.selection instanceof NodeSelection &&
    state.doc.nodeAt(state.selection.$anchor.pos);
  const isMediaSelection =
    nodeAtSelection && nodeAtSelection.type.name === 'mediaGroup';

  let pos;
  if (!append) {
    // The start position is different with text block because it starts from 0
    pos = $from.start($from.depth);
    // The depth is different with text block because it starts from 0
    pos = $from.depth > 0 && !isMediaSelection ? pos - 1 : pos;
  } else {
    pos = $to.end($to.depth);
    pos = $to.depth > 0 && !isMediaSelection ? pos + 1 : pos;
  }
  return pos;
}

function topLevelNodeIsEmptyTextBlock(state: EditorState): boolean {
  const topLevelNode = state.selection.$from.node(1);
  return (
    topLevelNode.isTextblock &&
    topLevelNode.type !== state.schema.nodes.codeBlock &&
    topLevelNode.nodeSize === 2
  );
}

export function createParagraphAtEnd(): Command {
  return function(state, dispatch) {
    const {
      doc,
      tr,
      schema: { nodes },
    } = state;
    if (
      doc.lastChild &&
      !(
        doc.lastChild.type === nodes.paragraph &&
        doc.lastChild.content.size === 0
      )
    ) {
      tr.insert(doc.content.size, nodes.paragraph.createAndFill() as PMNode);
    }
    tr.setSelection(TextSelection.create(tr.doc, tr.doc.content.size - 1));
    tr.scrollIntoView();
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}

/**
 * Toggles block mark based on the return type of `getAttrs`.
 * This is similar to ProseMirror's `getAttrs` from `AttributeSpec`
 * return `false` to remove the mark.
 * return `undefined for no-op.
 * return an `object` to update the mark.
 */
export const toggleBlockMark = <T = object>(
  markType: MarkType,
  getAttrs: ((prevAttrs?: T) => T | undefined | false),
  allowedBlocks?:
    | Array<NodeType>
    | ((schema: Schema, node: PMNode, parent: PMNode) => boolean),
): Command => (state, dispatch) => {
  const { from, to } = state.selection;

  let markApplied = false;
  const tr = state.tr;

  state.doc.nodesBetween(from, to, (node, pos, parent) => {
    if (!node.type.isBlock) {
      return false;
    }

    if (
      (!allowedBlocks ||
        (Array.isArray(allowedBlocks)
          ? allowedBlocks.indexOf(node.type) > -1
          : allowedBlocks(state.schema, node, parent))) &&
      parent.type.allowsMarkType(markType)
    ) {
      const oldMarks = node.marks.filter(mark => mark.type === markType);
      const newAttrs = getAttrs(
        oldMarks.length ? (oldMarks[0].attrs as T) : undefined,
      );

      if (newAttrs !== undefined) {
        tr.setNodeMarkup(
          pos,
          node.type,
          node.attrs,
          node.marks
            .filter(mark => !markType.excludes(mark.type))
            .concat(newAttrs === false ? [] : markType.create(newAttrs)),
        );
        markApplied = true;
      }
    }
  });

  if (markApplied && tr.docChanged) {
    if (dispatch) {
      dispatch(tr.scrollIntoView());
    }
    return true;
  }

  return false;
};
