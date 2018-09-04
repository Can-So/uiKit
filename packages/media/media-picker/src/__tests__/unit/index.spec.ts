import {
  MediaPicker,
  BinaryUploader,
  Browser,
  Dropzone,
  Clipboard,
  Popup,
} from '../..';
import { AuthProvider, ContextFactory } from '@atlaskit/media-core';
import { PopupConfig } from '../../components/popup';

/**
 * These specs should describe the public API.
 */
describe('MediaPicker', () => {
  const container = document.createElement('div');
  const userAuthProvider: AuthProvider = () =>
    Promise.resolve({
      clientId: 'some-client-id',
      token: 'some-token',
      baseUrl: 'some-api-url',
    });
  const context = ContextFactory.create({
    userAuthProvider,
    authProvider: () =>
      Promise.resolve({
        clientId: 'some-client-id',
        token: 'some-token',
        baseUrl: 'some-api-url',
      }),
  });
  const config = {
    uploadParams: {
      collection: 'some-collection',
    },
  };

  describe('binary', () => {
    it('should be instance of MediaPickerBinaryUploader given options', () => {
      const binary = MediaPicker('binary', context, config);

      expect(binary).toBeInstanceOf(BinaryUploader);
    });

    it('should be a class constructor given no options', () => {
      expect(MediaPicker('binary')).toEqual(BinaryUploader);
    });

    it('should be able to register listeners to generic upload events', () => {
      const binary = MediaPicker('binary', context, config);
      binary.on('upload-status-update', payload => {});
      binary.on('upload-preview-update', payload => {});
      binary.on('upload-processing', payload => {});
      binary.on('upload-end', payload => {});
      binary.on('upload-error', payload => {});
    });
  });

  describe('browser', () => {
    it('should be instance of MediaPickerBrowser given just module config', () => {
      const browser = MediaPicker('browser', context, config);

      expect(browser).toBeInstanceOf(Browser);
    });

    it('should be instance of MediaPickerBrowser given moduleConfig and pickerConfig', () => {
      const browser = MediaPicker('browser', context, {
        ...config,
        multiple: true,
        fileExtensions: ['image/jpeg', 'image/png'],
      });

      expect(browser).toBeInstanceOf(Browser);
    });

    it('should be a class constructor given no options', () => {
      expect(MediaPicker('browser')).toEqual(Browser);
    });

    it('should be able to register listeners to generic upload events', () => {
      const browser = MediaPicker('browser', context, config);

      browser.on('uploads-start', payload => {});
      browser.on('upload-status-update', payload => {});
      browser.on('upload-preview-update', payload => {});
      browser.on('upload-processing', payload => {});
      browser.on('upload-end', payload => {});
      browser.on('upload-error', payload => {});
    });
  });

  describe('clipboard', () => {
    it('should be instance of MediaPickerClipboard given options', () => {
      const clipboard = MediaPicker('clipboard', context, config);

      expect(clipboard).toBeInstanceOf(Clipboard);
    });

    it('should be a class constructor given no options', () => {
      expect(MediaPicker('clipboard')).toEqual(Clipboard);
    });

    it('should be able to register listeners to generic upload events', () => {
      const clipboard = MediaPicker('clipboard', context, config);

      clipboard.on('uploads-start', payload => {});
      clipboard.on('upload-status-update', payload => {});
      clipboard.on('upload-preview-update', payload => {});
      clipboard.on('upload-processing', payload => {});
      clipboard.on('upload-end', payload => {});
      clipboard.on('upload-error', payload => {});
    });
  });

  describe('dropzone', () => {
    it('should be instance of MediaPickerDropzone given just moduleConfig', () => {
      const dropzone = MediaPicker('dropzone', context, config);

      expect(dropzone).toBeInstanceOf(Dropzone);
    });

    it('should be instance of MediaPickerDropzone given moduleConfig and pickerConfig', () => {
      const dropzone = MediaPicker('dropzone', context, {
        ...config,
        container,
      });

      expect(dropzone).toBeInstanceOf(Dropzone);
    });

    it('should be a class constructor given no options', () => {
      expect(MediaPicker('dropzone')).toEqual(Dropzone);
    });

    it('should be able to register listeners to generic upload events', () => {
      const dropzone = MediaPicker('dropzone', context, config);

      dropzone.on('uploads-start', payload => {});
      dropzone.on('upload-status-update', payload => {});
      dropzone.on('upload-preview-update', payload => {});
      dropzone.on('upload-processing', payload => {});
      dropzone.on('upload-end', payload => {});
      dropzone.on('upload-error', payload => {});
    });

    it('consumers should be able to listen for "drop", "drag-enter" and "drag-leave" events', () => {
      const dropzone = MediaPicker('dropzone', context, config);

      dropzone.on('drop', () => {});
      dropzone.on('drag-enter', () => {});
      dropzone.on('drag-leave', () => {});
    });
  });

  describe('popup', () => {
    const popupConfig: PopupConfig = { ...config, container };

    it('should be instance of MediaPickerPopup given options', () => {
      const popup = MediaPicker('popup', context, popupConfig);

      expect(popup).toBeInstanceOf(Popup);
    });

    it('should be a class constructor given no options', () => {
      expect(MediaPicker('popup')).toEqual(Popup);
    });

    it('should be able to register listeners to generic upload events', () => {
      const popup = MediaPicker('popup', context, popupConfig);

      popup.on('uploads-start', payload => {});
      popup.on('upload-status-update', payload => {});
      popup.on('upload-preview-update', payload => {});
      popup.on('upload-processing', payload => {});
      popup.on('upload-end', payload => {});
      popup.on('upload-error', payload => {});
    });
  });
});
