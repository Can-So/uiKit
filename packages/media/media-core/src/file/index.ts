import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { publishReplay } from 'rxjs/operators/publishReplay';
import {
  MediaStore,
  UploadableFile,
  UploadController,
  uploadFile,
  MediaFileArtifacts,
  TouchFileDescriptor,
} from '@atlaskit/media-store';
import {
  FilePreview,
  FileState,
  GetFileOptions,
  mapMediaFileToFileState,
} from '../fileState';
import { fileStreamsCache } from '../context/fileStreamCache';
import FileStreamCache from '../context/fileStreamCache';
import { getMediaTypeFromUploadableFile } from '../utils/getMediaTypeFromUploadableFile';

const POLLING_INTERVAL = 1000;

export class FileFetcher {
  constructor(private readonly mediaStore: MediaStore) {}

  getFileState(id: string, options?: GetFileOptions): Observable<FileState> {
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

  getArtifactURL(
    artifacts: MediaFileArtifacts,
    artifactName: keyof MediaFileArtifacts,
    collectionName?: string,
  ): Promise<string> {
    return this.mediaStore.getArtifactURL(
      artifacts,
      artifactName,
      collectionName,
    );
  }

  private createDownloadFileStream = (
    id: string,
    collection?: string,
  ): Observable<FileState> => {
    return Observable.create(async (observer: Observer<FileState>) => {
      let timeoutId: number;

      const fetchFile = async () => {
        try {
          const response = await this.mediaStore.getFile(id, { collection });
          const fileState = mapMediaFileToFileState(response);

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

  touchFiles(descriptors: TouchFileDescriptor[], collection?: string) {
    return this.mediaStore
      .touchFiles({ descriptors }, { collection })
      .then(({ data }) => data);
  }

  upload(
    file: UploadableFile,
    controller?: UploadController,
  ): Observable<FileState> {
    const {
      id,
      content,
      occurrenceKey,
      name = '', // name property is not available in base64 image
    } = file;
    let mimeType = '';
    let size = 0;
    let preview: FilePreview | undefined;
    // TODO [MSW-796]: get file size for base64
    const mediaType = getMediaTypeFromUploadableFile(file);
    const subject = new ReplaySubject<FileState>(1);

    if (content instanceof Blob) {
      size = content.size;
      mimeType = content.type;
      preview = {
        blob: content,
      };
    }
    const stateBase = {
      name,
      size,
      mediaType,
      mimeType,
      id,
      occurrenceKey,
      preview,
    };

    const { cancel, whenUploadFinish } = uploadFile(file, this.mediaStore, {
      onProgress: progress => {
        subject.next({
          status: 'uploading',
          ...stateBase,
          progress,
        });
      },
    });

    setTimeout(() => {
      subject.next({
        status: 'uploading',
        ...stateBase,
        progress: 0,
      });
    }, 0);

    if (controller) {
      controller.setAbort(cancel);
    }

    whenUploadFinish
      .then(() => {
        subject.next({
          status: 'processing',
          ...stateBase,
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
