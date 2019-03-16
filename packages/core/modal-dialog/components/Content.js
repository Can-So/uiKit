import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import rafSchedule from 'raf-schd';
import ScrollLock from 'react-scrolllock';
import Footer from './Footer';
import Header from './Header';
import { Body as DefaultBody, styledBody, keylineHeight, Wrapper } from '../styled/Content';

function getInitialState() {
  return {
    showFooterKeyline: false,
    showHeaderKeyline: false,
    tabbableElements: []
  };
}

var Content =
/*#__PURE__*/
function (_Component) {
  _inherits(Content, _Component);

  function Content() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Content);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Content)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "escapeIsHeldDown", false);

    _defineProperty(_assertThisInitialized(_this), "_isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "scrollContainer", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", getInitialState());

    _defineProperty(_assertThisInitialized(_this), "determineKeylines", rafSchedule(function () {
      if (!_this.scrollContainer) return;
      var _this$scrollContainer = _this.scrollContainer,
          scrollTop = _this$scrollContainer.scrollTop,
          scrollHeight = _this$scrollContainer.scrollHeight,
          clientHeight = _this$scrollContainer.clientHeight;
      var scrollableDistance = scrollHeight - clientHeight;
      var showHeaderKeyline = scrollTop > keylineHeight;
      var showFooterKeyline = scrollTop <= scrollableDistance - keylineHeight;

      _this.setState({
        showHeaderKeyline: showHeaderKeyline,
        showFooterKeyline: showFooterKeyline
      });
    }));

    _defineProperty(_assertThisInitialized(_this), "getScrollContainer", function (ref) {
      if (!ref) return;
      _this.scrollContainer = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyUp", function () {
      _this.escapeIsHeldDown = false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var _this$props = _this.props,
          onClose = _this$props.onClose,
          shouldCloseOnEscapePress = _this$props.shouldCloseOnEscapePress,
          _this$props$stackInde = _this$props.stackIndex,
          stackIndex = _this$props$stackInde === void 0 ? 0 : _this$props$stackInde; // avoid consumers accidently closing multiple modals if they hold escape.

      if (_this.escapeIsHeldDown) return;
      if (event.key === 'Escape') _this.escapeIsHeldDown = true; // only the foremost modal should be interactive.

      if (!_this._isMounted || stackIndex > 0) return;

      switch (event.key) {
        case 'Escape':
          if (shouldCloseOnEscapePress) onClose(event);
          break;

        default:
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleStackChange", function (stackIndex) {
      var onStackChange = _this.props.onStackChange;
      if (onStackChange) onStackChange(stackIndex);
    });

    return _this;
  }

  _createClass(Content, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true; // $FlowFixMe - issue with document.addEventListener - Enum incompatible

      document.addEventListener('keydown', this.handleKeyDown, false);
      document.addEventListener('keyup', this.handleKeyUp, false);

      if (this.scrollContainer) {
        var capturedScrollContainer = this.scrollContainer;
        window.addEventListener('resize', this.determineKeylines, false);
        capturedScrollContainer.addEventListener('scroll', this.determineKeylines, false);
        this.determineKeylines();
      }
      /* eslint-disable no-console */
      // Check for deprecated props


      if (this.props.header) console.warn("@atlaskit/modal-dialog: Deprecation warning - Use of the header prop in ModalDialog is deprecated. Please compose your ModalDialog using the 'components' prop instead");
      if (this.props.footer) console.warn("@atlaskit/modal-dialog: Deprecation warning - Use of the footer prop in ModalDialog is deprecated. Please compose your ModalDialog using the 'components' prop instead");
      if (this.props.body) console.warn("@atlaskit/modal-dialog: Deprecation warning - Use of the body prop in ModalDialog is deprecated. Please compose your ModalDialog using the 'components' prop instead"); // Check that custom body components have used ForwardRef to attach to a DOM element

      if (this.props.components.Body) {
        if (!(this.scrollContainer instanceof HTMLElement)) {
          console.warn('@atlaskit/modal-dialog: Warning - Ref must attach to a DOM element; check you are using forwardRef and attaching the ref to an appropriate element. Check the examples for more details.');
        }
      }
      /* eslint-enable no-console */

    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var stackIndex = this.props.stackIndex; // update focus scope and let consumer know when stack index has changed

      if (nextProps.stackIndex && nextProps.stackIndex !== stackIndex) {
        this.handleStackChange(nextProps.stackIndex);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false; // $FlowFixMe - issue with document.addEventListener - Enum incompatible

      document.removeEventListener('keydown', this.handleKeyDown, false);
      document.removeEventListener('keyup', this.handleKeyUp, false);

      if (this.scrollContainer) {
        var capturedScrollContainer = this.scrollContainer;
        window.removeEventListener('resize', this.determineKeylines, false);
        capturedScrollContainer.removeEventListener('scroll', this.determineKeylines, false);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          actions = _this$props2.actions,
          appearance = _this$props2.appearance,
          DeprecatedBody = _this$props2.body,
          components = _this$props2.components,
          children = _this$props2.children,
          footer = _this$props2.footer,
          header = _this$props2.header,
          heading = _this$props2.heading,
          onClose = _this$props2.onClose,
          isChromeless = _this$props2.isChromeless,
          isHeadingMultiline = _this$props2.isHeadingMultiline,
          shouldScroll = _this$props2.shouldScroll;
      var _components$Container = components.Container,
          Container = _components$Container === void 0 ? 'div' : _components$Container,
          CustomBody = components.Body; // Only load in 'div' default if there's no deprecated 'body' prop provided
      // Prefer components.Body over deprecated body prop and default to DefaultBody

      var BodyComponent = styledBody(CustomBody) || DeprecatedBody || DefaultBody;
      var _this$state = this.state,
          showFooterKeyline = _this$state.showFooterKeyline,
          showHeaderKeyline = _this$state.showHeaderKeyline;
      return React.createElement(Wrapper, {
        component: Container
      }, isChromeless ? children : React.createElement(React.Fragment, null, React.createElement(Header, {
        appearance: appearance,
        component: components.Header ? components.Header : header,
        heading: heading,
        onClose: onClose,
        isHeadingMultiline: isHeadingMultiline,
        showKeyline: showHeaderKeyline
      }), React.createElement(BodyComponent, {
        innerRef: this.getScrollContainer,
        shouldScroll: shouldScroll
      }, children), React.createElement(Footer, {
        actions: actions,
        appearance: appearance,
        component: components.Footer ? components.Footer : footer,
        onClose: onClose,
        showKeyline: showFooterKeyline
      })), React.createElement(ScrollLock, null));
    }
  }]);

  return Content;
}(Component);

_defineProperty(Content, "defaultProps", {
  autoFocus: false,
  components: {},
  isChromeless: false,
  stackIndex: 0,
  isHeadingMultiline: true
});

export { Content as default };