import * as tslib_1 from "tslib";
import * as React from 'react';
import JiraSwitcher from './jira-switcher';
import ConfluenceSwitcher from './confluence-switcher';
import GenericSwitcher from './generic-switcher';
import ErrorBoundary from './error-boundary';
import { Product } from '../types';
import IntlProvider from './intl-provider';
import messages from '../utils/messages';
import { analyticsAttributes, NavigationAnalyticsContext, } from '../utils/analytics';
var getAnalyticsContext = function (props) { return (tslib_1.__assign({ source: 'atlassianSwitcher' }, analyticsAttributes({
    featureFlags: Object.keys(props)
        .filter(function (key) { return key.startsWith('enable'); })
        .reduce(function (acc, key) {
        var _a;
        return (tslib_1.__assign({}, acc, (_a = {}, _a[key] = props[key], _a)));
    }, {}),
}))); };
var AtlassianSwitcher = function (props) {
    var product = props.product;
    var Switcher;
    switch (product) {
        case Product.JIRA:
            Switcher = JiraSwitcher;
            break;
        case Product.CONFLUENCE:
            Switcher = ConfluenceSwitcher;
            break;
        default:
            Switcher = GenericSwitcher;
    }
    return (React.createElement(IntlProvider, null,
        React.createElement(NavigationAnalyticsContext, { data: getAnalyticsContext(props) },
            React.createElement(ErrorBoundary, { messages: messages },
                React.createElement(Switcher, tslib_1.__assign({ messages: messages }, props))))));
};
export default AtlassianSwitcher;
//# sourceMappingURL=atlassian-switcher.js.map