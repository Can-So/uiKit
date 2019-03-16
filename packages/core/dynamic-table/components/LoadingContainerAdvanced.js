import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Spinner from '@findable/spinner';
import { LARGE, LOADING_CONTENTS_OPACITY } from '../internal/constants';
import { Container, SpinnerBackdrop, SpinnerContainer } from '../styled/LoadingContainerAdvanced';

var LoadingContainerAdvanced =
/*#__PURE__*/
function (_Component) {
  _inherits(LoadingContainerAdvanced, _Component);

  function LoadingContainerAdvanced() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoadingContainerAdvanced);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoadingContainerAdvanced)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "children", void 0);

    _defineProperty(_assertThisInitialized(_this), "spinner", void 0);

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      if (_this.props.isLoading && _this.hasTargetNode()) {
        _this.attachListeners();

        _this.updateTargetAppearance();

        _this.updateSpinnerPosition();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps) {
      if (!nextProps.isLoading || !_this.hasTargetNode(nextProps)) {
        _this.detachListeners();
      } else if (!_this.props.isLoading) {
        _this.attachListeners();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      if (_this.hasTargetNode()) {
        _this.updateTargetAppearance();

        if (_this.props.isLoading) {
          _this.updateSpinnerPosition();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      _this.detachListeners();
    });

    _defineProperty(_assertThisInitialized(_this), "getTargetNode", function () {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      var targetRef = nextProps.targetRef; // targetRef prop may be defined but it is not guaranteed it returns an element

      var targetElement = targetRef ? targetRef() : _this.children;
      var targetNode = findDOMNode(targetElement); // eslint-disable-line react/no-find-dom-node

      return targetNode;
    });

    _defineProperty(_assertThisInitialized(_this), "getThisNode", function () {
      return findDOMNode(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "getSpinnerNode", function () {
      return findDOMNode(_this.spinner);
    });

    _defineProperty(_assertThisInitialized(_this), "hasTargetNode", function (nextProps) {
      return !!_this.getTargetNode(nextProps);
    });

    _defineProperty(_assertThisInitialized(_this), "isVerticallyVisible", function (elementRect, viewportHeight) {
      var top = elementRect.top,
          bottom = elementRect.bottom;

      if (bottom <= 0) {
        return false;
      }

      return top < viewportHeight;
    });

    _defineProperty(_assertThisInitialized(_this), "isFullyVerticallyVisible", function (elementRect, viewportHeight) {
      var top = elementRect.top,
          bottom = elementRect.bottom;
      return top >= 0 && bottom <= viewportHeight;
    });

    _defineProperty(_assertThisInitialized(_this), "handleResize", function () {
      _this.updateSpinnerPosition();
    });

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function () {
      _this.updateSpinnerPosition();
    });

    _defineProperty(_assertThisInitialized(_this), "translateSpinner", function (spinnerNode, transformY, isFixed) {
      // $FlowFixMe - style is not Element
      spinnerNode.style.position = isFixed ? 'fixed' : ''; // eslint-disable-line no-param-reassign
      // $FlowFixMe - style is not Element

      spinnerNode.style.transform = // eslint-disable-line no-param-reassign
      transformY !== 0 ? "translate3d(0, ".concat(transformY, "px, 0)") : '';
    });

    _defineProperty(_assertThisInitialized(_this), "updateTargetAppearance", function () {
      var targetNode = _this.getTargetNode();

      var _this$props = _this.props,
          isLoading = _this$props.isLoading,
          contentsOpacity = _this$props.contentsOpacity;

      if (targetNode && // $FlowFixMe - style is not Element
      targetNode.style && _typeof(targetNode.style) === 'object') {
        targetNode.style.pointerEvents = isLoading ? 'none' : ''; // eslint-disable-line no-param-reassign

        targetNode.style.opacity = isLoading ? contentsOpacity : ''; // eslint-disable-line no-param-reassign
      }
    });

    return _this;
  }

  _createClass(LoadingContainerAdvanced, [{
    key: "attachListeners",
    value: function attachListeners() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: "detachListeners",
    value: function detachListeners() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
    }
  }, {
    key: "updateSpinnerPosition",
    value: function updateSpinnerPosition() {
      var viewportHeight = window.innerHeight;
      var targetNode = this.getTargetNode();
      var spinnerNode = this.getSpinnerNode();
      if (!targetNode || !spinnerNode) return; // $FlowFixMe - getBoundingClientRect() is not found

      var targetRect = targetNode.getBoundingClientRect(); // $FlowFixMe - getBoundingClientRect() is not found

      var spinnerRect = spinnerNode.getBoundingClientRect();
      var spinnerHeight = spinnerRect.height;
      var isInViewport = this.isVerticallyVisible(targetRect, viewportHeight);
      var top = targetRect.top,
          bottom = targetRect.bottom,
          height = targetRect.height;

      if (isInViewport) {
        // The spinner may follow the element only if there is enough space:
        // Let's say the element can fit at least three spinners (vertically)
        var canFollow = height >= spinnerHeight * 3;

        if (canFollow && !this.isFullyVerticallyVisible(targetRect, viewportHeight)) {
          if (top >= 0) {
            // Only the head of the element is visible
            var viewportSpaceTakenByElement = viewportHeight - top;
            var diff = viewportSpaceTakenByElement / 2 + top - spinnerHeight / 2;
            var y = viewportSpaceTakenByElement < spinnerHeight * 3 ? top + spinnerHeight : diff;
            this.translateSpinner(spinnerNode, y, true);
          } else if (top < 0 && bottom > viewportHeight) {
            // The element takes all viewport, nor its head nor tail are visible
            var _y = viewportHeight / 2 - spinnerHeight / 2;

            this.translateSpinner(spinnerNode, _y, true);
          } else {
            // Only the tail of the element is visible
            var _diff = bottom / 2 - spinnerHeight / 2;

            var _y2 = _diff < spinnerHeight ? _diff - (spinnerHeight - _diff) : _diff;

            this.translateSpinner(spinnerNode, _y2, true);
          }

          return;
        }
      } else {
        // If both the element and the spinner are off screen - quit
        // eslint-disable-next-line no-lonely-if
        if (!this.isVerticallyVisible(spinnerRect, viewportHeight)) {
          return;
        }
      } // Three options here:
      // 1) the element is fully visible
      // 2) the element is too small for the spinner to follow
      // 3) the spinner might still be visible while the element isn't


      var thisNode = this.getThisNode();

      if (thisNode && typeof thisNode.getBoundingClientRect === 'function') {
        var thisTop = thisNode.getBoundingClientRect().top;

        var _y3 = (top - thisTop) / 2;

        this.translateSpinner(spinnerNode, _y3, false);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          isLoading = _this$props2.isLoading,
          spinnerSize = _this$props2.spinnerSize;
      return React.createElement(Container, null, React.cloneElement(children, {
        ref: function ref(el) {
          _this2.children = el;
        }
      }), isLoading && React.createElement(SpinnerBackdrop, null, React.createElement(SpinnerContainer, {
        ref: function ref(el) {
          _this2.spinner = el;
        }
      }, React.createElement(Spinner, {
        size: spinnerSize
      }))));
    }
  }]);

  return LoadingContainerAdvanced;
}(Component);

_defineProperty(LoadingContainerAdvanced, "defaultProps", {
  isLoading: true,
  spinnerSize: LARGE,
  contentsOpacity: LOADING_CONTENTS_OPACITY
});

export { LoadingContainerAdvanced as default };