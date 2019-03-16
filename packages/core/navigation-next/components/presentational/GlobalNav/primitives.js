import { css as _css3 } from "emotion";
import { css as _css2 } from "emotion";
import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { css as _css } from "emotion";
import React from 'react';
import { gridSize as gridSizeFn } from '@findable/theme';
var gridSize = gridSizeFn();
var listBaseStyles = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%'
};
export var PrimaryItemsList = function PrimaryItemsList(props) {
  return React.createElement("div", _extends({
    className: _css(_objectSpread({}, listBaseStyles, {
      paddingBottom: gridSize * 2
    }))
  }, props));
};
var _ref = {
  paddingBottom: gridSize
};
export var FirstPrimaryItemWrapper = function FirstPrimaryItemWrapper(props) {
  return React.createElement("div", _extends({
    className: _css2(_ref)
  }, props));
};
export var SecondaryItemsList = function SecondaryItemsList(props) {
  return React.createElement("div", _extends({
    className: _css3(_objectSpread({}, listBaseStyles, {
      paddingTop: gridSize
    }))
  }, props));
};