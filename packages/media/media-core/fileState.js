import * as tslib_1 from "tslib";
export var isErrorFileState = function (fileState) {
    return fileState.status === 'error';
};
export var isImageRepresentationReady = function (fileState) {
    switch (fileState.status) {
        case 'processing':
        case 'processed':
        case 'failed-processing':
            return !!fileState.representations.image;
        default:
            return false;
    }
};
export var mapMediaFileToFileState = function (mediaFile) {
    var _a = mediaFile.data, id = _a.id, name = _a.name, size = _a.size, processingStatus = _a.processingStatus, artifacts = _a.artifacts, mediaType = _a.mediaType, mimeType = _a.mimeType, representations = _a.representations;
    var baseState = {
        id: id,
        name: name,
        size: size,
        mediaType: mediaType,
        mimeType: mimeType,
        artifacts: artifacts,
        representations: representations,
    };
    switch (processingStatus) {
        case 'pending':
        case undefined:
            return tslib_1.__assign({}, baseState, { status: 'processing' });
        case 'succeeded':
            return tslib_1.__assign({}, baseState, { status: 'processed' });
        case 'failed':
            return tslib_1.__assign({}, baseState, { status: 'failed-processing' });
    }
};
export var mapMediaItemToFileState = function (id, item) {
    return mapMediaFileToFileState({
        data: tslib_1.__assign({ id: id }, item),
    });
};
//# sourceMappingURL=fileState.js.map