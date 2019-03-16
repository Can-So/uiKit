import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { PureComponent } from 'react';

var ItemShape =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ItemShape, _PureComponent);

  function ItemShape() {
    _classCallCheck(this, ItemShape);

    return _possibleConstructorReturn(this, _getPrototypeOf(ItemShape).apply(this, arguments));
  }

  _createClass(ItemShape, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return ItemShape;
}(PureComponent);

_defineProperty(ItemShape, "defaultProps", {
  isDisabled: false,
  isSelected: false
});

export { ItemShape as default };