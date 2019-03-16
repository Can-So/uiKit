import { css as _css2 } from "emotion";
import _extends from "@babel/runtime/helpers/extends";
import { css as _css } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import { layers } from '@atlaskit/theme';
export var LayoutContainer = function LayoutContainer(_ref) {
  var topOffset = _ref.topOffset,
      props = _objectWithoutProperties(_ref, ["topOffset"]);

  return React.createElement("div", _extends({
    className: _css({
      display: 'flex',
      flexDirection: 'row',
      height: "calc(100vh - ".concat(topOffset || 0, "px)")
    })
  }, props));
};
export var NavigationContainer = function NavigationContainer(_ref2) {
  var topOffset = _ref2.topOffset,
      innerRef = _ref2.innerRef,
      props = _objectWithoutProperties(_ref2, ["topOffset", "innerRef"]);

  return React.createElement("div", _extends({
    ref: innerRef,
    className: _css2({
      bottom: 0,
      display: 'flex',
      flexDirection: 'row',
      left: 0,
      position: 'fixed',
      top: topOffset,
      zIndex: layers.navigation(),
      height: "calc(100vh - ".concat(topOffset, "px)")
    })
  }, props));
}; // Resizable Elements can be disabled