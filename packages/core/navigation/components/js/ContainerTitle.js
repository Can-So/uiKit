import _extends from "@babel/runtime/helpers/extends";
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
import memoizeOne from 'memoize-one';
import AkNavigationItem from './NavigationItem';
import ContainerTitleIcon from '../styled/ContainerTitleIcon';
import ContainerTitleText from '../styled/ContainerTitleText';
import { rootKey } from '../../theme/util';
import overrideItemTheme from '../../theme/create-container-title-item-theme';
var key = itemThemeNamespace;

var ContainerTitle =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ContainerTitle, _PureComponent);

  function ContainerTitle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ContainerTitle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ContainerTitle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "withOuterTheme", memoizeOne(function (outerTheme) {
      return overrideItemTheme(outerTheme, key);
    }));

    return _this;
  }

  _createClass(ContainerTitle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          text = _this$props.text,
          subText = _this$props.subText,
          icon = _this$props.icon;
      /* eslint-disable react/prop-types */
      // theme is passed in via context and not part of the props API for this component

      var isNavCollapsed = this.props.theme[rootKey] ? this.props.theme[rootKey].isCollapsed : false;
      var theme = this.withOuterTheme(this.props.theme);
      /* eslint-enable react/prop-types */

      var interactiveWrapperProps = {
        onClick: this.props.onClick,
        onKeyDown: this.props.onKeyDown,
        onMouseEnter: this.props.onMouseEnter,
        onMouseLeave: this.props.onMouseLeave,
        href: this.props.href,
        linkComponent: this.props.linkComponent
      };
      return React.createElement(ThemeProvider, {
        theme: theme
      }, React.createElement(AkNavigationItem, _extends({
        icon: isNavCollapsed ? null : React.createElement(ContainerTitleIcon, null, icon),
        subText: isNavCollapsed ? null : subText,
        text: isNavCollapsed ? React.createElement(ContainerTitleIcon, {
          "aria-label": text
        }, icon) : React.createElement(ContainerTitleText, null, text)
      }, interactiveWrapperProps)));
    }
  }]);

  return ContainerTitle;
}(PureComponent);

export default withTheme(ContainerTitle);