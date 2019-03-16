import * as tslib_1 from "tslib";
import * as React from 'react';
import { withAnalytics } from '@findable/analytics';
import AkSearch from './Search/Search';
import { ResultContext, SelectedResultIdContext, } from './context';
import decorateWithAnalyticsData from './decorateWithAnalyticsData';
import { QS_ANALYTICS_EV_CLOSE, QS_ANALYTICS_EV_KB_CTRLS_USED, QS_ANALYTICS_EV_OPEN, QS_ANALYTICS_EV_QUERY_ENTERED, QS_ANALYTICS_EV_SUBMIT, } from './constants';
/**
 * Get the result ID of a result by its index in the flatResults array
 * Returns null for a failed index or if resultId is empty|undefined
 */
var getResultIdByIndex = function (array, index) {
    if (array &&
        index !== null &&
        array[index] &&
        array[index].props &&
        array[index].props.resultId) {
        return array[index].props.resultId;
    }
    return null;
};
/**
 * Find a result in the flatResults array by its ID
 * Returns the result object or null
 */
var getResultById = function (array, id) {
    return (array &&
        array.find(function (result) { return result.props && result.props.resultId === id; })) ||
        null;
};
/**
 * Get a result's index in the flatResults array by its ID
 * Returns a numeric index or null
 */
