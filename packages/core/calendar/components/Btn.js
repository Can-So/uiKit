import React from 'react';
import Button from '@atlaskit/button';
export default (function (props) {
  return React.createElement(Button, {
    appearance: "subtle",
    onClick: props.onClick,
    spacing: "none",
    tabIndex: -1,
    iconBefore: props.children
  });
});