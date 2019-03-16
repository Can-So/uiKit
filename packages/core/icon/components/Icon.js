import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { colors } from '@atlaskit/theme';
import { sizes } from '../constants';

var getSize = function getSize(props) {
  if (props.size) {
    return "height: ".concat(sizes[props.size], "; width: ").concat(sizes[props.size], ";");
  }

  return null;
};

export var IconWrapper = styled.span.withConfig({
  displayName: "Icon__IconWrapper",
  componentId: "dyhwwi-0"
})(["\n  ", " color: ", ";\n  display: inline-block;\n  fill: ", ";\n  flex-shrink: 0;\n  line-height: 1;\n\n  > svg {\n    ", " max-height: 100%;\n    max-width: 100%;\n    overflow: hidden;\n    pointer-events: none;\n    vertical-align: bottom;\n  }\n  /* Stop-color doesn't properly apply in chrome when the inherited/current color changes.\n   * We have to initially set stop-color to inherit (either via DOM attribute or an initial CSS\n   * rule) and then override it with currentColor for the color changes to be picked up.\n   */\n  stop {\n    stop-color: currentColor;\n  }\n"], getSize, function (p) {
  return p.primaryColor || 'currentColor';
}, function (p) {
  return p.secondaryColor || colors.background;
}, getSize);

var Icon =
/*#__PURE__*/
function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, _getPrototypeOf(Icon).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Glyph = _this$props.glyph,
          dangerouslySetGlyph = _this$props.dangerouslySetGlyph,
          primaryColor = _this$props.primaryColor,
          secondaryColor = _this$props.secondaryColor,
          size = _this$props.size; // handling the glyphs as strings

      if (dangerouslySetGlyph) {
        return React.createElement(IconWrapper, {
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          size: size,
          "aria-label": this.props.label,
          dangerouslySetInnerHTML: {
            __html: Icon.insertDynamicGradientID(dangerouslySetGlyph)
          }
        });
      } // handling the glyphs when passed through as functions


      return React.createElement(IconWrapper, {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        size: size,
        "aria-label": this.props.label
      }, Glyph ? React.createElement(Glyph, {
        role: "presentation"
      }) : null);
    }
  }], [{
    key: "insertDynamicGradientID",

    /* Icons need unique gradient IDs across instances for different gradient definitions to work
     * correctly.
     * A step in the icon build process replaces linear gradient IDs and their references in paths
     * to a placeholder string so we can replace them with a dynamic ID here.
     * Replacing the original IDs with placeholders in the build process is more robust than not
     * using placeholders as we do not have to rely on regular expressions to find specific element
     * to replace.
     */
    value: function insertDynamicGradientID(svgStr) {
      var id = uuid();
      var replacedSvgStr = svgStr.replace(/id="([^"]+)-idPlaceholder"/g, "id=$1-".concat(id)).replace(/fill="url\(#([^"]+)-idPlaceholder\)"/g, "fill=\"url(#$1-".concat(id, ")\""));
      return replacedSvgStr;
    }
  }]);

  return Icon;
}(Component);

export { Icon as default };
export var size = Object.keys(sizes).reduce(function (p, c) {
  return Object.assign(p, _defineProperty({}, c, c));
}, {});