import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { css as _css } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import { applyDisabledProperties } from '../../../common/helpers';
export var PageWrapper = function PageWrapper(_ref) {
  var innerRef = _ref.innerRef,
      disableInteraction = _ref.disableInteraction,
      offset = _ref.offset,
      props = _objectWithoutProperties(_ref, ["innerRef", "disableInteraction", "offset"]);

  return React.createElement("div", _extends({
    ref: innerRef,
    className: _css(_objectSpread({
      flex: '1 1 auto',
      marginLeft: offset,
      width: 0
    }, applyDisabledProperties(!!disableInteraction)))
  }, props));
};