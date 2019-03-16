import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Children, cloneElement, Component } from 'react';
import { Transition } from 'react-transition-group';
import Portal from '@findable/portal';
import { layers } from '@findable/theme';
import Wrapper from '../../styled/Wrapper';
import Group, { SROnly, Inner } from './styledFlagGroup';

var FlagGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(FlagGroup, _Component);

  function FlagGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FlagGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FlagGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function () {
      var _this$props = _this.props,
          children = _this$props.children,
          onDismissed = _this$props.onDismissed;
      return Children.map(children, function (flag, idx) {
        var isDismissAllowed = idx === 0;
        var id = flag.props.id;
        return React.createElement(Transition, {
          key: id,
          addEndListener: function addEndListener(node, done) {
            node.addEventListener('animationend', done);
          }
        }, function (transitionState) {
          return React.createElement(Wrapper, {
            transitionState: transitionState
          }, cloneElement(flag, {
            onDismissed: onDismissed,
            isDismissAllowed: isDismissAllowed
          }));
        });
      });
    });

    return _this;
  }

  _createClass(FlagGroup, [{
    key: "render",
    value: function render() {
      return React.createElement(Portal, {
        zIndex: layers.flag()
      }, React.createElement(Group, null, React.createElement(SROnly, null, "Flag notifications"), React.createElement(Inner, {
        component: "div"
      }, this.renderChildren())));
    }
  }]);

  return FlagGroup;
}(Component);

export { FlagGroup as default };