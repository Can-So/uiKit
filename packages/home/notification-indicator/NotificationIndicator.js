import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import Badge from '@findable/badge';
var MAX_NOTIFICATIONS_COUNT = 9;
var NAVIGATION_CHANNEL = 'navigation';
var NotificationIndicator = /** @class */ (function (_super) {
    tslib_1.__extends(NotificationIndicator, _super);
    function NotificationIndicator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.visibilityChangesSinceTimer = 0;
        _this.state = {
            count: null,
        };
        _this.onVisibilityChange = function () {
            if (_this.props.refreshOnVisibilityChange && _this.shouldRefresh()) {
                _this.visibilityChangesSinceTimer++;
                _this.refresh('visibility');
            }
        };
        _this.shouldRefresh = function () {
            return !document.hidden || _this.props.refreshOnHidden;
        };
        _this.timerTick = function () {
            _this.visibilityChangesSinceTimer = 0;
            _this.refresh('timer');
        };
        _this.handleAnalytics = function (countUpdateProperties) {
            var newCount = countUpdateProperties.newCount, oldCount = countUpdateProperties.oldCount, source = countUpdateProperties.source;
            // Only fire an 'activating' analytics event if the notification indicator is 'activating' for the first time
            // ie going from a number of 0 (the indicator is not visible)
            // to a number > 0 (the indicator becomes visible)
            if (_this.props.createAnalyticsEvent && newCount > 0 && oldCount === 0) {
                var event_1 = _this.props.createAnalyticsEvent({
                    actionSubject: 'notificationIndicator',
                    action: 'activated',
                    attributes: {
                        badgeCount: newCount,
                        refreshSource: source,
                    },
                });
                event_1.fire(NAVIGATION_CHANNEL);
            }
            if (_this.props.createAnalyticsEvent && newCount !== oldCount) {
                var event_2 = _this.props.createAnalyticsEvent({
                    actionSubject: 'notificationIndicator',
                    action: 'updated',
                    attributes: {
                        oldCount: oldCount,
                        newCount: newCount,
                        refreshSource: source,
                    },
                });
                event_2.fire(NAVIGATION_CHANNEL);
            }
        };
        _this.refresh = function (source) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var visibilityChangesSinceTimer, updatingEvent, updatingResult, count, _a, countUpdateProperties, e_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Provider should be available by this point, if not, we exit.
                        if (!this.notificationLogProvider) {
                            return [2 /*return*/];
                        }
                        // If user is not viewing the webpage, then skip this refresh to avoid unnecessary request.
                        if (!this.shouldRefresh()) {
                            return [2 /*return*/];
                        }
                        visibilityChangesSinceTimer = this.visibilityChangesSinceTimer;
                        updatingEvent = {
                            source: source,
                            visibilityChangesSinceTimer: visibilityChangesSinceTimer,
                        };
                        updatingResult = (this.props.onCountUpdating &&
                            this.props.onCountUpdating(updatingEvent)) ||
                            {};
                        if (updatingResult.skip) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = updatingResult.countOverride;
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.notificationLogProvider.countUnseenNotifications({
                                queryParams: {
                                    currentCount: this.state.count || 0,
                                },
                            })];
                    case 2:
                        _a = (_b.sent()).count;
                        _b.label = 3;
                    case 3:
                        count = _a;
                        if (this.state.count === null || this.state.count !== count) {
                            countUpdateProperties = {
                                oldCount: this.state.count || 0,
                                newCount: count,
                                source: source,
                            };
                            this.handleAnalytics(countUpdateProperties);
                            if (this.props.onCountUpdated) {
                                this.props.onCountUpdated(countUpdateProperties);
                            }
                            this.setState({ count: count });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    NotificationIndicator.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.props.notificationLogProvider];
                    case 1:
                        _a.notificationLogProvider = _b.sent();
                        this.refresh('mount');
                        this.updateInterval();
                        document.addEventListener('visibilitychange', this.onVisibilityChange);
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationIndicator.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.refreshRate !== this.props.refreshRate) {
            this.updateInterval();
        }
    };
    NotificationIndicator.prototype.componentWillUnmount = function () {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        document.removeEventListener('visibilitychange', this.onVisibilityChange);
    };
    NotificationIndicator.prototype.updateInterval = function () {
        var refreshRate = this.props.refreshRate;
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        if (refreshRate && refreshRate > 0) {
            this.intervalId = window.setInterval(this.timerTick, refreshRate);
        }
    };
    NotificationIndicator.prototype.render = function () {
        var count = this.state.count;
        var _a = this.props, appearance = _a.appearance, max = _a.max;
        return count ? (React.createElement("div", { "data-test-selector": "NotificationIndicator" },
            React.createElement(Badge, { max: max, appearance: appearance, value: count }))) : null;
    };
    NotificationIndicator.defaultProps = {
        appearance: 'important',
        max: MAX_NOTIFICATIONS_COUNT,
        refreshRate: 0,
        refreshOnHidden: false,
        refreshOnVisibilityChange: true,
    };
    return NotificationIndicator;
}(Component));
export default NotificationIndicator;
//# sourceMappingURL=NotificationIndicator.js.map