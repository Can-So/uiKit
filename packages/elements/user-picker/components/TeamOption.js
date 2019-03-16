import * as tslib_1 from "tslib";
import { colors } from '@atlaskit/theme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { AvatarItemOption, TextWrapper } from './AvatarItemOption';
import { HighlightText } from './HighlightText';
import { messages } from './i18n';
import { SizeableAvatar } from './SizeableAvatar';
var TeamOption = /** @class */ (function (_super) {
    tslib_1.__extends(TeamOption, _super);
    function TeamOption() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getPrimaryText = function () {
            var _a = _this.props.team, name = _a.name, highlight = _a.highlight;
            return [
                React.createElement(TextWrapper, { key: "name", color: _this.props.isSelected ? colors.N0 : colors.N800 },
                    React.createElement(HighlightText, { highlights: highlight && highlight.name }, name)),
            ];
        };
        _this.renderByline = function () {
            var _a = _this.props, isSelected = _a.isSelected, _b = _a.team, memberCount = _b.memberCount, includesYou = _b.includesYou;
            // if Member count is missing, do not show the byline, regardless of the availability of includesYou
            if (memberCount === null || typeof memberCount === 'undefined') {
                return undefined;
            }
            return (React.createElement(TextWrapper, { color: isSelected ? colors.N50 : colors.N200 },
                React.createElement(FormattedMessage, tslib_1.__assign({}, (memberCount > 50
                    ? messages.plus50Members
                    : messages.memberCount), { values: { count: memberCount, includes: includesYou } }))));
        };
        _this.renderAvatar = function () {
            var _a = _this.props.team, avatarUrl = _a.avatarUrl, name = _a.name;
            return React.createElement(SizeableAvatar, { appearance: "big", src: avatarUrl, name: name });
        };
        return _this;
    }
    TeamOption.prototype.render = function () {
        return (React.createElement(AvatarItemOption, { avatar: this.renderAvatar(), secondaryText: this.renderByline(), primaryText: this.getPrimaryText() }));
    };
    return TeamOption;
}(React.PureComponent));
export { TeamOption };
//# sourceMappingURL=TeamOption.js.map