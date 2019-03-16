import { css as _css } from "emotion";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { navigationItemClicked } from '../../../common/analytics';
import InteractionStateManager from '../InteractionStateManager';
import { styleReducerNoOp, withGlobalTheme } from '../../../theme';
import GlobalItemPrimitive from './primitives';
export var GlobalItemBase =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GlobalItemBase, _PureComponent);

  function GlobalItemBase() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GlobalItemBase);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GlobalItemBase)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (state) {
      var _this$props = _this.props,
          createAnalyticsEvent = _this$props.createAnalyticsEvent,
          theme = _this$props.theme,
          props = _objectWithoutProperties(_this$props, ["createAnalyticsEvent", "theme"]);

      return React.createElement(GlobalItemPrimitive, _extends({}, state, props));
    });

    return _this;
  }

  _createClass(GlobalItemBase, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          size = _this$props2.size,
          mode = _this$props2.theme.mode;

      var _styleReducerNoOp = styleReducerNoOp(mode.globalItem({
        size: size
      })),
          itemWrapperStyles = _styleReducerNoOp.itemWrapper;

      return React.createElement("div", {
        className: _css(itemWrapperStyles)
      }, React.createElement(InteractionStateManager, null, this.renderItem));
    }
  }]);

  return GlobalItemBase;
}(PureComponent);

_defineProperty(GlobalItemBase, "defaultProps", {
  label: '',
  size: 'large',
  styles: styleReducerNoOp
});

export default navigationItemClicked(withGlobalTheme(GlobalItemBase), 'globalItem', true);