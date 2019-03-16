import * as tslib_1 from "tslib";
import * as React from 'react';
import Switcher from './switcher';
import { CustomLinksProvider, MANAGE_HREF, } from '../providers/jira-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
import { mapResultsToSwitcherProps } from '../providers/map-results-to-switcher-props';
export default (function (props) { return (React.createElement(CustomLinksProvider, null, function (customLinks) { return (React.createElement(CommonDataProvider, { cloudId: props.cloudId }, function (providerResults) {
    var _a = mapResultsToSwitcherProps(props.cloudId, tslib_1.__assign({ customLinks: customLinks }, providerResults), { xflow: true, enableSplitJira: props.enableSplitJira }), showManageLink = _a.showManageLink, switcherLinks = tslib_1.__rest(_a, ["showManageLink"]);
    return (React.createElement(Switcher, tslib_1.__assign({}, props, switcherLinks, { manageLink: showManageLink ? MANAGE_HREF : undefined })));
})); })); });
//# sourceMappingURL=jira-switcher.js.map