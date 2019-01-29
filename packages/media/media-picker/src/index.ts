import {
  BinaryUploader,
  BinaryUploaderConstructor,
  BinaryConfig,
} from './components/binary';
import {
  Browser,
  BrowserConfig,
  BrowserConstructor,
} from './components/browser';
import {
  Clipboard,
  ClipboardConstructor,
  ClipboardConfig,
} from './components/clipboard';
import {
  Dropzone,
  DropzoneConfig,
  DropzoneConstructor,
} from './components/dropzone';
import { Popup, PopupConfig, PopupConstructor } from './components/popup';

export { DropzoneUploadEventPayloadMap } from './components/dropzone';
export { PopupUploadEventPayloadMap } from './components/popup';

// Events public API and types
export {
  UploadsStartEventPayload,
  UploadStatusUpdateEventPayload,
  UploadPreviewUpdateEventPayload,
  UploadProcessingEventPayload,
  UploadEndEventPayload,
  UploadErrorEventPayload,
  UploadEventPayloadMap,
  isImagePreview,
} from './domain/uploadEvent';

export { MediaFile } from './domain/file';
export { MediaProgress } from './domain/progress';
export { MediaError } from './domain/error';
export { ImagePreview, Preview, NonImagePreview } from './domain/preview';

// Constructor public API and types
export interface MediaPickerConstructors {
  binary: BinaryUploaderConstructor;
  browser: BrowserConstructor;
  clipboard: ClipboardConstructor;
  dropzone: DropzoneConstructor;
  popup: PopupConstructor;
}

export { BinaryUploader, Browser, Clipboard, Dropzone, Popup };
export type MediaPickerComponent =
  | BinaryUploader
  | Browser
  | Clipboard
  | Dropzone
  | Popup;
export interface MediaPickerComponents {
  binary: BinaryUploader;
  browser: Browser;
  clipboard: Clipboard;
  dropzone: Dropzone;
  popup: Popup;
}

export { UploadParams } from './domain/config';

export {
  BrowserConfig,
  DropzoneConfig,
  PopupConfig,
  BinaryConfig,
  ClipboardConfig,
};
export interface ComponentConfigs {
  binary: BinaryConfig;
  browser: BrowserConfig;
  clipboard: ClipboardConfig;
  dropzone: DropzoneConfig;
  popup: PopupConfig;
}

export {
  BinaryUploaderConstructor,
  BrowserConstructor,
  ClipboardConstructor,
  DropzoneConstructor,
  PopupConstructor,
};

// TODO: split real class from interface
export async function MediaPicker<K extends keyof any>(
  componentName: K,
  context: any,
  pickerConfig?: any[K],
): Promise<any[K]> {
  switch (componentName) {
    case 'binary':
      const {
        BinaryUploader,
      } = await import(/* webpackChunkName:"@atlaskit_media-picker-binary" */ './components/binary');
      return new BinaryUploader(context, pickerConfig as BinaryConfig);
    case 'browser':
      const {
        Browser,
      } = await import(/* webpackChunkName:"@atlaskit_media-picker-browser" */ './components/browser');
      return new Browser(context, pickerConfig as BrowserConfig | undefined);
    case 'clipboard':
      const {
        Clipboard,
      } = await import(/* webpackChunkName:"@atlaskit_media-picker-clipboard" */ './components/clipboard');
      return new Clipboard(context, pickerConfig as
        | ClipboardConfig
        | undefined);
    case 'dropzone':
      const {
        Dropzone,
      } = await import(/* webpackChunkName:"@atlaskit_media-picker-dropzone" */ './components/dropzone');
      return new Dropzone(context, pickerConfig as DropzoneConfig | undefined);
    case 'popup':
      const {
        Popup,
      } = await import(/* webpackChunkName:"@atlaskit_media-picker-popup" */ './components/popup');
      return new Popup(context, pickerConfig as any);
    default:
      throw new Error(`The component ${componentName} does not exist`);
  }
}
