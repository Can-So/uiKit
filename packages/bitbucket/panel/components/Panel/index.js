import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import Button from '@findable/button';
import ChevronDownIcon from '@findable/icon/glyph/chevron-down';
import ChevronRightIcon from '@findable/icon/glyph/chevron-right';
import React, { PureComponent } from 'react';
import AnimateHeight from 'react-animate-height';
import * as styles from './styledPanel';
import Expandable from '../Expandable';

var Panel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Panel, _PureComponent);

  function Panel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Panel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Panel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasFinishedAnimating: true
    });

    _defineProperty(_assertThisInitialized(_this), "onRest", function () {
      _this.setState({
        hasFinishedAnimating: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "togglePanel", function () {
      _this.setState({
        hasFinishedAnimating: false
      });
    });

    return _this;
  }

  _createClass(Panel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          isDefaultExpanded = _this$props.isDefaultExpanded,
          children = _this$props.children,
          header = _this$props.header;
      return React.createElement(Expandable, {
        defaultIsExpanded: isDefaultExpanded
      }, function (_ref) {
        var isExpanded = _ref.isExpanded,
            toggleExpanded = _ref.toggleExpanded;
        return React.createElement(styles.PanelWrapper, null, React.createElement(styles.PanelHeader, {
          onClick: function onClick() {
            _this2.togglePanel();

            toggleExpanded();
          }
        }, React.createElement(styles.ButtonWrapper, {
          isHidden: isExpanded
        }, React.createElement(Button, {
          appearance: "subtle",
          ariaExpanded: isExpanded,
          spacing: "none",
          iconBefore: isExpanded ? React.createElement(ChevronDownIcon, {
            label: "collapse"
          }) : React.createElement(ChevronRightIcon, {
            label: "expand"
          })
        })), React.createElement("span", null, header)), React.createElement(AnimateHeight, {
          duration: 200,
          easing: "linear",
          height: isExpanded ? 'auto' : 0,
          onAnimationEnd: _this2.onRest
        }, children));
      });
    }
  }]);

  return Panel;
}(PureComponent);

_defineProperty(Panel, "defaultProps", {
  isDefaultExpanded: false
});

export { Panel as default };