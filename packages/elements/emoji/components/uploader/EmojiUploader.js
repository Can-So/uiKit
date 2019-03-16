import * as tslib_1 from "tslib";
import * as React from 'react';
import LoadingEmojiComponent from '../common/LoadingEmojiComponent';
import { withAnalytics } from '@findable/analytics';
var emojiUploadModuleLoader = function () {
    return import(/* webpackChunkName:"@atlaskit-internal_emojiUploadComponent" */ './EmojiUploadComponent');
};
var emojiUploadLoader = function () {
    return emojiUploadModuleLoader().then(function (module) { return module.default; });
};
var EmojiUploaderInternal = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiUploaderInternal, _super);
    function EmojiUploaderInternal(props) {
        var _this = _super.call(this, props, {}) || this;
        _this.state = {
            asyncLoadedComponent: EmojiUploaderInternal.AsyncLoadedComponent,
        };
        return _this;
    }
    EmojiUploaderInternal.prototype.asyncLoadComponent = function () {
        var _this = this;
        emojiUploadLoader().then(function (component) {
            EmojiUploaderInternal.AsyncLoadedComponent = component;
            _this.setAsyncState(component);
        });
    };
    EmojiUploaderInternal.prototype.renderLoaded = function (loadedEmojiProvider, EmojiUploadComponent) {
        var _a = this.props, emojiProvider = _a.emojiProvider, otherProps = tslib_1.__rest(_a, ["emojiProvider"]);
        return (React.createElement(EmojiUploadComponent, tslib_1.__assign({ emojiProvider: loadedEmojiProvider }, otherProps)));
    };
    return EmojiUploaderInternal;
}(LoadingEmojiComponent));
export { EmojiUploaderInternal };
var EmojiUploader = withAnalytics(EmojiUploaderInternal, {}, {});
export default EmojiUploader;
//# sourceMappingURL=EmojiUploader.js.map