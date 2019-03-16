import * as tslib_1 from "tslib";
import Tooltip from '@atlaskit/tooltip';
import * as React from 'react';
import { PureComponent } from 'react';
import { AkButton } from './styles';
var ToolbarButton = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarButton, _super);
    function ToolbarButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            var _a = _this.props, disabled = _a.disabled, onClick = _a.onClick;
            if (!disabled && onClick) {
                onClick(event);
            }
        };
        return _this;
    }
    ToolbarButton.prototype.render = function () {
        var button = (React.createElement(AkButton, { appearance: "subtle", ariaHaspopup: true, className: this.props.className, href: this.props.href, ariaLabel: this.props.ariaLabel, iconAfter: this.props.iconAfter, iconBefore: this.props.iconBefore, isDisabled: this.props.disabled, isSelected: this.props.selected, onClick: this.handleClick, spacing: this.props.spacing || 'default', target: this.props.target, theme: this.props.theme, shouldFitContainer: true }, this.props.children));
        var position = this.props.titlePosition || 'top';
        var tooltipContent = !this.props.hideTooltip ? this.props.title : null;
        return this.props.title ? (React.createElement(Tooltip, { content: tooltipContent, hideTooltipOnClick: true, position: position }, button)) : (button);
    };
    ToolbarButton.defaultProps = {
        className: '',
    };
    return ToolbarButton;
}(PureComponent));
export default ToolbarButton;
//# sourceMappingURL=index.js.map