import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { deactivateUserOverviewMessages } from '../../messages';
import UserInfo from '../UserInfo';
import * as Styled from './styled';
import { DropdownList } from '../DropdownList';
import MessagesIntlProvider from '../MessagesIntlProvider';
var DeactivateUserOverviewScreen = /** @class */ (function (_super) {
    tslib_1.__extends(DeactivateUserOverviewScreen, _super);
    function DeactivateUserOverviewScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectAdminOrSelfCopy = function (adminCopy, selfCopy) {
            return _this.props.isCurrentUser ? selfCopy : adminCopy;
        };
        _this.renderLoseAccessListElement = function () {
            var _a = _this.props, accessibleSites = _a.accessibleSites, user = _a.user;
            var hasAccessibleSites = accessibleSites && accessibleSites.length > 0;
            return (React.createElement("li", null,
                !hasAccessibleSites && (React.createElement(FormattedHTMLMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(deactivateUserOverviewMessages.paragraphLoseAccessAdminNoSites, deactivateUserOverviewMessages.paragraphLoseAccessSelfNoSites), { values: { fullName: user.fullName } }))),
                hasAccessibleSites && (React.createElement(React.Fragment, null,
                    React.createElement(FormattedHTMLMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(deactivateUserOverviewMessages.paragraphLoseAccessAdmin, deactivateUserOverviewMessages.paragraphLoseAccessSelf), { values: { fullName: user.fullName }, tagName: 'p' })),
                    React.createElement(Styled.AccessibleSitesWrapper, null,
                        React.createElement(DropdownList, { accessibleSites: accessibleSites }))))));
        };
        _this.renderPersonalDataListElement = function () {
            return (React.createElement("li", null,
                React.createElement(FormattedHTMLMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(deactivateUserOverviewMessages.paragraphPersonalDataAdmin, deactivateUserOverviewMessages.paragraphPersonalDataSelf)))));
        };
        _this.renderBillingListElement = function () {
            return (React.createElement("li", null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(deactivateUserOverviewMessages.paragraphBillingAdmin, deactivateUserOverviewMessages.paragraphBillingSelf)))));
        };
        return _this;
    }
    DeactivateUserOverviewScreen.prototype.render = function () {
        var user = this.props.user;
        return (React.createElement(MessagesIntlProvider, null,
            React.createElement(Styled.Screen, null,
                React.createElement(Styled.Title, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, this.selectAdminOrSelfCopy(deactivateUserOverviewMessages.headingAdmin, deactivateUserOverviewMessages.headingSelf)))),
                React.createElement(FormattedMessage, tslib_1.__assign({}, this.selectAdminOrSelfCopy(deactivateUserOverviewMessages.firstLineAdmin, deactivateUserOverviewMessages.firstLineSelf), { tagName: "p" })),
                React.createElement(UserInfo, { user: user }),
                React.createElement(FormattedMessage, tslib_1.__assign({}, this.selectAdminOrSelfCopy(deactivateUserOverviewMessages.paragraphAboutToDeactivateAdmin, deactivateUserOverviewMessages.paragraphAboutToDeactivateSelf))),
                React.createElement(Styled.MainInformationList, null,
                    this.renderLoseAccessListElement(),
                    this.renderPersonalDataListElement(),
                    this.renderBillingListElement()),
                React.createElement(FormattedMessage, tslib_1.__assign({}, this.selectAdminOrSelfCopy(deactivateUserOverviewMessages.lastLineAdmin, deactivateUserOverviewMessages.lastLineSelf), { tagName: "p" })))));
    };
    DeactivateUserOverviewScreen.defaultProps = {
        isCurrentUser: false,
    };
    return DeactivateUserOverviewScreen;
}(React.Component));
export { DeactivateUserOverviewScreen };
export default DeactivateUserOverviewScreen;
//# sourceMappingURL=DeactivateUserOverviewScreen.js.map