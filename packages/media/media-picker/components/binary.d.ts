import { LocalUploadComponent } from './localUpload';
import { Context } from '@findable/media-core';
import { BinaryUploader, BinaryConfig } from './types';
export declare class BinaryUploaderImpl extends LocalUploadComponent implements BinaryUploader {
    constructor(context: Context, config: BinaryConfig);
    upload(base64: string, name: string): void;
    private _urltoFile;
}
