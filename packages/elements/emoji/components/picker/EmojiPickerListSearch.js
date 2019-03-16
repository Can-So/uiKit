import * as tslib_1 from "tslib";
import AkFieldBase from '@atlaskit/field-base';
import SearchIcon from '@atlaskit/icon/glyph/search';
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';
import * as styles from './styles';
var EmojiPickerListSearch = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiPickerListSearch, _super);
    function EmojiPickerListSearch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onBlur = function () {
            var activeElement = document.activeElement;
            // Input lost focus to emoji picker container (happens in IE11 when updating search results)
            // See FS-2111
            if (activeElement instanceof HTMLElement &&
                activeElement.getAttribute('data-emoji-picker-container')) {
                _this.restoreInputFocus();
            }
        };
        _this.onChange = function (e) {
            _this.saveInputSelection();
            _this.props.onChange(e);
        };
        _this.focusInput = function () {
            if (_this.inputRef) {
                _this.inputRef.focus();
            }
        };
        _this.handleInputRef = function (input) {
            if (input) {
                // Defer focus so it give some time to position the popup before
                // setting the focus to search input.
                // see FS-2056
                _this.inputRef = input;
                window.setTimeout(_this.focusInput);
            }
        };
        return _this;
    }
    EmojiPickerListSearch.prototype.saveInputSelection = function () {
        this.inputSelection = undefined;
        if (this.inputRef) {
            var _a = this.inputRef, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd, selectionDirection = _a.selectionDirection;
            if (selectionStart && selectionEnd && selectionDirection) {
                this.inputSelection = {
                    selectionStart: selectionStart,
                    selectionEnd: selectionEnd,
                    selectionDirection: selectionDirection,
                };
            }
        }
    };
    EmojiPickerListSearch.prototype.restoreInputFocus = function () {
        this.focusInput();
        if (this.inputSelection &&
            this.inputRef &&
            this.inputRef.setSelectionRange) {
            var _a = this.inputSelection, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd, selectionDirection = _a.selectionDirection;
            this.inputRef.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
        }
    };
    EmojiPickerListSearch.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, query = _a.query;
        return (React.createElement("div", { className: styles.pickerSearch, style: style },
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.searchLabel), function (searchLabel) { return (React.createElement(AkFieldBase, { appearance: "standard", isCompact: true, isLabelHidden: true, isFitContainerWidthEnabled: true },
                React.createElement("span", { className: styles.searchIcon },
                    React.createElement(SearchIcon, { label: searchLabel })),
                React.createElement("input", { className: styles.input, autoComplete: "off", disabled: false, name: "search", placeholder: searchLabel + "...", required: false, onChange: _this.onChange, value: query || '', ref: _this.handleInputRef, onBlur: _this.onBlur }))); })));
    };
    EmojiPickerListSearch.defaultProps = {
        style: {},
    };
    return EmojiPickerListSearch;
}(PureComponent));
export default EmojiPickerListSearch;
//# sourceMappingURL=EmojiPickerListSearch.js.map