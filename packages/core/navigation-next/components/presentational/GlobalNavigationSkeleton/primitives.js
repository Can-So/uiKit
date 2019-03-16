import { css as _css4 } from "emotion";
import { css as _css3 } from "emotion";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { css as _css2 } from "emotion";
import _extends from "@babel/runtime/helpers/extends";
import { css as _css } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
var gridSize = gridSizeFn();
var listBaseStyles = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%'
};
export var Container = function Container(props) {
  var styles = props.styles,
      rest = _objectWithoutProperties(props, ["styles"]);

  return React.createElement("div", _extends({
    className: _css(styles)
  }, rest));
};
export var PrimaryItemsList = function PrimaryItemsList(props) {
  return React.createElement("div", _extends({
    className: _css2(_objectSpread({}, listBaseStyles, {
      paddingBottom: gridSize * 2
    }))
  }, props));
};
var _ref = {
  paddingBottom: gridSize * 1.75
};
export var FirstPrimaryItemWrapper = function FirstPrimaryItemWrapper(props) {
  return React.createElement("div", _extends({
    className: _css3(_ref)
  }, props));
};
export var SecondaryItemsList = function SecondaryItemsList(props) {
  return React.createElement("div", _extends({
    className: _css4(_objectSpread({}, listBaseStyles, {
      paddingTop: gridSize
    }))
  }, props));
};