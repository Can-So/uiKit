import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { gridSize as gridSizeFn } from '@findable/theme';
import { GLOBAL_NAV_WIDTH } from '../../../common/constants';
var gridSize = gridSizeFn();
var baseStyles = {
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  justifyContent: 'space-between',
  paddingBottom: gridSize * 3,
  paddingTop: gridSize * 3,
  transition: 'background-color 0.3s cubic-bezier(0.2, 0, 0, 1), color 0.3s cubic-bezier(0.2, 0, 0, 1)',
  width: GLOBAL_NAV_WIDTH
};
export default (function (_ref) {
  var product = _ref.product;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      topOffset: '0'
    },
        topOffset = _ref2.topOffset;

    return _objectSpread({}, baseStyles, {
      height: "calc(100vh - ".concat(topOffset, "px)"),
      backgroundColor: product.background.default,
      color: product.text.default,
      fill: product.background.default
    });
  };
});