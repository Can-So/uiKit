import * as tslib_1 from "tslib";
import * as React from 'react';
import { IntlProvider, injectIntl } from 'react-intl';
import { getMessagesForLocale } from '../util/i18n-util';
var MessagesIntlProvider = /** @class */ (function (_super) {
    tslib_1.__extends(MessagesIntlProvider, _super);
    function MessagesIntlProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessagesIntlProvider.prototype.render = function () {
        var _a = this.props, intl = _a.intl, children = _a.children;
        return (React.createElement(IntlProvider, { messages: getMessagesForLocale(intl.locale) }, children));
    };
    return MessagesIntlProvider;
}(React.Component));
export default injectIntl(MessagesIntlProvider);
//# sourceMappingURL=MessagesIntlProvider.js.map