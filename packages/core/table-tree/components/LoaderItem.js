import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Spinner from '@findable/spinner';
import { Cell, TreeRowContainer, LoaderItemContainer } from '../styled';

var LoaderItem =
/*#__PURE__*/
function (_Component) {
  _inherits(LoaderItem, _Component);

  function LoaderItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoaderItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoaderItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      phase: 'loading'
    });

    return _this;
  }

  _createClass(LoaderItem, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.phase === 'loading' && this.state.phase === 'complete') {
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isCompleting = _this$props.isCompleting,
          depth = _this$props.depth;
      var phase = this.state.phase;
      return phase === 'loading' ? React.createElement(TreeRowContainer, null, React.createElement(Cell, {
        indentLevel: depth,
        width: '100%'
      }, React.createElement(LoaderItemContainer, {
        isRoot: depth === 1
      }, React.createElement(Spinner, {
        isCompleting: isCompleting,
        size: "small",
        invertColor: false
      })))) : null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.isCompleting && prevState.phase === 'loading') {
        return {
          phase: 'complete'
        };
      }

      return null;
    }
  }]);

  return LoaderItem;
}(Component);

_defineProperty(LoaderItem, "defaultProps", {
  depth: 1
});

export { LoaderItem as default };