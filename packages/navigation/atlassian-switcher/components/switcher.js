import * as tslib_1 from "tslib";
import * as React from 'react';
import * as isEqual from 'lodash.isequal';
import { SwitcherWrapper, SwitcherItem, Section, ManageButton, Skeleton, } from '../primitives';
import { analyticsAttributes, NavigationAnalyticsContext, SWITCHER_SUBJECT, RenderTracker, } from '../utils/analytics';
import now from '../utils/performance-now';
import FormattedMessage from '../primitives/formatted-message';
import TryLozenge from '../primitives/try-lozenge';
var getAnalyticsContext = function (itemsCount) { return (tslib_1.__assign({}, analyticsAttributes({
    itemsCount: itemsCount,
}))); };
var getItemAnalyticsContext = function (index, id, type) { return (tslib_1.__assign({}, analyticsAttributes({
    groupItemIndex: index,
    itemId: id,
    itemType: type,
}))); };
var Switcher = /** @class */ (function (_super) {
    tslib_1.__extends(Switcher, _super);
    function Switcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.triggerXFlow = function () {
            var _a = _this.props, triggerXFlow = _a.triggerXFlow, suggestedProductLinks = _a.suggestedProductLinks;
            if (suggestedProductLinks.length) {
                triggerXFlow(suggestedProductLinks[0].key, 'atlassian-switcher');
            }
        };
        return _this;
    }
    Switcher.prototype.componentDidMount = function () {
        this.mountedAt = now();
    };
    Switcher.prototype.timeSinceMounted = function () {
        return this.mountedAt ? Math.round(now() - this.mountedAt) : 0;
    };
    Switcher.prototype.shouldComponentUpdate = function (nextProps) {
        return !isEqual(this.props, nextProps);
    };
    Switcher.prototype.render = function () {
        var _this = this;
        var _a = this.props, messages = _a.messages, licensedProductLinks = _a.licensedProductLinks, suggestedProductLinks = _a.suggestedProductLinks, fixedLinks = _a.fixedLinks, adminLinks = _a.adminLinks, recentLinks = _a.recentLinks, customLinks = _a.customLinks, manageLink = _a.manageLink, isLoading = _a.isLoading;
        /**
         * It is essential that switchToLinks reflects the order corresponding nav items
         * are rendered below in the 'Switch to' section.
         */
        var switchToLinks = tslib_1.__spread(licensedProductLinks, suggestedProductLinks, fixedLinks, adminLinks);
        var itemsCount = switchToLinks.length + recentLinks.length + customLinks.length;
        var firstContentArrived = Boolean(licensedProductLinks.length);
        return (React.createElement(NavigationAnalyticsContext, { data: getAnalyticsContext(itemsCount) },
            React.createElement(SwitcherWrapper, null,
                firstContentArrived && (React.createElement(RenderTracker, { subject: SWITCHER_SUBJECT, data: { duration: this.timeSinceMounted() } })),
                React.createElement(Section, { sectionId: "switchTo", title: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.switchTo)) },
                    licensedProductLinks.map(function (item) { return (React.createElement(NavigationAnalyticsContext, { key: item.key, data: getItemAnalyticsContext(switchToLinks.indexOf(item), item.key, 'product') },
                        React.createElement(SwitcherItem, { icon: React.createElement(item.Icon, { theme: "product" }), href: item.href }, item.label))); }),
                    suggestedProductLinks.map(function (item) { return (React.createElement(NavigationAnalyticsContext, { key: item.key, data: getItemAnalyticsContext(switchToLinks.indexOf(item), item.key, 'try') },
                        React.createElement(SwitcherItem, { icon: React.createElement(item.Icon, { theme: "product" }), onClick: _this.triggerXFlow },
                            item.label,
                            React.createElement(TryLozenge, null,
                                React.createElement(FormattedMessage, tslib_1.__assign({}, messages.try)))))); }),
                    fixedLinks.map(function (item) { return (React.createElement(NavigationAnalyticsContext, { key: item.key, data: getItemAnalyticsContext(switchToLinks.indexOf(item), item.key, 'product') },
                        React.createElement(SwitcherItem, { icon: React.createElement(item.Icon, { theme: "product" }), href: item.href }, item.label))); }),
                    adminLinks.map(function (item) { return (React.createElement(NavigationAnalyticsContext, { key: item.key, data: getItemAnalyticsContext(switchToLinks.indexOf(item), item.key, 'admin') },
                        React.createElement(SwitcherItem, { icon: React.createElement(item.Icon, { theme: "admin" }), href: item.href }, item.label))); })),
                React.createElement(Section, { sectionId: "recent", title: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.recent)) }, recentLinks.map(function (_a, idx) {
                    var key = _a.key, label = _a.label, href = _a.href, type = _a.type, description = _a.description, Icon = _a.Icon;
                    return (React.createElement(NavigationAnalyticsContext, { key: key, data: getItemAnalyticsContext(idx, type, 'recent') },
                        React.createElement(SwitcherItem, { icon: React.createElement(Icon, { theme: "recent" }), description: description, href: href }, label)));
                })),
                React.createElement(Section, { sectionId: "customLinks", title: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.more)) }, customLinks.map(function (_a, idx) {
                    var label = _a.label, href = _a.href, Icon = _a.Icon;
                    return (
                    // todo: id in SwitcherItem should be consumed from custom link resolver
                    React.createElement(NavigationAnalyticsContext, { key: idx + '.' + label, data: getItemAnalyticsContext(idx, null, 'customLink') },
                        React.createElement(SwitcherItem, { icon: React.createElement(Icon, { theme: "custom" }), href: href }, label)));
                })),
                isLoading && React.createElement(Skeleton, null),
                manageLink && React.createElement(ManageButton, { href: manageLink }))));
    };
    return Switcher;
}(React.Component));
export default Switcher;
//# sourceMappingURL=switcher.js.map