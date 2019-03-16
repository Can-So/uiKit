import { GasPayload } from '@atlaskit/analytics-gas-types';
import { ProcessedFileState } from '@atlaskit/media-core';
export declare type ViewerLoadPayload = {
    status: 'success' | 'error';
    errorMessage?: string;
};
export declare type AnalyticViewerProps = {
    onLoad: (payload: ViewerLoadPayload) => void;
};
export declare const mediaFileCommencedEvent: (id: string) => GasPayload;
export declare const mediaFileLoadSucceededEvent: (file: ProcessedFileState) => GasPayload;
export declare const mediaFileLoadFailedEvent: (id: string, failReason: string, file?: ProcessedFileState | undefined) => GasPayload;
export declare const mediaPreviewFailedEvent: (failReason: string, id?: string | undefined, file?: import("../../../../media-test-helpers/node_modules/@atlaskit/media-core/fileState").UploadingFileState | import("../../../../media-test-helpers/node_modules/@atlaskit/media-core/fileState").ProcessingFileState | ProcessedFileState | import("../../../../media-test-helpers/node_modules/@atlaskit/media-core/fileState").ErrorFileState | import("../../../../media-test-helpers/node_modules/@atlaskit/media-core/fileState").ProcessingFailedState | undefined) => GasPayload;
