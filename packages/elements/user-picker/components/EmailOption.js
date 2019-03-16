import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { AddOptionAvatar } from './AddOptionAvatar';
import { AvatarItemOption } from './AvatarItemOption';
import { messages } from './i18n';
var EmailOption = /** @class */ (function (_super) {
    tslib_1.__extends(EmailOption, _super);
    function EmailOption() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderOption = function (label) { return (React.createElement(AvatarItemOption, { avatar: React.createElement(AddOptionAvatar, { label: label }), primaryText: _this.props.email.id, secondaryText: label })); };
        return _this;
    }
    EmailOption.prototype.render = function () {
        var _this = this;
        var label = this.props.label;
        return label ? (this.renderOption(label)) : (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.addEmail), function (label) { return _this.renderOption(label); }));
    };
    return EmailOption;
}(React.PureComponent));
export { EmailOption };
//# sourceMappingURL=EmailOption.js.map