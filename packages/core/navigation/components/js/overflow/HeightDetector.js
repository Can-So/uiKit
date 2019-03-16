import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import SizeDetector from '@findable/size-detector';
import rafSchd from 'raf-schd';

var HeightDetector =
/*#__PURE__*/
function (_Component) {
  _inherits(HeightDetector, _Component);

  function HeightDetector() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HeightDetector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HeightDetector)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "notifyHeight", rafSchd(function (height) {
      _this.props.onHeightChange(height);
    }));

    return _this;
  }

  _createClass(HeightDetector, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(SizeDetector, null, function (_ref) {
        var height = _ref.height;

        if (height === null) {
          return null;
        }

        _this2.notifyHeight(height);

        return _this2.props.children;
      });
    }
  }]);

  return HeightDetector;
}(Component);

export { HeightDetector as default };