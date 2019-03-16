import * as tslib_1 from "tslib";
import * as React from 'react';
import { IntlProvider, injectIntl } from 'react-intl';
import * as untypedI18n from '../i18n';
var i18n = untypedI18n;
var getCodesFromLocale = function (locale) {
    var _a = tslib_1.__read(/([a-z]*)[_-]?([A-Z]*)/i.exec(locale || ''), 3), language = _a[1], country = _a[2];
    return [language.toLowerCase(), country.toUpperCase()];
};
var SwitcherIntlProdiver = function (_a) {
    var children = _a.children, intl = _a.intl;
    var _b = tslib_1.__read(getCodesFromLocale(intl.locale.toString()), 2), language = _b[0], country = _b[1];
    var messages = i18n[language + "_" + country] || i18n[language] || i18n.en;
    return React.createElement(IntlProvider, { messages: messages }, children);
};
export default injectIntl(SwitcherIntlProdiver);
//# sourceMappingURL=intl-provider.js.map