import { GasPayload } from '@atlaskit/analytics-gas-types';
import {
  packageAttributes,
  fileStateToFileGasPayload,
  FileGasPayload,
  PackageAttributes,
} from './index';
import { FileState, FileStatus } from '@atlaskit/media-core';
import { MediaViewerError } from '../error';

interface DownloadAttributes extends FileGasPayload {
  fileSupported?: boolean;
  fileProcessingStatus: FileStatus;
}

const getBasePayload = (actionSubjectId: string): GasPayload => ({
  eventType: 'ui',
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId,
});

const getBaseAttributes = (state: FileState) => ({
  ...fileStateToFileGasPayload(state),
  fileProcessingStatus: state.status,
  ...packageAttributes,
});

const downloadEvent = (
  file: FileState,
  actionSubjectId: string,
  failReason?: string,
) => {
  const basePayload = getBasePayload(actionSubjectId);
  const baseAttributes = failReason
    ? {
        ...getBaseAttributes(file),
        failReason,
      }
    : getBaseAttributes(file);
  switch (file.status) {
    case 'processed':
    case 'uploading':
    case 'processing':
    case 'failed-processing':
      return {
        ...basePayload,
        attributes: {
          ...baseAttributes,
          fileSupported: file.mediaType !== 'unknown',
        },
      };
    case 'error':
      return {
        ...basePayload,
        attributes: {
          ...baseAttributes,
        },
      };
  }
};

export interface DownloadGasPayload extends GasPayload {
  attributes: DownloadAttributes & PackageAttributes;
}

export function downloadErrorButtonEvent(
  state: FileState,
  err: MediaViewerError,
): DownloadGasPayload {
  return downloadEvent(state, 'failedPreviewDownloadButton', err.errorName);
}

export function downloadButtonEvent(state: FileState): DownloadGasPayload {
  return downloadEvent(state, 'downloadButton');
}
