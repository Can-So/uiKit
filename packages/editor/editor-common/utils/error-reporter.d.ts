export declare type ErrorReporterTags = {
    [key: string]: string;
};
export interface ErrorReportingHandler {
    captureMessage: (msg: string, tags?: ErrorReporterTags) => void;
    captureException: (err: Error, tags?: ErrorReporterTags) => void;
}
export default class ErrorReporter {
    private handlerStorage;
    captureMessage(msg: string, tags?: ErrorReporterTags): void;
    captureException(err: Error, tags?: ErrorReporterTags): void;
    handler: ErrorReportingHandler | null;
}
