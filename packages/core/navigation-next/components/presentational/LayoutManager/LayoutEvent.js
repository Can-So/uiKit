import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';

var noop = function noop() {};

var _React$createContext = React.createContext({
  emitItemDragStart: noop,
  emitItemDragEnd: noop
}),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

export { Consumer as LayoutEventEmitter };
export var LayoutEventListener =
/*#__PURE__*/
function (_Component) {
  _inherits(LayoutEventListener, _Component);

  function LayoutEventListener(props) {
    var _this;

    _classCallCheck(this, LayoutEventListener);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LayoutEventListener).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "emitters", void 0);

    _defineProperty(_assertThisInitialized(_this), "emitItemDragStart", function () {
      _this.props.onItemDragStart();
    });

    _defineProperty(_assertThisInitialized(_this), "emitItemDragEnd", function () {
      _this.props.onItemDragEnd();
    });

    _this.emitters = {
      emitItemDragStart: _this.emitItemDragStart,
      emitItemDragEnd: _this.emitItemDragEnd
    };
    return _this;
  }

  _createClass(LayoutEventListener, [{
    key: "render",
    value: function render() {
      return React.createElement(Provider, {
        value: this.emitters
      }, this.props.children);
    }
  }]);

  return LayoutEventListener;
}(Component);

_defineProperty(LayoutEventListener, "defaultProps", {
  onItemDragStart: noop,
  onItemDragEnd: noop
});