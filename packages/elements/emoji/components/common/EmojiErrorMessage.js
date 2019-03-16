import * as tslib_1 from "tslib";
import ErrorIcon from '@atlaskit/icon/glyph/error';
import * as React from 'react';
import { PureComponent } from 'react';
import Tooltip from '@atlaskit/tooltip';
var EmojiErrorMessage = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiErrorMessage, _super);
    function EmojiErrorMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiErrorMessage.prototype.renderWithTooltip = function () {
        return (React.createElement("div", { className: this.props.className },
            React.createElement(Tooltip, { content: this.props.message, position: "top" },
                React.createElement(ErrorIcon, { label: "Error", size: "medium" }))));
    };
    EmojiErrorMessage.prototype.renderInline = function () {
        return (React.createElement("div", { className: this.props.className },
            React.createElement(ErrorIcon, { label: "Error", size: "small" }),
            " ",
            this.props.message));
    };
    EmojiErrorMessage.prototype.render = function () {
        return this.props.tooltip ? this.renderWithTooltip() : this.renderInline();
    };
    return EmojiErrorMessage;
}(PureComponent));
export default EmojiErrorMessage;
//# sourceMappingURL=EmojiErrorMessage.js.map