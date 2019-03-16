import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import RevealInner from '../styled/RevealInner';

var Reveal =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Reveal, _PureComponent);

  function Reveal(props, context) {
    var _this;

    _classCallCheck(this, Reveal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Reveal).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "onTransitionEnd", function () {
      if (_this.props.isOpen) {
        return;
      } // hide children after animation to close them


      _this.setState({
        shouldRenderChildren: false
      });
    });

    var isOpen = props.isOpen,
        shouldAnimate = props.shouldAnimate;
    _this.state = {
      isAnimatingInOnMount: isOpen && shouldAnimate,
      shouldRenderChildren: isOpen
    };
    return _this;
  }

  _createClass(Reveal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.state.isAnimatingInOnMount) {
        return;
      } // Forcing async to obtain clean render.
      // Needed to use a setTimeout to force this,
      // could not just rely on the requestAnimationFrame.


      setTimeout(function () {
        // optimised render
        requestAnimationFrame(function () {
          _this2.setState({
            isAnimatingInOnMount: false
          });
        });
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var isClosed = !this.props.isOpen;
      var willClose = !nextProps.isOpen;
      var willOpen = nextProps.isOpen;
      var shouldAnimate = nextProps.shouldAnimate; // ensure children are rendered before open animation occurs

      if (isClosed && willOpen) {
        this.setState({
          shouldRenderChildren: true
        });
      } // if closing with no animation: hide the children immediately


      if (willClose && !shouldAnimate) {
        this.setState({
          shouldRenderChildren: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          isOpen = _this$props.isOpen,
          openHeight = _this$props.openHeight,
          shouldAnimate = _this$props.shouldAnimate;
      var _this$state = this.state,
          isAnimatingInOnMount = _this$state.isAnimatingInOnMount,
          shouldRenderChildren = _this$state.shouldRenderChildren;
      return React.createElement(RevealInner, {
        isOpen: isAnimatingInOnMount ? false : isOpen,
        openHeight: openHeight,
        shouldAnimate: shouldAnimate,
        onTransitionEnd: this.onTransitionEnd
      }, shouldRenderChildren ? children : null);
    }
  }]);

  return Reveal;
}(PureComponent);

export { Reveal as default };