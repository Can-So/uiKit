import { Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { Dispatch } from '../../event-dispatcher';
import { Participants, ReadOnlyParticipants } from './participants';
import { CollabEditProvider } from './provider';
import { CollabEditOptions } from './types';
export { CollabEditProvider };
export declare const pluginKey: PluginKey<any>;
export declare const createPlugin: (dispatch: Dispatch<any>, providerFactory: ProviderFactory, options?: CollabEditOptions | undefined) => Plugin<any>;
export declare class PluginState {
    private decorationSet;
    private participants;
    private sid?;
    readonly decorations: DecorationSet<any>;
    readonly activeParticipants: ReadOnlyParticipants;
    readonly sessionId: string | undefined;
    constructor(decorations: DecorationSet, participants: Participants, sessionId?: string);
    getInitial(sessionId: string): string;
    apply(tr: Transaction): PluginState;
    static init(config: any): PluginState;
}
