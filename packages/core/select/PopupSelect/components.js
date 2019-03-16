import { css as _css4 } from "emotion";
import { css as _css3 } from "emotion";
import { css as _css2 } from "emotion";
import _extends from "@babel/runtime/helpers/extends";
import { css as _css } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import { components } from 'react-select';
import { colors, layers } from '@atlaskit/theme';
import SearchIcon from '@atlaskit/icon/glyph/editor/search'; // ==============================
// Styled Components
// ==============================

export var MenuDialog = function MenuDialog(_ref) {
  var maxWidth = _ref.maxWidth,
      minWidth = _ref.minWidth,
      props = _objectWithoutProperties(_ref, ["maxWidth", "minWidth"]);

  var shadow = colors.N40A;
  return React.createElement("div", _extends({
    className: _css({
      backgroundColor: 'white',
      borderRadius: 4,
      boxShadow: "0 0 0 1px ".concat(shadow, ", 0 4px 11px ").concat(shadow),
      maxWidth: maxWidth,
      minWidth: minWidth,
      zIndex: layers.layer()
    })
  }, props));
}; // ==============================
// Custom Components
// ==============================

var _ref2 = {
  marginRight: 2,
  textAlign: 'center',
  width: 32
};

var DropdownIndicator = function DropdownIndicator() {
  return React.createElement("div", {
    className: _css2(_ref2)
  }, React.createElement(SearchIcon, null));
};

var _ref4 = {
  padding: '8px 8px 4px'
};

var Control = function Control(_ref3) {
  var innerRef = _ref3.innerRef,
      innerProps = _ref3.innerProps,
      props = _objectWithoutProperties(_ref3, ["innerRef", "innerProps"]);

  return React.createElement("div", {
    ref: innerRef,
    className: _css3(_ref4)
  }, React.createElement(components.Control, _extends({}, props, {
    innerProps: innerProps
  })));
};

var _ref5 = {
  border: 0,
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: 1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1
};
export var DummyControl = function DummyControl(props) {
  return React.createElement("div", {
    className: _css4(_ref5)
  }, React.createElement(components.Control, props));
}; // NOTE `props` intentionally omitted from `Fragment`
// eslint-disable-next-line

var Menu = function Menu(_ref6) {
  var key = _ref6.key,
      children = _ref6.children,
      innerProps = _ref6.innerProps,
      props = _objectWithoutProperties(_ref6, ["key", "children", "innerProps"]);

  return React.createElement("div", innerProps, children);
};

export var defaultComponents = {
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  Menu: Menu
};