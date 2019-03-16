import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import styled from 'styled-components';
var positionStyles = {
  'top left': {
    left: 0,
    bottom: 0
  },
  'top right': {
    right: 0,
    bottom: 0
  },
  'right top': {
    left: 0,
    top: 0
  },
  'right bottom': {
    left: 0,
    bottom: 0
  },
  'bottom right': {
    right: 0,
    top: 0
  },
  'bottom left': {
    left: 0,
    top: 0
  },
  'left bottom': {
    right: 0,
    bottom: 0
  },
  'left top': {
    right: 0,
    top: 0
  }
};
var ContainerRelative = styled.div.withConfig({
  displayName: "PositionWrapper__ContainerRelative",
  componentId: "sc-1tzqpdz-0"
})(["\n  position: relative;\n"]);
var ContainerDirection = styled.div.withConfig({
  displayName: "PositionWrapper__ContainerDirection",
  componentId: "sc-1tzqpdz-1"
})(["\n  position: absolute;\n  ", ";\n"], function (props) {
  return positionStyles[props.position];
});

var DirectionWrapper =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DirectionWrapper, _PureComponent);

  function DirectionWrapper() {
    _classCallCheck(this, DirectionWrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(DirectionWrapper).apply(this, arguments));
  }

  _createClass(DirectionWrapper, [{
    key: "render",
    value: function render() {
      return React.createElement(ContainerRelative, null, React.createElement(ContainerDirection, {
        position: this.props.position
      }, this.props.children));
    }
  }]);

  return DirectionWrapper;
}(PureComponent);

_defineProperty(DirectionWrapper, "defaultProps", {
  position: 'top left'
});

export { DirectionWrapper as default };