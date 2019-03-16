export declare const getNaturalImageSize: (dataURL: string) => Promise<{
    width: number;
    height: number;
}>;
export declare const parseImage: (dataURL: string) => Promise<{
    src: string;
}>;
export declare const hasFileExceededSize: (file: File) => boolean;
export declare const checkWebpSupport: () => Promise<boolean>;
export declare const imageAcceptHeader: () => Promise<string>;
