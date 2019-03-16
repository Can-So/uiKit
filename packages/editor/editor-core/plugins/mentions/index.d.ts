import { EditorState, PluginKey } from 'prosemirror-state';
import { CreateUIAnalyticsEventSignature } from '@findable/analytics-next-types';
import { MentionProvider, MentionDescription } from '@findable/mention';
import { ContextIdentifierProvider } from '@findable/editor-common';
import { EditorPlugin, Command } from '../../types';
declare const mentionsPlugin: (createAnalyticsEvent?: CreateUIAnalyticsEventSignature | undefined) => EditorPlugin;
export default mentionsPlugin;
/**
 * Actions
 */
export declare const ACTIONS: {
    SET_PROVIDER: string;
    SET_RESULTS: string;
    SET_CONTEXT: string;
};
export declare const setProvider: (provider: MentionProvider | undefined) => Command;
export declare const setResults: (results: MentionDescription[]) => Command;
export declare const setContext: (context: ContextIdentifierProvider | undefined) => Command;
/**
 *
 * ProseMirror Plugin
 *
 */
export declare const mentionPluginKey: PluginKey<any>;
export declare function getMentionPluginState(state: EditorState): MentionPluginState;
export declare type MentionPluginState = {
    mentionProvider?: MentionProvider;
    contextIdentifierProvider?: ContextIdentifierProvider;
    mentions?: Array<MentionDescription>;
};
