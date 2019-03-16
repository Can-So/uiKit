import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import ArrowRightCircleIcon from '@findable/icon/glyph/arrow-right-circle';
import Spinner from '@findable/spinner';
import { withNavigationViewController } from '../../../view-controller';
import ConnectedItem from '../ConnectedItem';

var generateAfterProp = function generateAfterProp(_ref) {
  var goTo = _ref.goTo,
      spinnerDelay = _ref.spinnerDelay,
      navigationViewController = _ref.navigationViewController;
  return function (_ref2) {
    var isActive = _ref2.isActive,
        isHover = _ref2.isHover,
        isFocused = _ref2.isFocused;
    var incomingView = navigationViewController.state.incomingView;

    if (incomingView && incomingView.id === goTo) {
      return React.createElement(Spinner, {
        delay: spinnerDelay,
        invertColor: true,
        size: "small"
      });
    }

    if (isActive || isHover || isFocused) {
      return React.createElement(ArrowRightCircleIcon, {
        primaryColor: "currentColor",
        secondaryColor: "inherit"
      });
    }

    return null;
  };
};

var GoToItem =
/*#__PURE__*/
function (_Component) {
  _inherits(GoToItem, _Component);

  function GoToItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GoToItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GoToItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      var _this$props = _this.props,
          goTo = _this$props.goTo,
          navigationViewController = _this$props.navigationViewController;
      e.preventDefault();

      if (typeof goTo !== 'string') {
        return;
      }

      navigationViewController.setView(goTo);
    });

    return _this;
  }

  _createClass(GoToItem, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          afterProp = _this$props2.after,
          goTo = _this$props2.goTo,
          navigationViewController = _this$props2.navigationViewController,
          spinnerDelay = _this$props2.spinnerDelay,
          rest = _objectWithoutProperties(_this$props2, ["after", "goTo", "navigationViewController", "spinnerDelay"]);

      var after = typeof afterProp === 'undefined' ? generateAfterProp({
        goTo: goTo,
        spinnerDelay: spinnerDelay,
        navigationViewController: navigationViewController
      }) : afterProp;

      var props = _objectSpread({}, rest, {
        after: after
      });

      return React.createElement(ConnectedItem, _extends({
        onClick: this.handleClick
      }, props));
    }
  }]);

  return GoToItem;
}(Component);

_defineProperty(GoToItem, "defaultProps", {
  spinnerDelay: 200
});

export { GoToItem as GoToItemBase };
export default withNavigationViewController(GoToItem);