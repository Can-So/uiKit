import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';

var DefaultBaseComponent = function DefaultBaseComponent(props) {
  return React.createElement("div", props);
};

var withContextFromProps = function withContextFromProps(propTypes) {
  var BaseComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DefaultBaseComponent;

  var ContextProps =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ContextProps, _Component);

    function ContextProps() {
      _classCallCheck(this, ContextProps);

      return _possibleConstructorReturn(this, _getPrototypeOf(ContextProps).apply(this, arguments));
    }

    _createClass(ContextProps, [{
      key: "getChildContext",
      value: function getChildContext() {
        var _this = this;

        var props = Object.keys(propTypes).reduce(function (result, key) {
          // eslint-disable-next-line no-param-reassign
          if (key !== 'children') result[key] = _this.props[key];
          return result;
        }, {});
        return props;
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            props = _objectWithoutProperties(_this$props, ["children"]);

        if (BaseComponent !== null) {
          return React.createElement(BaseComponent, null, this.props.children);
        } else if (React.Children.count(children) === 1) {
          var onlyChild = children; // Hacky fix to work with TransitionGroup in withRenderTarget

          return React.Children.only(React.cloneElement(onlyChild, props));
        }

        throw Error('Only one child should exist when base component is null');
      }
    }]);

    return ContextProps;
  }(Component);

  ContextProps.displayName = 'withContextFromProps';
  ContextProps.childContextTypes = propTypes;
  return ContextProps;
};

export default withContextFromProps;