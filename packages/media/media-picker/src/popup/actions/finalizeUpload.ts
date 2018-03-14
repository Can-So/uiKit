import { Action } from 'redux';

import { Tenant } from '../domain';
import { MediaFile } from '../../domain/file';

export const FINALIZE_UPLOAD = 'FINALIZE_UPLOAD';

export interface FinalizeUploadSource {
  readonly id: string;
  readonly collection?: string;
}

export interface FinalizeUploadAction extends Action {
  readonly type: typeof FINALIZE_UPLOAD;
  readonly file: MediaFile;
  readonly uploadId: string;
  readonly source: FinalizeUploadSource;
  readonly tenant: Tenant;
}

export function isFinalizeUploadAction(
  action: Action,
): action is FinalizeUploadAction {
  return action.type === FINALIZE_UPLOAD;
}

export function finalizeUpload(
  file: MediaFile,
  uploadId: string,
  source: FinalizeUploadSource,
  tenant: Tenant,
): FinalizeUploadAction {
  return {
    type: FINALIZE_UPLOAD,
    file,
    uploadId,
    source,
    tenant,
  };
}
