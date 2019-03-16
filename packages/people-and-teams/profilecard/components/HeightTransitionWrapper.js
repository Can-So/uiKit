import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { fontFamily, fontSize, borderRadius, gridSize, math, elevation } from '@findable/theme';
import { bgColor } from '../styled/constants';
var CardAnimationWrapper = styled.div.withConfig({
  displayName: "HeightTransitionWrapper__CardAnimationWrapper",
  componentId: "z7e07w-0"
})(["\n  background-color: ", ";\n  border-radius: ", "px;\n  ", ";\n  cursor: default;\n  font-family: ", ";\n  font-size: ", "px;\n  overflow: hidden;\n  position: relative;\n  transition: height 0.25s ease;\n  width: ", "px;\n"], bgColor, borderRadius, function (props) {
  return props.customElevation && elevation[props.customElevation] ? elevation[props.customElevation] : elevation.e200;
}, fontFamily, fontSize, math.multiply(gridSize, 45));

var HeightTransitionWrapper =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(HeightTransitionWrapper, _PureComponent);

  function HeightTransitionWrapper() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HeightTransitionWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HeightTransitionWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "ref", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      height: 'auto'
    });

    return _this;
  }

  _createClass(HeightTransitionWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateRefHeight();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateRefHeight();
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "preventDefault",
    value: function preventDefault(event) {
      event.persist();
      event.preventDefault();
    }
  }, {
    key: "updateRefHeight",
    value: function updateRefHeight() {
      this.setState({
        height: this.ref && this.ref.children.length ? this.ref.children[0].offsetHeight : 'auto'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var customElevation = this.props.customElevation;
      var inlineHeight = {
        height: this.state.height
      };
      return React.createElement(CardAnimationWrapper, {
        customElevation: customElevation,
        style: inlineHeight,
        innerRef: function innerRef(ref) {
          _this2.ref = ref;
        },
        onClick: this.preventDefault
      }, this.props.children);
    }
  }]);

  return HeightTransitionWrapper;
}(PureComponent);

export { HeightTransitionWrapper as default };