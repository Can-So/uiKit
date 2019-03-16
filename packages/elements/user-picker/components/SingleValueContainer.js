import * as tslib_1 from "tslib";
import { components } from '@findable/select';
import * as React from 'react';
import styled from 'styled-components';
import { SizeableAvatar } from './SizeableAvatar';
import { BORDER_PADDING } from './styles';
var PlaceholderIconContainer = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  padding-left: ", "px;\n  line-height: 0;\n"], ["\n  padding-left: ", "px;\n  line-height: 0;\n"])), BORDER_PADDING);
var showUserAvatar = function (inputValue, value) {
    return value && value.data && inputValue === value.label;
};
var SingleValueContainer = /** @class */ (function (_super) {
    tslib_1.__extends(SingleValueContainer, _super);
    function SingleValueContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderAvatar = function () {
            var _a = _this.props, hasValue = _a.hasValue, _b = _a.selectProps, appearance = _b.appearance, isFocused = _b.isFocused, inputValue = _b.inputValue, value = _b.value;
            if (isFocused || !hasValue) {
                return (React.createElement(SizeableAvatar, { appearance: appearance, src: showUserAvatar(inputValue, value) ? value.data.avatarUrl : undefined }));
            }
            return null;
        };
        return _this;
    }
    SingleValueContainer.prototype.render = function () {
        var _a = this.props, children = _a.children, valueContainerProps = tslib_1.__rest(_a, ["children"]);
        return (React.createElement(components.ValueContainer, tslib_1.__assign({}, valueContainerProps),
            React.createElement(PlaceholderIconContainer, null, this.renderAvatar()),
            children));
    };
    return SingleValueContainer;
}(React.Component));
export { SingleValueContainer };
var templateObject_1;
//# sourceMappingURL=SingleValueContainer.js.map