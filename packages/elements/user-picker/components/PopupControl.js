import * as tslib_1 from "tslib";
import * as React from 'react';
import { Label } from '@findable/field-base';
import { components } from '@findable/select';
import styled from 'styled-components';
var ControlWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  padding: 0px 8px 8px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  padding: 0px 8px 8px;\n"])));
var PopupControl = /** @class */ (function (_super) {
    tslib_1.__extends(PopupControl, _super);
    function PopupControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopupControl.prototype.render = function () {
        var popupTitle = this.props.selectProps.popupTitle;
        return (React.createElement(ControlWrapper, null,
            React.createElement(Label, { label: popupTitle }),
            React.createElement(components.Control, tslib_1.__assign({}, this.props))));
    };
    return PopupControl;
}(React.PureComponent));
export { PopupControl };
var templateObject_1;
//# sourceMappingURL=PopupControl.js.map