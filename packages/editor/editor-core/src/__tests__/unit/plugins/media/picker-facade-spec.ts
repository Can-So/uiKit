import {
  UploadPreviewUpdateEventPayload,
  MediaPickerComponents,
  MediaPickerComponent,
} from '@atlaskit/media-picker';
import { ContextFactory } from '@atlaskit/media-core';
import {
  StoryBookAuthProvider,
  userAuthProvider,
} from '@atlaskit/media-test-helpers';
import { randomId } from '@atlaskit/editor-test-helpers';

import {
  DefaultMediaStateManager,
  MediaStateManager,
  MediaState,
} from '../../../../plugins/media';
import PickerFacade, {
  PickerType,
  PickerFacadeConfig,
} from '../../../../plugins/media/picker-facade';
import { ErrorReportingHandler } from '@atlaskit/editor-common';

describe('Media PickerFacade', () => {
  const errorReporter: ErrorReportingHandler = {
    captureException: (err: any) => {},
    captureMessage: (msg: any) => {},
  };

  const context = ContextFactory.create({
    authProvider: StoryBookAuthProvider.create(false),
    userAuthProvider,
  });

  const getPickerFacadeConfig = (
    stateManager: MediaStateManager,
  ): PickerFacadeConfig => ({
    context,
    stateManager,
    errorReporter,
  });

  const testFileId = randomId();

  // Spies
  const commonSpies: { [S in keyof MediaPickerComponent]: jest.Mock } = {
    addListener: jest.fn(),
    cancel: jest.fn(),
    emit: jest.fn(),
    emitUploadEnd: jest.fn(),
    emitUploadError: jest.fn(),
    emitUploadPreviewUpdate: jest.fn(),
    emitUploadProcessing: jest.fn(),
    emitUploadProgress: jest.fn(),
    emitUploadsStart: jest.fn(),
    off: jest.fn(),
    on: jest.fn(),
    onAny: jest.fn(),
    once: jest.fn(),
    removeAllListeners: jest.fn(),
    removeListener: jest.fn(),
    setUploadParams: jest.fn(),
  };
  const specificSpies: {
    [K in keyof MediaPickerComponents]: {
      [S in Partial<keyof MediaPickerComponents[K]>]: jest.Mock
    }
  } = {
    browser: {
      ...commonSpies,
      teardown: jest.fn(),
      browse: jest.fn(),
    },
    binary: {
      ...commonSpies,
      upload: jest.fn(),
    },
    clipboard: {
      ...commonSpies,
      activate: jest.fn(),
      deactivate: jest.fn(),
    },
    dropzone: {
      ...commonSpies,
      activate: jest.fn(),
      deactivate: jest.fn(),
    },
    popup: {
      ...commonSpies,
      show: jest.fn(),
      teardown: jest.fn(),
      hide: jest.fn(),
      emitClosed: jest.fn(),
    },
  };

  const previewPayload: UploadPreviewUpdateEventPayload = {
    file: {
      id: testFileId,
      name: 'test name',
      size: 100,
      type: 'test/file',
      upfrontId: Promise.resolve('publicid'),
      creationDate: 10,
    },
    preview: {},
  };

  const endPayload = {
    file: {
      id: testFileId,
    },
  };

  const insertPayload: MediaState[] = [
    {
      id: testFileId,
      fileName: 'test name',
      fileSize: 100,
      fileMimeType: 'test/file',
      dimensions: undefined,
      scaleFactor: undefined,
    },
  ];

  // Helpers
  function triggerStart(payload?: Partial<MediaState>) {
    const [eventName, cb] = commonSpies.on.mock.calls[0];
    cb(previewPayload);
    expect(eventName).toBe('upload-preview-update');
  }

  function triggerEnd(payload?: Partial<MediaState>) {
    const [eventName, cb] = commonSpies.on.mock.calls[1];
    cb(endPayload);
    expect(eventName).toBe('upload-processing');
  }

  const pickerTypes: Array<PickerType> = [
    'popup',
    'binary',
    'clipboard',
    'dropzone',
    'browser',
  ];

  pickerTypes.forEach(pickerType => {
    describe(`Picker: ${pickerType}`, () => {
      let stateManager: MediaStateManager;
      let facade: PickerFacade;
      let spies = specificSpies[pickerType];

      beforeEach(async () => {
        Object.keys(spies).forEach(k => spies[k].mockClear());

        function MockPopup(this: any) {
          Object.keys(spies).forEach(k => (this[k] = spies[k]));
        }

        const MediaPickerMock = jest
          .fn()
          .mockReturnValue(Promise.resolve(new MockPopup()));

        stateManager = new DefaultMediaStateManager();
        facade = new PickerFacade(
          pickerType,
          getPickerFacadeConfig(stateManager),
          {
            uploadParams: { collection: '' },
          },
          MediaPickerMock,
        );
        await facade.init();
      });

      afterEach(() => {
        facade.destroy();
        stateManager.destroy();
      });

      it(`listens to picker events`, () => {
        const fn = jasmine.any(Function);
        expect(spies.on).toHaveBeenCalledTimes(
          pickerType === 'dropzone' || pickerType === 'clipboard' ? 6 : 4,
        );
        expect(spies.on).toHaveBeenCalledWith('upload-preview-update', fn);
        expect(spies.on).toHaveBeenCalledWith('upload-processing', fn);

        if (pickerType === 'dropzone') {
          expect(spies.on).toHaveBeenCalledWith('drag-enter', fn);
          expect(spies.on).toHaveBeenCalledWith('drag-leave', fn);
        }
      });

      it('removes listeners on destruction', () => {
        facade.destroy();
        expect(spies.removeAllListeners).toHaveBeenCalledTimes(
          pickerType === 'dropzone' || pickerType === 'clipboard' ? 5 : 3,
        );
        expect(spies.removeAllListeners).toHaveBeenCalledWith(
          'upload-preview-update',
        );
        expect(spies.removeAllListeners).toHaveBeenCalledWith(
          'upload-processing',
        );
        if (pickerType === 'dropzone') {
          expect(spies.removeAllListeners).toHaveBeenCalledWith('drag-enter');
          expect(spies.removeAllListeners).toHaveBeenCalledWith('drag-leave');
        }
      });

      describe('proxies events to MediaStateManager', () => {
        const spy = jest.fn();

        beforeEach(() => {
          spy.mockClear();
          stateManager.on(testFileId, spy);
        });

        it('for new uploads via onNewMedia()', () => {
          const spy = jest.fn();
          facade.onNewMedia(spy);

          triggerStart();

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(insertPayload);
        });

        it('for upload end', () => {
          triggerEnd();
          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith({
            status: 'ready',
            id: testFileId,
          });
        });
      });

      // Picker Specific Tests
      if (pickerType === 'clipboard' || pickerType === 'dropzone') {
        it(`should call picker's activate() during initialization`, () => {
          expect(spies.activate).toHaveBeenCalledTimes(1);
        });
      }

      if (pickerType === 'popup' || pickerType === 'browser') {
        it(`should call picker's teardown() on destruction`, () => {
          facade.destroy();
          expect(spies.teardown).toHaveBeenCalledTimes(1);
        });
      } else if (pickerType === 'clipboard' || pickerType === 'dropzone') {
        it(`should call picker's deactivate() on destruction`, () => {
          facade.destroy();
          expect(spies.deactivate).toHaveBeenCalledTimes(1);
        });
      }

      if (pickerType === 'popup') {
        it(`should call picker's show() on destruction`, () => {
          facade.show();
          expect(spies.show).toHaveBeenCalledTimes(1);
        });
      } else if (pickerType === 'browser') {
        it(`should call picker's browse() on destruction`, () => {
          facade.show();
          expect(spies.browse).toHaveBeenCalledTimes(1);
        });
      }

      if (pickerType === 'popup') {
        it(`should call picker's hide() on destruction`, () => {
          facade.hide();
          expect(spies.hide).toHaveBeenCalledTimes(1);
        });
      }

      if (pickerType === 'popup') {
        it(`should call picker on close when onClose is called`, () => {
          spies.on.mockClear();
          const closeCb = jest.fn();
          facade.onClose(closeCb);

          expect(spies.on).toHaveBeenCalledTimes(1);
          expect(spies.on).toHaveBeenCalledWith('closed', closeCb);
        });
      }

      if (pickerType === 'dropzone' || pickerType === 'clipboard') {
        it(`should call picker.activate when activate is called`, () => {
          spies.activate.mockClear();
          facade.activate();
          expect(spies.activate).toHaveBeenCalledTimes(1);
        });
      }

      if (pickerType === 'dropzone' || pickerType === 'clipboard') {
        it(`should call picker.deactivate when deactivate is called`, () => {
          spies.deactivate.mockClear();
          facade.deactivate();
          expect(spies.deactivate).toHaveBeenCalledTimes(1);
        });
      }

      if (pickerType === 'binary') {
        it(`calls picker's upload() on destruction`, () => {
          const url = 'https://atlassian.com/file.ext';
          const fileName = 'file.ext';
          facade.upload(url, fileName);
          expect(spies.upload).toHaveBeenCalledTimes(1);
          expect(spies.upload).toHaveBeenCalledWith(url, fileName);
        });
      }
    });
  });
});
