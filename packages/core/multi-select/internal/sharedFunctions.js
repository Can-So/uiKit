/**
 * Try to match with filterValues first. If it's not provided, then match with content.
 */
var isMatched = function isMatched(item, matchingValue) {
  var filterValues = item.filterValues;

  if (filterValues && filterValues.length > 0) {
    return filterValues.some(function (value) {
      return value.toLowerCase().indexOf(matchingValue) > -1;
    });
  }

  return item.content.toLowerCase().indexOf(matchingValue) > -1;
};

var filterItems = function filterItems(items, filterValue, selectedItems) {
  var value = filterValue;
  var trimmedValue = value && value.toLowerCase().trim();
  var selectedValues = selectedItems ? selectedItems.map(function (item) {
    return item.value;
  }) : [];
  var unselectedItems = items.filter(function (item) {
    return selectedValues.indexOf(item.value) === -1;
  });
  return trimmedValue ? unselectedItems.filter(function (item) {
    return isMatched(item, trimmedValue);
  }) : unselectedItems;
};

var getNextFocusable = function getNextFocusable(indexItem, length) {
  var footerIsFocusable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var currentItem = indexItem;
  var footerShouldBeFocused = footerIsFocusable && currentItem === length - 1;

  if (currentItem == null) {
    currentItem = 0;
  } else if (currentItem < length - 1) {
    currentItem++;
  } else if (footerShouldBeFocused) {
    currentItem = length;
  } else {
    currentItem = 0;
  }

  return currentItem;
};

var getPrevFocusable = function getPrevFocusable(indexItem, length) {
  var footerIsFocusable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var currentItem = indexItem;
  var footerShouldBeFocused = footerIsFocusable && currentItem === 0;

  if (currentItem && currentItem > 0) {
    currentItem--;
  } else if (footerShouldBeFocused) {
    currentItem = length;
  } else {
    currentItem = length - 1;
  }

  return currentItem;
}; // This function exists because mutliselect supports two slightly different APIs when it comes to
// the `items` prop. One way is an array of Items
// i.e [{ content: 'one', value: 1}, { content: 'two', value: 2}, { content: 'three', value: 3}]
// the other is what can be thought of as an array of Groups
// i.e [{ heading: 'numbers', items: [...] }, { heading: 'letters', items: [...] }]
// In this form, the items array matches the one we see above.
// This function normalises `items` so that it will always be in the later form


var groupItems = function groupItems(items) {
  var firstItem = items[0] || {};
  return Array.isArray(firstItem.items) ? items : convertToGroupType(items);
};

var convertToGroupType = function convertToGroupType(items) {
  return [{
    items: items
  }];
};

export { filterItems, getNextFocusable, getPrevFocusable, groupItems };