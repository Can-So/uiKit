import React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import CloseIcon from '@atlaskit/icon/glyph/cross';
import { Wrapper, Header as StyledHeader, Title, Description as StyledDescription } from './styled/common';
export function HeaderButtons(_ref) {
  var optOutLabel = _ref.optOutLabel,
      canClose = _ref.canClose,
      onClose = _ref.onClose,
      canOptOut = _ref.canOptOut,
      onOptOut = _ref.onOptOut;
  var buttons = [];

  if (canOptOut) {
    buttons.push(React.createElement(Button, {
      key: "opt-out",
      onClick: onOptOut,
      appearance: "subtle"
    }, optOutLabel));
  }

  if (canClose) {
    buttons.push(React.createElement(Button, {
      key: "close",
      appearance: "subtle",
      onClick: onClose,
      iconBefore: React.createElement(CloseIcon, {
        label: "Close",
        size: "small"
      })
    }));
  }

  return React.createElement(ButtonGroup, null, buttons);
}
export function Header(_ref2) {
  var title = _ref2.title,
      canClose = _ref2.canClose,
      onClose = _ref2.onClose,
      canOptOut = _ref2.canOptOut,
      onOptOut = _ref2.onOptOut,
      optOutLabel = _ref2.optOutLabel;
  return React.createElement(StyledHeader, null, React.createElement(Title, null, title), React.createElement(HeaderButtons, {
    canClose: canClose,
    canOptOut: canOptOut,
    onClose: onClose,
    onOptOut: onOptOut,
    optOutLabel: optOutLabel
  }));
}
export function Description(_ref3) {
  var children = _ref3.children;
  return React.createElement(Wrapper, null, React.createElement(StyledDescription, null, children));
}