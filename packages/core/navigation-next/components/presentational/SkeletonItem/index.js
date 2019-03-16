import { css as _css2 } from "emotion";
import { css as _css } from "emotion";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { css } from 'emotion';
import { withContentTheme, styleReducerNoOp } from '../../../theme';

var SkeletonItem =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SkeletonItem, _PureComponent);

  function SkeletonItem() {
    _classCallCheck(this, SkeletonItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonItem).apply(this, arguments));
  }

  _createClass(SkeletonItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          hasBefore = _this$props.hasBefore,
          styleReducer = _this$props.styles,
          theme = _this$props.theme;
      var mode = theme.mode,
          context = theme.context;
      var defaultStyles = mode.skeletonItem()[context];
      var styles = styleReducer(defaultStyles);
      return React.createElement("div", {
        className:
        /*#__PURE__*/

        /*#__PURE__*/
        css({
          '&&': styles.wrapper
        })
      }, hasBefore && React.createElement("div", {
        className: _css(styles.before)
      }), React.createElement("div", {
        className: _css2(styles.content)
      }));
    }
  }]);

  return SkeletonItem;
}(PureComponent);

_defineProperty(SkeletonItem, "defaultProps", {
  hasBefore: false,
  styles: styleReducerNoOp
});

export default withContentTheme(SkeletonItem);