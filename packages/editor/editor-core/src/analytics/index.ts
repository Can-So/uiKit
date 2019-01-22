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

type AEP<Action, ActionSubject, ActionSubjectID, Attributes> = {
  action: Action;
  actionSubject: ActionSubject;
  actionSubjectId?: ActionSubjectID;
  attributes?: Attributes;
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

type TypeAheadQuickInsertAEP = AEP<
  'invoked',
  'typeAhead',
  'quickInsertTypeAhead',
  { inputMethod: string }
>;

export type AnalyticsEventPayload =
  | EmojiAEP
  | HelpDialogAEP
  | TypeAheadQuickInsertAEP;

export const fireAnalyticsEvent = createAnalyticsEvent => (
  event: AnalyticsEventPayload,
) => createAnalyticsEvent(event).fire('fabric-editor');
