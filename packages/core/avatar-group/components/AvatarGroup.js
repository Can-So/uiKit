import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import DropdownMenu, { DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Avatar from '@atlaskit/avatar';
import { Grid, Stack } from '../styled/AvatarGroup';
import MoreIndicator from './MoreIndicator';
import itemTheme from '../theme/itemTheme';
import AvatarGroupItem from './AvatarGroupItem';
var GROUP_COMPONENT = {
  grid: Grid,
  stack: Stack
};
var MAX_COUNT = {
  grid: 11,
  stack: 5
};

var AvatarGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(AvatarGroup, _Component);

  function AvatarGroup() {
    _classCallCheck(this, AvatarGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(AvatarGroup).apply(this, arguments));
  }

  _createClass(AvatarGroup, [{
    key: "renderMoreDropdown",
    value: function renderMoreDropdown(max, total) {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          data = _this$props.data,
          borderColor = _this$props.borderColor,
          onMoreClick = _this$props.onMoreClick,
          showMoreButtonProps = _this$props.showMoreButtonProps,
          onAvatarClick = _this$props.onAvatarClick,
          size = _this$props.size,
          boundariesElement = _this$props.boundariesElement; // bail if there's not enough items

      if (total <= max) return null; // prepare the button -- we'll use it twice

      var MoreButton = function MoreButton(props) {
        return React.createElement(MoreIndicator, _extends({}, showMoreButtonProps, {
          borderColor: borderColor,
          count: total - max,
          isInteractive: true,
          isStack: appearance === 'stack',
          size: size
        }, props));
      }; // bail if the consumer wants to handle onClick


      if (typeof onMoreClick === 'function') {
        return React.createElement(MoreButton, {
          onClick: onMoreClick
        });
      } // crop and prepare the dropdown items


      var items = data.slice(max).map(function (avatar, index) {
        return React.createElement(AvatarGroupItem, {
          isInteractive: true,
          avatar: avatar,
          key: index,
          onAvatarClick: onAvatarClick
        });
      });
      return React.createElement(DropdownMenu, {
        trigger: React.createElement(MoreButton, null),
        position: "bottom right",
        boundariesElement: boundariesElement,
        shouldFlip: true
      }, React.createElement(ThemeProvider, {
        theme: itemTheme
      }, React.createElement(DropdownItemGroup, null, items)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          Item = _this$props2.avatar,
          appearance = _this$props2.appearance,
          borderColor = _this$props2.borderColor,
          data = _this$props2.data,
          maxCount = _this$props2.maxCount,
          onAvatarClick = _this$props2.onAvatarClick,
          size = _this$props2.size; // NOTE: conditionally defaulting the `maxCount` prop based on `appearance`

      var max = maxCount === 0 ? MAX_COUNT[appearance] : maxCount;
      var total = data.length;
      var Group = GROUP_COMPONENT[appearance]; // Render (max - 1) avatars to leave space for moreIndicator

      var maxAvatar = total > max ? max - 1 : max;
      var items = data.slice(0, maxAvatar).map(function (avatar, idx) {
        return React.createElement(Item, _extends({}, avatar, {
          borderColor: borderColor,
          groupAppearance: appearance,
          index: idx,
          key: idx,
          onClick: avatar.onClick || onAvatarClick,
          size: size,
          stackIndex: max - idx
        }));
      });
      return React.createElement(Group, {
        size: size
      }, items, this.renderMoreDropdown(+maxAvatar, total));
    }
  }]);

  return AvatarGroup;
}(Component);

_defineProperty(AvatarGroup, "defaultProps", {
  appearance: 'stack',
  avatar: Avatar,
  maxCount: 0,
  showMoreButtonProps: {},
  size: 'medium'
});

export { AvatarGroup as default };