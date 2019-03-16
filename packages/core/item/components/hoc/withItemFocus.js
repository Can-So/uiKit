import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import getDisplayName from '../../util/getDisplayName';
import safeContextCall from '../../util/safeContextCall';
import { focusManagerContext } from '../../util/contextNamespace';

var withItemFocus = function withItemFocus(WrappedComponent) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithItemFocus, _Component);

    function WithItemFocus() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WithItemFocus);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithItemFocus)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "contextId", void 0);

      _defineProperty(_assertThisInitialized(_this), "callContextFn", safeContextCall(_assertThisInitialized(_this), focusManagerContext));

      _defineProperty(_assertThisInitialized(_this), "isFocusable", function () {
        return !_this.props.isDisabled && !_this.props.isHidden;
      });

      _defineProperty(_assertThisInitialized(_this), "handleFocus", function () {
        if (_this.isFocusable()) {
          _this.callContextFn('itemFocused', _this.contextId);
        }
      });

      return _this;
    }

    _createClass(WithItemFocus, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!this.isFocusable()) {
          return;
        }

        this.contextId = uuid();
        this.callContextFn('registerItem', this.contextId, ReactDOM.findDOMNode(this) // eslint-disable-line react/no-find-dom-node
        );
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (!this.isFocusable()) {
          return;
        }

        this.callContextFn('updateItem', this.contextId, ReactDOM.findDOMNode(this) // eslint-disable-line react/no-find-dom-node
        );
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.isFocusable()) {
          this.callContextFn('deregisterItem', this.contextId);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            otherProps = _objectWithoutProperties(_this$props, ["children"]);

        return React.createElement(WrappedComponent, _extends({
          onFocus: this.handleFocus,
          role: "menuitem"
        }, otherProps), children);
      }
    }]);

    return WithItemFocus;
  }(Component), _defineProperty(_class, "displayName", "WithItemFocus(".concat(getDisplayName(WrappedComponent), ")")), _defineProperty(_class, "contextTypes", _defineProperty({}, focusManagerContext, PropTypes.object)), _temp;
};

export default withItemFocus;