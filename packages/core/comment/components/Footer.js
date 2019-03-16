import React from 'react';
import WarningIcon from '@findable/icon/glyph/warning';
import { ActionsContainer, ActionsItem, ErrorIcon } from '../styled/FooterStyles';

var mapActions = function mapActions(items) {
  return items.map(function (item, index) {
    return (// eslint-disable-next-line react/no-array-index-key
      React.createElement(ActionsItem, {
        key: index
      }, item)
    );
  });
};

var FooterItems = function FooterItems(_ref) {
  var actions = _ref.actions,
      errorActions = _ref.errorActions,
      errorIconLabel = _ref.errorIconLabel,
      isError = _ref.isError,
      isSaving = _ref.isSaving;
  if (isSaving || !actions && !errorActions) return null;
  var items = isError ? errorActions && mapActions(errorActions) : actions && mapActions(actions);
  return React.createElement(ActionsContainer, null, isError ? React.createElement(ErrorIcon, null, React.createElement(WarningIcon, {
    label: errorIconLabel
  })) : null, items);
};

export default FooterItems;