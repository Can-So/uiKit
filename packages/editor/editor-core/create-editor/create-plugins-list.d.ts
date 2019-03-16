import { CreateUIAnalyticsEventSignature } from '@findable/analytics-next-types';
import { EditorPlugin, EditorProps } from '../types';
/**
 * Returns list of plugins that are absolutely necessary for editor to work
 */
export declare function getDefaultPluginsList(props: EditorProps, createAnalyticsEvent?: CreateUIAnalyticsEventSignature): EditorPlugin[];
/**
 * Maps EditorProps to EditorPlugins
 */
export default function createPluginsList(props: EditorProps, createAnalyticsEvent?: CreateUIAnalyticsEventSignature): EditorPlugin[];
