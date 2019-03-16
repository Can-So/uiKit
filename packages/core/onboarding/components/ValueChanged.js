import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';

// This component was born from the pain of using render props in lifecycle methods.
// On update, it checks whether the current value prop is equal to the previous value prop.
// If they are different, it calls the onChange function.
// We use this for updating Popper when the SpotlightDialog width changes.
var ValueChanged =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ValueChanged, _React$Component);

  function ValueChanged() {
    _classCallCheck(this, ValueChanged);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValueChanged).apply(this, arguments));
  }

  _createClass(ValueChanged, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.props.onChange();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return ValueChanged;
}(React.Component);

export { ValueChanged as default };