import { CardUpdateCallback } from './types';

type StateWatchCallback<T> = {
  fn: CardUpdateCallback<T>;
  uuid: string;
};

type StateWatchEntry<T> = {
  state: T;
  goodTill: number;
} | null;

export type DateConstructor = {
  getTime(): number;
};

export class StateWatch<T> {
  public entry: StateWatchEntry<T> = null;
  private subscribers: StateWatchCallback<T>[] = [];

  constructor(private dateConstructor: DateConstructor) {}

  subscribe(uuid: string, fn: CardUpdateCallback<T>) {
    if (!this.subscribers.find(sub => sub.uuid === uuid)) {
      this.subscribers.push({ uuid, fn });
    }
    fn([this.entry ? this.entry.state : null, this.hasExpired()]);

    return () => {};
  }

  invalidate(): StateWatch<T> {
    if (this.entry) {
      this.entry.goodTill = this.dateConstructor.getTime() - 1;
    }
    return this;
  }

  getProp<K extends keyof T>(propName: K): T[K] | undefined {
    if (this.entry === null) {
      return;
    }
    return this.entry.state[propName];
  }

  unsubscribe(uuid: string) {
    this.subscribers = this.subscribers.filter(rec => rec.uuid !== uuid);
  }

  hasExpired(): boolean {
    if (this.entry === null) {
      return true;
    }
    return this.entry.goodTill < this.dateConstructor.getTime();
  }

  update(state: T, lifespan: number): void {
    if (
      this.entry === null ||
      JSON.stringify(this.entry.state) !== JSON.stringify(state)
    ) {
      this.entry = {
        state,
        goodTill: this.dateConstructor.getTime() + lifespan,
      };
      this.subscribers.forEach(rec => rec.fn([state, false]));
    }
  }
}
