import * as tslib_1 from "tslib";
import * as React from 'react';
import Button, { ButtonGroup } from '@findable/button';
import * as Styled from './styled';
var Footer = /** @class */ (function (_super) {
    tslib_1.__extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        var _a = this.props, currentScreenIdx = _a.currentScreenIdx, numScreens = _a.numScreens, onCancel = _a.onCancel, onNext = _a.onNext, onPrevious = _a.onPrevious, secondaryActions = _a.secondaryActions, submitButton = _a.submitButton;
        return (React.createElement(Styled.FooterOuter, null,
            React.createElement("div", null, secondaryActions),
            React.createElement(ButtonGroup, null,
                currentScreenIdx < 1 ? (React.createElement(Button, { onClick: onCancel }, "Cancel")) : (React.createElement(Button, { onClick: onPrevious }, "Previous")),
                currentScreenIdx < numScreens - 1 ? (React.createElement(Button, { appearance: "primary", onClick: onNext }, "Next")) : (submitButton))));
    };
    return Footer;
}(React.Component));
export default Footer;
//# sourceMappingURL=Footer.js.map