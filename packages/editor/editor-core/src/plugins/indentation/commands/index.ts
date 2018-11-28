import { Node as PmNode, Schema } from 'prosemirror-model';
import { IndentationMarkAttributes } from '@atlaskit/editor-common';
import { toggleBlockMark } from '../../../commands';
import { Command } from '../../../types/command';

const isIndentationAllowed = (schema: Schema, node: PmNode, parent: PmNode) => {
  const {
    nodes: { paragraph, heading },
    marks: { alignment },
  } = schema;

  if ([paragraph, heading].indexOf(node.type) > -1) {
    if (alignment) {
      const hasAlignment = node.marks.filter(
        mark => mark.type === alignment,
      )[0];
      return !hasAlignment;
    }
    return true;
  }
  return false;
};

export const indent: Command = (state, dispatch) => {
  const { indentation } = state.schema.marks;

  return toggleBlockMark<IndentationMarkAttributes>(
    indentation,
    oldMark =>
      // No mark - add a mark with level 1
      !oldMark
        ? { level: 1 }
        : // Level is at 6 or higher - do nothing
        oldMark.level >= 6
        ? undefined
        : // For other cases - increase level by 1
          { level: oldMark.level + 1 },
    isIndentationAllowed,
  )(state, dispatch);
};

export const outdent: Command = (state, dispatch) => {
  const { indentation } = state.schema.marks;
  return toggleBlockMark<IndentationMarkAttributes>(
    indentation,
    oldMark =>
      // No mark - do nothing
      !oldMark
        ? undefined
        : // Level is at 1 or lower - remove the mark
        oldMark.level <= 1
        ? false
        : // For other cases - decrease level by 1
          { level: oldMark.level - 1 },
    isIndentationAllowed,
  )(state, dispatch);
};

export const removeIndentation: Command = (state, dispatch) =>
  toggleBlockMark(state.schema.marks.indentation, () => false)(state, dispatch);
