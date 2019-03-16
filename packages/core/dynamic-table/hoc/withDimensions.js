import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
// Compute height and width of wrapped component before ranking
export default function withDimensions(WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(WithDimensions, _Component);

      function WithDimensions() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, WithDimensions);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithDimensions)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_this), "ref", void 0);

        _defineProperty(_assertThisInitialized(_this), "state", {
          refWidth: 0,
          refHeight: 0
        });

        _defineProperty(_assertThisInitialized(_this), "innerRef", function (ref) {
          if (ref !== null && !_this.props.isRanking) {
            _this.ref = ref;
          }
        });

        _defineProperty(_assertThisInitialized(_this), "updateDimensions", function () {
          if (!_this.ref) {
            return;
          }

          var clientRect = _this.ref.getBoundingClientRect();

          var width = clientRect.width;
          var height = clientRect.height;

          if (width !== _this.state.refWidth || height !== _this.state.refHeight) {
            _this.setState({
              refWidth: width,
              refHeight: height
            });
          }
        });

        return _this;
      }

      _createClass(WithDimensions, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          var wasRanking = this.props.isRanking;
          var willRanking = nextProps.isRanking;

          if (willRanking && !wasRanking) {
            this.updateDimensions();
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _this$state = this.state,
              refWidth = _this$state.refWidth,
              refHeight = _this$state.refHeight;
          return React.createElement(WrappedComponent, _extends({
            refWidth: refWidth,
            refHeight: refHeight,
            innerRef: this.innerRef
          }, this.props));
        }
      }]);

      return WithDimensions;
    }(Component)
  );
}