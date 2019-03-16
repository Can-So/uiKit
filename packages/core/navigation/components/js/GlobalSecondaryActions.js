import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
export var maxSecondaryItems = 5;

function checkIfTooManySecondaryActions() {
  var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (actions.length > maxSecondaryItems) {
    // eslint-disable-next-line no-console
    console.warn("AkGlobalNavigation will only render up to ".concat(maxSecondaryItems, " secondary actions."));
  }
}

var GlobalSecondaryActions =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GlobalSecondaryActions, _PureComponent);

  function GlobalSecondaryActions(props, context) {
    var _this;

    _classCallCheck(this, GlobalSecondaryActions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlobalSecondaryActions).call(this, props, context));
    checkIfTooManySecondaryActions(props.actions);
    return _this;
  }

  _createClass(GlobalSecondaryActions, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      checkIfTooManySecondaryActions(nextProps.actions);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, this.props.actions.map(function (action, index) {
        return (// eslint-disable-next-line react/no-array-index-key
          index < maxSecondaryItems ? React.createElement("div", {
            key: index
          }, action) : null
        );
      }));
    }
  }]);

  return GlobalSecondaryActions;
}(PureComponent);

export { GlobalSecondaryActions as default };