import * as tslib_1 from "tslib";
import { colors } from '@findable/theme';
import * as React from 'react';
import { AvatarItemOption, TextWrapper } from './AvatarItemOption';
import { HighlightText } from './HighlightText';
import { SizeableAvatar } from './SizeableAvatar';
import { hasValue } from './utils';
var UserOption = /** @class */ (function (_super) {
    tslib_1.__extends(UserOption, _super);
    function UserOption() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getPrimaryText = function () {
            var _a = _this.props.user, name = _a.name, publicName = _a.publicName, highlight = _a.highlight;
            var result = [
                React.createElement(TextWrapper, { key: "name", color: _this.props.isSelected ? colors.N0 : colors.N800 },
                    React.createElement(HighlightText, { highlights: highlight && highlight.name }, name)),
            ];
            if (hasValue(publicName) && name.trim() !== publicName.trim()) {
                result.push(React.createElement(React.Fragment, { key: "publicName" },
                    ' ',
                    React.createElement(TextWrapper, { color: _this.props.isSelected ? colors.N50 : colors.N200 },
                        "(",
                        React.createElement(HighlightText, { highlights: highlight && highlight.publicName }, publicName),
                        ")")));
            }
            return result;
        };
        _this.renderSecondaryText = function () {
            return _this.props.user.byline ? (React.createElement(TextWrapper, { color: _this.props.isSelected ? colors.N50 : colors.N200 }, _this.props.user.byline)) : (undefined);
        };
        _this.renderAvatar = function () {
            var _a = _this.props, _b = _a.user, avatarUrl = _b.avatarUrl, name = _b.name, status = _a.status;
            return (React.createElement(SizeableAvatar, { appearance: "big", src: avatarUrl, presence: status, name: name }));
        };
        return _this;
    }
    UserOption.prototype.render = function () {
        return (React.createElement(AvatarItemOption, { avatar: this.renderAvatar(), primaryText: this.getPrimaryText(), secondaryText: this.renderSecondaryText() }));
    };
    return UserOption;
}(React.PureComponent));
export { UserOption };
//# sourceMappingURL=UserOption.js.map