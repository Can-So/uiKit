import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { layers } from '@atlaskit/theme';
import ScrollLock from 'react-scrolllock';
import { Popper, Manager, Reference } from '@atlaskit/popper';

/**
 * This component renders layered content with fixed positioning.
 * Scroll is locked outside the layer to prevent the layered content from detaching from the
 * container ref.
 *
 * TODO: Fix a bug in layer/popper.js where auto flip isn't occuring when it should because of vertical scroll distance incorrectly
 * making the library think the component is further up the page than it is.
 */
var FixedLayer =
/*#__PURE__*/
function (_Component) {
  _inherits(FixedLayer, _Component);

  function FixedLayer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FixedLayer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FixedLayer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "scheduleUpdate", function () {});

    return _this;
  }

  _createClass(FixedLayer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.inputValue !== this.props.inputValue) {
        this.scheduleUpdate();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          containerRef = _this$props.containerRef,
          content = _this$props.content; // Wait for containerRef callback to cause a re-render

      if (!containerRef) return React.createElement("div", null);
      var containerRect = containerRef.getBoundingClientRect();
      return (
        /* Need to wrap layer in a fixed position div so that it will render its content as fixed
         * We need to set the intial top value to where the container is and zIndex so that it still
         * applies since we're creating a new stacking context. */
        React.createElement(Manager, null, React.createElement(ScrollLock, null), React.createElement(Reference, null, function (_ref) {
          var ref = _ref.ref;
          return React.createElement("div", {
            ref: ref,
            "data-layer-child": true,
            style: {
              position: 'absolute',
              top: 0,
              height: containerRect.height,
              width: containerRect.width,
              background: 'transparent'
            }
          });
        }), React.createElement(Popper, null, function (_ref2) {
          var ref = _ref2.ref,
              style = _ref2.style,
              placement = _ref2.placement,
              scheduleUpdate = _ref2.scheduleUpdate;
          _this2.scheduleUpdate = scheduleUpdate;
          return React.createElement("div", {
            ref: ref,
            style: _objectSpread({}, style, {
              zIndex: layers.dialog()
            }),
            placement: placement
          }, content);
        }))
      );
    }
  }]);

  return FixedLayer;
}(Component);

export { FixedLayer as default };