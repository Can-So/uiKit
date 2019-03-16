import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Children, Component } from 'react';
import PropTypes from 'prop-types';
var ContextTypes = {
  getAtlaskitAnalyticsContext: PropTypes.func
};

var AnalyticsContext =
/*#__PURE__*/
function (_Component) {
  _inherits(AnalyticsContext, _Component);

  function AnalyticsContext() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnalyticsContext);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnalyticsContext)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getChildContext", function () {
      return {
        getAtlaskitAnalyticsContext: _this.getAnalyticsContext
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getAnalyticsContext", function () {
      var data = _this.props.data;
      var getAtlaskitAnalyticsContext = _this.context.getAtlaskitAnalyticsContext;
      var ancestorData = typeof getAtlaskitAnalyticsContext === 'function' && getAtlaskitAnalyticsContext() || [];
      return [].concat(_toConsumableArray(ancestorData), [data]);
    });

    return _this;
  }

  _createClass(AnalyticsContext, [{
    key: "render",
    value: function render() {
      return Children.only(this.props.children);
    }
  }]);

  return AnalyticsContext;
}(Component);

_defineProperty(AnalyticsContext, "contextTypes", ContextTypes);

_defineProperty(AnalyticsContext, "childContextTypes", ContextTypes);

export { AnalyticsContext as default };