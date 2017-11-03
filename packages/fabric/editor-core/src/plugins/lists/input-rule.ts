import { InputRule, inputRules, wrappingInputRule } from 'prosemirror-inputrules';
import { NodeType, Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { trackAndInvoke } from '../../analytics';
import { defaultInputRuleHandler } from '../utils';

export function createInputRule(regexp: RegExp, nodeType: NodeType): InputRule {
  return wrappingInputRule(regexp, nodeType, {}, (_, node) => node.type === nodeType);
}

// TODO: Fix types (ED-2987)
export default function inputRulePlugin(schema: Schema): Plugin | undefined {
  const rules: InputRule[] = [];

  if (schema.nodes.bulletList) {
    // NOTE: we decided to restrict the creation of bullet lists to only "*"x
    const rule = defaultInputRuleHandler(createInputRule(/^\s*([\*\-]) $/, schema.nodes.bulletList));
    (rule as any).handler = trackAndInvoke('atlassian.editor.format.list.bullet.autoformatting', (rule as any).handler);
    rules.push(rule);
  }

  if (schema.nodes.orderedList) {
    // NOTE: There is a built in input rule for ordered lists in ProseMirror. However, that
    // input rule will allow for a list to start at any given number, which isn't allowed in
    // markdown (where a ordered list will always start on 1). This is a slightly modified
    // version of that input rule.
    const rule = defaultInputRuleHandler(createInputRule(/^(\d+)[\.\)] $/, schema.nodes.orderedList));
    (rule as any).handler = trackAndInvoke('atlassian.editor.format.list.numbered.autoformatting', (rule as any).handler);
    rules.push(rule);
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
}
