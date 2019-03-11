interface Cached<T, A> {
  (a: A): Promise<T>;
  prefetch: (a: A) => Promise<T>;
}

export const cached = <T, A>(fn: (a: A) => Promise<T>): Cached<T, A> => {
  const promiseCache = new Map<string, Promise<T>>();

  const populateCaches = (a: A) => {
    const cacheKey = JSON.stringify(a);

    const promise = fn(a);
    promiseCache.set(cacheKey, promise);

    return promise.catch((error: any) => {
      promiseCache.delete(cacheKey);
      throw error;
    });
  };

  const execute = (a: A) => {
    const cacheKey = JSON.stringify(a);

    if (promiseCache.has(cacheKey)) {
      const promise = promiseCache.get(cacheKey) as Promise<T>;
      populateCaches(a).catch(/* swallow cache errors */ () => {});
      return promise;
    }

    return populateCaches(a);
  };

  execute.prefetch = populateCaches;
  return execute;
};
