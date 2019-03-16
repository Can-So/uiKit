import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
export var withImageLoader = function (Wrapped) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(WithImageLoader, _super);
        function WithImageLoader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                imageStatus: 'loading',
            };
            _this.onLoad = function () {
                _this.setState({
                    imageStatus: 'complete',
                });
                var onExternalImageLoaded = _this.props.onExternalImageLoaded;
                if (onExternalImageLoaded && _this.img) {
                    onExternalImageLoaded({
                        width: _this.img.naturalWidth,
                        height: _this.img.naturalHeight,
                    });
                }
            };
            _this.onError = function () {
                _this.setState({
                    imageStatus: 'error',
                });
            };
            return _this;
        }
        WithImageLoader.prototype.componentDidMount = function () {
            this.fetchImage(this.props);
        };
        WithImageLoader.prototype.componentWillReceiveProps = function (nextProps) {
            if (nextProps.url !== this.props.url) {
                this.setState({
                    imageStatus: 'loading',
                });
                this.fetchImage(nextProps);
            }
        };
        WithImageLoader.prototype.componentWillUnmount = function () {
            if (this.img) {
                this.img.removeEventListener('load', this.onLoad);
                this.img.removeEventListener('error', this.onError);
                this.img = null;
            }
        };
        WithImageLoader.prototype.fetchImage = function (_a) {
            var url = _a.url;
            if (url) {
                if (!this.img) {
                    this.img = new Image();
                    this.img.addEventListener('load', this.onLoad);
                    this.img.addEventListener('error', this.onError);
                }
                this.img.src = url;
            }
        };
        WithImageLoader.prototype.render = function () {
            var imageStatus = this.state.imageStatus;
            return React.createElement(Wrapped, tslib_1.__assign({}, this.props, { imageStatus: imageStatus }));
        };
        return WithImageLoader;
    }(Component));
};
//# sourceMappingURL=imageLoader.js.map