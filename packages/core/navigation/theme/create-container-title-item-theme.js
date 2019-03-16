import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import cloneDeep from 'lodash.clonedeep';
import { containerTitleHorizontalPadding, containerTitleIconSpacing } from '../shared-variables';

var overrideItemTheme = function overrideItemTheme(outerTheme, key) {
  var original = outerTheme[key];

  if (!original || !original.padding) {
    // eslint-disable-next-line no-console
    console.error("Could not find theme with key '".concat(key, "' to modifiy it for title"));
    return outerTheme;
  } // TODO: deep modification while respecting types


  var newTheme = cloneDeep(original);
  newTheme.padding.default.left = containerTitleHorizontalPadding;
  newTheme.padding.default.right = containerTitleHorizontalPadding;
  newTheme.height.default = 0;
  newTheme.beforeItemSpacing.default = containerTitleIconSpacing;
  return _objectSpread({}, outerTheme, _defineProperty({}, key, newTheme));
};

export default overrideItemTheme;