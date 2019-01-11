export { default as analyticsService } from './service';
export {
  AnalyticsHandler,
  AnalyticsProperties,
  detectHandler,
  hermentHandler,
  debugHandler,
} from './handler';
export { withAnalytics } from './withAnalytics';
export { default as trackAndInvoke } from './trackAndInvoke';

export const analyticsEventKey = 'EDITOR_ANALYTICS_EVENT';

type AEP<A, B, C, D> = {
  action: A;
  actionSubject: B;
  actionSubjectId?: C;
  attributes?: D;
};

type HelpDialogAEP = AEP<
  'opened',
  'button',
  'helpButton',
  { inputMethod: 'shortcut' }
>;

type EmojiAEP = AEP<
  'opened',
  'picker',
  'emojiPicker',
  { inputMethod: 'toolbar' }
>;

export type AnalyticsEventPayload = EmojiAEP | HelpDialogAEP;

export const fireAnalyticsEvent = createAnalyticsEvent => (
  event: AnalyticsEventPayload,
) => createAnalyticsEvent(event).fire('fabric-editor');
