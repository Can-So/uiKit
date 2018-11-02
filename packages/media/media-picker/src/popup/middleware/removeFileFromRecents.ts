import { Store, Dispatch, Action } from 'redux';
import { State } from '../domain';
import { isRemoveFileFromRecentsAction } from '../actions/removeFileFromRecents';
import { RECENTS_COLLECTION } from '../config';

export const removeFileFromRecents = (store: Store<State>) => (
  next: Dispatch<State>,
) => (action: Action) => {
  if (isRemoveFileFromRecentsAction(action)) {
    store
      .getState()
      .userContext.collection.removeFile(
        action.idForApiCall || action.id,
        RECENTS_COLLECTION,
        action.occurrenceKey,
      );
  }

  return next(action);
};
