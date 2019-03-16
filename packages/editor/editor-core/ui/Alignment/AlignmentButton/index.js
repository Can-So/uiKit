import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import ToolbarButton from '../../ToolbarButton';
var AlignmentButton = /** @class */ (function (_super) {
    tslib_1.__extends(AlignmentButton, _super);
    function AlignmentButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function (e) {
            var _a = _this.props, onClick = _a.onClick, value = _a.value;
            e.preventDefault();
            onClick(value);
        };
        return _this;
    }
    AlignmentButton.prototype.render = function () {
        var _a = this.props, label = _a.label, isSelected = _a.isSelected, content = _a.content;
        return (React.createElement(ToolbarButton, { disabled: false, selected: isSelected, title: label, onClick: this.onClick, iconBefore: content }));
    };
    return AlignmentButton;
}(PureComponent));
export default AlignmentButton;
//# sourceMappingURL=index.js.map