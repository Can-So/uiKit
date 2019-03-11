import { Action } from 'redux';

import { isRemoveFileFromRecentsAction } from '../actions/removeFileFromRecents';
import { State } from '../domain';

export default function removeFileFromRecents(
  state: State,
  action: Action,
): State {
  if (!isRemoveFileFromRecentsAction(action)) {
    return state;
  }

  const selectedItems = state.selectedItems.filter(
    item => item.id !== action.id,
  );

  const uploads = Object.keys(state.uploads)
    .filter(uploadId => state.uploads[uploadId].file.metadata.id !== action.id)
    .reduce(
      (uploadObject, uploadId) => ({
        ...uploadObject,
        [uploadId]: state.uploads[uploadId],
      }),
      {},
    );

  return {
    ...state,
    selectedItems,
    uploads,
  };
}
