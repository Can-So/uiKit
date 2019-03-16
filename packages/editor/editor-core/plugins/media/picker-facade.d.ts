import { MediaPicker, MediaPickerComponents, ComponentConfigs, UploadParams } from '@atlaskit/media-picker';
import { Context } from '@atlaskit/media-core';
import { ErrorReportingHandler } from '@atlaskit/editor-common';
import { MediaState, CustomMediaPicker } from './types';
export declare type PickerType = keyof MediaPickerComponents | 'customMediaPicker';
export declare type ExtendedComponentConfigs = ComponentConfigs & {
    customMediaPicker: CustomMediaPicker;
};
export declare type PickerFacadeConfig = {
    context: Context;
    errorReporter: ErrorReportingHandler;
};
export declare type MediaStateEvent = MediaState;
export declare type MediaStateEventListener = (evt: MediaStateEvent) => void;
export declare type MediaStateEventSubscriber = ((listener: MediaStateEventListener) => void);
export declare type NewMediaEvent = (state: MediaState, onStateChanged: MediaStateEventSubscriber) => void;
export default class PickerFacade {
    readonly config: PickerFacadeConfig;
    readonly pickerConfig?: CustomMediaPicker | import("../../../../../media/media-picker/components/types").PopupConfig | import("../../../../../media/media-picker/components/types").LocalUploadConfig | import("../../../../../media/media-picker/components/types").BrowserConfig | import("../../../../../media/media-picker/components/types").ClipboardConfig | import("../../../../../media/media-picker/components/types").DropzoneConfig | undefined;
    readonly mediaPickerFactoryClass: typeof MediaPicker;
    private picker;
    private onDragListeners;
    private errorReporter;
    private pickerType;
    private onStartListeners;
    private eventListeners;
    constructor(pickerType: PickerType, config: PickerFacadeConfig, pickerConfig?: CustomMediaPicker | import("../../../../../media/media-picker/components/types").PopupConfig | import("../../../../../media/media-picker/components/types").LocalUploadConfig | import("../../../../../media/media-picker/components/types").BrowserConfig | import("../../../../../media/media-picker/components/types").ClipboardConfig | import("../../../../../media/media-picker/components/types").DropzoneConfig | undefined, mediaPickerFactoryClass?: typeof MediaPicker);
    init(): Promise<PickerFacade>;
    readonly type: PickerType;
    destroy(): void;
    setUploadParams(params: UploadParams): void;
    onClose(cb: () => void): () => void;
    activate(): void;
    deactivate(): void;
    show(): void;
    hide(): void;
    upload(url: string, fileName: string): void;
    onNewMedia(cb: NewMediaEvent): void;
    onDrag(cb: (state: 'enter' | 'leave') => any): void;
    private handleUploadPreviewUpdate;
    private subscribeStateChanged;
    private handleUploadError;
    private handleMobileUploadEnd;
    private handleReady;
    private handleDragEnter;
    private handleDragLeave;
}
