import * as tslib_1 from "tslib";
import Avatar from '@atlaskit/avatar';
import LockCircleIcon from '@atlaskit/icon/glyph/lock-circle';
import Lozenge from '@atlaskit/lozenge';
import { colors } from '@atlaskit/theme';
import * as React from 'react';
import { isRestricted, } from '../../types';
import { NoAccessLabel } from '../../util/i18n';
import { leftClick } from '../../util/mouse';
import { NoAccessTooltip } from '../NoAccessTooltip';
import { AccessSectionStyle, AvatarStyle, FullNameStyle, InfoSectionStyle, MentionItemStyle, NameSectionStyle, NicknameStyle, RowStyle, TimeStyle, } from './styles';
function renderHighlight(ReactComponent, value, highlights, prefix) {
    if (!value) {
        return null;
    }
    var parts = [];
    var prefixText = prefix || '';
    var lastIndex = 0;
    if (highlights) {
        for (var i = 0; i < highlights.length; i++) {
            var h = highlights[i];
            var start = h.start;
            var end = h.end;
            if (start > lastIndex) {
                parts.push({
                    value: value.substring(lastIndex, start),
                    matches: false,
                });
            }
            parts.push({
                value: value.substring(start, end + 1),
                matches: true,
            });
            lastIndex = end + 1;
        }
        if (lastIndex < value.length) {
            parts.push({
                value: value.substring(lastIndex, value.length),
                matches: false,
            });
        }
    }
    else {
        parts.push({
            value: value,
            matches: false,
        });
    }
    return (React.createElement(ReactComponent, null,
        prefixText,
        parts.map(function (part, index) {
            if (part.matches) {
                return React.createElement("b", { key: index }, part.value);
            }
            return part.value;
        })));
}
function renderLozenge(lozenge) {
    if (lozenge) {
        return React.createElement(Lozenge, null, lozenge);
    }
    return null;
}
function renderTime(time) {
    if (time) {
        return React.createElement(TimeStyle, null, time);
    }
    return null;
}
var MentionItem = /** @class */ (function (_super) {
    tslib_1.__extends(MentionItem, _super);
    function MentionItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // internal, used for callbacks
        _this.onMentionSelected = function (event) {
            if (leftClick(event) && _this.props.onSelection) {
                event.preventDefault();
                _this.props.onSelection(_this.props.mention, event);
            }
        };
        _this.onMentionMenuItemMouseMove = function (event) {
            if (_this.props.onMouseMove) {
                _this.props.onMouseMove(_this.props.mention, event);
            }
        };
        return _this;
    }
    MentionItem.prototype.render = function () {
        var _a = this.props, mention = _a.mention, selected = _a.selected;
        var id = mention.id, highlight = mention.highlight, avatarUrl = mention.avatarUrl, presence = mention.presence, name = mention.name, mentionName = mention.mentionName, nickname = mention.nickname, lozenge = mention.lozenge, accessLevel = mention.accessLevel;
        var _b = presence || {}, status = _b.status, time = _b.time;
        var restricted = isRestricted(accessLevel);
        var nameHighlights = highlight && highlight.name;
        var nicknameHighlights = highlight && highlight.nickname;
        var borderColor = selected ? colors.N30 : undefined;
        return (React.createElement(MentionItemStyle, { selected: selected, onMouseDown: this.onMentionSelected, onMouseMove: this.onMentionMenuItemMouseMove, "data-mention-id": id, "data-mention-name": mentionName },
            React.createElement(RowStyle, null,
                React.createElement(AvatarStyle, { restricted: restricted },
                    React.createElement(Avatar, { src: avatarUrl, size: "medium", presence: status, borderColor: borderColor })),
                React.createElement(NameSectionStyle, { restricted: restricted },
                    renderHighlight(FullNameStyle, name, nameHighlights),
                    renderHighlight(NicknameStyle, nickname, nicknameHighlights, '@')),
                React.createElement(InfoSectionStyle, { restricted: restricted },
                    renderLozenge(lozenge),
                    renderTime(time)),
                restricted ? (React.createElement(NoAccessTooltip, { name: name },
                    React.createElement(AccessSectionStyle, null,
                        React.createElement(NoAccessLabel, null, function (text) { return (React.createElement(LockCircleIcon, { label: text })); } /* safe to cast to string given there is no value binding */)))) : null)));
    };
    return MentionItem;
}(React.PureComponent));
export default MentionItem;
//# sourceMappingURL=index.js.map