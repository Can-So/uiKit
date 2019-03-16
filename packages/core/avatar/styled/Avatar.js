import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@atlaskit/theme';
import { Theme } from '../theme';
import { getInnerStyles } from './utils';
export default (function (props) {
  return React.createElement(Theme.Consumer, _extends({}, props, {
    includeBorderWidth: true
  }), function (_ref) {
    var dimensions = _ref.dimensions;
    return React.createElement("div", {
      style: _objectSpread({
        display: 'inline-block',
        position: 'relative',
        outline: 0,
        zIndex: props.stackIndex
      }, dimensions)
    }, props.children);
  });
}); // TODO this doesn't appear to be used anywhere so we should look at removing.

export var Inner = withTheme(styled.div.withConfig({
  displayName: "Avatar__Inner",
  componentId: "r9c9gb-0"
})(["\n  ", ";\n"], getInnerStyles));
export var PresenceWrapper = function PresenceWrapper(props) {
  return React.createElement(Theme.Consumer, _extends({}, props, {
    includeBorderWidth: true
  }), function (_ref2) {
    var presence = _ref2.presence;
    return React.createElement("span", {
      style: _objectSpread({
        pointerEvents: 'none',
        position: 'absolute'
      }, presence)
    }, props.children);
  });
};
export var StatusWrapper = function StatusWrapper(props) {
  return React.createElement(Theme.Consumer, _extends({}, props, {
    includeBorderWidth: true
  }), function (_ref3) {
    var status = _ref3.status;
    return React.createElement("span", {
      style: _objectSpread({
        position: 'absolute'
      }, status)
    }, props.children);
  });
};