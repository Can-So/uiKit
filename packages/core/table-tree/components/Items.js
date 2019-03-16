import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Item from './Item';
import LoaderItem from './LoaderItem';

var Items =
/*#__PURE__*/
function (_Component) {
  _inherits(Items, _Component);

  function Items() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Items);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Items)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoaderShown: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleLoaderComplete", function () {
      _this.setState({
        isLoaderShown: false
      });
    });

    return _this;
  }

  _createClass(Items, [{
    key: "renderLoader",
    value: function renderLoader() {
      var _this$props = this.props,
          depth = _this$props.depth,
          items = _this$props.items;
      return React.createElement(LoaderItem, {
        isCompleting: !!(items && items.length),
        onComplete: this.handleLoaderComplete,
        depth: depth + 1
      });
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this$props2 = this.props,
          render = _this$props2.render,
          items = _this$props2.items,
          _this$props2$depth = _this$props2.depth,
          depth = _this$props2$depth === void 0 ? 0 : _this$props2$depth;
      return items && items.map(function (itemData, index) {
        return React.createElement(Item, {
          data: itemData,
          depth: depth + 1,
          key: itemData && itemData.id || index,
          render: render
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var isLoaderShown = this.state.isLoaderShown;
      var busyAttrs = isLoaderShown ? {
        'aria-busy': true,
        'aria-live': 'polite'
      } : {};
      return React.createElement("div", _extends({
        role: 'rowgroup'
      }, busyAttrs), isLoaderShown ? this.renderLoader() : this.renderItems());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (!nextProps.items && !prevState.isLoaderShown) {
        return {
          isLoaderShown: true
        };
      }

      return null;
    }
  }]);

  return Items;
}(Component);

_defineProperty(Items, "defaultProps", {
  depth: 0
});

export { Items as default };