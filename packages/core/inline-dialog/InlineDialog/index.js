import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import NodeResolver from 'react-node-resolver';
import { Manager, Reference, Popper } from '@findable/popper';
import { name as packageName, version as packageVersion } from '../version.json';
import { Container } from './styled';

var InlineDialog =
/*#__PURE__*/
function (_Component) {
  _inherits(InlineDialog, _Component);

  function InlineDialog() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InlineDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InlineDialog)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerRef", null);

    _defineProperty(_assertThisInitialized(_this), "triggerRef", null);

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      var _this$props = _this.props,
          isOpen = _this$props.isOpen,
          onClose = _this$props.onClose;
      if (event.defaultPrevented) return;
      var container = _this.containerRef;
      var trigger = _this.triggerRef;
      var target = event.target; // exit if we click outside but on the trigger — it can handle the clicks itself

      if (trigger && trigger.contains(target)) return; // call onClose if the click originated from outside the dialog

      if (isOpen && container && !container.contains(target)) {
        onClose({
          isOpen: false,
          event: event
        });
      }
    });

    return _this;
  }

  _createClass(InlineDialog, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (typeof window === 'undefined') return;

      if (!prevProps.isOpen && this.props.isOpen) {
        window.addEventListener('click', this.handleClickOutside, true);
      } else if (prevProps.isOpen && !this.props.isOpen) {
        window.removeEventListener('click', this.handleClickOutside);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window === 'undefined') return;

      if (this.props.isOpen) {
        window.addEventListener('click', this.handleClickOutside, true);
      }
    }
  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      if (typeof window === 'undefined') return;
      window.removeEventListener('click', this.handleClickOutside);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          placement = _this$props2.placement,
          isOpen = _this$props2.isOpen,
          content = _this$props2.content,
          onContentBlur = _this$props2.onContentBlur,
          onContentFocus = _this$props2.onContentFocus,
          onContentClick = _this$props2.onContentClick;
      var popper = isOpen ? React.createElement(Popper, {
        placement: placement
      }, function (_ref) {
        var ref = _ref.ref,
            style = _ref.style,
            outOfBoundaries = _ref.outOfBoundaries;
        return React.createElement(Container, {
          onBlur: onContentBlur,
          onFocus: onContentFocus,
          onClick: onContentClick,
          outOfBoundaries: outOfBoundaries,
          innerRef: function innerRef(node) {
            _this2.containerRef = node;
            ref(node);
          },
          style: style
        }, content);
      }) : null;
      return React.createElement(Manager, null, React.createElement(Reference, null, function (_ref2) {
        var ref = _ref2.ref;
        return React.createElement(NodeResolver, {
          innerRef: function innerRef(node) {
            _this2.triggerRef = node;
            ref(node);
          }
        }, children);
      }), popper);
    }
  }]);

  return InlineDialog;
}(Component);

_defineProperty(InlineDialog, "defaultProps", {
  children: null,
  content: null,
  isOpen: false,
  onContentBlur: function onContentBlur() {},
  onContentClick: function onContentClick() {},
  onContentFocus: function onContentFocus() {},
  onClose: function onClose() {},
  placement: 'bottom-start'
});

export { InlineDialog as InlineDialogWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'inlineDialog',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onClose: createAndFireEventOnAtlaskit({
    action: 'closed',
    actionSubject: 'inlineDialog',
    attributes: {
      componentName: 'inlineDialog',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(InlineDialog));