import * as tslib_1 from "tslib";
/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
// Create the IntlProvider to retrieve context for wrapping around.
var intlProvider = new IntlProvider({ locale: 'en' });
var intl = intlProvider.getChildContext().intl;
/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl: intl });
}
export function shallowWithIntl(node, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.context, context = _b === void 0 ? {} : _b, additionalOptions = tslib_1.__rest(_a, ["context"]);
    if (typeof node.type !== 'string' && node.type.name === 'InjectIntl') {
        var unwrappedType = node.type.WrappedComponent;
        node = React.createElement(unwrappedType, node.props);
    }
    return shallow(nodeWithIntlProp(node), tslib_1.__assign({ context: tslib_1.__assign({}, context, { intl: intl }) }, additionalOptions));
}
export function mountWithIntl(node, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.context, context = _b === void 0 ? {} : _b, _c = _a.childContextTypes, childContextTypes = _c === void 0 ? {} : _c, additionalOptions = tslib_1.__rest(_a, ["context", "childContextTypes"]);
    if (typeof node.type !== 'string' && node.type.name === 'InjectIntl') {
        var unwrappedType = node.type.WrappedComponent;
        node = React.createElement(unwrappedType, node.props);
    }
    return mount(nodeWithIntlProp(node), tslib_1.__assign({ context: tslib_1.__assign({}, context, { intl: intl }), childContextTypes: tslib_1.__assign({}, childContextTypes, { intl: intlShape }) }, additionalOptions));
}
//# sourceMappingURL=enzyme.js.map