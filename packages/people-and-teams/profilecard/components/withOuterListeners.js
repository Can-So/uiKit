import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
export default function withOuterListeners(Component) {
  return (
    /*#__PURE__*/
    function (_PureComponent) {
      _inherits(WithOutsideClick, _PureComponent);

      function WithOutsideClick() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, WithOutsideClick);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithOutsideClick)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_this), "handleClick", function (evt) {
          var domNode = ReactDOM.findDOMNode(_assertThisInitialized(_this)); // eslint-disable-line react/no-find-dom-node

          if (!domNode || evt.target instanceof Node && !domNode.contains(evt.target)) {
            _this.props.handleClickOutside();
          }
        });

        _defineProperty(_assertThisInitialized(_this), "handleKeydown", function (evt) {
          if (evt.code === 'Escape') {
            _this.props.handleEscapeKeydown();
          }
        });

        return _this;
      }

      _createClass(WithOutsideClick, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          if (this.props.handleClickOutside) {
            document.addEventListener('click', this.handleClick, false);
          }

          if (this.props.handleEscapeKeydown) {
            document.addEventListener('keydown', this.handleKeydown, false);
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this.props.handleClickOutside) {
            document.removeEventListener('click', this.handleClick, false);
          }

          if (this.props.handleEscapeKeydown) {
            document.removeEventListener('keydown', this.handleKeydown, false);
          }
        }
      }, {
        key: "render",
        value: function render() {
          return React.createElement(Component, this.props);
        }
      }]);

      return WithOutsideClick;
    }(PureComponent)
  );
}