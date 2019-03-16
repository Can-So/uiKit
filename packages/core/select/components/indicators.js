import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { components } from 'react-select';
import Spinner from '@atlaskit/spinner';
import SelectClearIcon from '@atlaskit/icon/glyph/select-clear';
import DownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down'; // indicators

export var ClearIndicator = function ClearIndicator(props) {
  return React.createElement(components.ClearIndicator, props, React.createElement(SelectClearIcon, {
    size: "small",
    primaryColor: "inherit"
  }));
};
export var DropdownIndicator = function DropdownIndicator(props) {
  return React.createElement(components.DropdownIndicator, props, React.createElement(DownIcon, null));
};
export var LoadingIndicator = function LoadingIndicator(props) {
  return React.createElement("div", _extends({
    style: props.getStyles('loadingIndicator', props)
  }, props.innerProps), React.createElement(Spinner, {
    size: "small"
  }));
};