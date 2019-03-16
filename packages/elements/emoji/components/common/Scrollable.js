// FIXME - FAB-1732 looking at making a shared component for this
import * as tslib_1 from "tslib";
import * as classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import * as styles from './styles';
var Scrollable = /** @class */ (function (_super) {
    tslib_1.__extends(Scrollable, _super);
    function Scrollable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollableDiv = null;
        // API
        _this.reveal = function (child, forceToTop) {
            if (child && _this.scrollableDiv) {
                var childNode = findDOMNode(child);
                // Not using Element.scrollIntoView as it scrolls even to top/bottom of view even if
                // already visible
                var scrollableRect = _this.scrollableDiv.getBoundingClientRect();
                var elementRect = childNode.getBoundingClientRect();
                if (forceToTop || elementRect.top < scrollableRect.top) {
                    _this.scrollableDiv.scrollTop += elementRect.top - scrollableRect.top;
                }
                else if (elementRect.bottom > scrollableRect.bottom) {
                    _this.scrollableDiv.scrollTop +=
                        elementRect.bottom - scrollableRect.bottom;
                }
            }
        };
        _this.scrollToBottom = function () {
            if (_this.scrollableDiv) {
                _this.scrollableDiv.scrollTop = _this.scrollableDiv.scrollHeight;
            }
        };
        _this.handleScroll = function (event) {
            var sampleOffset = 10;
            var firstElement;
            if (_this.scrollableDiv) {
                var scrollableRect = _this.scrollableDiv.getBoundingClientRect();
                firstElement = document.elementFromPoint(scrollableRect.left + sampleOffset, scrollableRect.top + sampleOffset);
            }
            if (_this.props.onScroll && firstElement) {
                _this.props.onScroll(firstElement, event);
            }
        };
        _this.handleRef = function (ref) {
            _this.scrollableDiv = ref;
        };
        return _this;
    }
    Scrollable.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, maxHeight = _a.maxHeight, onMouseLeave = _a.onMouseLeave;
        var scrollableClasses = ['emoji-scrollable', styles.emojiScrollable];
        if (className) {
            scrollableClasses.push(className);
        }
        var style = maxHeight ? { maxHeight: maxHeight } : {};
        return (React.createElement("div", { className: classNames(scrollableClasses), onMouseLeave: onMouseLeave, onScroll: this.handleScroll, ref: this.handleRef, style: style }, children));
    };
    return Scrollable;
}(PureComponent));
export default Scrollable;
//# sourceMappingURL=Scrollable.js.map