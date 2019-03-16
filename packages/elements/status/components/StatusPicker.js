import * as tslib_1 from "tslib";
import { FieldTextStateless } from '@atlaskit/field-text';
import { gridSize } from '@atlaskit/theme';
import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import ColorPalette from './internal/color-palette';
var FieldTextWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin: 0 ", "px;\n"], ["\n  margin: 0 ", "px;\n"])), gridSize());
var StatusPicker = /** @class */ (function (_super) {
    tslib_1.__extends(StatusPicker, _super);
    function StatusPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fieldTextWrapperKey = Math.random().toString();
        _this.colorPaletteKey = Math.random().toString();
        _this.onChange = function (evt) {
            // @ts-ignore
            _this.props.onTextChanged(evt.target.value);
        };
        _this.onKeyPress = function (event) {
            if (event.key === 'Enter') {
                _this.props.onEnter();
            }
        };
        _this.handleInputRef = function (ref) {
            if (ref && _this.props.autoFocus) {
                // Defer to prevent editor scrolling to top (See FS-3227, also ED-2992)
                setTimeout(function () {
                    ref.focus();
                });
            }
        };
        return _this;
    }
    StatusPicker.prototype.render = function () {
        var _a = this.props, text = _a.text, selectedColor = _a.selectedColor, onColorClick = _a.onColorClick, onColorHover = _a.onColorHover;
        // Using <React.Fragment> instead of [] to workaround Enzyme
        // (https://github.com/airbnb/enzyme/issues/1149)
        return (React.createElement(React.Fragment, null,
            React.createElement(FieldTextWrapper, { key: this.fieldTextWrapperKey },
                React.createElement(FieldTextStateless, { value: text, isLabelHidden: true, shouldFitContainer: true, onChange: this.onChange, onKeyPress: this.onKeyPress, compact: true, innerRef: this.handleInputRef, autoComplete: "off", isSpellCheckEnabled: false })),
            React.createElement(ColorPalette, { key: this.colorPaletteKey, onClick: onColorClick, onHover: onColorHover, selectedColor: selectedColor })));
    };
    StatusPicker.defaultProps = {
        autoFocus: true,
    };
    return StatusPicker;
}(PureComponent));
export { StatusPicker };
var templateObject_1;
//# sourceMappingURL=StatusPicker.js.map