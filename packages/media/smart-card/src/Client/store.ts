import { StateWatch } from './stateWatcher';

export class Store<T> {
  store: { [K: string]: StateWatch<T> } = {};

  get(url: string): StateWatch<T> | undefined {
    return this.store[url];
  }

  getAllUrls(): string[] {
    return Object.keys(this.store);
  }

  init(url: string): StateWatch<T> {
    if (this.store[url]) {
      throw new Error(`Reinit the watcher for url: ${url}`);
    }
    return (this.store[url] = new StateWatch(new Date()));
  }

  set(url: string, data: T, lifespan: number): void {
    if (!this.store[url]) {
      throw new Error(`Set for non-existent url: ${url}`);
    }
    return this.store[url].update(data, lifespan);
  }

  exists(url: string): boolean {
    return this.store[url] !== undefined;
  }
}
