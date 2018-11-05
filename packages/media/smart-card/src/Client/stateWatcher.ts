import { CardUpdateCallback, ObjectState } from './types';

type StateWatchCallback = {
  fn: CardUpdateCallback;
  uuid: string;
};

type StateWatchEntry = {
  state: ObjectState;
  lastUpdate: number;
} | null;

export class StateWatch {
  public entry: StateWatchEntry = null;
  private subscribers: StateWatchCallback[] = [];

  subscribe(uuid: string, fn: CardUpdateCallback) {
    this.subscribers.push({ uuid, fn });
    fn(this.entry ? this.entry.state : null);

    return () => {
      console.log('unsubscribe!');
    };
  }

  invalidate() {
    this.entry = null;
  }

  getProp<T extends keyof ObjectState>(
    propName: T,
  ): ObjectState[T] | undefined {
    if (this.entry === null) {
      return;
    }
    return this.entry.state[propName];
  }

  hasPropAndEq<T extends keyof ObjectState>(
    propName: T,
    checkValue?: ObjectState[T],
  ): boolean {
    if (this.entry === null) {
      return false;
    }
    let hasProp = !!this.entry.state[propName];
    if (checkValue) {
      hasProp = this.entry.state[propName] === checkValue;
    }
    return hasProp;
  }

  unsubscribe(uuid: string) {
    this.subscribers = this.subscribers.filter(rec => rec.uuid !== uuid);
  }

  hasExpired(timeFrame: number): boolean {
    if (this.entry === null) {
      return true;
    }
    const now = new Date().getTime();
    const msElapsedSinceLastUpdate = now - this.entry.lastUpdate;
    return msElapsedSinceLastUpdate > timeFrame;
  }

  update(newState: ObjectState) {
    if (
      this.entry === null ||
      JSON.stringify(this.entry.state) !== JSON.stringify(newState)
    ) {
      this.entry = {
        state: newState,
        lastUpdate: new Date().getTime(),
      };
      this.subscribers.forEach(rec => rec.fn(newState));
    }
  }
}
