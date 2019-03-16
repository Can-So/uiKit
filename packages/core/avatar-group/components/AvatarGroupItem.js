import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { DropdownItem } from '@findable/dropdown-menu';
import Avatar, { withPseudoState, getProps } from '@findable/avatar';

var AvatarGroupItem =
/*#__PURE__*/
function (_Component) {
  _inherits(AvatarGroupItem, _Component);

  function AvatarGroupItem() {
    _classCallCheck(this, AvatarGroupItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(AvatarGroupItem).apply(this, arguments));
  }

  _createClass(AvatarGroupItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          avatar = _this$props.avatar,
          onAvatarClick = _this$props.onAvatarClick;

      var href = avatar.href,
          rest = _objectWithoutProperties(avatar, ["href"]);

      var enhancedProps = getProps(this);
      return React.createElement(DropdownItem, _extends({
        isInteractive: true
      }, enhancedProps, {
        elemBefore: React.createElement(Avatar, _extends({}, rest, {
          borderColor: "transparent",
          enableTooltip: false,
          size: "small"
        })),
        href: href,
        onClick: function onClick(event) {
          if (typeof onAvatarClick === 'function') {
            onAvatarClick({
              event: event,
              item: avatar
            });
          }
        },
        rel: avatar.target ? 'noopener noreferrer' : null,
        target: avatar.target
      }), avatar.name);
    }
  }]);

  return AvatarGroupItem;
}(Component);

export default withPseudoState(AvatarGroupItem);