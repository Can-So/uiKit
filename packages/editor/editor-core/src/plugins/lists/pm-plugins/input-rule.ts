import {
  InputRule,
  inputRules,
  wrappingInputRule,
} from 'prosemirror-inputrules';
import { NodeType, Schema } from 'prosemirror-model';
import { Plugin, Transaction, EditorState } from 'prosemirror-state';
import { analyticsService, trackAndInvoke } from '../../../analytics';
import {
  createInputRule as defaultCreateInputRule,
  defaultInputRuleHandler,
  leafNodeReplacementCharacter,
} from '../../../utils/input-rules';

export function createInputRule(regexp: RegExp, nodeType: NodeType): InputRule {
  return wrappingInputRule(
    regexp,
    nodeType,
    {},
    (_, node) => node.type === nodeType,
  );
}

export const insertList = (
  state: EditorState,
  listType: NodeType,
  listTypeName: string,
  start: number,
  end: number,
  matchSize: number,
): Transaction | undefined => {
  // To ensure that match is done after HardBreak.
  const { hardBreak } = state.schema.nodes;
  if (state.doc.resolve(start).nodeAfter!.type !== hardBreak) {
    return;
  }

  // To ensure no nesting is done.
  if (state.doc.resolve(start).depth > 1) {
    return;
  }

  // Track event
  analyticsService.trackEvent(
    `atlassian.editor.format.list.${listTypeName}.autoformatting`,
  );

  // Split at the start of autoformatting and delete formatting characters.
  let tr = state.tr.delete(start, end).split(start);

  // If node has more content split at the end of autoformatting.
  let currentNode = tr.doc.nodeAt(start + 1);
  tr.doc.nodesBetween(start, start + currentNode!.nodeSize, (node, pos) => {
    if (node.type === hardBreak) {
      tr = tr.split(pos + 1).delete(pos, pos + 1);
    }
  });

  // Wrap content in list node
  const { listItem } = state.schema.nodes;
  const position = tr.doc.resolve(start + 2);
  let range = position.blockRange(position)!;
  tr = tr.wrap(range, [{ type: listType }, { type: listItem }]);
  return tr;
};

// TODO: Fix types (ED-2987)
export default function inputRulePlugin(schema: Schema): Plugin | undefined {
  const rules: InputRule[] = [];

  if (schema.nodes.bulletList) {
    // NOTE: we decided to restrict the creation of bullet lists to only "*"x
    const rule = defaultInputRuleHandler(
      createInputRule(/^\s*([\*\-]) $/, schema.nodes.bulletList),
      true,
    );
    (rule as any).handler = trackAndInvoke(
      'atlassian.editor.format.list.bullet.autoformatting',
      (rule as any).handler,
    );
    rules.push(rule);
    rules.push(
      defaultCreateInputRule(
        new RegExp(`${leafNodeReplacementCharacter}\\s*([\\*\\-]) $`),
        (state, match, start, end): Transaction | undefined => {
          return insertList(
            state,
            schema.nodes.bulletList,
            'bullet',
            start,
            end,
            1,
          );
        },
        true,
      ),
    );
  }

  if (schema.nodes.orderedList) {
    // NOTE: There is a built in input rule for ordered lists in ProseMirror. However, that
    // input rule will allow for a list to start at any given number, which isn't allowed in
    // markdown (where a ordered list will always start on 1). This is a slightly modified
    // version of that input rule.
    const rule = defaultInputRuleHandler(
      createInputRule(/^(1)[\.\)] $/, schema.nodes.orderedList),
      true,
    );
    (rule as any).handler = trackAndInvoke(
      'atlassian.editor.format.list.numbered.autoformatting',
      (rule as any).handler,
    );
    rules.push(rule);
    rules.push(
      defaultCreateInputRule(
        new RegExp(`${leafNodeReplacementCharacter}(1)[\\.\\)] $`),
        (state, match, start, end): Transaction | undefined => {
          return insertList(
            state,
            schema.nodes.orderedList,
            'numbered',
            start,
            end,
            2,
          );
        },
        true,
      ),
    );
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
}
