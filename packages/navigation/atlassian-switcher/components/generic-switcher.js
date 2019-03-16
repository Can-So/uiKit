import * as tslib_1 from "tslib";
import * as React from 'react';
import Switcher from './switcher';
import CommonDataProvider from '../providers/common-data-provider';
import { Product } from '../types';
import { mapResultsToSwitcherProps } from '../providers/map-results-to-switcher-props';
var getFeatures = function (product) {
    switch (product) {
        case Product.SITE_ADMIN:
            return {
                xflow: true,
            };
        case Product.HOME:
        case Product.PEOPLE:
        case Product.TRUSTED_ADMIN:
        default:
            return {
                xflow: false,
            };
    }
};
export default (function (props) { return (React.createElement(CommonDataProvider, { cloudId: props.cloudId }, function (providerResults) {
    var switcherLinks = mapResultsToSwitcherProps(props.cloudId, providerResults, tslib_1.__assign({}, getFeatures(props.product), { enableSplitJira: props.enableSplitJira }));
    return React.createElement(Switcher, tslib_1.__assign({}, props, switcherLinks));
})); });
//# sourceMappingURL=generic-switcher.js.map