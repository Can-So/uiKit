import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import Button from '@findable/button';
import DropdownMenu, { DropdownItem } from '@findable/dropdown-menu';
import { Checkbox } from '@findable/checkbox';
import { Header, Description } from './common';
import { Wrapper, ButtonWrapper } from './styled/common';
import { Contact, RoleQuestion } from './styled/followup';
export var RoleDropdown = function RoleDropdown(_ref) {
  var roles = _ref.roles,
      placeholder = _ref.placeholder,
      selected = _ref.selected,
      onRoleSelect = _ref.onRoleSelect;
  var trigger = selected ? selected : placeholder;
  return React.createElement(DropdownMenu, {
    trigger: trigger,
    triggerType: "button"
  }, roles.map(function (role) {
    return React.createElement(DropdownItem, {
      key: "nps-item-".concat(role),
      isSelected: role === selected,
      onClick: function onClick() {
        onRoleSelect(role);
      }
    }, role);
  }));
};

var Followup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Followup, _React$Component);

  function Followup(props) {
    var _this;

    _classCallCheck(this, Followup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Followup).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onRoleSelect", function (role) {
      _this.setState({
        role: role
      });

      _this.props.onRoleSelect(role);
    });

    _defineProperty(_assertThisInitialized(_this), "onAllowContactChange", function (e) {
      var allowContact = e.isChecked;

      _this.setState({
        allowContact: allowContact
      });

      _this.props.onAllowContactChange(allowContact);
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function () {
      var _this$state = _this.state,
          role = _this$state.role,
          allowContact = _this$state.allowContact;

      _this.props.onSubmit({
        role: role,
        allowContact: allowContact
      });
    });

    _this.state = {
      role: null,
      allowContact: false
    };
    return _this;
  }

  _createClass(Followup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          messages = _this$props.messages,
          canClose = _this$props.canClose,
          onClose = _this$props.onClose,
          canOptOut = _this$props.canOptOut,
          onOptOut = _this$props.onOptOut,
          roles = _this$props.roles;
      return React.createElement("div", null, React.createElement(Header, {
        title: messages.title,
        canClose: canClose,
        onClose: onClose,
        canOptOut: canOptOut,
        onOptOut: onOptOut,
        optOutLabel: messages.optOut
      }), React.createElement(Description, null, messages.description), React.createElement(Wrapper, null, React.createElement(RoleQuestion, null, this.props.messages.roleQuestion), React.createElement(RoleDropdown, {
        roles: roles,
        onRoleSelect: this.onRoleSelect,
        selected: this.state.role,
        placeholder: messages.rolePlaceholder
      }), React.createElement(Contact, null, React.createElement(Checkbox, {
        name: "nps-contact-me",
        value: "Allow Contact",
        label: messages.contactQuestion,
        onChange: this.onAllowContactChange
      }))), React.createElement(Wrapper, null, React.createElement(ButtonWrapper, null, React.createElement(Button, {
        appearance: "primary",
        onClick: this.onSubmit
      }, messages.send))));
    }
  }]);

  return Followup;
}(React.Component);

_defineProperty(Followup, "defaultProps", {
  onRoleSelect: function onRoleSelect() {},
  onAllowContactChange: function onAllowContactChange() {}
});

export { Followup as default };