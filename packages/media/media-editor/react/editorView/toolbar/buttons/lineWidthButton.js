import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import Button from '@findable/button';
import ChevronDownIcon from '@findable/icon/glyph/chevron-down';
import Tooltip from '@findable/tooltip';
import { injectIntl } from 'react-intl';
import { DropdownRightIconWrapper, DropdownLeftIconWrapper } from './styles';
import { LineWidthIcon } from './lineWidthIcon';
import { messages } from '@findable/media-ui';
var LineWidthButton = /** @class */ (function (_super) {
    tslib_1.__extends(LineWidthButton, _super);
    function LineWidthButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineWidthButton.prototype.render = function () {
        var _a = this.props, isActive = _a.isActive, lineWidth = _a.lineWidth, onClick = _a.onClick, formatMessage = _a.intl.formatMessage;
        var iconBefore = (React.createElement(DropdownLeftIconWrapper, null,
            React.createElement(LineWidthIcon, { isActive: isActive, lineWidth: lineWidth, onLineWidthClick: function () { } })));
        var iconAfter = (React.createElement(DropdownRightIconWrapper, null,
            React.createElement(ChevronDownIcon, { label: "chevron-icon" })));
        return (React.createElement(Tooltip, { content: formatMessage(messages.annotate_tool_line_thickness) },
            React.createElement(Button, { iconBefore: iconBefore, iconAfter: iconAfter, appearance: "subtle", onClick: onClick, isSelected: isActive })));
    };
    return LineWidthButton;
}(Component));
export { LineWidthButton };
export default injectIntl(LineWidthButton);
//# sourceMappingURL=lineWidthButton.js.map