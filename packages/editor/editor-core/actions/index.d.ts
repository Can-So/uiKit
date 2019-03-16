import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { Transformer } from '@atlaskit/editor-common';
import { EventDispatcher } from '../event-dispatcher';
export declare type ContextUpdateHandler = (editorView: EditorView, eventDispatcher: EventDispatcher) => void;
export interface EditorActionsOptions {
    focus(): boolean;
    blur(): boolean;
    clear(): boolean;
    getValue(): Promise<any | undefined>;
    replaceDocument(rawValue: any): boolean;
    replaceSelection(rawValue: Node | Object | string): boolean;
    appendText(text: string): boolean;
    insertFileFromDataUrl(url: string, filename: string): boolean;
}
export default class EditorActions implements EditorActionsOptions {
    private editorView?;
    private contentTransformer?;
    private eventDispatcher?;
    private listeners;
    static from(view: EditorView, eventDispatcher: EventDispatcher, transformer?: Transformer<any>): EditorActions;
    _privateGetEditorView(): EditorView | undefined;
    _privateGetEventDispatcher(): EventDispatcher | undefined;
    _privateRegisterEditor(editorView: EditorView, eventDispatcher: EventDispatcher, contentTransformer?: Transformer<any>): void;
    _privateUnregisterEditor(): void;
    _privateSubscribe(cb: ContextUpdateHandler): void;
    _privateUnsubscribe(cb: ContextUpdateHandler): void;
    focus(): boolean;
    blur(): boolean;
    clear(): boolean;
    getValue(): Promise<any | undefined>;
    replaceDocument(rawValue: any, shouldScrollToBottom?: boolean): boolean;
    replaceSelection(rawValue: Node | Object | string): boolean;
    appendText(text: string): boolean;
    insertFileFromDataUrl(url: string, filename: string): boolean;
}
