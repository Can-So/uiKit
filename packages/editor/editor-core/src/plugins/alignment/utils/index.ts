import { findParentNodeOfType } from 'prosemirror-utils';
import { EditorState, Transaction } from 'prosemirror-state';
import { AlignmentState } from '../pm-plugins/main';

export const canApplyAlignment = (state: EditorState): boolean => {
  const { schema, selection } = state;
  const parent = selection.$from.node(selection.$from.depth - 1);

  /** Codeblocks are a special case where parent in text selection is the code block itself */
  const isCodeblock = selection.$anchor.parent.type === schema.nodes.codeBlock;
  return (
    parent && parent.type.allowsMarkType(schema.marks.alignment) && !isCodeblock
  );
};

export const removeAlignment = (
  state: EditorState,
): Transaction | undefined => {
  const { selection, schema } = state;
  let { tr } = state;

  /** Saves an extra dispatch */
  let alignmentExists = false;

  /**
   * When you need to toggle the selection
   * when another type which does not allow alignment is applied
   */
  state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
    if (
      node.type === state.schema.nodes.paragraph &&
      node.marks.some(mark => mark.type === schema.marks.alignment)
    ) {
      alignmentExists = true;
      const resolvedPos = state.doc.resolve(pos);
      const withoutAlignmentMark = node.marks.filter(
        mark => mark.type !== schema.marks.alignment,
      );
      tr = tr.setNodeMarkup(
        resolvedPos.pos,
        undefined,
        node.attrs,
        withoutAlignmentMark,
      );
    }
  });
  return alignmentExists ? tr : undefined;
};

export const isAlignmentAllowed = (state, node, resolvedPos) => {
  const { schema } = state;
  const { parent } = resolvedPos;
  return (
    (node.type === schema.nodes.paragraph ||
      node.type === schema.nodes.heading) &&
    parent.type.allowsMarkType(schema.marks.alignment)
  );
};

export const getActiveAlignment = (state): AlignmentState | undefined => {
  const node = findParentNodeOfType([
    state.schema.nodes.paragraph,
    state.schema.nodes.heading,
  ])(state.selection);
  const getMark =
    node &&
    node.node.marks.filter(
      mark => mark.type === state.schema.marks.alignment,
    )[0];

  return (getMark && getMark.attrs.align) || 'start';
};
