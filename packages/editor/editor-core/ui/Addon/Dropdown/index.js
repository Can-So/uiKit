import * as tslib_1 from "tslib";
import * as React from 'react';
import { Dropdown } from './styles';
var DropdownWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownWrapper, _super);
    function DropdownWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (actions) {
            var actionOnClick = actions.actionOnClick, renderOnClick = actions.renderOnClick;
            var editorActions = _this.props.editorActions;
            if (actionOnClick) {
                actionOnClick(editorActions);
                _this.props.togglePopup();
            }
            else if (renderOnClick) {
                _this.props.onClick(editorActions, renderOnClick);
            }
        };
        return _this;
    }
    DropdownWrapper.prototype.render = function () {
        var _this = this;
        // adding onClick handler to each DropdownItem component
        var children = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {
                onClick: _this.handleClick,
            });
        });
        return React.createElement(Dropdown, null, children);
    };
    return DropdownWrapper;
}(React.Component));
export default DropdownWrapper;
//# sourceMappingURL=index.js.map