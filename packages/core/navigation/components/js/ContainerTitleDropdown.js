import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import { itemThemeNamespace } from '@findable/item';
import AkDropdownMenu from '@findable/dropdown-menu';
import ExpandIcon from '@findable/icon/glyph/chevron-down';
import memoizeOne from 'memoize-one';
import AkNavigationItem from './NavigationItem';
import ContainerTitleIcon from '../styled/ContainerTitleIcon';
import ContainerTitleText from '../styled/ContainerTitleText';
import { rootKey } from '../../theme/util';
import overrideItemTheme from '../../theme/create-container-title-item-theme';
var key = itemThemeNamespace;

var ContainerTitleDropdown =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ContainerTitleDropdown, _PureComponent);

  function ContainerTitleDropdown() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ContainerTitleDropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ContainerTitleDropdown)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "withOuterTheme", memoizeOne(function (outerTheme) {
      return overrideItemTheme(outerTheme, key);
    }));

    return _this;
  }

  _createClass(ContainerTitleDropdown, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          icon = _this$props.icon,
          subText = _this$props.subText,
          text = _this$props.text,
          defaultDropdownOpen = _this$props.defaultDropdownOpen,
          isDropdownOpen = _this$props.isDropdownOpen,
          isDropdownLoading = _this$props.isDropdownLoading,
          onDropdownOpenChange = _this$props.onDropdownOpenChange;
      /* eslint-disable react/prop-types */
      // theme is passed in via context and not part of the props API for this component

      var isNavCollapsed = this.props.theme[rootKey] ? this.props.theme[rootKey].isCollapsed : false;
      var theme = this.withOuterTheme(this.props.theme);
      /* eslint-enable react/prop-types */

      return React.createElement(AkDropdownMenu, {
        appearance: "tall",
        shouldFitContainer: !isNavCollapsed,
        position: isNavCollapsed ? 'right top' : 'bottom left',
        shouldFlip: false,
        defaultOpen: defaultDropdownOpen,
        isLoading: isDropdownLoading,
        isOpen: isDropdownOpen,
        onOpenChange: onDropdownOpenChange,
        trigger: React.createElement(ThemeProvider, {
          theme: theme
        }, React.createElement(AkNavigationItem, {
          dropIcon: isNavCollapsed ? null : React.createElement(ExpandIcon, {
            label: "chevron"
          }),
          isDropdownTrigger: true,
          icon: isNavCollapsed ? null : React.createElement(ContainerTitleIcon, null, icon),
          subText: isNavCollapsed ? null : subText,
          text: isNavCollapsed ? React.createElement(ContainerTitleIcon, {
            "aria-label": text
          }, icon) : React.createElement(ContainerTitleText, null, text)
        }))
      }, children);
    }
  }]);

  return ContainerTitleDropdown;
}(PureComponent);

export default withTheme(ContainerTitleDropdown);