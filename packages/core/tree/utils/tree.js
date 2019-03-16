import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { getParentPath, getIndexAmongSiblings } from './path';

/*
  Transforms tree structure into flat list of items for rendering purposes.
  We recursively go through all the elements and its children first on each level
 */
export var flattenTree = function flattenTree(tree) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return tree.items[tree.rootId] ? tree.items[tree.rootId].children.reduce(function (flat, itemId, index) {
    // iterating through all the children on the given level
    var item = tree.items[itemId];
    var currentPath = [].concat(_toConsumableArray(path), [index]); // we create a flattened item for the current item

    var currentItem = createFlattenedItem(item, currentPath); // we flatten its children

    var children = flattenChildren(tree, item, currentPath); // append to the accumulator

    return [].concat(_toConsumableArray(flat), [currentItem], _toConsumableArray(children));
  }, []) : [];
};
/*
  Constructs a new FlattenedItem
 */

var createFlattenedItem = function createFlattenedItem(item, currentPath) {
  return {
    item: item,
    path: currentPath
  };
};
/*
  Flatten the children of the given subtree
*/


var flattenChildren = function flattenChildren(tree, item, currentPath) {
  return item.isExpanded ? flattenTree({
    rootId: item.id,
    items: tree.items
  }, currentPath) : [];
};
/*
  Changes the tree data structure with minimal reference changes.
 */


export var mutateTree = function mutateTree(tree, itemId, mutation) {
  var itemToChange = tree.items[itemId];

  if (!itemToChange) {
    // Item not found
    return tree;
  } // Returning a clone of the tree structure and overwriting the field coming in mutation


  return {
    // rootId should not change
    rootId: tree.rootId,
    items: _objectSpread({}, tree.items, _defineProperty({}, itemId, _objectSpread({}, itemToChange, mutation)))
  };
};
export var getItem = function getItem(tree, path) {
  var cursor = tree.items[tree.rootId];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      cursor = tree.items[cursor.children[i]];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return cursor;
};
export var getParent = function getParent(tree, path) {
  var parentPath = getParentPath(path);
  return getItem(tree, parentPath);
};
export var getTreePosition = function getTreePosition(tree, path) {
  var parent = getParent(tree, path);
  var index = getIndexAmongSiblings(path);
  return {
    parentId: parent.id,
    index: index
  };
};

var hasLoadedChildren = function hasLoadedChildren(item) {
  return !!item.hasChildren && item.children.length > 0;
};

var isLeafItem = function isLeafItem(item) {
  return !item.hasChildren;
};

var removeItemFromTree = function removeItemFromTree(tree, position) {
  var sourceParent = tree.items[position.parentId];

  var newSourceChildren = _toConsumableArray(sourceParent.children);

  var itemRemoved = newSourceChildren.splice(position.index, 1)[0];
  var newTree = mutateTree(tree, position.parentId, {
    children: newSourceChildren,
    hasChildren: newSourceChildren.length > 0,
    isExpanded: newSourceChildren.length > 0 && sourceParent.isExpanded
  });
  return {
    tree: newTree,
    itemRemoved: itemRemoved
  };
};

var addItemToTree = function addItemToTree(tree, position, item) {
  var destinationParent = tree.items[position.parentId];

  var newDestinationChildren = _toConsumableArray(destinationParent.children);

  if (typeof position.index === 'undefined') {
    if (hasLoadedChildren(destinationParent) || isLeafItem(destinationParent)) {
      newDestinationChildren.push(item);
    }
  } else {
    newDestinationChildren.splice(position.index, 0, item);
  }

  return mutateTree(tree, position.parentId, {
    children: newDestinationChildren,
    hasChildren: true
  });
};

export var moveItemOnTree = function moveItemOnTree(tree, from, to) {
  var _removeItemFromTree = removeItemFromTree(tree, from),
      treeWithoutSource = _removeItemFromTree.tree,
      itemRemoved = _removeItemFromTree.itemRemoved;

  return addItemToTree(treeWithoutSource, to, itemRemoved);
};