import analyticsPlugin from './plugin';
import { AnalyticsEventPayload } from './types';

export const analyticsEventKey = 'EDITOR_ANALYTICS_EVENT';
export const analyticsChannel = 'fabric-editor';

export * from './types';
export * from './utils';
export * from './plugin';
export default analyticsPlugin;
