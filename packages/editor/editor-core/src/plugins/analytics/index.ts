import analyticsPlugin from './plugin';
import { FabricChannel } from '@atlaskit/analytics-listeners';

export const analyticsEventKey = 'EDITOR_ANALYTICS_EVENT';
export const analyticsChannel = FabricChannel.editor;

export * from './types';
export * from './utils';
export * from './plugin';
export default analyticsPlugin;
