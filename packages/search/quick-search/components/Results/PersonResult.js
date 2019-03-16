import * as tslib_1 from "tslib";
import * as React from 'react';
import Avatar from '@atlaskit/avatar';
import ResultBase from './ResultBase';
var PersonResult = /** @class */ (function (_super) {
    tslib_1.__extends(PersonResult, _super);
    function PersonResult() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getMention = function () {
            return _this.props.mentionName
                ? "" + _this.props.mentionPrefix + _this.props.mentionName
                : undefined;
        };
        _this.getAvatar = function () {
            if (_this.props.avatar) {
                return _this.props.avatar;
            }
            return (React.createElement(Avatar, { presence: _this.props.presenceState, size: "small", src: _this.props.avatarUrl }));
        };
        return _this;
    }
    PersonResult.prototype.render = function () {
        var _a = this.props, name = _a.name, mentionName = _a.mentionName, mentionPrefix = _a.mentionPrefix, presenceMessage = _a.presenceMessage, presenceState = _a.presenceState, _b = _a.type, type = _b === void 0 ? 'person' : _b, commonResultProps = tslib_1.__rest(_a, ["name", "mentionName", "mentionPrefix", "presenceMessage", "presenceState", "type"]);
        return (React.createElement(ResultBase, tslib_1.__assign({}, commonResultProps, { type: type, text: name, subText: presenceMessage, caption: this.getMention(), icon: this.getAvatar() })));
    };
    PersonResult.defaultProps = {
        mentionPrefix: '@',
        presenceState: null,
    };
    return PersonResult;
}(React.PureComponent));
export default PersonResult;
//# sourceMappingURL=PersonResult.js.map