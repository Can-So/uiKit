import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import Layer from '@atlaskit/layer';
import Spinner from '@atlaskit/spinner';
import { ThemeProvider } from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import { name as packageName, version as packageVersion } from '../version.json';
import Wrapper, { Content, SpinnerContainer, Trigger } from '../styled/Droplist';
import itemTheme from '../theme/item-theme';
var halfFocusRing = 1;
var dropOffset = "0 ".concat(gridSize(), "px");

var Droplist =
/*#__PURE__*/
function (_Component) {
  _inherits(Droplist, _Component);

  function Droplist() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Droplist);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Droplist)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.setContentWidth(); // We use a captured event here to avoid a radio or checkbox dropdown item firing its
      // click event first, which would cause a re-render of the element and prevent Droplist
      // from detecting the actual source of this original click event.


      document.addEventListener('click', _this.handleClickOutside, true);
      document.addEventListener('keydown', _this.handleEsc);
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      if (_this.props.isOpen) {
        _this.setContentWidth();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      document.removeEventListener('click', _this.handleClickOutside, true);
      document.removeEventListener('keydown', _this.handleEsc);
    });

    _defineProperty(_assertThisInitialized(_this), "setContentWidth", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          dropContentRef = _assertThisInitialize.dropContentRef,
          triggerRef = _assertThisInitialize.triggerRef;

      var shouldFitContainer = _this.props.shouldFitContainer; // We need to manually set the content width to match the trigger width
      // if props.shouldFitContainer is true

      if (shouldFitContainer && dropContentRef && triggerRef) {
        dropContentRef.style.width = "".concat(triggerRef.offsetWidth - halfFocusRing * 2, "px");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "dropContentRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "triggerRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleEsc", function (event) {
      if ((event.key === 'Escape' || event.key === 'Esc') && _this.props.isOpen) {
        _this.close(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      if (_this.props.isOpen) {
        // $FlowFixMe - flow is lost and if not an instance of Node
        if (event.target instanceof Node) {
          // Rather than check for the target within the entire Droplist, we specify the trigger/content.
          // This aids with future effort in scroll-locking Droplist when isMenuFixed is enabled; the scroll
          // blanket which stretches to the viewport should not stop 'close' from being triggered.
          var withinTrigger = _this.triggerRef && _this.triggerRef.contains(event.target);

          var withinContent = _this.dropContentRef && _this.dropContentRef.contains(event.target);

          if (!withinTrigger && !withinContent) {
            _this.close(event);
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "close", function (event) {
      if (_this.props.onOpenChange) {
        _this.props.onOpenChange({
          isOpen: false,
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleContentRef", function (ref) {
      _this.dropContentRef = ref; // If the dropdown has just been opened, we focus on the containing element so the
      // user can tab to the first dropdown item. We will only receive this ref if isOpen
      // is true or null, so no need to check for truthiness here.

      if (ref) {
        ref.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleTriggerRef", function (ref) {
      _this.triggerRef = ref;
    });

    return _this;
  }

  _createClass(Droplist, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        shouldAllowMultilineItems: this.props.shouldAllowMultilineItems
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          boundariesElement = _this$props.boundariesElement,
          children = _this$props.children,
          isLoading = _this$props.isLoading,
          isOpen = _this$props.isOpen,
          maxHeight = _this$props.maxHeight,
          onClick = _this$props.onClick,
          onKeyDown = _this$props.onKeyDown,
          position = _this$props.position,
          isMenuFixed = _this$props.isMenuFixed,
          shouldFitContainer = _this$props.shouldFitContainer,
          shouldFlip = _this$props.shouldFlip,
          trigger = _this$props.trigger,
          onPositioned = _this$props.onPositioned;
      var layerContent = isOpen ? React.createElement(Content, {
        "data-role": "droplistContent",
        isTall: appearance === 'tall',
        innerRef: this.handleContentRef,
        maxHeight: maxHeight
      }, isLoading ? React.createElement(SpinnerContainer, null, React.createElement(Spinner, {
        size: "small"
      })) : React.createElement(ThemeProvider, {
        theme: itemTheme
      }, React.createElement("div", null, children))) : null;
      return React.createElement(Wrapper, {
        fit: shouldFitContainer,
        onClick: onClick,
        onKeyDown: onKeyDown
      }, React.createElement(Layer, {
        autoFlip: shouldFlip,
        boundariesElement: boundariesElement,
        content: layerContent,
        offset: dropOffset // $FlowFixMe - Cannot create `Layer` element because in property `position
        ,
        position: position,
        isAlwaysFixed: isOpen && isMenuFixed,
        onPositioned: onPositioned
      }, React.createElement(Trigger, {
        fit: shouldFitContainer,
        innerRef: this.handleTriggerRef
      }, trigger)));
    }
  }]);

  return Droplist;
}(Component);

_defineProperty(Droplist, "defaultProps", {
  appearance: 'default',
  boundariesElement: 'viewport',
  children: null,
  isLoading: false,
  isOpen: false,
  onClick: function onClick() {},
  onKeyDown: function onKeyDown() {},
  onOpenChange: function onOpenChange() {},
  position: 'bottom left',
  isMenuFixed: false,
  shouldAllowMultilineItems: false,
  shouldFitContainer: false,
  shouldFlip: true,
  trigger: null,
  onPositioned: function onPositioned() {}
});

_defineProperty(Droplist, "childContextTypes", {
  shouldAllowMultilineItems: PropTypes.bool
});

export { Droplist as DroplistWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'droplist',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onOpenChange: createAndFireEventOnAtlaskit({
    action: 'toggled',
    actionSubject: 'droplist',
    attributes: {
      componentName: 'droplist',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Droplist));