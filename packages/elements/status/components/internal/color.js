import * as tslib_1 from "tslib";
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { colors } from '@atlaskit/theme';
import * as React from 'react';
import { PureComponent, } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { ANALYTICS_HOVER_DELAY } from '../constants';
import { messages } from '../i18n';
var Button = styled.button(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  height: 24px;\n  width: 24px;\n  background: ", ";\n  padding: 0;\n  border-radius: 4px;\n  border: 1px solid ", ";\n  cursor: pointer;\n  display: block;\n  box-sizing: border-box;\n"], ["\n  height: 24px;\n  width: 24px;\n  background: ", ";\n  padding: 0;\n  border-radius: 4px;\n  border: 1px solid ", ";\n  cursor: pointer;\n  display: block;\n  box-sizing: border-box;\n"])), colors.N900, colors.N0);
var ButtonWrapper = styled.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  border: 1px solid transparent;\n  margin: 0 2px;\n  font-size: 0;\n  display: flex;\n  align-items: center;\n  padding: 1px;\n  border-radius: 6px;\n  &:hover {\n    border: 1px solid ", ";\n  }\n"], ["\n  border: 1px solid transparent;\n  margin: 0 2px;\n  font-size: 0;\n  display: flex;\n  align-items: center;\n  padding: 1px;\n  border-radius: 6px;\n  &:hover {\n    border: 1px solid ", ";\n  }\n"])), colors.N50);
var Color = /** @class */ (function (_super) {
    tslib_1.__extends(Color, _super);
    function Color() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hoverStartTime = 0;
        _this.onMouseEnter = function () {
            _this.hoverStartTime = Date.now();
        };
        _this.onMouseLeave = function () {
            var onHover = _this.props.onHover;
            var delay = Date.now() - _this.hoverStartTime;
            if (delay >= ANALYTICS_HOVER_DELAY && onHover) {
                onHover(_this.props.value);
            }
            _this.hoverStartTime = 0;
        };
        _this.onMouseDown = function (e) {
            e.preventDefault();
        };
        _this.onClick = function (e) {
            var _a = _this.props, onClick = _a.onClick, value = _a.value;
            e.preventDefault();
            onClick(value);
        };
        return _this;
    }
    Color.prototype.render = function () {
        var _this = this;
        var _a = this.props, tabIndex = _a.tabIndex, backgroundColor = _a.backgroundColor, isSelected = _a.isSelected, borderColor = _a.borderColor, value = _a.value;
        var borderStyle = "1px solid " + borderColor;
        return (React.createElement(ButtonWrapper, null,
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages[value + "Color"]), function (label) { return (React.createElement(Button, { onClick: _this.onClick, onMouseEnter: _this.onMouseEnter, onMouseLeave: _this.onMouseLeave, onMouseDown: _this.onMouseDown, tabIndex: tabIndex, className: "" + (isSelected ? 'selected' : ''), title: label, style: {
                    backgroundColor: backgroundColor || 'transparent',
                    border: borderStyle,
                } }, isSelected && (React.createElement(EditorDoneIcon, { primaryColor: borderColor, label: label })))); })));
    };
    Color.prototype.componentWillUnmount = function () {
        this.hoverStartTime = 0;
    };
    return Color;
}(PureComponent));
export default Color;
var templateObject_1, templateObject_2;
//# sourceMappingURL=color.js.map