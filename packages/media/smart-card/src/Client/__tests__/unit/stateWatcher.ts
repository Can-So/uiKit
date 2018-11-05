import { v4 } from 'uuid';
import { DateConstructor, StateWatch } from '../../stateWatcher';

describe('StateWatch', () => {
  it('should be able to be subscribed to', () => {
    const dateObj: DateConstructor = { getTime: () => 1 };
    const watcher = new StateWatch(dateObj);
    const callback = jest.fn();
    const uuid = v4();
    const payload = { some: 'data' };

    watcher.subscribe(uuid, callback);
    watcher.update(payload, 1);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls).toEqual([[[null, true]], [[payload, false]]]);
  });

  it('should not call the callback if the incoming data is the same', () => {
    const dateObj: DateConstructor = { getTime: () => 1 };
    const watcher = new StateWatch(dateObj);
    const callback = jest.fn();
    const uuid = v4();
    const payload = { some: 'data' };

    watcher.subscribe(uuid, callback);
    watcher.update(payload, 1);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls).toEqual([[[null, true]], [[payload, false]]]);

    callback.mockClear();

    watcher.update(payload, 1);

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
