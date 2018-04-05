import { AuthProvider } from '@atlaskit/media-core';
import { Action, Dispatch, Store } from 'redux';

import { Fetcher } from '../tools/fetcher/fetcher';
import {
  getFilesInRecentsFullfilled,
  getFilesInRecentsFailed,
} from '../actions';
import { State } from '../domain';
import { isGetFilesInRecentsAction } from '../actions/getFilesInRecents';

export const getFilesInRecents = (fetcher: Fetcher) => (
  store: Store<State>,
) => (next: Dispatch<Action>) => (action: Action) => {
  const { userAuthProvider } = store.getState();
  if (isGetFilesInRecentsAction(action)) {
    requestRecentFiles(fetcher, userAuthProvider, store);
  }

  return next(action);
};

export const requestRecentFiles = (
  fetcher: Fetcher,
  userAuthProvider: AuthProvider,
  store: Store<State>,
): Promise<void> => {
  const { apiUrl } = store.getState();

  return userAuthProvider()
    .then(auth => fetcher.getRecentFiles(apiUrl, auth, 30, 'desc'))
    .then(({ contents, nextInclusiveStartKey }) => {
      store.dispatch(
        getFilesInRecentsFullfilled(contents, nextInclusiveStartKey),
      );
    })
    .catch(() => {
      store.dispatch(getFilesInRecentsFailed());
    });
};
