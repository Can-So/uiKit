import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { colors } from '@findable/theme';
import InfoIcon from '@findable/icon/glyph/editor/info';
import TipIcon from '@findable/icon/glyph/editor/hint';
import SuccessIcon from '@findable/icon/glyph/editor/success';
import ErrorIcon from '@findable/icon/glyph/editor/error';
import NoteIcon from '@findable/icon/glyph/editor/note';
import WarningIcon from '@findable/icon/glyph/warning';
var G50 = colors.G50, G400 = colors.G400, P50 = colors.P50, P400 = colors.P400, B400 = colors.B400, Y50 = colors.Y50, B50 = colors.B50, Y400 = colors.Y400, R50 = colors.R50, R400 = colors.R400;
var config = {
    info: {
        icon: InfoIcon,
        background: B50,
        iconColor: B400,
    },
    note: {
        icon: NoteIcon,
        background: P50,
        iconColor: P400,
    },
    tip: {
        icon: TipIcon,
        background: G50,
        iconColor: G400,
    },
    success: {
        icon: SuccessIcon,
        background: G50,
        iconColor: G400,
    },
    warning: {
        icon: WarningIcon,
        background: Y50,
        iconColor: Y400,
    },
    error: {
        icon: ErrorIcon,
        background: R50,
        iconColor: R400,
    },
};
var Panel = /** @class */ (function (_super) {
    tslib_1.__extends(Panel, _super);
    function Panel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Panel.prototype.render = function () {
        var _a = this.props, panelType = _a.panelType, children = _a.children;
        return (React.createElement("div", { style: { background: config[panelType].background }, className: "ak-editor-panel", "data-panel-type": panelType },
            React.createElement("span", { style: { color: config[panelType].iconColor }, className: "ak-editor-panel__icon" }, this.getIcon()),
            React.createElement("div", { className: "ak-editor-panel__content" }, children)));
    };
    Panel.prototype.getIcon = function () {
        var panelType = this.props.panelType;
        // tslint:disable-next-line:variable-name
        var Icon = config[panelType].icon;
        return React.createElement(Icon, { label: "Panel " + panelType });
    };
    return Panel;
}(PureComponent));
export default Panel;
//# sourceMappingURL=panel.js.map