var getResultIndexById = function (array, id) {
    if (!array) {
        return null;
    }
    var result = getResultById(array, id);
    if (!result) {
        return null;
    }
    var index = array.indexOf(result);
    return index >= 0 ? index : null;
};
var adjustIndex = function (arrayLength, currentIndex, adjustment) {
    if (arrayLength === 0) {
        return null;
    }
    if (adjustment === 0) {
        return currentIndex;
    }
    // If nothing is selected, select the element on the end
    if (currentIndex === null) {
        return adjustment > 0 ? 0 : arrayLength - 1;
    }
    // Adjust current index, wrapping around if necessary
    var adjustedIndex = (currentIndex + adjustment) % arrayLength;
    // Correct for negative indices
    return adjustedIndex >= 0 ? adjustedIndex : adjustedIndex + arrayLength;
};
var QuickSearch = /** @class */ (function (_super) {
    tslib_1.__extends(QuickSearch, _super);
    function QuickSearch(props) {
        var _this = _super.call(this, props) || this;
        _this.flatResults = [];
        _this.hasSearchQueryEventFired = false;
        _this.hasKeyDownEventFired = false;
        _this.lastKeyPressed = '';
        /**
         * Uses the virtual list, this.flatResults, to move the selection across grouped results as if
         * results were in a single, circular list.
         *
         * Process:
         * 1. Finds the index of the selected result in the flatResults array,
         * 2. Increments or decrements this index by the supplied adjustment amount,
         * 3. Sets the new selectedResultId based on the modifed index
         */
        _this.adjustSelectedResultIndex = function (adjustment) {
            var currentIndex = getResultIndexById(_this.flatResults, _this.state.selectedResultId);
            var newIndex = adjustIndex(_this.flatResults.length, currentIndex, adjustment);
            var selectedResultId = getResultIdByIndex(_this.flatResults, newIndex);
            _this.setState({
                selectedResultId: selectedResultId,
            });
            if (selectedResultId) {
                _this.fireKeyboardControlEvent(selectedResultId);
            }
            if (_this.props.onSelectedResultIdChanged) {
                _this.props.onSelectedResultIdChanged(selectedResultId);
            }
        };
        /** Select next result */
        _this.selectNext = function () {
            _this.adjustSelectedResultIndex(+1);
        };
        /** Select previous result */
        _this.selectPrevious = function () {
            _this.adjustSelectedResultIndex(-1);
        };
        /**
         * Callback for register results in flatResults
         */
        _this.handleRegisterResult = function (result) {
            if (!getResultById(_this.flatResults, result.props.resultId)) {
                _this.flatResults.push(result);
            }
        };
        /**
         * Callback for unregister results in flatResults
         * It will reconcile a list of results for keyboard navigation after every update.
         * 1. Component starts with an empty list of results
         * 2. componentDidMount / componentDidUpdate lifecycle methods in ResultBase will be invoked
         * 3. All ResultBase components call registerResult() in order to register itself in quick search
         * 4. All ResultBase components call unregisterResult() in order to unregister itself in quick search
         */
        _this.handleUnregisterResult = function (result) {
            var resultIndex = getResultIndexById(_this.flatResults, result.props.resultId);
            if (resultIndex !== null && +resultIndex >= 0) {
                _this.flatResults.splice(resultIndex, 1);
            }
        };
        /**
         * Callback for mouseEnter events on individual results
         * Move selection to hovered result
         */
        _this.handleResultMouseEnter = function (resultData) {
            _this.setState({ selectedResultId: resultData && resultData.resultId });
        };
        /**
         * Callback for mouseLeave events on individual results
         * Clear result selection
         */
        _this.handleResultMouseLeave = function () {
            _this.setState({ selectedResultId: null });
        };
        /**
         * Clear result selection when search input is blurred
         */
        _this.handleSearchBlur = function (event) {
            _this.props.onSearchBlur(event);
            _this.setState({ selectedResultId: null });
        };
        /**
         * Keyboard controls
         * Up - Select previous result
         * Down - Select next result
         * Enter - Submit selected result
         */
        _this.handleSearchKeyDown = function (event) {
            var firePrivateAnalyticsEvent = _this.props.firePrivateAnalyticsEvent;
            _this.props.onSearchKeyDown(event);
            // Capture whether users are using keyboard controls
            if (event.key === 'ArrowUp' ||
                event.key === 'ArrowDown' ||
                event.key === 'Enter') {
                _this.lastKeyPressed = event.key;
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault(); // Don't move cursor around in search input field
                _this.selectPrevious();
            }
            else if (event.key === 'ArrowDown') {
                event.preventDefault(); // Don't move cursor around in search input field
                _this.selectNext();
            }
            else if (event.key === 'Enter') {
                // shift key pressed or no result selected
                if (event.shiftKey || !_this.state.selectedResultId) {
                    if (firePrivateAnalyticsEvent) {
                        firePrivateAnalyticsEvent(QS_ANALYTICS_EV_SUBMIT, {
                            newTab: false,
                            resultCount: _this.flatResults.length,
                            method: 'shortcut',
                        });
                    }
                    _this.props.onSearchSubmit(event);
                }
                else {
                    event.preventDefault(); // Don't fire submit event from input
                    var result = getResultById(_this.flatResults, _this.state.selectedResultId);
                    if (!result || !result.props) {
                        return;
                    }
                    // Capture when users are using the keyboard to submit
                    if (typeof firePrivateAnalyticsEvent === 'function') {
                        _this.fireKeyboardControlEvent(_this.state.selectedResultId);
                        firePrivateAnalyticsEvent(QS_ANALYTICS_EV_SUBMIT, tslib_1.__assign({}, result.getAnalyticsData(), { method: 'returnKey', newTab: false, resultCount: _this.flatResults.length }));
                    }
                    var preventDefault_1 = false;
                    if (result.props.onClick) {
                        result.props.onClick({
                            resultId: result.props.resultId,
                            type: result.props.type,
                            event: Object.assign({}, event, {
                                preventDefault: function () {
                                    preventDefault_1 = true;
                                },
                                stopPropagation: function () { },
                            }),
                        });
                    }
                    if (result.props.href && !preventDefault_1) {
                        window.location.assign(result.props.href);
                    }
                }
            }
        };
        _this.setSearchInputRef = function (refs) {
            if (refs && refs.inputRef) {
                _this.inputSearchRef = refs.inputRef;
            }
        };
        _this.focusSearchInput = function () {
            if (_this.inputSearchRef &&
                // @ts-ignore unchecked
                typeof _this.inputSearchRef.focus === 'function') {
                // @ts-ignore unchecked
                _this.inputSearchRef.focus();
            }
        };
        _this.state = {
            /** Select first result by default if `selectedResultId` prop is not provided */
            selectedResultId: _this.props.selectedResultId || null,
            context: {
                registerResult: _this.handleRegisterResult,
                unregisterResult: _this.handleUnregisterResult,
                onMouseEnter: _this.handleResultMouseEnter,
                onMouseLeave: _this.handleResultMouseLeave,
                sendAnalytics: _this.props.firePrivateAnalyticsEvent,
                getIndex: function (resultId) {
                    return getResultIndexById(_this.flatResults, resultId);
                },
                linkComponent: _this.props.linkComponent,
            },
        };
        return _this;
    }
    QuickSearch.prototype.componentDidMount = function () {
        var firePrivateAnalyticsEvent = this.props.firePrivateAnalyticsEvent;
        if (firePrivateAnalyticsEvent) {
            firePrivateAnalyticsEvent(QS_ANALYTICS_EV_OPEN, {});
        }
    };
    QuickSearch.prototype.componentWillUnmount = function () {
        var firePrivateAnalyticsEvent = this.props.firePrivateAnalyticsEvent;
        if (firePrivateAnalyticsEvent) {
            firePrivateAnalyticsEvent(QS_ANALYTICS_EV_CLOSE, {});
        }
    };
    QuickSearch.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.children !== this.props.children) {
            this.setState({
                selectedResultId: nextProps.selectedResultId || null,
            });
        }
        else if (nextProps.selectedResultId !== this.props.selectedResultId &&
            nextProps.selectedResultId !== this.state.selectedResultId) {
            this.setState({
                selectedResultId: nextProps.selectedResultId || null,
            });
        }
        // keep context state in sync
        var _a = this.state.context, sendAnalytics = _a.sendAnalytics, linkComponent = _a.linkComponent;
        if (sendAnalytics !== nextProps.firePrivateAnalyticsEvent ||
            linkComponent !== nextProps.linkComponent) {
            this.setState({
                context: tslib_1.__assign({}, this.state.context, { sendAnalytics: nextProps.firePrivateAnalyticsEvent, linkComponent: nextProps.linkComponent }),
            });
        }
        /**
         * Capture whether user needed to query in order to find their target result.
         * Only fire once per mount. Only fire when a search term is entered and the previous search
         * term was empty.
         */
        if (!this.hasSearchQueryEventFired &&
            !this.props.value &&
            nextProps.value) {
            this.hasSearchQueryEventFired = true;
            var firePrivateAnalyticsEvent = this.props.firePrivateAnalyticsEvent;
            if (firePrivateAnalyticsEvent) {
                firePrivateAnalyticsEvent(QS_ANALYTICS_EV_QUERY_ENTERED, {});
            }
        }
    };
    QuickSearch.prototype.fireKeyboardControlEvent = function (selectedResultId) {
        var firePrivateAnalyticsEvent = this.props.firePrivateAnalyticsEvent;
        if (firePrivateAnalyticsEvent) {
            var result = getResultById(this.flatResults, selectedResultId);
            if (result) {
                firePrivateAnalyticsEvent(QS_ANALYTICS_EV_KB_CTRLS_USED, tslib_1.__assign({}, result.getAnalyticsData(), { key: this.lastKeyPressed, resultCount: this.flatResults.length }));
            }
        }
        this.lastKeyPressed = '';
    };
    QuickSearch.prototype.render = function () {
        return (React.createElement(AkSearch, { isLoading: this.props.isLoading, onBlur: this.handleSearchBlur, onInput: this.props.onSearchInput, onKeyDown: this.handleSearchKeyDown, placeholder: this.props.placeholder, value: this.props.value, ref: this.setSearchInputRef },
            React.createElement(ResultContext.Provider, { value: this.state.context },
                React.createElement(SelectedResultIdContext.Provider, { value: this.state.selectedResultId }, this.props.children))));
    };
    QuickSearch.defaultProps = {
        children: [],
        firePrivateAnalyticsEvent: function (_) { },
        isLoading: false,
        onSearchBlur: function (_) { },
        onSearchKeyDown: function (_) { },
        onSearchSubmit: function (_) { },
        placeholder: 'Search',
        value: '',
    };
    return QuickSearch;
}(React.Component));
export { QuickSearch };
/**
 * HOCs:
 * `decorateWithAnalyticsData` - Wrapper that decorates analytics events with additional data.
 * `withAnalytics` - Injects analytics firing methods that are picked up by
 * @findable/analytics/AnalyticsListener.
 */
export default decorateWithAnalyticsData(withAnalytics(QuickSearch, {}, {}));
//# sourceMappingURL=QuickSearch.js.map