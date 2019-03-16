import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import Button from '@findable/button';
import SectionMessage from '@findable/section-message';
import InfoIcon from '@findable/icon/glyph/info';
import { commonMessages, overviewMessages } from '../../messages';
import StatefulInlineDialog from '../StatefulInlineDialog';
import UserInfo from '../UserInfo';
import * as Styled from './styled';
import { DropdownList } from '../DropdownList';
import MessagesIntlProvider from '../MessagesIntlProvider';
var DeleteUserOverviewScreen = /** @class */ (function (_super) {
    tslib_1.__extends(DeleteUserOverviewScreen, _super);
    function DeleteUserOverviewScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectAdminOrSelfCopy = function (adminCopy, selfCopy) {
            return _this.props.isCurrentUser ? selfCopy : adminCopy;
        };
        _this.displayFirstListElement = function () {
            var _a = _this.props, accessibleSites = _a.accessibleSites, user = _a.user, isUserDeactivated = _a.isUserDeactivated;
            if (isUserDeactivated) {
                return null;
            }
            var hasAccessibleSites = accessibleSites && accessibleSites.length > 0;
            return (React.createElement("li", null,
                !hasAccessibleSites && (React.createElement(FormattedHTMLMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.paragraphLoseAccessAdminNoSites, overviewMessages.paragraphLoseAccessSelfNoSites), { values: { fullName: user.fullName } }))),
                hasAccessibleSites && (React.createElement(React.Fragment, null,
                    React.createElement(FormattedHTMLMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.paragraphLoseAccessAdmin, overviewMessages.paragraphLoseAccessSelf), { values: { fullName: user.fullName }, tagName: 'p' })),
                    React.createElement(DropdownList, { accessibleSites: accessibleSites })))));
        };
        _this.displaySecondListElement = function () {
            return (React.createElement("li", null,
                React.createElement(FormattedHTMLMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.paragraphPersonalDataWillBeDeletedAdmin, overviewMessages.paragraphPersonalDataWillBeDeletedSelf))),
                React.createElement(Styled.IconHoverWrapper, null,
                    React.createElement(StatefulInlineDialog, { placement: "auto-start", content: React.createElement(Styled.InlineDialogContent, null,
                            React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.inlineDialogDataWillBeDeletedP1Admin, overviewMessages.inlineDialogDataWillBeDeletedP1Self), { tagName: "p" })),
                            React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.inlineDialogDataWillBeDeletedLi1Admin, overviewMessages.inlineDialogDataWillBeDeletedLi1Self), { tagName: "li" })),
                            React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.inlineDialogDataWillBeDeletedLi2Admin, overviewMessages.inlineDialogDataWillBeDeletedLi2Self), { tagName: "li" })),
                            React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.inlineDialogDataWillBeDeletedLi3Admin, overviewMessages.inlineDialogDataWillBeDeletedLi3Self), { tagName: "li" })),
                            React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.inlineDialogDataWillBeDeletedP2Admin, overviewMessages.inlineDialogDataWillBeDeletedP2Self), { tagName: "p" })),
                            React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.inlineDialogDataWillBeDeletedP3Admin, overviewMessages.inlineDialogDataWillBeDeletedP3Self), { tagName: "p" }))) },
                        React.createElement(InfoIcon, { label: "", size: "small" })))));
        };
        _this.displayThirdListElement = function () {
            return (React.createElement("li", null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.paragraphListOfAppsWithPersonalDataAdmin, overviewMessages.paragraphListOfAppsWithPersonalDataSelf))),
                ' ',
                React.createElement(Styled.IconHoverWrapper, null,
                    React.createElement(StatefulInlineDialog, { placement: "auto-start", content: React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.inlineDialogDataAppsAdmin, overviewMessages.inlineDialogDataAppsSelf))) },
                        React.createElement(InfoIcon, { label: "", size: "small" })))));
        };
        _this.displayFourthListElement = function () {
            return (React.createElement("li", null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.paragraphContentCreatedAdmin, overviewMessages.paragraphContentCreatedSelf))),
                ' ',
                React.createElement(Styled.IconHoverWrapper, null,
                    React.createElement(StatefulInlineDialog, { placement: "auto-start", content: React.createElement(FormattedMessage, tslib_1.__assign({}, _this.selectAdminOrSelfCopy(overviewMessages.inlineDialogContentCreatedAdmin, overviewMessages.inlineDialogContentCreatedSelf))) },
                        React.createElement(InfoIcon, { label: "", size: "small" })))));
        };
        return _this;
    }
    DeleteUserOverviewScreen.prototype.render = function () {
        var _a = this.props, user = _a.user, deactivateUserHandler = _a.deactivateUserHandler, isUserDeactivated = _a.isUserDeactivated;
        return (React.createElement(MessagesIntlProvider, null,
            React.createElement(Styled.Screen, null,
                React.createElement(Styled.Title, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, this.selectAdminOrSelfCopy(overviewMessages.headingAdmin, overviewMessages.headingSelf)))),
                React.createElement(FormattedMessage, tslib_1.__assign({}, this.selectAdminOrSelfCopy(overviewMessages.firstLineAdmin, overviewMessages.firstLineSelf), { tagName: "p" })),
                React.createElement(UserInfo, { user: user }),
                React.createElement(FormattedMessage, tslib_1.__assign({}, this.selectAdminOrSelfCopy(overviewMessages.paragraphAboutToDeleteAdmin, overviewMessages.paragraphAboutToDeleteSelf))),
                React.createElement(Styled.MainInformationList, null,
                    this.displayFirstListElement(),
                    this.displaySecondListElement(),
                    this.displayThirdListElement(),
                    this.displayFourthListElement()),
                deactivateUserHandler && (React.createElement(Styled.SectionMessageOuter, null,
                    React.createElement(SectionMessage, { appearance: "warning" },
                        React.createElement(FormattedMessage, tslib_1.__assign({}, (isUserDeactivated
                            ? overviewMessages.warningSectionBodyDeactivated
                            : overviewMessages.warningSectionBody))),
                        !isUserDeactivated && (React.createElement("p", null,
                            React.createElement(Button, { appearance: "link", spacing: "none", onClick: deactivateUserHandler },
                                React.createElement(FormattedMessage, tslib_1.__assign({}, commonMessages.deactivateAccount)))))))))));
    };
    DeleteUserOverviewScreen.defaultProps = {
        isCurrentUser: false,
    };
    return DeleteUserOverviewScreen;
}(React.Component));
export { DeleteUserOverviewScreen };
export default DeleteUserOverviewScreen;
//# sourceMappingURL=DeleteUserOverviewScreen.js.map