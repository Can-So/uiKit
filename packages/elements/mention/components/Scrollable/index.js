import * as tslib_1 from "tslib";
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { ScrollableStyle } from './styles';
var Scrollable = /** @class */ (function (_super) {
    tslib_1.__extends(Scrollable, _super);
    function Scrollable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // API
        _this.reveal = function (child) {
            if (child && _this.scrollableDiv) {
                var childNode = findDOMNode(child);
                // Not using Element.scrollIntoView as it scrolls even to top/bottom of view even if
                // already visible
                var scrollableRect = _this.scrollableDiv.getBoundingClientRect();
                var elementRect = childNode.getBoundingClientRect();
                if (elementRect.top < scrollableRect.top) {
                    _this.scrollableDiv.scrollTop += elementRect.top - scrollableRect.top;
                }
                else if (elementRect.bottom > scrollableRect.bottom) {
                    _this.scrollableDiv.scrollTop +=
                        elementRect.bottom - scrollableRect.bottom;
                }
            }
        };
        _this.handleRef = function (ref) {
            _this.scrollableDiv = ref;
        };
        return _this;
    }
    Scrollable.prototype.render = function () {
        return (React.createElement(ScrollableStyle, { innerRef: this.handleRef }, this.props.children));
    };
    return Scrollable;
}(React.PureComponent));
export default Scrollable;
//# sourceMappingURL=index.js.map