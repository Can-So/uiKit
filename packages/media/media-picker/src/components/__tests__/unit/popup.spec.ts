jest.mock('react-dom');
import { ContextFactory } from '@atlaskit/media-core';
import { render } from 'react-dom';
import { Popup, PopupConfig } from '../../popup';
import { UploadParams } from '../../..';

describe('MediaPickerPopup', () => {
  const context = ContextFactory.create({
    authProvider: () =>
      Promise.resolve({
        clientId: '',
        token: '',
        baseUrl: 'some-api-url',
      }),
    userAuthProvider: () =>
      Promise.resolve({
        clientId: 'some-client-id',
        token: 'some-token',
        baseUrl: 'some-api-url',
      }),
  });
  const popupConfig: PopupConfig = {
    uploadParams: {
      collection: '',
    },
  };

  beforeEach(() => {
    render.mockReset();
  });

  describe('constructor', () => {
    it('sets uploadParams to the default when none are supplied', () => {
      const mediaPicker = new Popup(context, popupConfig);

      const expectedUploadParams: UploadParams = {
        collection: '',
        copyFileToRecents: true,
      };
      expect((mediaPicker as any)['uploadParams'] as UploadParams).toEqual(
        expectedUploadParams,
      );
    });

    it('merges uploadParams with the defaults when they are supplied', () => {
      const newUploadParams: UploadParams = {
        collection: 'hello-world',
      };
      const mediaPicker = new Popup(context, {
        ...popupConfig,
        uploadParams: newUploadParams,
      });

      expect((mediaPicker as any)['uploadParams'] as UploadParams).toEqual({
        collection: 'hello-world',
        copyFileToRecents: true,
      });
    });
  });

  describe('setUploadParams', () => {
    it('updates collection uploadParam when it is supplied', () => {
      const collection = 'some-collection-name';
      const newUploadParams: UploadParams = { collection };

      const mediaPicker = new Popup(context, popupConfig);
      mediaPicker.setUploadParams(newUploadParams);

      expect(
        ((mediaPicker as any)['uploadParams'] as UploadParams).collection,
      ).toEqual(collection);
    });
  });

  describe('hide', () => {
    it('fires a closed event when the popup is hidden', () => {
      const mediaPicker = new Popup(context, popupConfig);
      const emitSpy = jest.fn();

      mediaPicker.emit = emitSpy;

      mediaPicker.hide();
      expect(emitSpy).toHaveBeenCalled();
      expect(emitSpy.mock.calls[0][0]).toEqual('closed');
    });
  });

  describe('cancel', () => {
    it('should blow up with empty argument', () => {
      const mediaPicker = new Popup(context, popupConfig);
      expect(() => mediaPicker.cancel()).toThrow();
    });
  });

  describe('render', () => {
    it('should render <App /> with the right properties', () => {
      const mediaPicker = new Popup(context, popupConfig) as any;

      expect(render.mock.calls[0][0].props).toEqual({
        proxyReactContext: undefined,
        store: mediaPicker.store,
        tenantUploadParams: {
          collection: '',
          copyFileToRecents: true,
        },
      });
    });
  });
});
