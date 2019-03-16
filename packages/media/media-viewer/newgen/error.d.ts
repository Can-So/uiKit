import * as React from 'react';
import { ReactNode } from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { WithAnalyticsEventProps } from '@findable/analytics-next-types';
export declare type ErrorName = 'previewFailed' | 'metadataFailed' | 'unsupported' | 'idNotFound' | 'noPDFArtifactsFound';
export declare type Props = Readonly<{
    error: MediaViewerError;
    children?: ReactNode;
}>;
export declare type FormatMessageFn = (messageDescriptor: FormattedMessage.MessageDescriptor) => string;
export declare class MediaViewerError {
    readonly errorName: ErrorName;
    readonly file?: import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").UploadingFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ProcessingFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ProcessedFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ErrorFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ProcessingFailedState | undefined;
    readonly innerError?: Error | undefined;
    constructor(errorName: ErrorName, file?: import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").UploadingFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ProcessingFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ProcessedFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ErrorFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ProcessingFailedState | undefined, innerError?: Error | undefined);
}
export declare const createError: (name: ErrorName, innerError?: Error | undefined, file?: import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").UploadingFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ProcessingFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ProcessedFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ErrorFileState | import("../../../media-test-helpers/node_modules/@findable/media-core/fileState").ProcessingFailedState | undefined) => MediaViewerError;
export declare class ErrorMessage extends React.Component<Props & InjectedIntlProps & WithAnalyticsEventProps, {}> {
    private fireAnalytics;
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
