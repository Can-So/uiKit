import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'react-focus-lock';

/* eslint-disable react/sort-comp */
var FocusLock =
/*#__PURE__*/
function (_Component) {
  _inherits(FocusLock, _Component);

  function FocusLock() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FocusLock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FocusLock)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "ariaHiddenNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "initFromProps", false);

    _defineProperty(_assertThisInitialized(_this), "teardownFromProps", false);

    _defineProperty(_assertThisInitialized(_this), "initialise", function () {
      var autoFocus = _this.props.autoFocus; // set the element to hide from assistive technology

      _this.ariaHiddenNode = _this.props.ariaHiddenNode || _this.context.ariaHiddenNode; // accessible `popup` content

      if (_this.ariaHiddenNode) {
        _this.ariaHiddenNode.setAttribute('aria-hidden', '');
      }

      if (typeof autoFocus === 'function') {
        var elem = autoFocus();

        if (elem && elem.focus) {
          elem.focus();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "teardown", function () {
      if (_this.ariaHiddenNode) {
        _this.ariaHiddenNode.removeAttribute('aria-hidden');
      }
    });

    return _this;
  }

  _createClass(FocusLock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          enabled = _this$props.enabled,
          autoFocus = _this$props.autoFocus;

      if (typeof autoFocus === 'function') {
        // eslint-disable-next-line no-console
        console.warn('@atlaskit/layer-manager: Passing a function as autoFocus in FocusLock is deprecated. Please see "Auto focusing an element" in https://atlaskit.atlassian.com/packages/core/layer-manager');
      }

      if (enabled) {
        this.initialise();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.initFromProps && !this.teardownFromProps) {
        this.teardown();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.enabled && this.props.enabled !== prevProps.enabled) {
        this.initFromProps = true;
        this.initialise();
      }

      if (!this.props.enabled && this.props.enabled !== prevProps.enabled) {
        this.teardownFromProps = true;
        this.teardown();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          enabled = _this$props2.enabled,
          autoFocus = _this$props2.autoFocus,
          returnFocus = _this$props2.returnFocus;
      return React.createElement(FocusTrap, {
        disabled: !enabled,
        autoFocus: !!autoFocus,
        returnFocus: returnFocus
      }, this.props.children);
    }
  }]);

  return FocusLock;
}(Component);

_defineProperty(FocusLock, "contextTypes", {
  /** available when invoked within @atlaskit/layer-manager */
  ariaHiddenNode: PropTypes.object
});

_defineProperty(FocusLock, "defaultProps", {
  autoFocus: true,
  enabled: true,
  returnFocus: true
});

export { FocusLock as default };