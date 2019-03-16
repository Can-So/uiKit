import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import withDimensions from '../../hoc/withDimensions';
import HeadCell from '../TableHeadCell';
import { inlineStylesIfRanking } from '../../internal/helpers';

var RankableTableHeadCell =
/*#__PURE__*/
function (_Component) {
  _inherits(RankableTableHeadCell, _Component);

  function RankableTableHeadCell() {
    _classCallCheck(this, RankableTableHeadCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(RankableTableHeadCell).apply(this, arguments));
  }

  _createClass(RankableTableHeadCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isRanking = _this$props.isRanking,
          refHeight = _this$props.refHeight,
          refWidth = _this$props.refWidth,
          innerRef = _this$props.innerRef,
          restProps = _objectWithoutProperties(_this$props, ["isRanking", "refHeight", "refWidth", "innerRef"]);

      var inlineStyles = inlineStylesIfRanking(isRanking, refWidth);
      return React.createElement(HeadCell, _extends({
        inlineStyles: inlineStyles,
        innerRef: innerRef
      }, restProps));
    }
  }]);

  return RankableTableHeadCell;
}(Component);

export default withDimensions(RankableTableHeadCell);