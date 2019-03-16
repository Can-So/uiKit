import { gridSize } from '../../../shared-variables';

var prefix = function prefix(name) {
  return "__ak_nav_collapsed_overflow_".concat(name);
};

export var shouldReportItemHeight = prefix('shouldReportItemHeight');
export var reportItemHeightToGroup = prefix('reportItemHeight');
export var overflowManagerNamespace = prefix('manager_ns');
export var overflowGroupNamespace = prefix('group_ns');
export var dropdownHeight = gridSize * 5;
export var reservedGapHeight = gridSize * 4;
export var isArrayFilled = function isArrayFilled(testArray) {
  // Note: we can't use a simple testArray.length check here because it is a set-length
  // array; We also can't use .filter(Boolean).length because that skips any undefined items.
  for (var i = 0; i < testArray.length; i++) {
    if (typeof testArray[i] === 'undefined') {
      return false;
    }
  }

  return true;
};