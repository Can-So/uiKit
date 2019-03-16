import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { getDisplayName } from '../utils';
export default function mapProps(mapping) {
  return function (DecoratedComponent // TODO: type this correctly
  ) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _inherits(MapProps, _Component);

      function MapProps() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, MapProps);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MapProps)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_this), "component", void 0);

        _defineProperty(_assertThisInitialized(_this), "blur", function () {
          if (_this.component && _this.component.blur) _this.component.blur();
        });

        _defineProperty(_assertThisInitialized(_this), "focus", function () {
          if (_this.component && _this.component.focus) _this.component.focus();
        });

        _defineProperty(_assertThisInitialized(_this), "setComponent", function (component) {
          _this.component = component;
        });

        return _this;
      }

      _createClass(MapProps, [{
        key: "render",
        value: function render() {
          var _this2 = this;

          var mapped = _objectSpread({}, this.props, Object.keys(mapping).reduce(function (acc, key) {
            return _objectSpread({}, acc, _defineProperty({}, key, mapping[key](_this2.props)));
          }, {}));

          return React.createElement(DecoratedComponent, _extends({
            ref: this.setComponent
          }, mapped));
        }
      }]);

      return MapProps;
    }(Component), _defineProperty(_class, "displayName", getDisplayName('mapProps', DecoratedComponent)), _defineProperty(_class, "DecoratedComponent", DecoratedComponent), _temp;
  };
}