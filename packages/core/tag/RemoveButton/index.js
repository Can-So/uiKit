import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import RemoveIcon from '@atlaskit/icon/glyph/cross';
import { Button } from './styled';

var RemoveButton =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RemoveButton, _PureComponent);

  function RemoveButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RemoveButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RemoveButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onKeyPress", function (e) {
      var spacebarOrEnter = e.key === ' ' || e.key === 'Enter';

      if (spacebarOrEnter) {
        e.stopPropagation();

        if (_this.props.onRemoveAction) {
          _this.props.onRemoveAction();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function () {
      if (_this.props.onHoverChange) _this.props.onHoverChange(true);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOut", function () {
      if (_this.props.onHoverChange) _this.props.onHoverChange(false);
    });

    return _this;
  }

  _createClass(RemoveButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isRounded = _this$props.isRounded,
          onRemoveAction = _this$props.onRemoveAction,
          removeText = _this$props.removeText;
      return React.createElement(Button, {
        "aria-label": removeText,
        isRounded: isRounded,
        onClick: onRemoveAction,
        onKeyPress: this.onKeyPress,
        onMouseOut: this.onMouseOut,
        onMouseOver: this.onMouseOver,
        type: "button"
      }, React.createElement(RemoveIcon, {
        label: removeText,
        size: "small"
      }));
    }
  }]);

  return RemoveButton;
}(PureComponent);

export { RemoveButton as default };