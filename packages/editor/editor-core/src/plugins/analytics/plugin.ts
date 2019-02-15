import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { EditorPlugin, Command } from '../../types';
import { AnalyticsEventPayload } from './types';
import { fireAnalyticsEvent } from './utils';
import { InputRuleWithHandler } from '../../utils/input-rules';

export const analyticsPluginKey = new PluginKey('analyticsPlugin');

export function addAnalytics(
  tr: Transaction,
  payload: AnalyticsEventPayload,
  channel?: string,
): Transaction {
  const analyticsMeta = tr.getMeta(analyticsPluginKey) || [];
  analyticsMeta.push({ payload, channel });
  return tr.setMeta(analyticsPluginKey, analyticsMeta);
}

export function withAnalytics(
  payload: AnalyticsEventPayload,
  channel?: string,
) {
  return (command: Command): Command => (state, dispatch) =>
    command(state, tr => {
      if (dispatch) {
        dispatch(addAnalytics(tr, payload, channel));
      }
      return true;
    });
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

function createPlugin(createAnalyticsEvent?: CreateUIAnalyticsEventSignature) {
  if (!createAnalyticsEvent) {
    return;
  }

  return new Plugin({
    key: analyticsPluginKey,
    state: {
      init: () => null,
      apply: tr => {
        const meta = tr.getMeta(analyticsPluginKey) as
          | { payload: AnalyticsEventPayload; channel?: string }[]
          | undefined;
        if (meta) {
          for (const analytics of meta) {
            const { payload, channel } = analytics;
            fireAnalyticsEvent(createAnalyticsEvent)({ payload, channel });
          }
        }
      },
    },
  });
}

const analyticsPlugin = (
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
): EditorPlugin => ({
  pmPlugins() {
    return [
      {
        name: 'analyticsPlugin',
        plugin: () => createPlugin(createAnalyticsEvent),
      },
    ];
  },
});

export default analyticsPlugin;
