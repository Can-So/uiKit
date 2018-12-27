import * as events from 'events';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import {
  Context,
  ContextConfig,
  MediaItem,
  BlobService,
  Auth,
  FileState,
} from '@atlaskit/media-core';

export class Stubs {
  static mediaViewer(overrides: any) {
    const noop = () => {};
    const emitter = new events.EventEmitter();
    const mediaViewer = {
      on: noop,
      off: noop,
      trigger: (event: string) => emitter.emit(event),
      isOpen: jest.fn(),
      open: overrides.open || jest.fn(),
      setFiles: overrides.setFiles || jest.fn(),
      getCurrent: jest.fn(),
      isShowingLastFile: jest.fn(),
    };

    jest
      .spyOn(mediaViewer, 'on')
      .mockImplementation((event, callback) => emitter.on(event, callback));
    jest
      .spyOn(mediaViewer, 'off')
      .mockImplementation((event, callback) =>
        emitter.removeListener(event, callback),
      );

    return mediaViewer;
  }

  static mediaViewerConstructor(overrides?: any) {
    return jest.fn(() => Stubs.mediaViewer(overrides || {}));
  }

  static mediaItemProvider(subject?: Subject<MediaItem>) {
    return {
      observable: jest.fn(() => subject || new Subject<MediaItem>()),
    };
  }

  static blobService() {
    return {
      fetchImageBlob: jest.fn(() => Promise.resolve(new Blob())),
      fetchOriginalBlob: jest.fn(() => Promise.resolve(new Blob())),
      fetchImageBlobCancelable: jest.fn(() => ({
        response: Promise.resolve(new Blob()),
        cancel: jest.fn(),
      })),
      fetchOriginalBlobCancelable: jest.fn(() => ({
        response: Promise.resolve(new Blob()),
        cancel: jest.fn(),
      })),
    };
  }

  static context(
    config: ContextConfig,
    blobService?: BlobService,
    getFileState?: () => Observable<FileState>,
  ): Partial<Context> {
    return {
      config,
      getBlobService: jest.fn(() => blobService || Stubs.blobService()),
      file: {
        downloadBinary: jest.fn(),
        getFileState: jest.fn(getFileState || (() => Observable.empty())),
        upload: jest.fn(),
      } as any,
      collection: {
        getItems: jest.fn(() => Observable.empty()),
        loadNextPage: jest.fn(),
      } as any,
    };
  }
}

export interface CreateContextOptions {
  authPromise?: Promise<Auth>;
  blobService?: BlobService;
  getFileState?: () => Observable<FileState>;
  config?: ContextConfig;
}

export const createContext = (options?: CreateContextOptions) => {
  const defaultOptions: CreateContextOptions = {
    authPromise: Promise.resolve<Auth>({
      token: 'some-token',
      clientId: 'some-client-id',
      baseUrl: 'some-service-host',
    }),
    blobService: undefined,
    getFileState: undefined,
    config: undefined,
  };
  const { authPromise, blobService, getFileState, config } =
    options || defaultOptions;
  const authProvider = jest.fn(() => authPromise);
  const contextConfig: ContextConfig = {
    authProvider,
  };
  return Stubs.context(
    config || contextConfig,
    blobService,
    getFileState,
  ) as Context;
};
