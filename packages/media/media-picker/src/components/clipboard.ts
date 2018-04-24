import { AuthProvider, Context } from '@atlaskit/media-core';

import { LocalUploadComponent } from './localUpload';
import { MPClipboardLoaded } from '../outer/analytics/events';
import { MediaPickerContext } from '../domain/context';
import { UploadParams } from '..';
import { whenDomReady } from '../util/documentReady';

export interface ClipboardConfig {
  uploadParams: UploadParams;
  userAuthProvider?: AuthProvider;
}

export interface ClipboardConstructor {
  new (
    analyticsContext: MediaPickerContext,
    context: Context,
    clipboardConfig: ClipboardConfig,
  ): Clipboard;
}

export class Clipboard extends LocalUploadComponent {
  constructor(
    analyticsContext: MediaPickerContext,
    context: Context,
    config: ClipboardConfig = { uploadParams: {} },
  ) {
    super(analyticsContext, context, config);
    this.analyticsContext.trackEvent(new MPClipboardLoaded());
  }

  public async activate(): Promise<void> {
    await whenDomReady;

    this.deactivate();
    document.addEventListener('paste', this.pasteHandler, false);
  }

  public deactivate(): void {
    document.removeEventListener('paste', this.pasteHandler);
  }

  private pasteHandler = (event: ClipboardEvent): void => {
    /*
      Browser behaviour for getting files from the clipboard is very inconsistent and buggy.
      @see https://extranet.atlassian.com/display/FIL/RFC+099%3A+Clipboard+browser+inconsistency
    */
    const files = event.clipboardData.files;
    for (let i = 0; i < files.length; ++i) {
      const file = files[i];
      this.uploadService.addFile(file);
    }
  };
}
