import analyticsPlugin, { analyticsPluginKey as pluginKey } from './plugin';
import { FabricChannel } from '@atlaskit/analytics-listeners';
export var analyticsEventKey = 'EDITOR_ANALYTICS_EVENT';
export var editorAnalyticsChannel = FabricChannel.editor;
export * from './types';
export * from './utils';
export var analyticsPluginKey = pluginKey;
export default analyticsPlugin;
//# sourceMappingURL=index.js.map