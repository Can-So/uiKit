import { ObjectState } from './types';
import { StateWatch } from './stateWatcher';

export class Store {
  store: { [K: string]: StateWatch } = {};

  get(url: string): StateWatch | undefined {
    return this.store[url];
  }

  getAllUrls() {
    return Object.keys(this.store);
  }

  init(url: string): StateWatch {
    if (this.store[url]) {
      throw new Error(
        `Impossible happened! Reinit the watcher for url: ${url}`,
      );
    }
    this.store[url] = new StateWatch();
    return this.store[url];
  }

  set(url: string, data: ObjectState): void {
    if (!this.store[url]) {
      throw new Error(`Impossible happened! Set for non-existent url: ${url}`);
    }
    this.store[url].update(data);
  }

  exists(url: string): boolean {
    return !!this.store[url];
  }
}
