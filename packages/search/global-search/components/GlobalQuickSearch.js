import * as tslib_1 from "tslib";
import * as React from 'react';
import * as debounce from 'lodash.debounce';
import { QuickSearch } from '@atlaskit/quick-search';
import { withAnalyticsEvents, AnalyticsContext, } from '@atlaskit/analytics-next';
import { fireSelectedSearchResult, fireHighlightedSearchResult, fireSelectedAdvancedSearch, fireTextEnteredEvent, fireDismissedEvent, } from '../util/analytics-event-helper';
import { isAdvancedSearchResult, ADVANCED_CONFLUENCE_SEARCH_RESULT_ID, } from './SearchResultsUtil';
var ATLASKIT_QUICKSEARCH_NS = 'atlaskit.navigation.quick-search';
var QS_ANALYTICS_EV_KB_CTRLS_USED = ATLASKIT_QUICKSEARCH_NS + ".keyboard-controls-used";
var QS_ANALYTICS_EV_SUBMIT = ATLASKIT_QUICKSEARCH_NS + ".submit";
/**
 * Presentational component that renders the search input and search results.
 */
var GlobalQuickSearch = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalQuickSearch, _super);
    function GlobalQuickSearch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryVersion = 0;
        _this.resultSelected = false;
        _this.state = {
            query: '',
        };
        _this.handleSearchInput = function (_a) {
            var target = _a.target;
            var query = target.value;
            _this.setState({
                query: query,
            });
            _this.debouncedSearch(query);
        };
        _this.debouncedSearch = debounce(_this.doSearch, 350);
        _this.fireSearchResultSelectedEvent = function (eventData) {
            var _a = _this.props, createAnalyticsEvent = _a.createAnalyticsEvent, searchSessionId = _a.searchSessionId;
            _this.resultSelected = true;
            var resultId = eventData.resultCount && eventData.method === 'shortcut'
                ? ADVANCED_CONFLUENCE_SEARCH_RESULT_ID
                : eventData.resultId;
            if (isAdvancedSearchResult(resultId)) {
                fireSelectedAdvancedSearch(tslib_1.__assign({}, eventData, { resultId: resultId, query: _this.state.query, queryVersion: _this.queryVersion, isLoading: _this.props.isLoading }), searchSessionId, createAnalyticsEvent);
            }
            else {
                fireSelectedSearchResult(tslib_1.__assign({}, eventData, { query: _this.state.query, queryVersion: _this.queryVersion }), searchSessionId, createAnalyticsEvent);
            }
        };
        _this.fireSearchResultEvents = function (eventName, eventData) {
            var _a = _this.props, createAnalyticsEvent = _a.createAnalyticsEvent, searchSessionId = _a.searchSessionId;
            if (eventName === QS_ANALYTICS_EV_SUBMIT) {
                _this.fireSearchResultSelectedEvent(eventData);
            }
            else if (eventName === QS_ANALYTICS_EV_KB_CTRLS_USED) {
                var data = eventData;
                if (data.key === 'ArrowDown' || data.key === 'ArrowUp') {
                    fireHighlightedSearchResult(data, searchSessionId, createAnalyticsEvent);
                }
            }
        };
        return _this;
    }
    GlobalQuickSearch.prototype.componentDidMount = function () {
        this.props.onMount();
    };
    GlobalQuickSearch.prototype.doSearch = function (query) {
        var _a = this.props, onSearch = _a.onSearch, searchSessionId = _a.searchSessionId, createAnalyticsEvent = _a.createAnalyticsEvent, isSendSearchTermsEnabled = _a.isSendSearchTermsEnabled;
        onSearch(query.trim());
        fireTextEnteredEvent(query, searchSessionId, this.queryVersion, isSendSearchTermsEnabled, createAnalyticsEvent);
        this.queryVersion++;
    };
    GlobalQuickSearch.prototype.componentWillUnmount = function () {
        if (this.resultSelected) {
            return;
        }
        var _a = this.props, createAnalyticsEvent = _a.createAnalyticsEvent, searchSessionId = _a.searchSessionId;
        fireDismissedEvent(searchSessionId, createAnalyticsEvent);
    };
    GlobalQuickSearch.prototype.render = function () {
        var _a = this.props, isLoading = _a.isLoading, placeholder = _a.placeholder, linkComponent = _a.linkComponent, children = _a.children, onSearchSubmit = _a.onSearchSubmit, selectedResultId = _a.selectedResultId, onSelectedResultIdChanged = _a.onSelectedResultIdChanged;
        return (React.createElement(AnalyticsContext, { data: { searchSessionId: this.props.searchSessionId } },
            React.createElement(QuickSearch, { firePrivateAnalyticsEvent: this.fireSearchResultEvents, isLoading: isLoading, onSearchInput: this.handleSearchInput, placeholder: placeholder, value: this.state.query, linkComponent: linkComponent, onSearchSubmit: onSearchSubmit, selectedResultId: selectedResultId, onSelectedResultIdChanged: onSelectedResultIdChanged }, children)));
    };
    GlobalQuickSearch.defaultProps = {
        isSendSearchTermsEnabled: false,
    };
    return GlobalQuickSearch;
}(React.Component));
export { GlobalQuickSearch };
export default withAnalyticsEvents()(GlobalQuickSearch);
//# sourceMappingURL=GlobalQuickSearch.js.map