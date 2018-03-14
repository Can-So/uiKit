import {
  textblockTypeInputRule,
  wrappingInputRule,
  inputRules,
  InputRule,
} from 'prosemirror-inputrules';
import { Schema, NodeType } from 'prosemirror-model';
import { Plugin, Transaction } from 'prosemirror-state';
import { analyticsService, trackAndInvoke } from '../../../analytics';
import {
  createInputRule,
  defaultInputRuleHandler,
  leafNodeReplacementCharacter,
} from '../../../utils/input-rules';
import {
  isConvertableToCodeBlock,
  transformToCodeBlockAction,
} from '../commands/transform-to-code-block';
import { insertBlock } from '../commands/insert-block';

export function headingRule(nodeType: NodeType, maxLevel: number) {
  return textblockTypeInputRule(
    new RegExp('^(#{1,' + maxLevel + '})\\s$'),
    nodeType,
    match => ({ level: match[1].length }),
  );
}

export function blockQuoteRule(nodeType: NodeType) {
  return wrappingInputRule(/^\s*>\s$/, nodeType);
}

export function codeBlockRule(nodeType: NodeType) {
  return textblockTypeInputRule(/^```$/, nodeType);
}

export function inputRulePlugin(schema: Schema): Plugin | undefined {
  const rules: Array<InputRule> = [];

  if (schema.nodes.heading) {
    // '# ' for h1, '## ' for h2 and etc
    const rule = defaultInputRuleHandler(
      headingRule(schema.nodes.heading, 6),
      true,
    );
    const currentHandler = (rule as any).handler; // TODO: Fix types (ED-2987)
    (rule as any).handler = (state, match, start, end) => {
      analyticsService.trackEvent(
        `atlassian.editor.format.heading${match[1].length}.autoformatting`,
      );
      return currentHandler(state, match, start, end);
    };
    rules.push(rule);
    rules.push(
      createInputRule(
        new RegExp(`${leafNodeReplacementCharacter}(#{1,6})\\s$`),
        (state, match, start, end): Transaction | undefined => {
          const level = match[1].length;
          return insertBlock(
            state,
            schema.nodes.heading,
            `heading${level}`,
            start,
            end,
            { level },
          );
        },
        true,
      ),
    );
  }

  if (schema.nodes.blockquote) {
    // '> ' for blockquote
    const rule = defaultInputRuleHandler(
      blockQuoteRule(schema.nodes.blockquote),
      true,
    );
    (rule as any).handler = trackAndInvoke(
      'atlassian.editor.format.blockquote.autoformatting',
      (rule as any).handler,
    ); // TODO: Fix types (ED-2987)
    rules.push(rule);
    rules.push(
      createInputRule(
        new RegExp(`${leafNodeReplacementCharacter}\\s*>\\s$`),
        (state, match, start, end): Transaction | undefined => {
          return insertBlock(
            state,
            schema.nodes.blockquote,
            'blockquote',
            start,
            end,
          );
        },
        true,
      ),
    );
  }

  if (schema.nodes.codeBlock) {
    rules.push(
      createInputRule(
        /((^`{3,})|(\s`{3,}))(\S*)$/,
        (state, match, start, end): Transaction | undefined => {
          const attributes: any = {};
          if (match[4]) {
            attributes.language = match[4];
          }
          if (isConvertableToCodeBlock(state)) {
            const newStart = match[0][0] === ' ' ? start + 1 : start;
            analyticsService.trackEvent(
              `atlassian.editor.format.codeblock.autoformatting`,
            );
            return (
              transformToCodeBlockAction(state, attributes)
                // remove markdown decorator ```
                .delete(newStart, end)
                .scrollIntoView()
            );
          }
        },
        true,
      ),
    );
    rules.push(
      createInputRule(
        new RegExp(
          `((${leafNodeReplacementCharacter}\`{3,})|(\\s\`{3,}))(\\S*)$`,
        ),
        (state, match, start, end): Transaction | undefined => {
          const attributes: any = {};
          if (match[4]) {
            attributes.language = match[4];
          }
          return insertBlock(
            state,
            schema.nodes.codeBlock,
            'codeblock',
            start,
            end,
            attributes,
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

export default inputRulePlugin;
