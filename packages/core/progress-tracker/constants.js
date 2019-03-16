import { gridSize } from '@findable/theme';
export var defaultGridSize = gridSize();
/** Ideally these are exported by @findable/page */

export var spacing = {
  comfortable: defaultGridSize * 5,
  cosy: defaultGridSize * 2,
  compact: defaultGridSize * 0.5
};