import { Action, Store, Dispatch } from 'redux';

import {
  isFetchNextCloudFilesPageAction,
  fileListUpdate,
  requestUnlinkCloudAccount,
} from '../actions';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';

export const fetchNextCloudFilesPageMiddleware = (fetcher: Fetcher) => (
  store: Store<State>,
) => (next: Dispatch<State>) => (action: Action) => {
  if (isFetchNextCloudFilesPageAction(action)) {
    const { userAuthProvider } = store.getState();
    const { serviceName, accountId, path } = action;
    const { id: folderId } = path[path.length - 1] || { id: '' };
    const { view } = store.getState();

    const cursor = view && view.nextCursor;
    const items = (view && view.items) || [];

    userAuthProvider()
      .then(auth =>
        fetcher.fetchCloudAccountFolder(
          auth,
          serviceName,
          accountId,
          folderId,
          cursor,
        ),
      )
      .then(folder =>
        store.dispatch(
          fileListUpdate(
            accountId,
            path,
            items.concat(folder.items),
            cursor,
            folder.cursor,
          ),
        ),
      )
      .catch(error => {
        /* TODO: error collector */
        if (error.response && error.response.status === 401) {
          store.dispatch(
            requestUnlinkCloudAccount({ id: accountId, name: serviceName }),
          );
        }
      });
  }

  return next(action);
};
