import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import DropdownMenu from '@atlaskit/dropdown-menu';
import Item from '@atlaskit/item';
import MoreVerticalIcon from '@atlaskit/icon/glyph/more-vertical';
import Tooltip from '@atlaskit/tooltip';
import OverflowDropdownButtonWrapper from '../../styled/OverflowDropdownButtonWrapper';
import { isDropdownOverflowKey } from '../../../theme/util';

var theme = _defineProperty({}, isDropdownOverflowKey, true);

var OverflowDropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(OverflowDropdown, _Component);

  function OverflowDropdown(props, context) {
    var _this;

    _classCallCheck(this, OverflowDropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OverflowDropdown).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "handleDropdownToggle", function (_ref) {
      var isOpen = _ref.isOpen;

      _this.setState({
        isOpen: isOpen
      });
    });

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  _createClass(OverflowDropdown, [{
    key: "render",
    value: function render() {
      // The OverflowDropdownButtonWrapper is used to control the width of the button, because
      // setting DropdownMenu.shouldFitContainer causes the dropdown layer to receive the same
      // constrained width as the button, which is way too small. This can be fixed in the
      // @atlaskit/dropdown-menu component then OverflowDropdownButtonWrapper can be removed.
      var dropdownTrigger = React.createElement(OverflowDropdownButtonWrapper, null, React.createElement(Item, {
        "aria-haspopup": "true",
        "aria-expanded": this.state.isOpen
      }, React.createElement(MoreVerticalIcon, {
        size: "small",
        label: "More items"
      })));
      return React.createElement(ThemeProvider, {
        theme: theme
      }, React.createElement(DropdownMenu, {
        onOpenChange: this.handleDropdownToggle,
        shouldFlip: false,
        trigger: this.state.isOpen ? dropdownTrigger : React.createElement(Tooltip, {
          content: "Show more",
          position: "right"
        }, dropdownTrigger),
        position: "right bottom"
      }, this.props.children));
    }
  }]);

  return OverflowDropdown;
}(Component);

export { OverflowDropdown as default };