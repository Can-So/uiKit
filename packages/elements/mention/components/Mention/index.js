import * as tslib_1 from "tslib";
import * as React from 'react';
import { MentionStyle } from './styles';
import { NoAccessTooltip } from '../NoAccessTooltip';
import { isRestricted, MentionType } from '../../types';
import { fireAnalyticsMentionEvent, fireAnalytics } from '../../util/analytics';
import { withAnalytics } from '@findable/analytics';
import { withAnalyticsEvents } from '@findable/analytics-next';
export var ANALYTICS_HOVER_DELAY = 1000;
var MentionInternal = /** @class */ (function (_super) {
    tslib_1.__extends(MentionInternal, _super);
    function MentionInternal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleOnClick = function (e) {
            var _a = _this.props, id = _a.id, text = _a.text, onClick = _a.onClick;
            if (onClick) {
                onClick(id, text, e);
            }
        };
        _this.handleOnMouseEnter = function (e) {
            var _a = _this.props, id = _a.id, text = _a.text, onMouseEnter = _a.onMouseEnter, onHover = _a.onHover;
            if (onMouseEnter) {
                onMouseEnter(id, text, e);
            }
            _this.hoverTimeout = window.setTimeout(function () {
                if (onHover) {
                    onHover();
                }
                _this.hoverTimeout = undefined;
            }, ANALYTICS_HOVER_DELAY);
        };
        _this.handleOnMouseLeave = function (e) {
            var _a = _this.props, id = _a.id, text = _a.text, onMouseLeave = _a.onMouseLeave;
            if (onMouseLeave) {
                onMouseLeave(id, text, e);
            }
            if (_this.hoverTimeout) {
                clearTimeout(_this.hoverTimeout);
            }
        };
        _this.getMentionType = function () {
            var _a = _this.props, accessLevel = _a.accessLevel, isHighlighted = _a.isHighlighted;
            if (isHighlighted) {
                return MentionType.SELF;
            }
            if (isRestricted(accessLevel)) {
                return MentionType.RESTRICTED;
            }
            return MentionType.DEFAULT;
        };
        return _this;
    }
    MentionInternal.prototype.componentWillUnmount = function () {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
    };
    MentionInternal.prototype.render = function () {
        var _a = this, handleOnClick = _a.handleOnClick, handleOnMouseEnter = _a.handleOnMouseEnter, handleOnMouseLeave = _a.handleOnMouseLeave, props = _a.props;
        var text = props.text, id = props.id, accessLevel = props.accessLevel;
        var mentionType = this.getMentionType();
        var mentionComponent = (React.createElement(MentionStyle, { mentionType: mentionType, onClick: handleOnClick, onMouseEnter: handleOnMouseEnter, onMouseLeave: handleOnMouseLeave }, text));
        return (React.createElement("span", { "data-mention-id": id, "data-access-level": accessLevel, spellCheck: false }, mentionType === MentionType.RESTRICTED ? (React.createElement(NoAccessTooltip, { name: text }, mentionComponent)) : (mentionComponent)));
    };
    return MentionInternal;
}(React.PureComponent));
export { MentionInternal };
// tslint:disable-next-line:variable-name
var MentionWithAnalytics = withAnalyticsEvents({
    onClick: function (createEvent, props) {
        var id = props.id, text = props.text, accessLevel = props.accessLevel, firePrivateAnalyticsEvent = props.firePrivateAnalyticsEvent;
        var event = fireAnalyticsMentionEvent(createEvent)('mention', 'selected', text, id, accessLevel);
        // old analytics
        fireAnalytics(firePrivateAnalyticsEvent)('lozenge.select', text, accessLevel);
        return event;
    },
    onHover: function (createEvent, props) {
        var id = props.id, text = props.text, accessLevel = props.accessLevel, firePrivateAnalyticsEvent = props.firePrivateAnalyticsEvent;
        var event = fireAnalyticsMentionEvent(createEvent)('mention', 'hovered', text, id, accessLevel);
        // old analytics
        fireAnalytics(firePrivateAnalyticsEvent)('lozenge.hover', text, accessLevel);
        return event;
    },
})(MentionInternal);
var Mention = withAnalytics(MentionWithAnalytics, {}, {});
export default Mention;
//# sourceMappingURL=index.js.map