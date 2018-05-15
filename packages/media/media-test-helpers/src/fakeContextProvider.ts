import { Observable } from 'rxjs';
import { Context } from '@atlaskit/media-core';
import { ContextConfig } from '../../media-store';

const defaultContextConfig = {
  serviceHost: 'some-service-host',
  authProvider: () =>
    Promise.resolve({
      clientId: 'some-client-id',
      token: 'some-token',
    }),
};
export const fakeContext = (
  stubbedContext: any = {},
  config: ContextConfig = defaultContextConfig,
): Context => {
  const returns = (value: any) => jest.fn().mockReturnValue(value);
  const getMediaItemProvider = returns({
    observable: returns(Observable.of('nothing')),
  });

  const getMediaCollectionProvider = returns({
    observable: returns(Observable.of('nothing')),
  });
  const getDataUriService = returns({
    fetchOriginalDataUri: returns(Promise.resolve('fake-original-data-uri')),
    fetchImageDataUri: returns(Promise.resolve('fake-image-data-uri')),
  });
  const addLinkItem = returns({
    observable: returns(Observable.of('nothing')),
  });
  const getUrlPreviewProvider = returns({
    observable: returns(Observable.of('nothing')),
  });
  const getLocalPreview = jest.fn();
  const setLocalPreview = jest.fn();
  const removeLocalPreview = jest.fn();
  const refreshCollection = jest.fn();
  const getBlobService = jest.fn();
  const uploadFile = jest.fn();
  const defaultContext: Context = {
    getBlobService,
    getLocalPreview,
    setLocalPreview,
    removeLocalPreview,
    getMediaItemProvider,
    getMediaCollectionProvider,
    getDataUriService,
    addLinkItem,
    getUrlPreviewProvider,
    refreshCollection,
    uploadFile,
    config,
  };

  const wrappedStubbedContext: any = {};
  Object.keys(stubbedContext).forEach(methodName => {
    wrappedStubbedContext[methodName] = returns(stubbedContext[methodName]);
  });

  return {
    ...defaultContext,
    ...wrappedStubbedContext,
  };
};
