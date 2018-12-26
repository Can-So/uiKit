import {
  MediaApiConfig,
  request,
  RequestMethod,
  RequestHeaders,
} from '@atlaskit/media-store';

export type ResponseType = 'json' | 'image';

export type CreateRequestFunc = (requestOptions: RequestOptions) => Response;
export type Response<R = any> = {
  response: Promise<R>;
  cancel: (message?: string) => void;
};

export interface RequesterOptions {
  collectionName?: string;
  config: MediaApiConfig;
}

export interface RequestOptions {
  method?: RequestMethod;
  url: string;
  params?: Object;
  headers?: RequestHeaders;
  data?: Object;
  responseType?: ResponseType;
}

export default (requesterOptions: RequesterOptions): CreateRequestFunc => {
  const {
    collectionName,
    config: { authProvider },
  } = requesterOptions;

  return requestOptions => {
    const { url, headers, params, method, responseType, data } = requestOptions;
    const response = new Promise(async resolve => {
      const auth = await authProvider({ collectionName });
      // TODO: allow to pass AbortController to request
      const response = await request(`${auth.baseUrl}${url}`, {
        method: method || 'GET',
        headers,
        params,
        body: data,
        auth,
      });

      if (responseType === 'json') {
        resolve(await response.json().data);
      } else {
        resolve(response.blob());
      }
    });

    const cancel = () => {};
    return { response, cancel };
  };
};
