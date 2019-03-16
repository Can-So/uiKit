import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { Item, Group } from '@atlaskit/droplist';
import NoMatches from '../styled/NoMatch';
import InitialLoading from '../styled/InitialLoading';
import GroupsContainer from '../styled/GroupsContainer';
import { filterItems } from '../internal/sharedFunctions';

var renderItems = function renderItems(_ref) {
  var items = _ref.items,
      focusedItemIndex = _ref.focusedItemIndex,
      handleItemSelect = _ref.handleItemSelect;

  if (items && items.length) {
    return items.map(function (item, itemIndex) {
      return React.createElement(Item, _extends({}, item, {
        elemBefore: item.elemBefore,
        isFocused: itemIndex === focusedItemIndex,
        key: itemIndex // eslint-disable-line react/no-array-index-key
        ,
        onActivate: function onActivate(attrs) {
          handleItemSelect(item, attrs);
        }
      }), item.content);
    });
  }

  return null;
};

var renderNoItemsMessage = function renderNoItemsMessage(noMatchesFound) {
  return React.createElement(NoMatches, null, noMatchesFound);
};

var renderLoadingMessage = function renderLoadingMessage(loadingMessage) {
  return React.createElement(InitialLoading, {
    "aria-live": "polite",
    role: "status"
  }, loadingMessage);
};

var renderMessageForEmptyList = function renderMessageForEmptyList(_ref2) {
  var noMatchesFound = _ref2.noMatchesFound,
      isLoading = _ref2.isLoading,
      loadingMessage = _ref2.loadingMessage;
  return isLoading ? renderLoadingMessage(loadingMessage) : renderNoItemsMessage(noMatchesFound);
};

/* eslint-disable react/prop-types*/
var renderGroups = function renderGroups(_ref3) {
  var filterValue = _ref3.filterValue,
      focusedItemIndex = _ref3.focusedItemIndex,
      hasFooter = _ref3.hasFooter,
      groups = _ref3.groups,
      handleItemSelect = _ref3.handleItemSelect,
      noMatchesFound = _ref3.noMatchesFound,
      selectedItems = _ref3.selectedItems,
      shouldAllowCreateItem = _ref3.shouldAllowCreateItem,
      isLoading = _ref3.isLoading,
      loadingMessage = _ref3.loadingMessage;
  var renderedGroups = groups.map(function (group, groupIndex) {
    var filteredItems = filterItems(group.items, filterValue, selectedItems);
    return filteredItems.length > 0 ? React.createElement(Group, {
      heading: group.heading,
      key: groupIndex // eslint-disable-line react/no-array-index-key

    }, renderItems({
      items: filteredItems,
      focusedItemIndex: focusedItemIndex,
      handleItemSelect: handleItemSelect
    })) : null;
  }).filter(function (group) {
    return !!group;
  }); // don't show the 'noItems' message when the new item functinality is enabled

  return renderedGroups.length > 0 || shouldAllowCreateItem ? React.createElement(GroupsContainer, {
    hasFooter: hasFooter
  }, renderedGroups) : renderMessageForEmptyList({
    noMatchesFound: noMatchesFound,
    isLoading: isLoading,
    loadingMessage: loadingMessage
  });
};
/* eslint-enable prop-types */


export default renderGroups;