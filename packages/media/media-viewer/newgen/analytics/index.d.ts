import { FileState } from '@findable/media-core';
import { MediaType } from '@findable/media-store';
export declare const channel = "media";
export declare const packageAttributes: PackageAttributes;
export interface PackageAttributes {
    componentName: string;
    packageName: string;
    packageVersion: string;
}
export interface FileGasPayload {
    fileId: string;
    fileMediatype?: MediaType;
    fileMimetype?: string;
    fileSize?: number;
}
export declare function fileStateToFileGasPayload(state: FileState): FileGasPayload;
