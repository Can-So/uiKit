import { createPromise } from '../cross-platform-promise';
import { NativeFetchResponse } from '../types';

const globalFetch = window.fetch;
export const mockFetchFor = (urls: Array<string> = []) => {
  window.fetch = (url: string, options) => {
    // Determine whether its a URL we want native to handle, otherwise continue as normal.
    const shouldMock = urls.find(u => url.startsWith(u));
    if (!shouldMock) {
      return globalFetch(url, options);
    }

    return createPromise<NativeFetchResponse>(
      'nativeFetch',
      JSON.stringify({ url, options }),
    )
      .submit()
      .then(({ response, status, statusText }) =>
        Promise.resolve(new Response(response, { status, statusText })),
      );
  };
};
