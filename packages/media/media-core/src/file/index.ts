import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { publishReplay } from 'rxjs/operators/publishReplay';
import * as Dataloader from 'dataloader';
import {
  MediaStore,
  UploadableFile,
  UploadController,
  uploadFile,
  MediaCollectionItemFullDetails,
  FileItem,
} from '@atlaskit/media-store';
import * as isValidId from 'uuid-validate';
import {
  FilePreview,
  FileState,
  GetFileOptions,
  mapMediaItemToFileState,
} from '../fileState';
import { fileStreamsCache, FileStreamCache } from '../context/fileStreamCache';
import { getMediaTypeFromUploadableFile } from '../utils/getMediaTypeFromUploadableFile';

const POLLING_INTERVAL = 1000;
const maxNumberOfItemsPerCall = 100;

export const getItemsFromKeys = (
  keys: DataloaderKey[],
  items: FileItem[],
): DataloaderResult[] => {
  const itemsByKey: { [id: string]: DataloaderResult } = items.reduce(
    (prev: { [id: string]: DataloaderResult }, next) => {
      const { id, collection } = next;
      const key = FileStreamCache.createKey(id, { collectionName: collection });

      prev[key] = next.details;

      return prev;
    },
    {},
  );

  return keys.map(dataloaderKey => {
    const { id, collection } = dataloaderKey;
    const key = FileStreamCache.createKey(id, { collectionName: collection });

    return itemsByKey[key];
  });
};

interface DataloaderKey {
  id: string;
  collection?: string;
}
type DataloaderResult = MediaCollectionItemFullDetails | undefined;
export class FileFetcher {
  private readonly dataloader: Dataloader<DataloaderKey, DataloaderResult>;
  constructor(private readonly mediaStore: MediaStore) {
    this.dataloader = new Dataloader<DataloaderKey, DataloaderResult>(
      this.batchLoadingFunc,
      {
        maxBatchSize: maxNumberOfItemsPerCall,
      },
    );
  }

  // Returns an array of the same length as the keys filled with file items
  batchLoadingFunc = async (keys: DataloaderKey[]) => {
    const nonCollectionName = '__media-single-file-collection__';
    const fileIdsByCollection = keys.reduce(
      (prev: { [collectionName: string]: string[] }, next) => {
        const collectionName = next.collection || nonCollectionName;
        const fileIds = prev[collectionName] || [];

        fileIds.push(next.id);
        prev[collectionName] = fileIds;

        return prev;
      },
      {} as { [collectionName: string]: string[] },
    );
    const items: FileItem[] = [];

    await Promise.all(
      Object.keys(fileIdsByCollection).map(async collectionNameKey => {
        const fileIds = fileIdsByCollection[collectionNameKey];
        const collectionName =
          collectionNameKey === nonCollectionName
            ? undefined
            : collectionNameKey;
        const response = await this.mediaStore.getItems(
          fileIds,
          collectionName,
        );

        items.push(...response.data.items);
      }),
    );

    return getItemsFromKeys(keys, items);
  };

  getFileState(id: string, options?: GetFileOptions): Observable<FileState> {
    if (!isValidId(id)) {
      return Observable.create((observer: Observer<FileState>) => {
        observer.error(`${id} is not a valid file id`);
      });
    }

    const key = FileStreamCache.createKey(id, options);

    return fileStreamsCache.getOrInsert(key, () => {
      const collection = options && options.collectionName;
      const fileStream$ = publishReplay<FileState>(1)(
        this.createDownloadFileStream(id, collection),
      );

      fileStream$.connect();

      return fileStream$;
    });
  }

  private createDownloadFileStream = (
    id: string,
    collection?: string,
  ): Observable<FileState> => {
    return Observable.create(async (observer: Observer<FileState>) => {
      let timeoutId: number;

      const fetchFile = async () => {
        try {
          const response = await this.dataloader.load({ id, collection });

          if (!response) {
            return;
          }

          const fileState = mapMediaItemToFileState(id, response);
          observer.next(fileState);

          if (fileState.status === 'processing') {
            timeoutId = window.setTimeout(fetchFile, POLLING_INTERVAL);
          } else {
            observer.complete();
          }
        } catch (e) {
          observer.error(e);
        }
      };

      fetchFile();

      return () => {
        window.clearTimeout(timeoutId);
      };
    });
  };

  upload(
    file: UploadableFile,
    controller?: UploadController,
  ): Observable<FileState> {
    let fileId: string;
    let mimeType = '';
    let preview: FilePreview;
    // TODO [MSW-796]: get file size for base64
    const size = file.content instanceof Blob ? file.content.size : 0;
    const mediaType = getMediaTypeFromUploadableFile(file);
    const collectionName = file.collection;
    const name = file.name || ''; // name property is not available in base64 image
    const subject = new ReplaySubject<FileState>(1);

    if (file.content instanceof Blob) {
      mimeType = file.content.type;
      preview = {
        blob: file.content,
      };
    }
    const { deferredFileId: onUploadFinish, cancel } = uploadFile(
      file,
      this.mediaStore,
      {
        onProgress: progress => {
          if (fileId) {
            subject.next({
              progress,
              name,
              size,
              mediaType,
              mimeType,
              id: fileId,
              status: 'uploading',
              preview,
            });
          }
        },
        onId: id => {
          fileId = id;
          const key = FileStreamCache.createKey(fileId, { collectionName });
          fileStreamsCache.set(key, subject);
          if (file.content instanceof Blob) {
            subject.next({
              name,
              size,
              mediaType,
              mimeType,
              id: fileId,
              progress: 0,
              status: 'uploading',
              preview,
            });
          }
        },
      },
    );

    if (controller) {
      controller.setAbort(cancel);
    }

    onUploadFinish
      .then(() => {
        subject.next({
          id: fileId,
          name,
          size,
          mediaType,
          mimeType,
          status: 'processing',
          preview,
        });
        subject.complete();
      })
      .catch(error => {
        // we can't use .catch(subject.error) due that will change the Subscriber context
        subject.error(error);
      });

    return subject;
  }

  async downloadBinary(
    id: string,
    name: string = 'download',
    collectionName?: string,
  ) {
    const isIE11 =
      !!(window as any).MSInputMethodContext &&
      !!(document as any).documentMode;
    const iframeName = 'media-download-iframe';
    const link = document.createElement('a');
    let iframe = document.getElementById(iframeName) as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.id = iframeName;
      iframe.name = iframeName;
      document.body.appendChild(iframe);
    }
    link.href = await this.mediaStore.getFileBinaryURL(id, collectionName);
    link.download = name;
    link.target = isIE11 ? '_blank' : iframeName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
