import React from 'react';
import { Header, Description } from './common';
export default function Thankyou(_ref) {
  var messages = _ref.messages,
      canClose = _ref.canClose,
      canOptOut = _ref.canOptOut,
      onClose = _ref.onClose,
      onOptOut = _ref.onOptOut;
  return React.createElement("div", null, React.createElement(Header, {
    title: messages.title,
    canClose: canClose,
    canOptOut: canOptOut,
    onClose: onClose,
    onOptOut: onOptOut
  }), React.createElement(Description, null, messages.description));
}