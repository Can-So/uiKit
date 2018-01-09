import { Action } from 'redux';
import { PopupUrls } from '../../../src/domain';

export interface UpdatePopupUrlsAction extends Action {
  readonly type: 'UPDATE_POPUP_URLS';
  readonly urls: PopupUrls;
}

export const updatePopupUrls = (urls: PopupUrls): UpdatePopupUrlsAction => {
  return {
    type: 'UPDATE_POPUP_URLS',
    urls,
  };
};

export function isUpdatePopupUrlsAction(
  action: Action,
): action is UpdatePopupUrlsAction {
  return action.type === 'UPDATE_POPUP_URLS';
}
