import * as tslib_1 from "tslib";
import * as React from 'react';
import rafSchedule from 'raf-schd';
import { browser } from '@atlaskit/editor-common';
import { shadowClassNames } from './Renderer/style';
var isIE11 = browser.ie_version === 11;
export default function overflowShadow(Component, options) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(OverflowShadow, _super);
        function OverflowShadow() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                showLeftShadow: false,
                showRightShadow: false,
            };
            _this.handleScroll = function (event) {
                if (!_this.overflowContainer || event.target !== _this.overflowContainer) {
                    return;
                }
                _this.setState(function () { return ({
                    showLeftShadow: !!_this.overflowContainer && _this.overflowContainer.scrollLeft > 0,
                }); });
            };
            _this.updateRightShadow = function () {
                if (_this.overflowContainer && _this.scrollable.length) {
                    var scrollableWidth = _this.calcualteScrollableWidth();
                    var diff = scrollableWidth - _this.overflowContainer.offsetWidth;
                    var showRightShadow_1 = diff > 0 && diff > _this.overflowContainer.scrollLeft;
                    if (showRightShadow_1 !== _this.state.showRightShadow) {
                        _this.setState(function () { return ({
                            showRightShadow: showRightShadow_1,
                        }); });
                    }
                }
            };
            _this.handleUpdateRightShadow = rafSchedule(_this.updateRightShadow);
            _this.handleScrollDebounced = rafSchedule(_this.handleScroll);
            _this.calcualteScrollableWidth = function () {
                var width = 0;
                for (var i = 0; i < _this.scrollable.length; i++) {
                    var scrollableElement = _this.scrollable[i];
                    width += scrollableElement.scrollWidth;
                }
                return width;
            };
            _this.handleContainer = function (container) {
                if (!container || _this.container) {
                    return;
                }
                _this.container = container;
                _this.overflowContainer = container.querySelector(options.overflowSelector);
                _this.scrollable = container.querySelectorAll(options.scrollableSelector);
                if (!(_this.overflowContainer && _this.scrollable)) {
                    return;
                }
                _this.updateRightShadow();
                if (!isIE11) {
                    _this.overflowContainer.addEventListener('scroll', _this.handleScrollDebounced);
                }
            };
            return _this;
        }
        OverflowShadow.prototype.componentWillUnmount = function () {
            if (this.overflowContainer && !isIE11) {
                this.overflowContainer.removeEventListener('scroll', this.handleScrollDebounced);
            }
            this.handleUpdateRightShadow.cancel();
            this.handleScrollDebounced.cancel();
        };
        OverflowShadow.prototype.componentDidUpdate = function () {
            this.handleUpdateRightShadow();
        };
        OverflowShadow.prototype.render = function () {
            var _a = this.state, showLeftShadow = _a.showLeftShadow, showRightShadow = _a.showRightShadow;
            var classNames = [
                showRightShadow && shadowClassNames.RIGHT_SHADOW,
                showLeftShadow && shadowClassNames.LEFT_SHADOW,
            ]
                .filter(Boolean)
                .join(' ');
            return (React.createElement(Component, tslib_1.__assign({ handleRef: this.handleContainer, shadowClassNames: classNames }, this.props)));
        };
        return OverflowShadow;
    }(React.Component));
}
//# sourceMappingURL=overflow-shadow.js.map