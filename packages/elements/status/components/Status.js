import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import Lozenge from '@findable/lozenge';
import { withAnalyticsEvents } from '@findable/analytics-next';
import { createStatusAnalyticsAndFire } from './analytics';
import { ANALYTICS_HOVER_DELAY } from './constants';
var colorToLozengeAppearanceMap = {
    neutral: 'default',
    purple: 'new',
    blue: 'inprogress',
    red: 'removed',
    yellow: 'moved',
    green: 'success',
};
var DEFAULT_APPEARANCE = 'default';
var MAX_WIDTH = 200;
var StatusInternal = /** @class */ (function (_super) {
    tslib_1.__extends(StatusInternal, _super);
    function StatusInternal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hoverStartTime = 0;
        _this.handleMouseEnter = function (_e) {
            _this.hoverStartTime = Date.now();
        };
        _this.handleMouseLeave = function (_e) {
            var onHover = _this.props.onHover;
            var delay = Date.now() - _this.hoverStartTime;
            if (delay >= ANALYTICS_HOVER_DELAY && onHover) {
                onHover();
            }
            _this.hoverStartTime = 0;
        };
        return _this;
    }
    StatusInternal.prototype.componentWillUnmount = function () {
        this.hoverStartTime = 0;
    };
    StatusInternal.prototype.render = function () {
        var _a = this.props, text = _a.text, color = _a.color, style = _a.style, onClick = _a.onClick;
        if (text.trim().length === 0) {
            return null;
        }
        var appearance = colorToLozengeAppearanceMap[color] || DEFAULT_APPEARANCE;
        // note: ommitted data-local-id attribute to avoid copying/pasting the same localId
        return (React.createElement("span", { className: "status-lozenge-span", onClick: onClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, "data-node-type": "status", "data-color": color, "data-style": style },
            React.createElement(Lozenge, { appearance: appearance, maxWidth: MAX_WIDTH }, text)));
    };
    return StatusInternal;
}(PureComponent));
// tslint:disable-next-line:variable-name
export var Status = withAnalyticsEvents({
    onClick: function (createEvent, props) {
        var localId = props.localId;
        return createStatusAnalyticsAndFire(createEvent)({
            action: 'clicked',
            actionSubject: 'statusLozenge',
            attributes: {
                localId: localId,
            },
        });
    },
    onHover: function (createEvent, props) {
        var localId = props.localId;
        return createStatusAnalyticsAndFire(createEvent)({
            action: 'hovered',
            actionSubject: 'statusLozenge',
            attributes: {
                localId: localId,
            },
        });
    },
})(StatusInternal);
//# sourceMappingURL=Status.js.map