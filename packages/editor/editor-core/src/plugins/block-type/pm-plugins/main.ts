import { Node, Schema } from 'prosemirror-model';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import {
  NORMAL_TEXT,
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
  BLOCK_QUOTE,
  CODE_BLOCK,
  PANEL,
  OTHER,
  BlockType,
  TEXT_BLOCK_TYPES,
  WRAPPER_BLOCK_TYPES,
  HEADINGS_BY_LEVEL,
} from '../types';
import { areBlockTypesDisabled } from '../../../utils';

export type BlockTypeState = {
  currentBlockType: BlockType;
  blockTypesDisabled: boolean;
  availableBlockTypes: BlockType[];
  availableWrapperBlockTypes: BlockType[];
};

const blockTypeForNode = (node: Node, schema: Schema): BlockType => {
  if (node.type === schema.nodes.heading) {
    const maybeNode = HEADINGS_BY_LEVEL[node.attrs['level']];
    if (maybeNode) {
      return maybeNode;
    }
  } else if (node.type === schema.nodes.paragraph) {
    return NORMAL_TEXT;
  }
  return OTHER;
};

const isBlockTypeSchemaSupported = (
  blockType: BlockType,
  state: EditorState,
) => {
  switch (blockType) {
    case NORMAL_TEXT:
      return !!state.schema.nodes.paragraph;
    case HEADING_1:
    case HEADING_2:
    case HEADING_3:
    case HEADING_4:
    case HEADING_5:
    case HEADING_6:
      return !!state.schema.nodes.heading;
    case BLOCK_QUOTE:
      return !!state.schema.nodes.blockquote;
    case CODE_BLOCK:
      return !!state.schema.nodes.codeBlock;
    case PANEL:
      return !!state.schema.nodes.panel;
  }
};

const detectBlockType = (
  availableBlockTypes: BlockType[],
  state: EditorState,
): BlockType => {
  // Before a document is loaded, there is no selection.
  if (!state.selection) {
    return NORMAL_TEXT;
  }
  let blockType;
  const { $from, $to } = state.selection;
  state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
    const nodeBlockType = availableBlockTypes.filter(
      blockType => blockType === blockTypeForNode(node, state.schema),
    );
    if (nodeBlockType.length > 0) {
      if (!blockType) {
        blockType = nodeBlockType[0];
      } else if (blockType !== OTHER && blockType !== nodeBlockType[0]) {
        blockType = OTHER;
      }
    }
  });
  return blockType || OTHER;
};

export const pluginKey = new PluginKey('blockTypePlugin');
export const createPlugin = (
  dispatch: (eventName: string | PluginKey, data: any) => void,
  appearance?,
) => {
  return new Plugin({
    appendTransaction(
      transactions: Transaction[],
      oldState: EditorState,
      newState: EditorState,
    ): Transaction | void {
      if (appearance === 'comment') {
        const pos = newState.doc.resolve(newState.doc.content.size - 1);
        const lastNode = pos.node(1);
        const { paragraph } = newState.schema.nodes;
        if (lastNode && lastNode.isBlock && lastNode.type !== paragraph) {
          return newState.tr.insert(
            newState.doc.content.size,
            newState.schema.nodes.paragraph.create(),
          );
        }
      }
    },

    state: {
      init(config, state: EditorState) {
        const availableBlockTypes = TEXT_BLOCK_TYPES.filter(blockType =>
          isBlockTypeSchemaSupported(blockType, state),
        );
        const availableWrapperBlockTypes = WRAPPER_BLOCK_TYPES.filter(
          blockType => isBlockTypeSchemaSupported(blockType, state),
        );

        return {
          currentBlockType: detectBlockType(availableBlockTypes, state),
          blockTypesDisabled: areBlockTypesDisabled(state),
          availableBlockTypes,
          availableWrapperBlockTypes,
        };
      },

      apply(
        tr,
        oldPluginState: BlockTypeState,
        oldState: EditorState,
        newState: EditorState,
      ) {
        const newPluginState = {
          ...oldPluginState,
          currentBlockType: detectBlockType(
            oldPluginState.availableBlockTypes,
            newState,
          ),
          blockTypesDisabled: areBlockTypesDisabled(newState),
        };

        if (
          newPluginState.currentBlockType !== oldPluginState.currentBlockType ||
          newPluginState.blockTypesDisabled !==
            oldPluginState.blockTypesDisabled
        ) {
          dispatch(pluginKey, newPluginState);
        }

        return newPluginState;
      },
    },

    key: pluginKey,
  });
};
