import { Action, MiddlewareAPI } from 'redux';
import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { State } from '../../domain';
import { isFileUploadsStartAction } from '../../actions/fileUploadsStart';
import { Payload } from '.';
import { MediaFile } from '../../../domain/file';

export default (
  action: Action,
  store: MiddlewareAPI<State>,
): Payload[] | undefined => {
  if (isFileUploadsStartAction(action)) {
    return action.files.map(
      (file: MediaFile) =>
        <Payload>{
          action: 'commenced',
          actionSubject: 'mediaUpload',
          actionSubjectId: 'localMedia',
          attributes: {
            fileAttributes: {
              fileSize: file.size,
              fileMimetype: file.type,
              fileSource: 'mediapicker',
            },
          },
          eventType: OPERATIONAL_EVENT_TYPE,
          source: 'mediaPickerModal',
        },
    );
  }
};
