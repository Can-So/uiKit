import * as tslib_1 from "tslib";
import { colors } from '@findable/theme';
import * as cx from 'classnames';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { keyframes, style } from 'typestyle';
var animationTime = 300;
export var countStyle = style({
    fontSize: '12px',
    lineHeight: '24px',
    color: colors.N90,
    overflow: 'hidden',
    height: 24,
    transition: "width " + animationTime + "ms ease-in-out",
});
export var highlightStyle = style({
    color: colors.B400,
    fontWeight: 600,
});
export var containerStyle = style({
    display: 'flex',
    flexDirection: 'column',
});
var slideAnimation = function (start, end) {
    var animation = keyframes({
        '0%': {
            transform: "translateY(" + start + "%)",
        },
        '100%': {
            transform: "translateY(" + end + "%)",
        },
    });
    return animation + " " + animationTime + "ms ease-in-out";
};
var counterAnimation = function (start, end) {
    return style({ animation: slideAnimation(start, end) });
};
export var slideUpStyle = counterAnimation(0, -50);
export var slideDownStyle = counterAnimation(-50, 0);
var Counter = /** @class */ (function (_super) {
    tslib_1.__extends(Counter, _super);
    function Counter(props) {
        var _this = _super.call(this, props) || this;
        _this.getLabel = function (value) {
            var overLimitLabel = _this.props.overLimitLabel;
            if (_this.hasReachedLimit(value)) {
                return overLimitLabel || '';
            }
            else {
                return value.toString();
            }
        };
        _this.hasReachedLimit = function (value) {
            return _this.props.limit && value >= _this.props.limit;
        };
        _this.renderPrevious = function () {
            var _a;
            var previous = _this.state.previous;
            if (previous !== undefined) {
                var className = cx((_a = {}, _a[highlightStyle] = previous.highlight, _a));
                return (React.createElement("div", { key: previous.value, className: className }, _this.getLabel(previous.value)));
            }
            return null;
        };
        _this.clearPrevious = function () {
            _this.setState({ previous: undefined });
        };
        _this.state = {
            previous: undefined,
        };
        return _this;
    }
    Counter.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, value = _a.value, highlight = _a.highlight;
        if (value !== undefined &&
            value !== nextProps.value &&
            (!this.hasReachedLimit(value) || !this.hasReachedLimit(nextProps.value))) {
            this.setState({ previous: { value: value, highlight: highlight } });
        }
    };
    Counter.prototype.render = function () {
        var _a;
        var _b = this.props, value = _b.value, highlight = _b.highlight, classNameProp = _b.className;
        var previous = this.state.previous;
        var label = this.getLabel(value);
        var increase = previous !== undefined && previous.value < value;
        var decrease = previous !== undefined && previous.value > value;
        var enterClass = increase
            ? slideUpStyle
            : decrease
                ? slideDownStyle
                : undefined;
        var className = cx(countStyle, classNameProp);
        var currentClassName = cx((_a = {}, _a[highlightStyle] = highlight, _a));
        return (React.createElement("div", { className: className, style: { width: label.length * 10 } },
            React.createElement(CSSTransition, { classNames: { enter: enterClass }, timeout: animationTime, in: increase || decrease, onEntered: this.clearPrevious },
                React.createElement("div", { className: containerStyle },
                    increase ? this.renderPrevious() : null,
                    React.createElement("div", { className: currentClassName, key: value }, label),
                    decrease ? this.renderPrevious() : null))));
    };
    Counter.defaultProps = {
        highlight: false,
        limit: 100,
        overLimitLabel: '99+',
        className: undefined,
    };
    return Counter;
}(React.PureComponent));
export { Counter };
//# sourceMappingURL=Counter.js.map