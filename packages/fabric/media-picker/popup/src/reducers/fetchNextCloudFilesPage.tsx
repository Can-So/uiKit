import { Action } from 'redux';

import { isFetchNextCloudFilesPageAction } from '../actions';
import { State } from '../domain';

export default function fetchNextPage(state: State, action: Action): State {
  if (isFetchNextCloudFilesPageAction(action)) {
    return {
      ...state,
      view: {
        ...state.view,
        loading: true,
        currentCursor: action.nextCursor,
        nextCursor: undefined,
      },
    };
  } else {
    return state;
  }
}
