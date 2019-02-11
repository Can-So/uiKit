import { Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { EditorPlugin, Command } from '../../types';
import { AnalyticsEventPayload } from './types';
import { fireAnalyticsEvent } from './utils';

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
