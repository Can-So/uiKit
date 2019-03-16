import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { PureComponent } from 'react';
/** ************************************************************************************************
  This file exists so that we have a component we can pass the @findable/readme Props component
  We reuse the definition to define the itemShape in StatelessMultiSelect as well
**************************************************************************************************/

var DummyItem =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DummyItem, _PureComponent);

  function DummyItem() {
    _classCallCheck(this, DummyItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(DummyItem).apply(this, arguments));
  }

  return DummyItem;
}(PureComponent);

_defineProperty(DummyItem, "defaultProps", {
  isDisabled: false,
  isSelected: false
});

export { DummyItem as default };