import * as tslib_1 from "tslib";
import Spinner from '@atlaskit/spinner';
import * as React from 'react';
import EmojiPickerCategoryHeading from './EmojiPickerCategoryHeading';
import EmojiPickerEmojiRow from './EmojiPickerEmojiRow';
import EmojiPickerListSearch from './EmojiPickerListSearch';
import { sizes } from './EmojiPickerSizes';
import * as styles from './styles';
var AbstractItem = /** @class */ (function () {
    function AbstractItem(props, height) {
        this.props = props;
        this.height = height;
    }
    return AbstractItem;
}());
export { AbstractItem };
var SearchItem = /** @class */ (function (_super) {
    tslib_1.__extends(SearchItem, _super);
    function SearchItem(props) {
        var _this = _super.call(this, props, sizes.searchHeight) || this;
        _this.renderItem = function () { return React.createElement(EmojiPickerListSearch, tslib_1.__assign({}, _this.props)); };
        return _this;
    }
    return SearchItem;
}(AbstractItem));
export { SearchItem };
var EmojisRowItem = /** @class */ (function (_super) {
    tslib_1.__extends(EmojisRowItem, _super);
    function EmojisRowItem(props) {
        var _this = _super.call(this, props, sizes.emojiRowHeight) || this;
        _this.renderItem = function () { return React.createElement(EmojiPickerEmojiRow, tslib_1.__assign({}, _this.props)); };
        return _this;
    }
    return EmojisRowItem;
}(AbstractItem));
export { EmojisRowItem };
var LoadingItem = /** @class */ (function (_super) {
    tslib_1.__extends(LoadingItem, _super);
    function LoadingItem() {
        var _this = _super.call(this, {}, sizes.loadingRowHeight) || this;
        _this.renderItem = function () { return (React.createElement("div", { className: styles.emojiPickerSpinner },
            React.createElement("div", null,
                React.createElement(Spinner, { size: "medium" })))); };
        return _this;
    }
    return LoadingItem;
}(AbstractItem));
export { LoadingItem };
var CategoryHeadingItem = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryHeadingItem, _super);
    function CategoryHeadingItem(props) {
        var _this = _super.call(this, props, sizes.categoryHeadingHeight) || this;
        _this.renderItem = function () { return React.createElement(EmojiPickerCategoryHeading, tslib_1.__assign({}, _this.props)); };
        return _this;
    }
    return CategoryHeadingItem;
}(AbstractItem));
export { CategoryHeadingItem };
export var virtualItemRenderer = function (rows, context) {
    var index = context.index, key = context.key, style = context.style;
    var row = rows[index];
    return (React.createElement("div", { style: style, key: key }, row.renderItem(context)));
};
//# sourceMappingURL=EmojiPickerVirtualItems.js.map