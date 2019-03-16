import * as tslib_1 from "tslib";
import Avatar from '@findable/avatar';
import * as React from 'react';
import { getAvatarSize } from './utils';
var Props = /** @class */ (function () {
    function Props() {
    }
    return Props;
}());
export { Props };
var SizeableAvatar = /** @class */ (function (_super) {
    tslib_1.__extends(SizeableAvatar, _super);
    function SizeableAvatar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SizeableAvatar.prototype.render = function () {
        var _a = this.props, src = _a.src, name = _a.name, presence = _a.presence, appearance = _a.appearance;
        return (React.createElement(Avatar, { isHover: false, size: getAvatarSize(appearance), src: src, name: name, enableTooltip: false, borderColor: "transparent", presence: presence }));
    };
    return SizeableAvatar;
}(React.PureComponent));
export { SizeableAvatar };
//# sourceMappingURL=SizeableAvatar.js.map