import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Component } from 'react';

var CohortTracker =
/*#__PURE__*/
function (_Component) {
  _inherits(CohortTracker, _Component);

  function CohortTracker() {
    _classCallCheck(this, CohortTracker);

    return _possibleConstructorReturn(this, _getPrototypeOf(CohortTracker).apply(this, arguments));
  }

  _createClass(CohortTracker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          exposureDetails = _this$props.exposureDetails,
          onExposure = _this$props.onExposure;
      onExposure(exposureDetails);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return CohortTracker;
}(Component);

_defineProperty(CohortTracker, "displayName", 'CohortTracker');

export { CohortTracker as default };