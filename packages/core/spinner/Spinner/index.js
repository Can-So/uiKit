import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import { SIZES_MAP, DEFAULT_SIZE } from './constants';
import Container from './styledContainer';
import Svg from './styledSvg';
var Outer = styled.div.withConfig({
  displayName: "Spinner__Outer",
  componentId: "sc-1ejgacn-0"
})(["\n  display: inline-block;\n  vertical-align: middle;\n"]);
Outer.displayName = 'Outer';

var Spinner =
/*#__PURE__*/
function (_Component) {
  _inherits(Spinner, _Component);

  function Spinner(props) {
    var _this;

    _classCallCheck(this, Spinner);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Spinner).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "transitionNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "enter", function () {
      var delay = _this.props.delay;

      if (delay) {
        _this.setState({
          phase: 'DELAY'
        });
      } else {
        _this.setState({
          phase: 'ENTER'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "idle", function () {
      _this.setState({
        phase: 'IDLE'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "exit", function () {
      _this.setState({
        phase: 'LEAVE'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "endListener", function (node, done) {
      var executeCallback = function executeCallback(event) {
        // ignore animation events on the glyph
        // $FlowFixMe - tagName does not exist in event.target
        if (event.target.tagName === 'svg') {
          return false;
        }

        if (_this.state.phase === 'DELAY') {
          _this.setState({
            phase: 'ENTER'
          });

          _this.endListener(node, done);
        } else {
          done();
        }

        return node && node.removeEventListener('animationend', executeCallback);
      };

      return node && node.addEventListener('animationend', executeCallback);
    });

    _defineProperty(_assertThisInitialized(_this), "validateSize", function () {
      var size = _this.props.size;
      var spinnerSize = SIZES_MAP[size] || size;
      return typeof spinnerSize === 'number' ? spinnerSize : DEFAULT_SIZE;
    });

    _this.state = {
      phase: ''
    };
    return _this;
  }

  _createClass(Spinner, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var phase = this.state.phase;
      var _this$props = this.props,
          delay = _this$props.delay,
          invertColor = _this$props.invertColor,
          isCompleting = _this$props.isCompleting;
      var size = this.validateSize();
      var strokeWidth = Math.round(size / 10);
      var strokeRadius = size / 2 - strokeWidth / 2;
      return React.createElement(Outer, null, React.createElement(Transition, {
        addEndListener: this.endListener,
        appear: true,
        in: !isCompleting,
        mountOnEnter: true,
        unmountOnExit: true,
        onEnter: this.enter,
        onEntered: this.idle,
        onExit: this.exit,
        onExited: function onExited() {
          return _this2.props.onComplete();
        },
        ref: function ref(node) {
          _this2.transitionNode = node;
        }
      }, React.createElement(Container, {
        delay: delay / 1000,
        phase: phase,
        size: size
      }, React.createElement(Svg, {
        focusable: "false",
        height: size,
        invertColor: invertColor,
        phase: phase,
        size: size,
        viewBox: "0 0 ".concat(size, " ").concat(size),
        width: size,
        xmlns: "http://www.w3.org/2000/svg"
      }, React.createElement("circle", {
        cx: size / 2,
        cy: size / 2,
        r: strokeRadius
      })))));
    }
  }]);

  return Spinner;
}(Component);

_defineProperty(Spinner, "defaultProps", {
  delay: 100,
  isCompleting: false,
  invertColor: false,
  onComplete: function onComplete() {},
  size: 'medium'
});

export { Spinner as default };