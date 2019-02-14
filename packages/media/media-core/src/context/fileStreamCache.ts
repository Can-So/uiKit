import { FileState } from '../fileState';
import { LRUCache } from 'lru-fast';
import { Observable } from 'rxjs/Observable';

// can't just use observable.toPromise() because it only resolves when the observable completes, which never happens with ReplaySubject
const observableToPromise = <T>(observable: Observable<T>): Promise<T> => {
  return new Promise<T>(resolve => {
    const subscription = observable.subscribe({
      next: fileState => {
        resolve(fileState);
        setTimeout(() => subscription.unsubscribe(), 0);
      },
    });
  });
};

export class FileStreamCache {
  private readonly fileStreams: LRUCache<string, Observable<FileState>>;
  private readonly stateDeferreds: Map<
    string,
    { promise: Promise<FileState>; resolve: Function }
  >;

  constructor() {
    this.fileStreams = new LRUCache(1000);
    this.stateDeferreds = new Map();
  }

  has(id: string): boolean {
    return !!this.fileStreams.find(id);
  }

  set(id: string, fileStream: Observable<FileState>) {
    this.fileStreams.set(id, fileStream);
    const deferred = this.stateDeferreds.get(id);

    if (deferred) {
      observableToPromise(fileStream).then(state => {
        deferred.resolve(state);
      });
    }
  }

  get(id: string): Observable<FileState> | undefined {
    return this.fileStreams.get(id);
  }

  getCurrentState(id: string): Promise<FileState> {
    const state = this.get(id);

    if (state) {
      return observableToPromise(state);
    }
    const deferred = this.stateDeferreds.get(id);
    if (deferred) {
      return deferred.promise;
    }
    const promise = new Promise<FileState>(resolve => {
      this.stateDeferreds.set(id, { promise, resolve });
    });

    return promise;
  }

  getOrInsert(
    id: string,
    callback: () => Observable<FileState>,
  ): Observable<FileState> {
    if (!this.has(id)) {
      this.set(id, callback());
    }
    return this.get(id)!;
  }

  removeAll() {
    this.fileStreams.removeAll();
  }

  remove(id: string) {
    this.fileStreams.remove(id);
  }

  get size(): number {
    return this.fileStreams.size;
  }
}

export const fileStreamsCache = new FileStreamCache();
export default FileStreamCache;
