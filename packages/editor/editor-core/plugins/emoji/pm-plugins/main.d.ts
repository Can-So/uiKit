import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@findable/editor-common';
import { EmojiId, EmojiProvider, EmojiSearchResult, EmojiDescription } from '@findable/emoji';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export declare const emojiPluginKey: PluginKey<any>;
export declare type StateChangeHandler = (state: EmojiState) => any;
export declare type ProviderChangeHandler = (provider?: EmojiProvider) => any;
export interface Options {
    emojiProvider: Promise<EmojiProvider>;
}
export declare class EmojiState {
    emojiProvider?: EmojiProvider;
    query?: string;
    enabled: boolean;
    focused: boolean;
    queryActive: boolean;
    anchorElement?: HTMLElement;
    onSelectPrevious: () => boolean;
    onSelectNext: () => boolean;
    onSelectCurrent: (_key?: string | undefined) => boolean;
    onSpaceSelectCurrent: (_emoji: EmojiDescription, _key?: string | undefined, _query?: string | undefined) => void;
    onSpaceTyped: () => void;
    onDismiss: () => void;
    private changeHandlers;
    private state;
    private view;
    private queryResult;
    constructor(state: EditorState, providerFactory: ProviderFactory);
    subscribe(cb: StateChangeHandler): void;
    unsubscribe(cb: StateChangeHandler): void;
    notifySubscribers(): void;
    update(state: EditorState): void;
    dismiss(): boolean;
    isEnabled(): boolean;
    private findEmojiQueryMark;
    insertEmoji: (emojiId?: EmojiId | undefined) => void;
    handleProvider: (name: string, provider: Promise<any> | undefined) => void;
    trySelectCurrentWithSpace: (key?: string | undefined) => boolean;
    updateEditorFocused(focused: boolean): void;
    private getEmojisCount;
    private isEmptyQuery;
    onSearchResult: (searchResults: EmojiSearchResult) => void;
    private onProviderChange;
    setView(view: EditorView): void;
}
export declare function createPlugin(portalProviderAPI: PortalProviderAPI, providerFactory: ProviderFactory): Plugin<any>;
