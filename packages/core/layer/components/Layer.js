import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import styled from 'styled-components';
import rafSchedule from 'raf-schd';
import Popper from 'popper.js';
import ScrollBlock from './internal/ScrollBlock';
import { getFlipBehavior, positionPropToPopperPosition } from './internal/helpers';
import ContentContainer from '../styledContentContainer';
// We create a dummy target when making the menu fixed so that we can force popper.js to use fixed positioning
// without affecting child layout of the actual target since children of fixed position elements can't use percentage
// heights/widths.
var FixedTarget = styled.div.withConfig({
  displayName: "Layer__FixedTarget",
  componentId: "qunuuz-0"
})(["\n  ", ";\n"], function (_ref) {
  var fixedOffset = _ref.fixedOffset,
      targetRef = _ref.targetRef;

  if (fixedOffset && targetRef) {
    var actualTarget = targetRef.firstChild;
    var rect = actualTarget.getBoundingClientRect();
    return "\n        position: fixed;\n        top: ".concat(fixedOffset.top, "px;\n        left: ").concat(fixedOffset.left, "px;\n        height: ").concat(rect.height, "px;\n        width: ").concat(rect.width, "px;\n        z-index: -1;\n      ");
  }

  return 'display: none;';
});

var Layer =
/*#__PURE__*/
function (_Component) {
  _inherits(Layer, _Component);

  // TODO: get the value of zIndex from theme, not using it now as it is not
  // working with extract-react-types
  function Layer(props) {
    var _this;

    _classCallCheck(this, Layer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Layer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "popper", void 0);

    _defineProperty(_assertThisInitialized(_this), "targetRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "contentRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "fixedRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "extractStyles", function (state) {
      if (state) {
        var popperHeight = state.offsets.popper.height;
        var left = Math.round(state.offsets.popper.left); // The offset position is sometimes an object and sometimes just a string...

        var cssPosition = _typeof(state.offsets.popper.position) === 'object' ? state.offsets.popper.position.position : state.offsets.popper.position;

        var top = _this.fixPositionTopUnderflow(state.offsets.popper.top, cssPosition);

        var originalHeight = _this.state.originalHeight || popperHeight;

        var maxHeight = _this.calculateMaxHeight(originalHeight, popperHeight, top, cssPosition);

        _this.setState({
          // position: fixed or absolute
          cssPosition: cssPosition,
          hasExtractedStyles: true,
          transform: "translate3d(".concat(left, "px, ").concat(top, "px, 0px)"),
          // state.flipped is either true or undefined
          flipped: !!state.flipped,
          actualPosition: state.position,
          originalPosition: state.originalPosition,
          originalHeight: originalHeight,
          maxHeight: maxHeight
        });
      }
    });

    _this.state = {
      hasExtractedStyles: false,
      position: null,
      transform: null,
      flipped: false,
      actualPosition: null,
      // We set these default offsets to prevent a flash of popper content in the wrong position
      // which can cause incorrect height calculations. Popper will calculate these values
      offsets: {
        popper: {
          left: -9999,
          top: -9999
        }
      },
      originalPosition: null,
      // fix Safari parent width: https://product-fabric.atlassian.net/browse/ED-1784
      cssPosition: 'absolute',
      originalHeight: null,
      maxHeight: null,
      fixedOffset: null
    };
    _this.extractStyles = rafSchedule(_this.extractStyles.bind(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Layer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.applyPopper(this.props);
      this.calculateFixedOffset(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.applyPopper(nextProps);
      this.calculateFixedOffset(nextProps);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props = this.props,
          onFlippedChange = _this$props.onFlippedChange,
          onPositioned = _this$props.onPositioned;
      var _this$state = this.state,
          flipped = _this$state.flipped,
          actualPosition = _this$state.actualPosition,
          originalPosition = _this$state.originalPosition,
          hasExtractedStyles = _this$state.hasExtractedStyles;

      if (prevState.flipped !== flipped && onFlippedChange) {
        onFlippedChange({
          flipped: flipped,
          actualPosition: actualPosition,
          originalPosition: originalPosition
        });
      } // This flag is set the first time the position is calculated from Popper and applied to the content


      if (!prevState.hasExtractedStyles && hasExtractedStyles && onPositioned) {
        onPositioned();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.extractStyles.cancel();

      if (this.popper) {
        this.popper.destroy();
      }
    }
    /* Calculate the max height of the popper if it's height is greater than the viewport to prevent
     * the bottom of the popper not being viewable.
     * Only works if the popper uses viewport as the boundary and has a fixed position ancestor.
     */

  }, {
    key: "calculateMaxHeight",
    value: function calculateMaxHeight(originalHeight, currentHeight, positionTop, cssPosition) {
      var DocumentElementClientHeight = 0;

      if (document.documentElement) {
        DocumentElementClientHeight = document.documentElement.clientHeight;
      }

      if (cssPosition !== 'fixed' || this.props.boundariesElement !== 'viewport') {
        return null;
      }

      var viewportHeight = Math.max(DocumentElementClientHeight, window.innerHeight || 0);
      return viewportHeight < originalHeight && currentHeight + positionTop >= viewportHeight - 50 ? // allow some spacing either side of viewport height
      viewportHeight - 12 : null;
    }
    /* Popper may return either a fixed or absolute position which would be applied to the
     * content style. In order to overcome clipping issues for overflow containing blocks when
     * the position is absolute, we create a fixed position wrapper.
     */

  }, {
    key: "calculateFixedOffset",
    value: function calculateFixedOffset(props) {
      var isAlwaysFixed = props.isAlwaysFixed;

      if (isAlwaysFixed && this.targetRef) {
        var actualTarget = this.targetRef.firstChild;
        this.setState({
          fixedOffset: {
            top: actualTarget.getBoundingClientRect().top,
            left: actualTarget.getBoundingClientRect().left
          }
        });
      } else if (!isAlwaysFixed && this.state.fixedOffset !== null) {
        this.setState({
          fixedOffset: null
        });
      }
    }
    /* Clamp fixed position to the window for fixed position poppers that flow off the top of the
     * window.
     * A fixed position popper is a popper who has an ancestor with position: fixed.
     *
     * It is too difficult to fix this for non-fixed position poppers without re-implementing popper's
     * offset functionality or fixing the issue upstream.
     */
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "fixPositionTopUnderflow",
    value: function fixPositionTopUnderflow(popperTop, cssPosition) {
      return popperTop >= 0 || cssPosition !== 'fixed' ? Math.round(popperTop) : 0;
    }
  }, {
    key: "applyPopper",
    value: function applyPopper(props) {
      if (!this.fixedRef || !this.targetRef || !this.contentRef) {
        return;
      }

      if (this.popper) {
        this.popper.destroy();
      } // "new Popper(...)" operation is very expensive when called on virtual DOM.
      // This condition reduces the number of calls so we can run our tests faster
      // (time was reduced from 100s to 13s).


      if (!props.content) {
        return;
      } // we wrap our target in a div so that we can safely get a reference to it, but we pass the
      // actual target to popper


      var actualTarget = props.isAlwaysFixed ? this.fixedRef : this.targetRef.firstChild;
      var popperOpts = {
        placement: positionPropToPopperPosition(props.position),
        onCreate: this.extractStyles,
        onUpdate: this.extractStyles,
        modifiers: {
          applyStyle: {
            enabled: false
          },
          hide: {
            enabled: false
          },
          offset: {
            enabled: true,
            offset: this.props.offset
          },
          flip: {
            enabled: !!this.props.autoFlip,
            flipVariations: true,
            boundariesElement: this.props.boundariesElement,
            padding: 0 // leave 0 pixels between popper and the boundariesElement

          },
          preventOverflow: {
            enabled: !!this.props.autoFlip,
            escapeWithReference: !(this.props.boundariesElement === 'scrollParent')
          }
        }
      };
      var flipBehavior = getFlipBehavior(props);

      if (flipBehavior) {
        popperOpts.modifiers.flip.behavior = flipBehavior;
      }

      this.popper = new Popper(actualTarget, this.contentRef, popperOpts);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          zIndex = _this$props2.zIndex,
          lockScroll = _this$props2.lockScroll;
      var _this$state2 = this.state,
          cssPosition = _this$state2.cssPosition,
          transform = _this$state2.transform,
          hasExtractedStyles = _this$state2.hasExtractedStyles,
          maxHeight = _this$state2.maxHeight,
          fixedOffset = _this$state2.fixedOffset;
      var opacity = hasExtractedStyles ? {} : {
        opacity: 0
      };
      return React.createElement("div", null, React.createElement("div", {
        ref: function ref(_ref2) {
          _this2.targetRef = _ref2;
        }
      }, this.props.children), React.createElement(FixedTarget, {
        targetRef: this.targetRef,
        fixedOffset: fixedOffset
      }, React.createElement("div", {
        style: {
          height: '100%',
          width: '100%'
        },
        ref: function ref(_ref3) {
          _this2.fixedRef = _ref3;
        }
      })), lockScroll && React.createElement(ScrollBlock, null), React.createElement(ContentContainer, {
        maxHeight: maxHeight
      }, React.createElement("div", {
        ref: function ref(_ref4) {
          _this2.contentRef = _ref4;
        },
        style: _objectSpread({
          top: 0,
          left: 0,
          position: cssPosition,
          transform: transform,
          zIndex: zIndex
        }, opacity)
      }, this.props.content)));
    }
  }]);

  return Layer;
}(Component);
/* eslint-enable react/no-unused-prop-types */


_defineProperty(Layer, "defaultProps", {
  autoFlip: true,
  boundariesElement: 'viewport',
  children: null,
  content: null,
  offset: '0 0',
  onFlippedChange: function onFlippedChange() {},
  position: 'right middle',
  zIndex: 400,
  lockScroll: false,
  isAlwaysFixed: false,
  onPositioned: function onPositioned() {}
});

export { Layer as default };