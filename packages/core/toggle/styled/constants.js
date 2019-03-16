import { gridSize } from '@atlaskit/theme';
var dimensions = {
  regular: {
    height: gridSize() * 2,
    width: gridSize() * 4
  },
  large: {
    height: gridSize() * 2 + gridSize() / 2,
    width: gridSize() * 5
  }
};
export var borderWidth = '2px';
export var paddingUnitless = gridSize() / 4;
export var transition = '0.2s';
export var getHeight = function getHeight(_ref) {
  var size = _ref.size;
  return dimensions[size].height;
};
export var getWidth = function getWidth(_ref2) {
  var size = _ref2.size;
  return dimensions[size].width;
};