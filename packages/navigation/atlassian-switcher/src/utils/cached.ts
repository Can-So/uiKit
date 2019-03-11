interface Cached<T, A> {
  (a: A): Promise<T>;
  prefetch: (a: A) => Promise<T>;
  cached: (a: A) => Promise<T | void>;
  reset: () => void;
}

export const cached = <T, A>(fn: (a: A) => Promise<T>): Cached<T, A> => {
  const promiseCache = new Map<string, Promise<T>>();

  function getCacheKey(a: A) {
    return JSON.stringify(a);
  }

  const getCachedValue = (a: A) => {
    const cacheKey = getCacheKey(a);
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(getCacheKey(a)) as Promise<T>;
    }
    return Promise.resolve();
  };

  const execute = (a: A) => {
    const cacheKey = getCacheKey(a);

    const promise = fn(a);
    promiseCache.set(cacheKey, promise);

    return promise.catch((error: any) => {
      promiseCache.delete(cacheKey);
      throw error;
    });
  };

  const reset = () => {
    promiseCache.clear();
  };

  execute.cached = getCachedValue;
  execute.prefetch = execute;
  execute.reset = reset;
  return execute;
};
