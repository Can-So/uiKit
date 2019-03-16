import * as tslib_1 from "tslib";
import * as React from 'react';
import memoizeOne from 'memoize-one';
import HomeQuickSearchContainer from './home/HomeQuickSearchContainer';
import ConfluenceQuickSearchContainer from './confluence/ConfluenceQuickSearchContainer';
import JiraQuickSearchContainer from './jira/JiraQuickSearchContainer';
import configureSearchClients from '../api/configureSearchClients';
import MessagesIntlProvider from './MessagesIntlProvider';
var DEFAULT_NOOP_LOGGER = {
    safeInfo: function () { },
    safeWarn: function () { },
    safeError: function () { },
};
/**
 * Component that exposes the public API for global quick search. Its only purpose is to offer a simple, user-friendly API to the outside and hide the implementation detail of search clients etc.
 */
var GlobalQuickSearchWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalQuickSearchWrapper, _super);
    function GlobalQuickSearchWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // configureSearchClients is a potentially expensive function that we don't want to invoke on re-renders
        _this.memoizedConfigureSearchClients = memoizeOne(configureSearchClients);
        _this.onAdvancedSearch = function (e, entity, query, searchSessionId) {
            if (_this.props.onAdvancedSearch) {
                var preventEventDefault_1 = false;
                _this.props.onAdvancedSearch({
                    preventDefault: function () { return (preventEventDefault_1 = true); },
                    query: query,
                    category: entity,
                    originalEvent: e,
                    searchSessionId: searchSessionId,
                });
                if (preventEventDefault_1) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        };
        return _this;
    }
    GlobalQuickSearchWrapper.prototype.makeConfig = function () {
        var config = {};
        var _a = this.props, activityServiceUrl = _a.activityServiceUrl, searchAggregatorServiceUrl = _a.searchAggregatorServiceUrl, directoryServiceUrl = _a.directoryServiceUrl, confluenceUrl = _a.confluenceUrl, addSessionIdToJiraResult = _a.addSessionIdToJiraResult;
        if (activityServiceUrl) {
            config.activityServiceUrl = activityServiceUrl;
        }
        if (searchAggregatorServiceUrl) {
            config.searchAggregatorServiceUrl = searchAggregatorServiceUrl;
        }
        if (directoryServiceUrl) {
            config.directoryServiceUrl = directoryServiceUrl;
        }
        if (confluenceUrl) {
            config.confluenceUrl = confluenceUrl;
        }
        config.addSessionIdToJiraResult = addSessionIdToJiraResult;
        return config;
    };
    GlobalQuickSearchWrapper.prototype.getContainerComponent = function () {
        if (this.props.context === 'confluence') {
            return ConfluenceQuickSearchContainer;
        }
        else if (this.props.context === 'home') {
            return HomeQuickSearchContainer;
        }
        else if (this.props.context === 'jira') {
            return JiraQuickSearchContainer;
        }
        else {
            // fallback to home if nothing specified
            return HomeQuickSearchContainer;
        }
    };
    GlobalQuickSearchWrapper.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var _this = this;
        return (Object.keys(tslib_1.__assign({}, nextProps, this.props))
            .map(function (key) { return _this.props[key] !== nextProps[key]; })
            .reduce(function (acc, value) { return acc || value; }, false) || this.state !== nextState);
    };
    GlobalQuickSearchWrapper.prototype.render = function () {
        var ContainerComponent = this.getContainerComponent();
        var searchClients = this.memoizedConfigureSearchClients(this.props.cloudId, this.makeConfig());
        var _a = this.props, linkComponent = _a.linkComponent, isSendSearchTermsEnabled = _a.isSendSearchTermsEnabled, useQuickNavForPeopleResults = _a.useQuickNavForPeopleResults, referralContextIdentifiers = _a.referralContextIdentifiers, useCPUSForPeopleResults = _a.useCPUSForPeopleResults, logger = _a.logger, disableJiraPreQueryPeopleSearch = _a.disableJiraPreQueryPeopleSearch;
        return (React.createElement(MessagesIntlProvider, null,
            React.createElement(ContainerComponent, tslib_1.__assign({}, searchClients, { linkComponent: linkComponent, isSendSearchTermsEnabled: isSendSearchTermsEnabled, useQuickNavForPeopleResults: useQuickNavForPeopleResults, referralContextIdentifiers: referralContextIdentifiers, useCPUSForPeopleResults: useCPUSForPeopleResults, disableJiraPreQueryPeopleSearch: disableJiraPreQueryPeopleSearch, logger: logger, onAdvancedSearch: this.onAdvancedSearch }))));
    };
    GlobalQuickSearchWrapper.defaultProps = {
        logger: DEFAULT_NOOP_LOGGER,
    };
    return GlobalQuickSearchWrapper;
}(React.Component));
export default GlobalQuickSearchWrapper;
//# sourceMappingURL=GlobalQuickSearchWrapper.js.map