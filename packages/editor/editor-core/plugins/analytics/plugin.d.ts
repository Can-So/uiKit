import { PluginKey } from 'prosemirror-state';
import { CreateUIAnalyticsEventSignature } from '@findable/analytics-next-types';
import { EditorPlugin } from '../../types';
export declare const analyticsPluginKey: PluginKey<any>;
declare const analyticsPlugin: (createAnalyticsEvent?: CreateUIAnalyticsEventSignature | undefined) => EditorPlugin;
export default analyticsPlugin;
