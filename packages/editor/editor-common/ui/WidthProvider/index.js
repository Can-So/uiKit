import * as tslib_1 from "tslib";
import * as React from 'react';
import rafSchedule from 'raf-schd';
import WidthDetector from '@atlaskit/width-detector';
export var Breakpoints = {
    S: 'S',
    M: 'M',
    L: 'L',
};
var MAX_S = 1266;
var MAX_M = 2146;
export function getBreakpoint(width) {
    if (width === void 0) { width = 0; }
    if (width >= MAX_S && width < MAX_M) {
        return Breakpoints.M;
    }
    else if (width >= MAX_M) {
        return Breakpoints.L;
    }
    return Breakpoints.S;
}
export function createWidthContext(width) {
    if (width === void 0) { width = 0; }
    return { width: width, breakpoint: getBreakpoint(width) };
}
var _a = React.createContext(createWidthContext()), Provider = _a.Provider, Consumer = _a.Consumer;
var WidthProvider = /** @class */ (function (_super) {
    tslib_1.__extends(WidthProvider, _super);
    function WidthProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { width: 0 };
        _this.setWidth = rafSchedule(function (width) {
            if (_this.state.width === width) {
                return;
            }
            _this.setState({ width: width });
        });
        _this.state.width = document.body.offsetWidth;
        return _this;
    }
    WidthProvider.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(WidthDetector, { containerStyle: {
                    height: '0',
                    borderStyle: 'none',
                } }, function (width) {
                if (width !== undefined) {
                    _this.setWidth(width);
                }
                return null;
            }),
            React.createElement(Provider, { value: createWidthContext(this.state.width) }, this.props.children)));
    };
    return WidthProvider;
}(React.Component));
export { WidthProvider };
export { Consumer as WidthConsumer };
//# sourceMappingURL=index.js.map