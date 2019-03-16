import * as tslib_1 from "tslib";
import * as React from 'react';
import { components } from '@findable/select';
import Tooltip from '@findable/tooltip';
import { isPopupUserPickerByProps } from './utils';
var ClearIndicator = /** @class */ (function (_super) {
    tslib_1.__extends(ClearIndicator, _super);
    function ClearIndicator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseDown = function (event) {
            if (event && event.type === 'mousedown' && event.button !== 0) {
                return;
            }
            _this.props.clearValue();
            // Prevent focus when clear on blurred state
            var selectProps = _this.props.selectProps;
            if (selectProps &&
                (!selectProps.isFocused || isPopupUserPickerByProps(selectProps))) {
                event.stopPropagation();
            }
        };
        return _this;
    }
    ClearIndicator.prototype.render = function () {
        var clearValueLabel = this.props.selectProps.clearValueLabel;
        return (React.createElement(Tooltip, { content: clearValueLabel },
            React.createElement(components.ClearIndicator, tslib_1.__assign({}, this.props, { innerProps: tslib_1.__assign({}, this.props.innerProps, { onMouseDown: this.handleMouseDown }) }))));
    };
    return ClearIndicator;
}(React.PureComponent));
export { ClearIndicator };
//# sourceMappingURL=ClearIndicator.js.map