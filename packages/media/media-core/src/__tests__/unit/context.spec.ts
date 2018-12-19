import * as uuid from 'uuid';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  UploadableFileUpfrontIds,
  uploadFile,
  UploadFileCallbacks,
  MediaStore,
  MediaStoreResponse,
  TouchedFiles,
} from '@atlaskit/media-store';
import {
  AuthProvider,
  MediaItem,
  MediaItemProvider,
  ProcessingFileState,
  UploadableFile,
  UploadController,
  UploadingFileState,
} from '../../../src';
import { ContextFactory } from '../../../src/context/context';
import { fileStreamsCache } from '../../../src/context/fileStreamCache';

const getOrInsertSpy = jest.spyOn(fileStreamsCache, 'getOrInsert');
const authProvider: AuthProvider = () =>
  Promise.resolve({
    token: 'some-token-that-does-not-really-matter-in-this-tests',
    clientId: 'some-clientId',
    baseUrl: 'some-base-url',
  });

const createContext = () => {
  return ContextFactory.create({
    authProvider,
  });
};

(uploadFile as any) = jest.fn();
const uploadFileMock: jest.Mock<any> = uploadFile as any;

describe('Context', () => {
  beforeEach(() => {
    uploadFileMock.mockReset();
  });

  describe('.getMediaItemProvider()', () => {
    it('should return different mediaItemProviders for different fileIds', () => {
      const fileId = 'some-id';
      const fileId2 = 'some-other-id';
      const context = createContext();
      const mediaItemProvider = context.getMediaItemProvider(fileId, 'file');
      expect(mediaItemProvider).not.toBe(
        context.getMediaItemProvider(fileId2, 'file'),
      );
    });

    it('should return media item when a link media item is passed in', done => {
      let actualMediaItem: MediaItem;
      const expectedMediaItem: MediaItem = {
        type: 'link',
        details: {
          id: 'abcd',
          type: 'link',
          url: 'http://google.com.au',
          title: 'Google!!!',
        },
      };

      const context = createContext();
      const provider = context.getMediaItemProvider(
        'some-id',
        'link',
        undefined,
        expectedMediaItem,
      );

      provider.observable().subscribe({
        next(mediaItem) {
          actualMediaItem = mediaItem;
        },
        complete() {
          expect(actualMediaItem).toBe(expectedMediaItem);
          done();
        },
        error(error) {
          done(error || new Error('Uknown error.'));
        },
      });
    });

    it('should return media item when a file media item is passed in and the media item processingStatus is not pending', done => {
      let actualMediaItem: MediaItem;
      const expectedMediaItem: MediaItem = {
        type: 'file',
        details: {
          id: 'abcd',
        },
      };

      const context = createContext();
      const provider = context.getMediaItemProvider(
        'some-id',
        'link',
        undefined,
        expectedMediaItem,
      );

      provider.observable().subscribe({
        next(mediaItem) {
          actualMediaItem = mediaItem;
        },
        complete() {
          expect(actualMediaItem).toBe(expectedMediaItem);
          done();
        },
        error(error) {
          done(error || new Error('Uknown error.'));
        },
      });
    });

    it('should return media item and then fetch media item when a file media item is passed in and the processingStatus is pending', done => {
      let actualMediaItems: Array<MediaItem> = [];
      const firstExpectedMediaItem: MediaItem = {
        type: 'file',
        details: {
          id: 'abcd',
          processingStatus: 'pending',
        },
      };
      const secondExpectedMediaItem: MediaItem = {
        type: 'file',
        details: {
          id: 'abcd',
          processingStatus: 'succeeded',
        },
      };

      const fromPool = jest
        .spyOn(MediaItemProvider, 'fromPool')
        .mockImplementation(() => ({
          observable() {
            return of(secondExpectedMediaItem);
          },
        }));

      const context = createContext();
      const provider = context.getMediaItemProvider(
        'some-id',
        'link',
        undefined,
        firstExpectedMediaItem,
      );

      provider.observable().subscribe({
        next(mediaItem) {
          actualMediaItems.push(mediaItem);
        },
        complete() {
          expect(fromPool).toHaveBeenCalledTimes(1);
          expect(actualMediaItems).toHaveLength(2);
          expect(actualMediaItems[0]).toBe(firstExpectedMediaItem);
          expect(actualMediaItems[1]).toBe(secondExpectedMediaItem);
          done();
        },
        error(error) {
          done(error || new Error('Uknown error.'));
        },
      });
    });

    it('should fetch media item when no media item is passed in', done => {
      let actualMediaItems: Array<MediaItem> = [];
      const firstExpectedMediaItem: MediaItem = {
        type: 'file',
        details: {
          id: 'abcd',
          processingStatus: 'succeeded',
        },
      };

      const fromPool = jest
        .spyOn(MediaItemProvider, 'fromPool')
        .mockImplementation(() => ({
          observable() {
            return of(firstExpectedMediaItem);
          },
        }));

      fromPool.mockClear();

      const context = createContext();
      const provider = context.getMediaItemProvider(
        'some-id',
        'link',
        undefined,
      );

      provider.observable().subscribe({
        next(mediaItem) {
          actualMediaItems.push(mediaItem);
        },
        complete() {
          expect(fromPool).toHaveBeenCalledTimes(1);
          expect(actualMediaItems).toHaveLength(1);
          expect(actualMediaItems[0]).toBe(firstExpectedMediaItem);
          done();
        },
        error(error) {
          done(error || new Error('Uknown error.'));
        },
      });
    });
  });

  describe('local preview', () => {
    it('should get the local preview after being asigned', () => {
      const context = createContext();

      expect(context.getLocalPreview('123')).toBeUndefined();
      context.setLocalPreview('123', 'some-preview');
      expect(context.getLocalPreview('123')).toEqual('some-preview');
      context.removeLocalPreview('123');
      expect(context.getLocalPreview('123')).toBeUndefined();
    });
  });

  describe('.file.getFileState()', () => {
    const id = uuid.v4();
    const occurrenceKey = uuid.v4();
    const uploadableFileUpfrontIds: UploadableFileUpfrontIds = {
      id,
      occurrenceKey,
      deferredUploadId: Promise.resolve(uuid.v4()),
    };
    const controller = new UploadController();

    it('should fetch the file if it doesnt exist locally', done => {
      const context = createContext();
      const response = Promise.resolve({
        data: {
          items: [
            {
              id,
              collection: 'some-collection',
              details: {
                name: 'file-one',
                size: 1,
                processingStatus: 'succeeded',
              },
            },
          ],
        },
      });
      const getItems = jest.fn().mockReturnValue(response);
      const fakeStore = {
        getItems,
      };
      (context as any).mediaStore = fakeStore;
      (context.file as any).mediaStore = fakeStore;
      const observer = context.file.getFileState(id, {
        collectionName: 'some-collection',
      });

      observer.subscribe({
        next(state) {
          expect(getItems).toHaveBeenCalledTimes(1);
          expect(getItems).lastCalledWith([id], 'some-collection');
          expect(state).toEqual({
            id,
            status: 'processed',
            name: 'file-one',
            size: 1,
            artifacts: undefined,
          });
        },
        complete() {
          expect.assertions(3);
          done();
        },
      });
    });

    it('should poll for changes and return the latest file state', done => {
      const context = createContext();
      let getFileCalledTimes = 0;
      const getItems = jest.fn().mockImplementation(() => {
        getFileCalledTimes++;
        const processingStatus =
          getFileCalledTimes === 2 ? 'succeeded' : 'pending';

        return Promise.resolve({
          data: {
            items: [
              {
                id,
                details: {
                  name: 'file-one',
                  size: 1,
                  processingStatus,
                },
              },
            ],
          },
        });
      });
      const fakeStore = {
        getItems,
      };
      (context as any).mediaStore = fakeStore;
      (context.file as any).mediaStore = fakeStore;

      const observer = context.file.getFileState(id);
      const next = jest.fn();
      observer.subscribe({
        next,
        complete() {
          expect(getItems).toHaveBeenCalledTimes(2);
          expect(next).toHaveBeenCalledTimes(2);
          expect(next.mock.calls[0][0].status).toEqual('processing');
          expect(next.mock.calls[1][0].status).toEqual('processed');
          done();
        },
      });
    });

    it('should pass options down', () => {
      const context = createContext();

      context.file.getFileState(id, {
        collectionName: 'my-collection',
        occurrenceKey: 'some-occurrenceKey',
      });

      expect(getOrInsertSpy).toHaveBeenLastCalledWith(
        `${id}-my-collection-some-occurrenceKey`,
        expect.anything(),
      );
    });

    it('should return local file state while file is still uploading', done => {
      const context = createContext();
      const getFile = jest.fn();
      const content = new Blob();
      const file = {
        content,
      };
      (context as any).mediaStore = {
        getFile,
      };
      uploadFileMock.mockReturnValue(jest.fn());

      const subscription = context.file
        .upload(file, controller, uploadableFileUpfrontIds)
        .subscribe({
          next(state) {
            const fileId = state.id;
            const occurrenceKey = state.occurrenceKey;
            context.file.getFileState(fileId).subscribe({
              next(state) {
                const expectedState: UploadingFileState = {
                  id: fileId,
                  status: 'uploading',
                  progress: 0,
                  name: '',
                  mediaType: 'unknown',
                  mimeType: '',
                  size: 0,
                  preview: {
                    blob: content,
                  },
                  occurrenceKey,
                };
                expect(state).toEqual(expectedState);
                expect(getFile).not.toBeCalled();
                subscription.unsubscribe();
                done();
              },
            });
          },
        });
    });

    it('should return file state regardless of the state', done => {
      const context = createContext();
      const getFile = jest.fn().mockReturnValue({
        data: {
          processingStatus: 'succeeded',
          id,
          name: 'file-one',
          size: 1,
          mediaType: 'image',
          mimeType: 'image/png',
        },
      });
      const next = jest.fn();
      const file = {
        content: 'some-base-64',
      };
      (context as any).mediaStore = { getFile };
      uploadFileMock.mockImplementation((_, __, ___, callbacks) => {
        callbacks.onUploadFinish();
        return {};
      });

      context.file
        .upload(file, controller, uploadableFileUpfrontIds)
        .subscribe({
          next,
          complete() {
            expect(next).toHaveBeenCalledTimes(1);
            const expectedState: ProcessingFileState = {
              id,
              status: 'processing',
              mediaType: 'unknown',
              mimeType: '',
              name: '',
              size: 0,
              occurrenceKey,
            };
            expect(next.mock.calls[0][0]).toEqual(expectedState);
            done();
          },
        });
    });
  });

  describe('.file.upload()', () => {
    let id;
    let occurrenceKey;
    let uploadableFileUpfrontIds: UploadableFileUpfrontIds;
    let promissedUploadId: string;
    let controller: UploadController;

    beforeEach(() => {
      id = uuid.v4();
      occurrenceKey = uuid.v4();
      promissedUploadId = uuid.v4();
      uploadableFileUpfrontIds = {
        id,
        occurrenceKey,
        deferredUploadId: Promise.resolve(promissedUploadId),
      };
      controller = new UploadController();
    });

    it('should call media-store uploadFile with given arguments', () => {
      const context = createContext();
      const file: UploadableFile = {} as any;
      uploadFileMock.mockImplementation((_, __, ___, callbacks) => {
        callbacks.onProgress(0.1);
        return {};
      });
      const touchFiles = jest.fn();
      const fakeStore: Partial<MediaStore> = {
        touchFiles,
      };
      (context as any).mediaStore = fakeStore;
      (context.file as any).mediaStore = fakeStore;
      touchFiles.mockReturnValue(new Promise(() => {}));

      const subscription = context.file.upload(file).subscribe({
        next() {
          expect(uploadFile).toHaveBeenCalled();
          expect(uploadFileMock.mock.calls[0][0]).toBe(file);
          expect(uploadFileMock.mock.calls[0][1]).toEqual(fakeStore);
          expect(uploadFileMock.mock.calls[0][2]).toEqual({
            id: expect.any(String),
            occurrenceKey: expect.any(String),
            deferredUploadId: expect.any(Promise),
          });
        },
      });
      subscription.unsubscribe();
      expect.assertions(4);
    });

    it('should generate file id and get deferred uploadId', done => {
      const context = createContext();
      const file: UploadableFile = {
        collection: 'some-collection',
        name: 'some-name',
        mimeType: 'some-mime-type',
        content: {} as any,
      };
      uploadFileMock.mockImplementation((_, __, ___, callbacks) => {
        callbacks.onProgress(0.1);
        return {};
      });
      const touchFiles = jest.fn();
      const fakeStore: Partial<MediaStore> = {
        touchFiles,
      };
      (context as any).mediaStore = fakeStore;
      (context.file as any).mediaStore = fakeStore;
      const touchFilesResult: Promise<
        MediaStoreResponse<TouchedFiles>
      > = Promise.resolve({
        data: {
          created: [
            {
              fileId: 'some-file-id',
              uploadId: 'some-upload-id',
            },
          ],
        },
      });
      touchFiles.mockReturnValue(touchFilesResult);

      const subcription = context.file.upload(file).subscribe({
        async next() {
          expect(touchFiles).toHaveBeenCalledWith(
            {
              descriptors: [
                {
                  fileId: expect.any(String),
                  occurrenceKey: expect.any(String),
                  collection: 'some-collection',
                },
              ],
            },
            {
              collection: 'some-collection',
            },
          );
          const uploadableFileUpfrontIds = uploadFileMock.mock
            .calls[0][2] as UploadableFileUpfrontIds;
          const actualUploadId = await uploadableFileUpfrontIds.deferredUploadId;
          expect(actualUploadId).toEqual('some-upload-id');
          subcription.unsubscribe();
          done();
        },
      });
    });

    it('should call subscription error when upload is cancelled', () => {
      const context = createContext();
      const getFile = jest.fn().mockReturnValue({
        data: {
          processingStatus: 'succeeded',
          id: 'file-id-1',
          name: 'file-one',
          size: 1,
        },
      });
      const createDownloadFileStream = jest.fn().mockReturnValue(
        new Observable(observer => {
          observer.complete();
        }),
      );
      const file = {
        content: new Blob(),
        collection: 'some-collection',
      };
      const cancelMock = jest.fn();
      (context as any).mediaStore = { getFile };
      (context as any).createDownloadFileStream = createDownloadFileStream;
      uploadFileMock.mockImplementation(
        (_, __, ___, callbacks: UploadFileCallbacks) => {
          callbacks.onProgress(0.1);
          return {
            cancel() {
              cancelMock();
              callbacks.onUploadFinish('some-error');
            },
          };
        },
      );

      return new Promise(resolve => {
        context.file
          .upload(file, controller, uploadableFileUpfrontIds)
          .subscribe({
            error() {
              expect(cancelMock).toHaveBeenCalledTimes(1);
              resolve();
            },
          });
        controller.abort();
      });
    });

    it('should emit file preview when file is a Blob', done => {
      const context = createContext();
      const getFile = jest.fn().mockReturnValue({
        data: {
          processingStatus: 'succeeded',
          id: 'file-id-1',
          name: 'file-one',
          size: 1,
        },
      });
      const file = {
        content: new File([], '', { type: 'image/png' }),
        name: 'file-name.png',
      };

      uploadFileMock.mockImplementation(() => {
        return {};
      });

      (context as any).mediaStore = { getFile };

      const subscription = context.file
        .upload(file, controller, uploadableFileUpfrontIds)
        .subscribe({
          next(state) {
            expect(state as UploadingFileState).toEqual(
              expect.objectContaining({
                name: 'file-name.png',
                mediaType: 'image',
              }),
            );
            expect((state as any).preview.blob).toBeInstanceOf(Blob);
            subscription.unsubscribe();
            done();
          },
        });
    });

    it('should pass right mimeType when file is a Blob', done => {
      const context = createContext();
      const getFile = jest.fn().mockReturnValue({
        data: {
          processingStatus: 'succeeded',
        },
      });
      const file = {
        content: new File([], '', { type: 'image/png' }),
      };
      uploadFileMock.mockImplementation(() => {
        return {};
      });

      (context as any).mediaStore = { getFile };

      const subscription = context.file
        .upload(file, controller, uploadableFileUpfrontIds)
        .subscribe({
          next(state) {
            expect((state as UploadingFileState).mimeType).toEqual('image/png');
            subscription.unsubscribe();
            done();
          },
        });
    });
  });
});
