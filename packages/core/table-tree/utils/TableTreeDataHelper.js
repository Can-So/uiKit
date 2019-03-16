import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import get from 'lodash.get';
import set from 'lodash.set';

function updateRootItems(rootItems) {
  var allItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _ref = arguments.length > 2 ? arguments[2] : undefined,
      key = _ref.key,
      keysCache = _ref.keysCache,
      operation = _ref.operation;

  var newKeysCache = _objectSpread({}, keysCache); // If it is not an append operation we can ignore allItems as they will be swaped with new items


  var allBaseItems = operation === 'UPDATE' ? [] : _toConsumableArray(allItems);
  var startIndexWith = allBaseItems.length;
  rootItems.forEach(function (rootItem, index) {
    var rootItemKey = rootItem[key];

    if (rootItemKey === undefined) {
      throw new Error("[ERROR] Property '".concat(key, "' not found in rootItem[").concat(index, "]"));
    } else {
      newKeysCache[rootItem[key]] = index + startIndexWith;
    }
  });
  return {
    keysCache: newKeysCache,
    items: allBaseItems.concat(rootItems)
  };
}

function updateChildItems(newitems, allTableItems, itemParent, _ref2) {
  var key = _ref2.key,
      keysCache = _ref2.keysCache,
      operation = _ref2.operation;

  var newKeysCache = _objectSpread({}, keysCache);

  var parentCacheKey = itemParent[key];

  if (parentCacheKey === undefined) {
    throw new Error("[Table Tree] Property '".concat(key, "' not found in parent item"));
  }

  var parentLocation = newKeysCache[parentCacheKey];

  var allItemsCopy = _toConsumableArray(allTableItems);

  var objectToChange = get(allItemsCopy, parentLocation);
  var baseChildrenOfObjectToChange = operation === 'UPDATE' ? [] : get(objectToChange, 'children', []);
  objectToChange.children = baseChildrenOfObjectToChange.concat(newitems); // Update cache

  newitems.forEach(function (item, index) {
    newKeysCache[item[key]] = "".concat(parentLocation, ".children[").concat(index + baseChildrenOfObjectToChange.length, "]");
  });
  return {
    keysCache: newKeysCache,
    items: set(allItemsCopy, parentLocation, objectToChange)
  };
}
/**
 * This helper class will create a cache of all the id's in the items object and
 * path to the object.
 * Example:
 * [{
 *   // item 1,
 *   id: 1,
 *   children:[{
 *     // item 1.1,
 *     id: '2'
 *   }]
 * }]
 *
 * Cache will look something like:
 * {1: 0, 2: '0.children[0]'}
 */


var TableTreeDataHelper =
/*#__PURE__*/
function () {
  function TableTreeDataHelper() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$key = _ref3.key,
        key = _ref3$key === void 0 ? 'key' : _ref3$key;

    _classCallCheck(this, TableTreeDataHelper);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "keysCache", void 0);

    this.key = key;
    this.keysCache = {};
  }

  _createClass(TableTreeDataHelper, [{
    key: "updateItems",
    value: function updateItems(items) {
      var allItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var parentItem = arguments.length > 2 ? arguments[2] : undefined;
      var options = {
        key: this.key,
        keysCache: this.keysCache,
        operation: 'UPDATE'
      };

      if (!parentItem) {
        var _updateRootItems = updateRootItems(items, allItems, options),
            _keysCache = _updateRootItems.keysCache,
            updatedRootItems = _updateRootItems.items;

        this.keysCache = _keysCache;
        return updatedRootItems;
      }

      var _updateChildItems = updateChildItems(items, allItems, parentItem, options),
          keysCache = _updateChildItems.keysCache,
          updatedItems = _updateChildItems.items;

      this.keysCache = keysCache;
      return updatedItems;
    }
  }, {
    key: "appendItems",
    value: function appendItems(items) {
      var allItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var parentItem = arguments.length > 2 ? arguments[2] : undefined;
      var options = {
        key: this.key,
        keysCache: this.keysCache,
        operation: 'APPEND'
      };

      if (!parentItem) {
        var _updateRootItems2 = updateRootItems(items, allItems, options),
            _keysCache2 = _updateRootItems2.keysCache,
            updatedRootItems = _updateRootItems2.items;

        this.keysCache = _keysCache2;
        return updatedRootItems;
      }

      var _updateChildItems2 = updateChildItems(items, allItems, parentItem, options),
          keysCache = _updateChildItems2.keysCache,
          updatedItems = _updateChildItems2.items;

      this.keysCache = keysCache;
      return updatedItems;
    }
  }]);

  return TableTreeDataHelper;
}();

export { TableTreeDataHelper as default };