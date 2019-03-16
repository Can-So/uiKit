import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { colors } from '@findable/theme';
import * as Loadable from 'react-loadable';
export var AvatarGroupLoadable = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-task-decision-avatargroup" */ '@findable/avatar-group').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
var Partipants = /** @class */ (function (_super) {
    tslib_1.__extends(Partipants, _super);
    function Partipants() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Partipants.prototype.getAvatarData = function () {
        return this.props.participants.map(function (p) { return ({
            src: p.avatarUrl,
            name: p.displayName,
            size: 'small',
        }); });
    };
    Partipants.prototype.render = function () {
        return (React.createElement(AvatarGroupLoadable, { appearance: "stack", borderColor: colors.N20, maxCount: 4, size: "small", data: this.getAvatarData(), boundariesElement: "scrollParent" }));
    };
    return Partipants;
}(PureComponent));
export default Partipants;
//# sourceMappingURL=Participants.js.map