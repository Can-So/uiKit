import { Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { EditorPlugin } from '../../types';
import { AnalyticsEventPayload } from '../../analytics';
import { EventDispatcher, Dispatch } from '../../event-dispatcher';

export type AnalyticsActions = any;

export const analyticsPluginKey = new PluginKey('analyticsPlugin');

export function fireAnalyticsEvent(
  dispatch: Dispatch,
  payload: AnalyticsEventPayload,
  channel?: string,
) {
  dispatch(analyticsPluginKey, { payload, channel });
}

export function addAnalytics(
  tr: Transaction,
  payload: AnalyticsEventPayload,
  channel?: string,
) {
  console.log(1);
  return tr.setMeta(analyticsPluginKey, { payload, channel });
}

function createPlugin(
  eventDispatcher: EventDispatcher,
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
) {
  if (!createAnalyticsEvent) return;

  const handleAnalyticsEvent = (
    payload: AnalyticsEventPayload,
    channel: string = 'fabric-editor',
  ) => {
    createAnalyticsEvent(payload).fire(channel);
  };

  eventDispatcher.on((analyticsPluginKey as any).key, handleAnalyticsEvent);

  return new Plugin({
    key: analyticsPluginKey,
    state: {
      init: () => null,
      apply: tr => {
        const meta = tr.getMeta(analyticsPluginKey) as
          | { payload: AnalyticsEventPayload; channel?: string }
          | undefined;
        console.log(meta);
        if (meta) {
          handleAnalyticsEvent(meta.payload, meta.channel);
        }
      },
    },
    view: () => {
      return {
        destroy() {
          eventDispatcher.off(
            (analyticsPluginKey as any).key,
            handleAnalyticsEvent,
          );
        },
      };
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
        plugin: ({ eventDispatcher }) =>
          createPlugin(eventDispatcher, createAnalyticsEvent),
      },
    ];
  },
});

export default analyticsPlugin;
