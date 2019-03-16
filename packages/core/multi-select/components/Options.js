import React from 'react';

var renderOptions = function renderOptions(items) {
  if (!items || !items.length) return [];
  return items.map(function (item, itemIndex) {
    return React.createElement("option", {
      disabled: item.isDisabled,
      key: itemIndex // eslint-disable-line react/no-array-index-key
      ,
      value: item.value
    }, item.content);
  });
};

var renderOptGroups = function renderOptGroups(groups) {
  return groups.map(function (group, groupIndex) {
    return React.createElement("optgroup", {
      key: groupIndex // eslint-disable-line react/no-array-index-key
      ,
      label: group.heading
    }, renderOptions(group.items));
  });
};

export default renderOptGroups;