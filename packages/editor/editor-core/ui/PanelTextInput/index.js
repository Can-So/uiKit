import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { Input } from './styles';
var PanelTextInput = /** @class */ (function (_super) {
    tslib_1.__extends(PanelTextInput, _super);
    function PanelTextInput(props) {
        var _this = _super.call(this, props) || this;
        _this.onMouseDown = function () {
            var onMouseDown = _this.props.onMouseDown;
            if (onMouseDown) {
                onMouseDown();
            }
        };
        _this.onBlur = function () {
            var onBlur = _this.props.onBlur;
            if (onBlur) {
                onBlur();
            }
        };
        _this.handleChange = function () {
            var onChange = _this.props.onChange;
            if (_this.input) {
                _this.setState({
                    value: _this.input.value,
                });
            }
            if (onChange && _this.input) {
                onChange(_this.input.value);
            }
        };
        _this.handleKeydown = function (e) {
            if (e.keyCode === 13 && _this.props.onSubmit) {
                e.preventDefault(); // Prevent from submitting if an editor is inside a form.
                _this.props.onSubmit(_this.input.value);
            }
            else if (e.keyCode === 27 && _this.props.onCancel) {
                _this.props.onCancel();
            }
            if (_this.props.onKeyDown) {
                _this.props.onKeyDown(e);
            }
        };
        _this.handleRef = function (input) {
            if (input instanceof HTMLInputElement) {
                _this.input = input;
                if (_this.props.autoFocus) {
                    // Need this to prevent jumping when we render TextInput inside Portal @see ED-2992
                    window.setTimeout(function () { return input.focus(); });
                }
            }
            else {
                _this.input = undefined;
            }
        };
        _this.state = {
            value: props.defaultValue || '',
        };
        return _this;
    }
    PanelTextInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.defaultValue !== this.props.defaultValue) {
            this.setState({
                value: nextProps.defaultValue,
            });
        }
    };
    PanelTextInput.prototype.render = function () {
        var _a = this.props, placeholder = _a.placeholder, width = _a.width;
        var value = this.state.value;
        return (React.createElement(Input, { type: "text", placeholder: placeholder, value: value, onChange: this.handleChange, onKeyDown: this.handleKeydown, onMouseDown: this.onMouseDown, onBlur: this.onBlur, innerRef: this.handleRef, width: width }));
    };
    PanelTextInput.prototype.focus = function () {
        var input = this.input;
        if (input) {
            input.focus();
        }
    };
    return PanelTextInput;
}(PureComponent));
export default PanelTextInput;
//# sourceMappingURL=index.js.map