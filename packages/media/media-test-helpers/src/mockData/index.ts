import { MockURL } from 'xhr-mock/lib/MockURL';
import { MockHeaders } from 'xhr-mock/lib/types';
import { ClientBasedAuth } from '@atlaskit/media-store';

export * from './matchers';
export * from './utils';
export * from './handlers';

export interface RequestData {
  method?: string;
  url?: MockURL;
  headers?: MockHeaders;
  body?: any;
}

export interface ResponseData {
  status?: number;
  reason?: string;
  headers?: MockHeaders;
  body?: any;
}

export interface MockContextItem {
  auth: ClientBasedAuth;
  collection: Array<MediaCollectionFile>;
  collectionName: string;
}

export class MockContext {
  userContext: MockContextItem = {
    auth: {
      clientId: '',
      token: '',
      baseUrl: '',
    },
    collection: [],
    collectionName: 'recents',
  };
  tenantContext: MockContextItem = {
    auth: {
      clientId: '',
      token: '',
      baseUrl: '',
    },
    collection: [],
    collectionName: 'MediaServicesSample',
  };
}

export interface InternalFile {
  id: string;
  name: string;
  size: number;
  occurrenceKey: string;
  dataUri: string;
}

export interface MediaCollectionFile {
  id: string;
  occurrenceKey: string;
  type: string;
  details: {
    size: number;
    name: string;
  };
  author: {
    id: string;
    userName: string;
    displayName: string;
    active: boolean;
  };
  insertedAt: number;
}
