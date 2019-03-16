import * as tslib_1 from "tslib";
import * as React from 'react';
import FieldBase from '@findable/field-base';
import { SearchBox, SearchFieldBaseInner, SearchInner, SearchInput, } from './styled';
var controlKeys = ['ArrowUp', 'ArrowDown', 'Enter'];
var Search = /** @class */ (function (_super) {
    tslib_1.__extends(Search, _super);
    function Search() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: _this.props.value,
        };
        _this.onInputKeyDown = function (event) {
            var onKeyDown = _this.props.onKeyDown;
            if (controlKeys.indexOf(event.key) === -1) {
                return;
            }
            if (onKeyDown) {
                onKeyDown(event);
            }
            event.stopPropagation();
        };
        _this.onInput = function (event) {
            var onInput = _this.props.onInput;
            _this.setState({ value: event.currentTarget.value });
            if (onInput) {
                onInput(event);
            }
        };
        _this.setInputRef = function (ref) {
            _this.inputRef = ref;
        };
        return _this;
    }
    Search.prototype.render = function () {
        var _a = this.props, children = _a.children, onBlur = _a.onBlur, placeholder = _a.placeholder, isLoading = _a.isLoading;
        var value = this.state.value;
        return (React.createElement(SearchInner, null,
            React.createElement(SearchBox, null,
                React.createElement(FieldBase, { appearance: "none", isFitContainerWidthEnabled: true, isPaddingDisabled: true, isLoading: isLoading },
                    React.createElement(SearchFieldBaseInner, null,
                        React.createElement(SearchInput, { autoFocus: true, innerRef: this.setInputRef, onBlur: onBlur, onInput: this.onInput, placeholder: placeholder, spellCheck: false, type: "text", value: value, onKeyDown: this.onInputKeyDown })))),
            children));
    };
    Search.defaultProps = {
        isLoading: false,
        onBlur: function () { },
        placeholder: 'Search',
    };
    return Search;
}(React.PureComponent));
export default Search;
//# sourceMappingURL=Search.js.map