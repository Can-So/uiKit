import * as tslib_1 from "tslib";
import * as React from 'react';
import { IconTitleWrapper, IconWrapper } from './styled';
import { Icon } from '../Icon';
var IconAndTitleLayout = /** @class */ (function (_super) {
    tslib_1.__extends(IconAndTitleLayout, _super);
    function IconAndTitleLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconAndTitleLayout.prototype.renderIcon = function () {
        var icon = this.props.icon;
        // We render two kinds of icons here:
        // - Image: acquired from either DAC or Teamwork Platform Apps;
        // - Atlaskit Icon: an Atlaskit SVG;
        // Each of these are scaled down to 12x12.
        if (icon) {
            if (typeof icon === 'string') {
                return React.createElement(Icon, { src: icon });
            }
            else {
                return React.createElement(IconWrapper, null, icon);
            }
        }
        return null;
    };
    IconAndTitleLayout.prototype.render = function () {
        var title = this.props.title;
        return (React.createElement(React.Fragment, null,
            this.renderIcon(),
            React.createElement(IconTitleWrapper, null, title)));
    };
    return IconAndTitleLayout;
}(React.Component));
export { IconAndTitleLayout };
//# sourceMappingURL=index.js.map