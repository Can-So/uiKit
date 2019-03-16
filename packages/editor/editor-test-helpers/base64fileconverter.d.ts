export declare class Converter {
    HAS_BASE64_FILE_SUPPORT: boolean;
    supportedTypes: string[];
    maxFileSizeInBytes: number;
    constructor(supportedTypes: string[], maxFileSizeInBytes: number);
    convert(files: File[], fn?: (base64src: string) => void, errFn?: (file: File) => void): void;
}
export declare type convertedHandlerCallback = (imageAttrs: any) => void;
export declare function dropHandler(converter: Converter, e: DragEvent, fn: convertedHandlerCallback): boolean;
export declare function pasteHandler(converter: Converter, e: ClipboardEvent, fn: convertedHandlerCallback): boolean;
