import { editorAnalyticsChannel } from './index';
import { AnalyticsEventPayload } from './types';
import { Transaction, EditorState } from 'prosemirror-state';
import { Command } from '../../types';
import { InputRuleWithHandler } from '../../utils/input-rules';
import { analyticsPluginKey } from './plugin';

export function addAnalytics(
  tr: Transaction,
  payload: AnalyticsEventPayload,
  channel?: string,
): Transaction {
  const analyticsMeta = tr.getMeta(analyticsPluginKey) || [];
  analyticsMeta.push({ payload, channel });
  return tr.setMeta(analyticsPluginKey, analyticsMeta);
}

export type HigherOrderCommand = (command: Command) => Command;

export function withAnalytics(
  payload: AnalyticsEventPayload,
  channel?: string,
): HigherOrderCommand {
  return command => (state, dispatch, view?) =>
    command(
      state,
      tr => {
        if (dispatch) {
          dispatch(addAnalytics(tr, payload, channel));
        }
        return true;
      },
      view,
    );
}

export function ruleWithAnalytics(
  getPayload: (
    state: EditorState,
    match: string[],
    start,
    end,
  ) => AnalyticsEventPayload,
) {
  return (rule: InputRuleWithHandler) => {
    // Monkeypatching handler to add analytcs
    const handler = rule.handler;

    rule.handler = (
      state: EditorState,
      match,
      start,
      end,
    ): Transaction<any> | null => {
      let tr = handler(state, match, start, end);

      if (tr) {
        const payload = getPayload(state, match, start, end);
        tr = addAnalytics(tr, payload);
      }
      return tr;
    };
    return rule;
  };
}

export const fireAnalyticsEvent = createAnalyticsEvent => ({
  payload,
  channel = editorAnalyticsChannel,
}: {
  payload: AnalyticsEventPayload;
  channel?: string;
}) => {
  return createAnalyticsEvent(payload).fire(channel);
};
