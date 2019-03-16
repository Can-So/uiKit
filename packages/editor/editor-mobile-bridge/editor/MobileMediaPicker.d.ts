import { CustomMediaPicker } from '@findable/editor-core';
export default class MobileMediaPicker implements CustomMediaPicker {
    private listeners;
    on(event: string, cb: any): void;
    removeAllListeners(event: any): void;
    emit(event: string, data: any): void;
    destroy(): void;
    setUploadParams(uploadParams: any): void;
}
