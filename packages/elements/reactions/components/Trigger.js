import * as tslib_1 from "tslib";
import Button from '@atlaskit/button';
import EmojiAddIcon from '@atlaskit/icon/glyph/emoji-add';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { style } from 'typestyle';
var triggerStyle = style({
    width: '32px',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: '16px',
    $nest: {
        '&.miniMode': {
            width: '24px',
            height: '24px',
        },
    },
});
var Trigger = /** @class */ (function (_super) {
    tslib_1.__extends(Trigger, _super);
    function Trigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseDown = function () {
            if (_this.props.onClick) {
                _this.props.onClick();
            }
        };
        return _this;
    }
    Trigger.prototype.render = function () {
        var _a = this.props, miniMode = _a.miniMode, disabled = _a.disabled;
        var classNames = cx(triggerStyle, { miniMode: miniMode });
        return (React.createElement(Button, { className: classNames, appearance: "subtle", onClick: this.handleMouseDown, isDisabled: disabled, spacing: "none" },
            React.createElement(EmojiAddIcon, { size: "small", label: "Add reaction" })));
    };
    Trigger.defaultProps = {
        disabled: false,
    };
    return Trigger;
}(PureComponent));
export { Trigger };
//# sourceMappingURL=Trigger.js.map