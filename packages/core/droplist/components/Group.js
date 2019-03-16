import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import Group, { Heading, HeadingText, HeadingAfter } from '../styled/Group';

var DroplistGroup =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DroplistGroup, _PureComponent);

  function DroplistGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DroplistGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DroplistGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      ariaLabel: _this.props.heading
    });

    _defineProperty(_assertThisInitialized(_this), "headingElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      if (_this.props.heading || _this.props.elemAfter) {
        _this.setState({
          ariaLabel: _this.getAriaLabel()
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      if (_this.props.heading || _this.props.elemAfter) {
        _this.setState({
          ariaLabel: _this.getAriaLabel()
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getAriaLabel", function () {
      var _this$props = _this.props,
          elemAfter = _this$props.elemAfter,
          heading = _this$props.heading;
      var afterText = elemAfter && typeof elemAfter === 'string' ? elemAfter : _this.headingElement && _this.headingElement.textContent;
      return "".concat(heading || '', " ").concat(afterText || '');
    });

    return _this;
  }

  _createClass(DroplistGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          elemAfter = _this$props2.elemAfter,
          heading = _this$props2.heading;
      var ariaLabel = this.state.ariaLabel;
      return React.createElement(Group, {
        "aria-label": ariaLabel,
        role: "group"
      }, heading ? React.createElement(Heading, {
        "aria-hidden": "true",
        "data-role": "droplistGroupHeading"
      }, React.createElement(HeadingText, null, heading), elemAfter ? React.createElement(HeadingAfter, {
        innerRef: function innerRef(r) {
          _this2.headingElement = r;
        }
      }, elemAfter) : null) : null, children);
    }
  }]);

  return DroplistGroup;
}(PureComponent);

DroplistGroup.displayName = 'Group';
export default DroplistGroup;