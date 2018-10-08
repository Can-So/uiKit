import {
  MediaPicker,
  MediaPickerComponent,
  MediaPickerComponents,
  ComponentConfigs,
  Popup,
  Browser,
  Dropzone,
  Clipboard,
  BinaryUploader,
  UploadsStartEventPayload,
  UploadPreviewUpdateEventPayload,
  UploadEndEventPayload,
  UploadParams,
  isImagePreview,
} from '@atlaskit/media-picker';
import { Context } from '@atlaskit/media-core';

import { ErrorReportingHandler } from '../../utils';
import { MediaStateManager, MediaState, CustomMediaPicker } from './types';

export type PickerType = keyof MediaPickerComponents | 'customMediaPicker';
export type ExtendedComponentConfigs = ComponentConfigs & {
  customMediaPicker: CustomMediaPicker;
};

export type PickerFacadeConfig = {
  context: Context;
  stateManager: MediaStateManager;
  errorReporter: ErrorReportingHandler;
};

interface Dimensions {
  width: number;
  height: number;
}

export default class PickerFacade {
  private picker: MediaPickerComponent | CustomMediaPicker;
  private onStartListeners: Array<(states: MediaState[]) => void> = [];
  private onDragListeners: Array<Function> = [];
  private errorReporter: ErrorReportingHandler;
  private pickerType: PickerType;
  private stateManager: MediaStateManager;
  private deferredDimensions: Map<Promise<string>, Function> = new Map();

  constructor(
    pickerType: PickerType,
    config: PickerFacadeConfig,
    pickerConfig?: ExtendedComponentConfigs[PickerType],
  ) {
    this.pickerType = pickerType;
    this.errorReporter = config.errorReporter;
    this.stateManager = config.stateManager;

    let picker;
    if (pickerType === 'customMediaPicker') {
      picker = this.picker = pickerConfig as CustomMediaPicker;
    } else {
      picker = this.picker = MediaPicker(
        pickerType,
        config.context,
        pickerConfig as any,
      );
    }

    picker.on('uploads-start', this.handleUploadsStart);
    picker.on('upload-preview-update', this.handleUploadPreviewUpdate);
    picker.on('upload-end', this.handleUploadEnd);

    if (picker instanceof Dropzone) {
      picker.on('drag-enter', this.handleDragEnter);
      picker.on('drag-leave', this.handleDragLeave);
    }

    if (picker instanceof Dropzone || picker instanceof Clipboard) {
      picker.activate();
    }
  }

  get type() {
    return this.pickerType;
  }

  destroy() {
    const { picker } = this;

    if (!picker) {
      return;
    }

    (picker as any).removeAllListeners('uploads-start');
    // (picker as any).removeAllListeners('upload-preview-update');
    (picker as any).removeAllListeners('upload-end');

    if (picker instanceof Dropzone) {
      picker.removeAllListeners('drag-enter');
      picker.removeAllListeners('drag-leave');
    }

    this.onStartListeners = [];
    this.onDragListeners = [];

    try {
      if (picker instanceof Dropzone || picker instanceof Clipboard) {
        picker.deactivate();
      }

      if (picker instanceof Popup || picker instanceof Browser) {
        picker.teardown();
      }
    } catch (ex) {
      this.errorReporter.captureException(ex);
    }

    this.deferredDimensions.clear();
  }

  setUploadParams(params: UploadParams): void {
    this.picker.setUploadParams(params);
  }

  onClose(cb): () => void {
    const { picker } = this;
    if (picker instanceof Popup) {
      picker.on('closed', cb);

      return () => picker.off('closed', cb);
    }

    return () => {};
  }

  activate() {
    const { picker } = this;
    if (picker instanceof Dropzone || picker instanceof Clipboard) {
      picker.activate();
    }
  }

  deactivate() {
    const { picker } = this;
    if (picker instanceof Dropzone || picker instanceof Clipboard) {
      picker.deactivate();
    }
  }

  show(): void {
    if (this.picker instanceof Popup) {
      try {
        this.picker.show();
      } catch (ex) {
        this.errorReporter.captureException(ex);
      }
    } else if (this.picker instanceof Browser) {
      this.picker.browse();
    }
  }

  hide(): void {
    if (this.picker instanceof Popup) {
      this.picker.hide();
    }
  }

  cancel(tempId: string): void {
    if (this.picker instanceof Popup) {
      const state = this.stateManager.getState(tempId);

      if (!state || state.status === 'cancelled') {
        return;
      }

      try {
        this.picker.cancel(tempId);
      } catch (e) {
        // We're deliberately consuming a known Media Picker exception, as it seems that
        // the picker has problems cancelling uploads before the popup picker has been shown
        // TODO: remove after fixing https://jira.atlassian.com/browse/FIL-4161
        if (
          !/((popupIframe|cancelUpload).*?undefined)|(undefined.*?(popupIframe|cancelUpload))/.test(
            `${e}`,
          )
        ) {
          throw e;
        }
      }

      this.stateManager.updateState(tempId, {
        id: tempId,
        status: 'cancelled',
      });
    }
  }

  upload(url: string, fileName: string): void {
    if (this.picker instanceof BinaryUploader) {
      this.picker.upload(url, fileName);
    }
  }

  onNewMedia(cb: (states: MediaState[]) => any) {
    this.onStartListeners.push(cb);
  }

  onDrag(cb: (state: 'enter' | 'leave') => any) {
    this.onDragListeners.push(cb);
  }

  private handleUploadsStart = async (event: UploadsStartEventPayload) => {
    const { files } = event;

    const states = await Promise.all(
      files.map(async file => {
        const dimensionsPromise = new Promise<Dimensions>(resolve => {
          this.deferredDimensions.set(file.upfrontId, resolve);
        });
        const [id, dimensions] = await Promise.all([
          file.upfrontId,
          dimensionsPromise,
        ]);
        return this.stateManager.newState(
          id,
          {
            ...file,
            dimensions,
          },
          'ready',
        );
      }),
    );

    this.onStartListeners.forEach(cb => cb.call(cb, states));
  };

  private handleUploadEnd = async (event: UploadEndEventPayload) => {
    const id = await event.file.upfrontId;
    this.stateManager.updateState(id, {
      status: 'ready',
    });
  };

  private handleUploadPreviewUpdate = (
    event: UploadPreviewUpdateEventPayload,
  ) => {
    const { file, preview } = event;
    const resolve = this.deferredDimensions.get(file.upfrontId);
    if (resolve) {
      if (isImagePreview(preview)) {
        resolve(preview.dimensions);
      } else {
        resolve({ height: undefined, width: undefined });
      }
    }
    this.deferredDimensions.delete(file.upfrontId);
  };

  private handleDragEnter = () => {
    this.onDragListeners.forEach(cb => cb.call(cb, 'enter'));
  };

  private handleDragLeave = () => {
    this.onDragListeners.forEach(cb => cb.call(cb, 'leave'));
  };
}
