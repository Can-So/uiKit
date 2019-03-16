import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import IconLocation from '@findable/icon/glyph/location';
import IconRecent from '@findable/icon/glyph/recent';
import IconMention from '@findable/icon/glyph/mention';
import IconEmail from '@findable/icon/glyph/email';
import OfficeBuildingIcon from '@findable/icon/glyph/office-building';
import { DetailsLabel, DetailsLabelIcon, DetailsLabelText } from '../styled/Card';
var icons = {
  location: IconLocation,
  time: IconRecent,
  mention: IconMention,
  email: IconEmail,
  companyName: OfficeBuildingIcon
};

var IconLabel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(IconLabel, _PureComponent);

  function IconLabel() {
    _classCallCheck(this, IconLabel);

    return _possibleConstructorReturn(this, _getPrototypeOf(IconLabel).apply(this, arguments));
  }

  _createClass(IconLabel, [{
    key: "render",
    value: function render() {
      if (!this.props.children) {
        return null;
      }

      var IconElement = this.props.icon && icons[this.props.icon];
      var displayIcon = IconElement ? React.createElement(IconElement, {
        label: "icon ".concat(this.props.icon),
        size: "small"
      }) : null;
      return React.createElement(DetailsLabel, null, React.createElement(DetailsLabelIcon, null, displayIcon), React.createElement(DetailsLabelText, null, this.props.children));
    }
  }]);

  return IconLabel;
}(PureComponent);

_defineProperty(IconLabel, "defaultProps", {
  icon: ''
});

export { IconLabel as default };