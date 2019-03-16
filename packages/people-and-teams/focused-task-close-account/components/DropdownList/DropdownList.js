import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@findable/button';
import ChevronDownIcon from '@findable/icon/glyph/chevron-down';
import ChevronUpIcon from '@findable/icon/glyph/chevron-up';
import * as Styled from './styled';
import { overviewMessages, dropDownListMessages } from '../../messages';
var COLLAPSED_LIST_SITE_COUNT = 3;
var DropdownList = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownList, _super);
    function DropdownList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isExpanded: false,
        };
        _this.showDropdownList = function () {
            _this.setState({ isExpanded: true });
        };
        _this.hideDropdownList = function () {
            _this.setState({ isExpanded: false });
        };
        _this.getVisibleSites = function () {
            return _this.state.isExpanded
                ? _this.props.accessibleSites
                : _this.props.accessibleSites.slice(0, COLLAPSED_LIST_SITE_COUNT);
        };
        return _this;
    }
    DropdownList.prototype.render = function () {
        var accessibleSites = this.props.accessibleSites;
        var isExpanded = this.state.isExpanded;
        var visibleSites = this.getVisibleSites();
        var footNote = visibleSites.length === accessibleSites.length && (React.createElement(Styled.AccessibleSitesListFootnote, null,
            React.createElement(FormattedMessage, tslib_1.__assign({}, overviewMessages.paragraphLoseAccessFootnote))));
        var toggleExpand = accessibleSites.length > COLLAPSED_LIST_SITE_COUNT && (React.createElement(Styled.ButtonWrapper, null,
            React.createElement(Button, { onClick: isExpanded ? this.hideDropdownList : this.showDropdownList, appearance: "link", spacing: "none", iconBefore: isExpanded ? (React.createElement(ChevronUpIcon, { label: "collapse" })) : (React.createElement(ChevronDownIcon, { label: "expand" })) }, isExpanded ? (React.createElement(FormattedMessage, tslib_1.__assign({}, dropDownListMessages.collapseButton))) : (React.createElement(FormattedMessage, tslib_1.__assign({}, dropDownListMessages.expandButton, { values: { num: accessibleSites.length - 3 } }))))));
        return (React.createElement(React.Fragment, null,
            React.createElement(Styled.AccessibleSitesList, null, visibleSites.map(function (url, idx) { return (React.createElement("li", { key: idx }, url)); })),
            footNote,
            toggleExpand));
    };
    return DropdownList;
}(React.Component));
export { DropdownList };
export default DropdownList;
//# sourceMappingURL=DropdownList.js.map