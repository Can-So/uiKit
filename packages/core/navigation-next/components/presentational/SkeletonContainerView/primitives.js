import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { css as _css } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
var gridSize = gridSizeFn();
export var Container = function Container(props) {
  return React.createElement("div", props);
};
export var HeaderContainer = function HeaderContainer(props) {
  var styles = props.styles,
      rest = _objectWithoutProperties(props, ["styles"]);

  return React.createElement("div", _extends({
    className: _css(_objectSpread({}, styles, {
      paddingTop: gridSize * 2.5,
      paddingBottom: gridSize * 2.5
    }))
  }, rest));
};