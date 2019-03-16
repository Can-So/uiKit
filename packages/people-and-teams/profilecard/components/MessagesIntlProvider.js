import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import { IntlProvider, injectIntl } from 'react-intl';
import { getMessagesForLocale } from '../internal/i18n-util';

var MessagesIntlProvider =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MessagesIntlProvider, _PureComponent);

  function MessagesIntlProvider() {
    _classCallCheck(this, MessagesIntlProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(MessagesIntlProvider).apply(this, arguments));
  }

  _createClass(MessagesIntlProvider, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          intl = _this$props.intl,
          children = _this$props.children;
      return React.createElement(IntlProvider, {
        messages: getMessagesForLocale(intl.locale)
      }, children);
    }
  }]);

  return MessagesIntlProvider;
}(PureComponent);

export default injectIntl(MessagesIntlProvider);