import React from 'react';
import Lozenge from '@findable/lozenge';
import LockFilledIcon from '@findable/icon/glyph/lock-filled';
import { BulletSpacer, Restricted, RestrictedIconWrapper, TopItem, TopItemsContainer } from '../styled/HeaderStyles';

var HeaderItems = function HeaderItems(_ref) {
  var author = _ref.author,
      edited = _ref.edited,
      isError = _ref.isError,
      isSaving = _ref.isSaving,
      restrictedTo = _ref.restrictedTo,
      savingText = _ref.savingText,
      time = _ref.time,
      type = _ref.type;
  var restrictedElement = restrictedTo ? React.createElement(Restricted, null, React.createElement(BulletSpacer, null, "\u2022"), React.createElement(RestrictedIconWrapper, null, React.createElement(LockFilledIcon, {
    size: "small"
  })), ' ', restrictedTo) : null;
  var items = [author || null, type ? React.createElement(Lozenge, null, type) : null, time && !isSaving && !isError ? time : null, edited || null, isSaving ? savingText : null, restrictedElement].filter(function (item) {
    return !!item;
  }).map(function (item, index) {
    return React.createElement(TopItem, {
      key: index
    }, item);
  }); // eslint-disable-line react/no-array-index-key

  return items.length ? React.createElement(TopItemsContainer, null, items) : null;
};

export default HeaderItems;