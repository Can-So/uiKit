import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import * as debounce from 'lodash.debounce';
var InfiniteScroll = /** @class */ (function (_super) {
    tslib_1.__extends(InfiniteScroll, _super);
    function InfiniteScroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.emitOnThresholdReachedWithDebounce = debounce(_this.emitOnThresholdReached, _this.props.delay, {
            leading: true,
            trailing: true,
        });
        _this.scrollHeight = 0;
        _this.checkThreshold = function (event) {
            var target = event.currentTarget;
            var threshold = _this.props.threshold || 0;
            var position = target.scrollTop + target.offsetHeight;
            var thresholdModifier = 0.1;
            var adjustedThreshold = Math.min(threshold, target.scrollHeight * thresholdModifier);
            var thresholdReached = position > _this.scrollHeight &&
                position > target.scrollHeight - adjustedThreshold;
            if (thresholdReached) {
                _this.scrollHeight = target.scrollHeight;
                _this.emitOnThresholdReachedWithDebounce();
            }
        };
        return _this;
    }
    InfiniteScroll.prototype.render = function () {
        return (React.createElement("div", { style: {
                width: this.props.width,
                height: this.props.height,
                overflowX: 'hidden',
                overflowY: 'auto',
                msOverflowStyle: 'scrollbar',
                display: 'inline-block',
            }, onScroll: this.checkThreshold }, this.props.children));
    };
    InfiniteScroll.prototype.emitOnThresholdReached = function () {
        if (this.props.onThresholdReached) {
            this.props.onThresholdReached();
        }
    };
    InfiniteScroll.defaultProps = {
        width: '100%',
        delay: 1000,
        threshold: 100,
    };
    return InfiniteScroll;
}(Component));
export default InfiniteScroll;
//# sourceMappingURL=InfiniteScroll.js.map