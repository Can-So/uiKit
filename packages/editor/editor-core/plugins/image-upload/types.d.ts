export declare type InsertedImageProperties = {
    src?: string;
    alt?: string;
    title?: string;
};
export declare type ImageUploadHandler = (e: Event | undefined, insertImageFn: (props: InsertedImageProperties) => void) => void;
export declare type ImageUploadPluginAction = {
    name: 'START_UPLOAD';
    event?: Event;
};
export declare type ImageUploadPluginState = {
    active: boolean;
    enabled: boolean;
    hidden: boolean;
    activeUpload?: {
        event?: Event;
    };
};
