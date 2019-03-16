import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import IconError from '@atlaskit/icon/glyph/cross-circle';
import AkButton from '@atlaskit/button';
import { ErrorWrapper, ErrorTitle, ErrorText } from '../styled/Error';

var ErrorMessage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ErrorMessage, _PureComponent);

  function ErrorMessage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ErrorMessage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ErrorMessage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderNotFound", function () {
      return React.createElement(ErrorTitle, null, "The user is no longer available for the site");
    });

    _defineProperty(_assertThisInitialized(_this), "renderDefault", function () {
      return React.createElement(ErrorTitle, null, "Oops, looks like we\u2019re having issues", React.createElement("br", null), _this.props.reload ? React.createElement(ErrorText, null, "Try again and we\u2019ll give it another shot") : null);
    });

    _defineProperty(_assertThisInitialized(_this), "renderRetryButton", function () {
      return _this.props.reload ? React.createElement(AkButton, {
        appearance: "link",
        compact: true,
        onClick: _this.props.reload
      }, "Try again") : null;
    });

    return _this;
  }

  _createClass(ErrorMessage, [{
    key: "renderErrorContent",
    value: function renderErrorContent() {
      var errorType = this.props.errorType || {
        reason: 'default'
      };

      switch (errorType.reason) {
        case 'NotFound':
          return this.renderNotFound();

        default:
          return this.renderDefault();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ErrorWrapper, null, React.createElement(IconError, {
        label: "icon error",
        size: "xlarge"
      }), this.renderErrorContent(), this.renderRetryButton());
    }
  }]);

  return ErrorMessage;
}(PureComponent);

_defineProperty(ErrorMessage, "defaultProps", {
  errorType: {
    reason: 'default'
  }
});

export { ErrorMessage as default };