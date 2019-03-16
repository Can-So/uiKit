import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import getDisplayName from '../../util/getDisplayName';
import DropdownItemSelectionManager from '../context/DropdownItemSelectionManager';

// HOC that typically wraps @atlaskit/item/ItemGroup
var withDropdownItemSelectionManager = function withDropdownItemSelectionManager(WrappedComponent, selectionBehavior) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithDropdownItemSelectionManager, _Component);

    function WithDropdownItemSelectionManager() {
      _classCallCheck(this, WithDropdownItemSelectionManager);

      return _possibleConstructorReturn(this, _getPrototypeOf(WithDropdownItemSelectionManager).apply(this, arguments));
    }

    _createClass(WithDropdownItemSelectionManager, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            id = _this$props.id,
            otherProps = _objectWithoutProperties(_this$props, ["children", "id"]);

        return React.createElement(WrappedComponent, otherProps, React.createElement(DropdownItemSelectionManager, {
          groupId: id,
          behavior: selectionBehavior
        }, children));
      }
    }]);

    return WithDropdownItemSelectionManager;
  }(Component), _defineProperty(_class, "displayName", "WithDropdownItemSelectionManager(".concat(getDisplayName(WrappedComponent), ")")), _temp;
};

export default withDropdownItemSelectionManager;