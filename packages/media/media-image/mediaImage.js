import * as tslib_1 from "tslib";
import { Component } from 'react';
import { isDifferentIdentifier, } from '@findable/media-core';
var MediaImage = /** @class */ (function (_super) {
    tslib_1.__extends(MediaImage, _super);
    function MediaImage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            status: 'loading',
        };
        _this.releaseSrc = function () {
            var src = _this.state.src;
            if (src) {
                URL.revokeObjectURL(src);
            }
        };
        _this.unsubscribe = function () {
            if (_this.subscription) {
                _this.subscription.unsubscribe();
            }
        };
        return _this;
    }
    MediaImage.prototype.componentDidMount = function () {
        this.subscribe(this.props);
    };
    MediaImage.prototype.componentWillReceiveProps = function (_a) {
        var _b = _a.apiConfig, newApiConfig = _b === void 0 ? {} : _b, newIdentifier = _a.identifier, otherNewProps = tslib_1.__rest(_a, ["apiConfig", "identifier"]);
        var _c = this.props, _d = _c.apiConfig, apiConfig = _d === void 0 ? {} : _d, identifier = _c.identifier;
        var isWidthBigger = newApiConfig.width &&
            apiConfig.width &&
            newApiConfig.width > apiConfig.width;
        var isHeightBigger = newApiConfig.height &&
            apiConfig.height &&
            newApiConfig.height > apiConfig.height;
        var isNewDimensionsBigger = isWidthBigger || isHeightBigger;
        if ((!!newIdentifier && isDifferentIdentifier(newIdentifier, identifier)) ||
            isNewDimensionsBigger) {
            this.subscribe(tslib_1.__assign({ identifier: newIdentifier, apiConfig: newApiConfig }, otherNewProps));
        }
    };
    MediaImage.prototype.componentWillUnmount = function () {
        this.unsubscribe();
        this.releaseSrc();
    };
    MediaImage.prototype.subscribe = function (props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var context, _a, id, collectionName, apiConfig, fileId;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        context = props.context, _a = props.identifier, id = _a.id, collectionName = _a.collectionName, apiConfig = props.apiConfig;
                        this.unsubscribe();
                        this.setState({ status: 'loading' });
                        return [4 /*yield*/, id];
                    case 1:
                        fileId = _b.sent();
                        this.subscription = context.file
                            .getFileState(fileId, { collectionName: collectionName })
                            .subscribe({
                            next: function (fileState) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var preview, value, blob;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (fileState.status === 'error' || fileState.mediaType !== 'image') {
                                                this.setState({ status: 'error' });
                                                return [2 /*return*/];
                                            }
                                            preview = fileState.preview;
                                            if (!preview) return [3 /*break*/, 2];
                                            return [4 /*yield*/, preview];
                                        case 1:
                                            value = (_a.sent()).value;
                                            // NOTE: Preview is referring to the local image
                                            // after page reload it will get the image src
                                            // based on the API
                                            // PS: it will the case for third-party, such as Giphy
                                            if (typeof value !== 'string') {
                                                this.setSourceFromBlob(value);
                                                return [2 /*return*/];
                                            }
                                            _a.label = 2;
                                        case 2:
                                            if (!(fileState.status === 'processed')) return [3 /*break*/, 4];
                                            return [4 /*yield*/, context.getImage(fileId, tslib_1.__assign({ collection: collectionName }, apiConfig))];
                                        case 3:
                                            blob = _a.sent();
                                            this.setSourceFromBlob(blob);
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); },
                            error: function () { return _this.setState({ status: 'error' }); },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaImage.prototype.setSourceFromBlob = function (blob) {
        var src = URL.createObjectURL(blob);
        this.releaseSrc();
        this.setState({
            status: 'succeeded',
            src: src,
        });
        this.unsubscribe();
    };
    MediaImage.prototype.render = function () {
        return this.props.children({
            loading: this.state.status === 'loading',
            error: this.state.status === 'error',
            data: this.state.status === 'succeeded' ? this.state : undefined,
        });
    };
    MediaImage.defaultProps = {
        apiConfig: {},
    };
    return MediaImage;
}(Component));
export { MediaImage };
export default MediaImage;
//# sourceMappingURL=mediaImage.js.map