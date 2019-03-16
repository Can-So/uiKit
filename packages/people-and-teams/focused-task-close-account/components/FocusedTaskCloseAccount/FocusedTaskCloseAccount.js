import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import * as Styled from './styled';
import Footer from '../Footer';
import { commonMessages } from '../../messages';
import MessagesIntlProvider from '../MessagesIntlProvider';
var FocusedTaskCloseAccount = /** @class */ (function (_super) {
    tslib_1.__extends(FocusedTaskCloseAccount, _super);
    function FocusedTaskCloseAccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currentScreenIdx: 0,
        };
        _this.nextScreen = function () {
            var screens = _this.props.screens;
            var currentScreenIdx = _this.state.currentScreenIdx;
            var nextScreenIdx = currentScreenIdx < screens.length - 1
                ? currentScreenIdx + 1
                : screens.length - 1;
            _this.setState({ currentScreenIdx: nextScreenIdx });
        };
        _this.previousScreen = function () {
            var currentScreenIdx = _this.state.currentScreenIdx;
            var previousScreenIdx = currentScreenIdx - 1 >= 0 ? currentScreenIdx - 1 : 0;
            _this.setState({ currentScreenIdx: previousScreenIdx });
        };
        _this.renderCurrentScreen = function () {
            var currentScreen = _this.props.screens[_this.state.currentScreenIdx];
            return currentScreen;
        };
        return _this;
    }
    FocusedTaskCloseAccount.prototype.render = function () {
        var _a = this.props, isOpen = _a.isOpen, onClose = _a.onClose, screens = _a.screens, submitButton = _a.submitButton, learnMoreLink = _a.learnMoreLink;
        var currentScreenIdx = this.state.currentScreenIdx;
        return (React.createElement(MessagesIntlProvider, null,
            React.createElement(Drawer, { icon: function (props) { return React.createElement(CrossIcon, tslib_1.__assign({ label: "" }, props, { size: "medium" })); }, isOpen: isOpen, onClose: onClose, width: "full" },
                React.createElement(Styled.DrawerInner, null,
                    this.renderCurrentScreen(),
                    React.createElement(Footer, { numScreens: screens.length, currentScreenIdx: currentScreenIdx, onCancel: onClose, onNext: this.nextScreen, onPrevious: this.previousScreen, secondaryActions: learnMoreLink && (React.createElement(Button, { appearance: "subtle-link", spacing: "none", href: learnMoreLink, target: "_blank" },
                            React.createElement(FormattedMessage, tslib_1.__assign({}, commonMessages.learnMore)),
                            ' ',
                            React.createElement(ShortcutIcon, { size: "small", label: "" }))), submitButton: submitButton })))));
    };
    return FocusedTaskCloseAccount;
}(React.Component));
export { FocusedTaskCloseAccount };
export default FocusedTaskCloseAccount;
//# sourceMappingURL=FocusedTaskCloseAccount.js.map