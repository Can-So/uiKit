import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { Span } from './styled';

var Chrome =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Chrome, _PureComponent);

  function Chrome() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Chrome);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Chrome)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "chromeRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleKeyPress", function (e) {
      var spacebarOrEnter = e.key === ' ' || e.key === 'Enter';

      if (_this.chromeRef && spacebarOrEnter) {
        var link = _this.chromeRef.querySelector('a');

        if (link) link.click();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function () {
      _this.props.onFocusChange(false);
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (e) {
      if (e.target === _this.chromeRef) _this.props.onFocusChange(true);
    });

    return _this;
  }

  _createClass(Chrome, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          isLink = _this$props.isLink,
          isRemovable = _this$props.isRemovable,
          isRemoved = _this$props.isRemoved,
          isRemoving = _this$props.isRemoving,
          isRounded = _this$props.isRounded,
          markedForRemoval = _this$props.markedForRemoval,
          color = _this$props.color;
      var props = {
        innerRef: function innerRef(r) {
          _this2.chromeRef = r;
        },
        isRemovable: isRemovable,
        isRemoved: isRemoved,
        isRemoving: isRemoving,
        isRounded: isRounded,
        markedForRemoval: markedForRemoval,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyPress: this.handleKeyPress,
        tabIndex: -1,
        color: color,
        role: ''
      };

      if (isLink) {
        props.role = 'link';
        props.tabIndex = 0;
      }

      return React.createElement(Span, props, children);
    }
  }]);

  return Chrome;
}(PureComponent);

export { Chrome as default };