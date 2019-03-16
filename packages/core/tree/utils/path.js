import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

/*
  Checking if two given path are equal
 */
export var isSamePath = function isSamePath(a, b) {
  if (a === b) {
    return true;
  }

  return a.length === b.length && a.every(function (v, i) {
    return v === b[i];
  });
};
/*
  Checks if the two paths have the same parent
 */

export var hasSameParent = function hasSameParent(a, b) {
  return isSamePath(getParentPath(a), getParentPath(b));
};
/*
  Calculates the parent path for a path
*/

export var getParentPath = function getParentPath(child) {
  return child.slice(0, child.length - 1);
};
/*
  It checks if the item is on top of a sub tree based on the two neighboring items, which are above or below the item.
*/

export var isTopOfSubtree = function isTopOfSubtree(abovePath, belowPath) {
  return !abovePath || isParentOf(abovePath, belowPath);
};

var isParentOf = function isParentOf(parent, child) {
  return isSamePath(parent, getParentPath(child));
};

export var getIndexAmongSiblings = function getIndexAmongSiblings(path) {
  var lastIndex = path[path.length - 1];
  return lastIndex;
};
export var getPathOnLevel = function getPathOnLevel(path, level) {
  return path.slice(0, level);
};
export var moveAfterPath = function moveAfterPath(after, from) {
  var newPath = _toConsumableArray(after);

  var movedDownOnTheSameLevel = isLowerSibling(newPath, from);

  if (!movedDownOnTheSameLevel) {
    // not moved within the same subtree
    newPath[newPath.length - 1] += 1;
  }

  return newPath;
};
export var isLowerSibling = function isLowerSibling(a, other) {
  return hasSameParent(a, other) && getIndexAmongSiblings(a) > getIndexAmongSiblings(other);
};