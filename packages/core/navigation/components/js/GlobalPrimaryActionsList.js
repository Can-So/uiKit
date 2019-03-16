import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
export var maxPrimaryItems = 3;

function checkIfTooManyPrimaryActions() {
  var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (actions.length > maxPrimaryItems) {
    // eslint-disable-next-line no-console
    console.warn("AkGlobalNavigation will only render up to ".concat(maxPrimaryItems, " primary actions."));
  }
}

var GlobalPrimaryActionsList =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GlobalPrimaryActionsList, _PureComponent);

  function GlobalPrimaryActionsList(props, context) {
    var _this;

    _classCallCheck(this, GlobalPrimaryActionsList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlobalPrimaryActionsList).call(this, props, context));
    checkIfTooManyPrimaryActions(props.actions);
    return _this;
  }

  _createClass(GlobalPrimaryActionsList, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      checkIfTooManyPrimaryActions(nextProps.actions);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, this.props.actions.map(function (action, index) {
        return (// eslint-disable-next-line react/no-array-index-key
          index < maxPrimaryItems ? React.createElement("div", {
            key: index
          }, action) : null
        );
      }));
    }
  }]);

  return GlobalPrimaryActionsList;
}(PureComponent);

export { GlobalPrimaryActionsList as default };