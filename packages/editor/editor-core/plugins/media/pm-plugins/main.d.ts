import { Node as PMNode, Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { Context, FileIdentifier } from '@atlaskit/media-core';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import { Dimensions } from '@atlaskit/media-editor';
import { Dispatch } from '../../../event-dispatcher';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { EditorAppearance } from '../../../types/editor-props';
import { MediaPluginOptions } from '../media-plugin-options';
import PickerFacade, { MediaStateEventListener } from '../picker-facade';
import { MediaState, MediaProvider, MediaStateStatus } from '../types';
export { MediaState, MediaProvider, MediaStateStatus };
export interface MediaNodeWithPosHandler {
    node: PMNode;
    getPos: ProsemirrorGetPosHandler;
}
export declare class MediaPluginState {
    allowsUploads: boolean;
    mediaContext: Context;
    uploadContext?: Context;
    ignoreLinks: boolean;
    waitForMediaUpload: boolean;
    allUploadsFinished: boolean;
    showDropzone: boolean;
    element?: HTMLElement;
    layout: MediaSingleLayout;
    mediaNodes: MediaNodeWithPosHandler[];
    mediaGroupNodes: Record<string, any>;
    private pendingTask;
    options: MediaPluginOptions;
    private view;
    private destroyed;
    mediaProvider: MediaProvider;
    private errorReporter;
    pickers: PickerFacade[];
    binaryPicker?: PickerFacade;
    private popupPicker?;
    private clipboardPicker?;
    private dropzonePicker?;
    private customPicker?;
    editingMediaSinglePos?: number;
    showEditingDialog?: boolean;
    editorAppearance: EditorAppearance;
    private removeOnCloseListener;
    private reactContext;
    constructor(state: EditorState, options: MediaPluginOptions, reactContext: () => {}, editorAppearance?: EditorAppearance);
    setMediaProvider: (mediaProvider?: Promise<MediaProvider> | undefined) => Promise<void>;
    getMediaOptions: () => MediaPluginOptions;
    updateElement(): void;
    private getDomElement;
    /**
     * we insert a new file by inserting a initial state for that file.
     *
     * called when we insert a new file via the picker (connected via pickerfacade)
     */
    insertFile: (mediaState: MediaState, onMediaStateChanged: (listener: MediaStateEventListener) => void) => void;
    splitMediaGroup: () => boolean;
    insertFileFromDataUrl: (url: string, fileName: string) => void;
    onPopupPickerClose: () => void;
    showMediaPicker: () => void;
    /**
     * Returns a promise that is resolved after all pending operations have been finished.
     * An optional timeout will cause the promise to reject if the operation takes too long
     *
     * NOTE: The promise will resolve even if some of the media have failed to process.
     */
    waitForPendingTasks: (timeout?: number | undefined, lastTask?: Promise<MediaState | null> | undefined) => Promise<any>;
    setView(view: EditorView): void;
    /**
     * Called from React UI Component when user clicks on "Delete" icon
     * inside of it
     */
    handleMediaNodeRemoval: (node: PMNode<any>, getPos: ProsemirrorGetPosHandler) => void;
    /**
     * Called from React UI Component on componentDidMount
     */
    handleMediaNodeMount: (node: PMNode<any>, getPos: ProsemirrorGetPosHandler) => void;
    /**
     * Called from React UI Component on componentWillUnmount and componentWillReceiveProps
     * when React component's underlying node property is replaced with a new node
     */
    handleMediaNodeUnmount: (oldNode: PMNode<any>) => void;
    openMediaEditor: () => void;
    closeMediaEditor: () => void;
    replaceEditingMedia: (fileIdentifier: FileIdentifier, dimensions: Dimensions) => void;
    align: (layout: MediaSingleLayout, gridSize?: number) => boolean;
    destroy(): void;
    findMediaNode: (id: string) => MediaNodeWithPosHandler | null;
    private destroyPickers;
    private initPickers;
    private trackNewMediaEvent;
    updateMediaNodeAttrs: (id: string, attrs: object, isMediaSingle: boolean) => void;
    private collectionFromProvider;
    private handleMediaState;
    removeNodeById: (state: MediaState) => void;
    removeSelectedMediaContainer: () => boolean;
    selectedMediaContainerNode: () => PMNode<any> | undefined;
    private handleDrag;
}
export declare const stateKey: PluginKey<any>;
export declare const getMediaPluginState: (state: EditorState<any>) => MediaPluginState;
export declare const createPlugin: (schema: Schema<any, any>, options: MediaPluginOptions, reactContext: () => {}, dispatch?: Dispatch<any> | undefined, editorAppearance?: "comment" | "full-page" | "chromeless" | "mobile" | undefined) => Plugin<any>;
