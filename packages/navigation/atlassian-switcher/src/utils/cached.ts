interface Cached<T, A> {
  (a: A): Promise<T>;

  prefetch: (a: A) => Promise<T>;
  cached: (a: A) => T | void;
  reset: () => void;
}

export const cached = <T, A>(fn: (a: A) => Promise<T>): Cached<T, A> => {
  const resultCache = new Map<string, T>();
  const promiseCache = new Map<string, Promise<T>>();

  function getCacheKey(a: A) {
    return JSON.stringify(a);
  }

  const getCachedValue = (a: A) => {
    const cacheKey = getCacheKey(a);

    if (resultCache.has(cacheKey)) {
      return resultCache.get(getCacheKey(a));
    }
  };

  const execute = (a: A) => {
    const cacheKey = getCacheKey(a);

    const promise = fn(a);
    promiseCache.set(cacheKey, promise);

    return promise
      .then(result => {
        resultCache.set(cacheKey, result);
        return result;
      })
      .catch((error: any) => {
        // Remove failed promise from the cache, but keep previously resolved value
        promiseCache.delete(cacheKey);
        throw error;
      });
  };

  const reset = () => {
    resultCache.clear();
    promiseCache.clear();
  };

  execute.cached = getCachedValue;
  execute.prefetch = execute;
  execute.reset = reset;
  return execute;
};
