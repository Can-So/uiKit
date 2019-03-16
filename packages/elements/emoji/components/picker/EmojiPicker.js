import * as tslib_1 from "tslib";
import { withAnalytics } from '@findable/analytics';
import * as React from 'react';
import LoadingEmojiComponent from '../common/LoadingEmojiComponent';
import { LoadingItem } from './EmojiPickerVirtualItems';
import * as styles from './styles';
var emojiPickerModuleLoader = function () {
    return import(/* webpackChunkName:"@atlaskit-internal_emojiPickerComponent" */ './EmojiPickerComponent');
};
var emojiPickerLoader = function () {
    return emojiPickerModuleLoader().then(function (module) { return module.default; });
};
var EmojiPickerInternal = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiPickerInternal, _super);
    function EmojiPickerInternal(props) {
        var _this = _super.call(this, props, {}) || this;
        _this.state = {
            asyncLoadedComponent: EmojiPickerInternal.AsyncLoadedComponent,
        };
        return _this;
    }
    EmojiPickerInternal.prototype.asyncLoadComponent = function () {
        var _this = this;
        emojiPickerLoader().then(function (component) {
            EmojiPickerInternal.AsyncLoadedComponent = component;
            _this.setAsyncState(component);
        });
    };
    EmojiPickerInternal.prototype.renderLoading = function () {
        var _this = this;
        var item = new LoadingItem();
        var handlePickerRef = function (ref) {
            if (_this.props.onPickerRef) {
                _this.props.onPickerRef(ref);
            }
        };
        return (React.createElement("div", { className: styles.emojiPicker, ref: handlePickerRef }, item.renderItem()));
    };
    EmojiPickerInternal.prototype.renderLoaded = function (loadedEmojiProvider, EmojiPickerComponent) {
        var _a = this.props, emojiProvider = _a.emojiProvider, otherProps = tslib_1.__rest(_a, ["emojiProvider"]);
        return (React.createElement(EmojiPickerComponent, tslib_1.__assign({ emojiProvider: loadedEmojiProvider }, otherProps)));
    };
    return EmojiPickerInternal;
}(LoadingEmojiComponent));
export { EmojiPickerInternal };
// tslint:disable-next-line:variable-name
var EmojiPicker = withAnalytics(EmojiPickerInternal, {}, {});
export default EmojiPicker;
//# sourceMappingURL=EmojiPicker.js.map