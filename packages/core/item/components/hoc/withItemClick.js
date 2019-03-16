import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
// We currently need to keep the dropdown open if an item with `href` is clicked, to avoid the
// analytics package to track the href value without the event target disappearing. Without this
// requirement, we could just use a native click event all the way up to DropdownMenuStateless,
// and could get rid of this HOC and DropdownItemClickManager.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../../util/getDisplayName';
import safeContextCall from '../../util/safeContextCall';
import { clickManagerContext } from '../../util/contextNamespace';

// HOC that typically wraps @atlaskit/item
var withItemClick = function withItemClick(WrappedItem) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithItemClick, _Component);

    function WithItemClick() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WithItemClick);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithItemClick)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "callContextFn", safeContextCall(_assertThisInitialized(_this), clickManagerContext));

      _defineProperty(_assertThisInitialized(_this), "shouldCloseAfterClick", function () {
        return !_this.props.isDisabled && !_this.props.href;
      });

      _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
        _this.props.onClick(event);

        if (_this.shouldCloseAfterClick()) {
          _this.callContextFn('itemClicked');
        }
      });

      _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
        if (_this.props.onKeyDown) {
          _this.props.onKeyDown(event);
        } else if (event.key === 'Space' || event.key === 'Enter') {
          _this.handleClick(event);
        }
      });

      return _this;
    }

    _createClass(WithItemClick, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            otherProps = _objectWithoutProperties(_this$props, ["children"]);

        return React.createElement(WrappedItem, _extends({}, otherProps, {
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown
        }), children);
      }
    }]);

    return WithItemClick;
  }(Component), _defineProperty(_class, "displayName", "WithItemClick(".concat(getDisplayName(WrappedItem), ")")), _defineProperty(_class, "defaultProps", {
    onClick: function onClick() {}
  }), _defineProperty(_class, "contextTypes", _defineProperty({}, clickManagerContext, PropTypes.object)), _temp;
};

export default withItemClick;