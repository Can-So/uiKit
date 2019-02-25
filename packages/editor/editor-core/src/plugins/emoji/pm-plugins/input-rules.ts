import { InputRule, inputRules } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import {
  createInputRule,
  leafNodeReplacementCharacter,
} from '../../../utils/input-rules';
import { EmojiState, emojiPluginKey } from './main';
import {
  addAnalytics,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT,
  ACTION,
  ACTION_SUBJECT_ID,
} from '../../../plugins/analytics';

export function inputRulePlugin(schema: Schema): Plugin | undefined {
  const rules: Array<InputRule> = [];

  if (schema.nodes.emoji && schema.marks.emojiQuery) {
    const regex = new RegExp(`(^|[\\s\(${leafNodeReplacementCharacter}]):$`);
    const emojiQueryRule = createInputRule(regex, state => {
      const emojisState = emojiPluginKey.getState(state) as EmojiState;

      if (!emojisState.emojiProvider) {
        return null;
      }

      if (!emojisState.isEnabled()) {
        return null;
      }

      const mark = schema.mark('emojiQuery');
      let { tr } = state;

      const emojiText = schema.text(':', [mark]);
      tr = tr.replaceSelectionWith(emojiText, false);
      return addAnalytics(tr, {
        action: ACTION.INVOKED,
        actionSubject: ACTION_SUBJECT.TYPEAHEAD,
        actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_EMOJI,
        attributes: { inputMethod: INPUT_METHOD.KEYBOARD },
        eventType: EVENT_TYPE.UI,
      });
    });

    rules.push(emojiQueryRule);
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
  return;
}

export default inputRulePlugin;
