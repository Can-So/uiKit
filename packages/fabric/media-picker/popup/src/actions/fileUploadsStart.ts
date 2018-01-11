import { Action } from 'redux';

import { UploadsStartEventPayload } from '../../../src/domain/uploadEvent';
import { MediaFile } from '../../../src/domain/file';

export interface FileUploadsStartAction extends Action {
  readonly type: 'FILE_UPLOADS_START';
  readonly files: MediaFile[];
}

export function isFileUploadsStartAction(
  action: Action,
): action is FileUploadsStartAction {
  return action.type === 'FILE_UPLOADS_START';
}

export function fileUploadsStart(
  payload: UploadsStartEventPayload,
): FileUploadsStartAction {
  return {
    type: 'FILE_UPLOADS_START',
    files: payload.files,
  };
}
