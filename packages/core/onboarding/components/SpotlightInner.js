import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { layers } from '@findable/theme';
import Portal from '@findable/portal';
import ScrollLock from 'react-scrolllock';
import NodeResovler from 'react-node-resolver';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Fade } from './Animation';
import Clone from './Clone';
import SpotlightDialog from './SpotlightDialog';
import { SpotlightTransitionConsumer } from './SpotlightTransition';

var SpotlightInner =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SpotlightInner, _React$Component);

  function SpotlightInner() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SpotlightInner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SpotlightInner)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      // This is only used when targetReplacement is specified.
      // In this case, we have to render the targetReplacement component,
      // get a dom reference from that component, then render again passing
      // that reference into SpotlightDialog (Popper).
      replacementElement: undefined
    });

    return _this;
  }

  _createClass(SpotlightInner, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.targetNode !== this.props.targetNode) {
        scrollIntoView(this.props.targetNode, {
          scrollMode: 'if-needed'
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      scrollIntoView(this.props.targetNode, {
        scrollMode: 'if-needed'
      });
      this.props.onOpened();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.onClosed();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          pulse = _this$props.pulse,
          target = _this$props.target,
          targetNode = _this$props.targetNode,
          targetBgColor = _this$props.targetBgColor,
          targetOnClick = _this$props.targetOnClick,
          targetRadius = _this$props.targetRadius,
          TargetReplacement = _this$props.targetReplacement;
      var replacementElement = this.state.replacementElement;

      var _targetNode$getBoundi = targetNode.getBoundingClientRect(),
          height = _targetNode$getBoundi.height,
          left = _targetNode$getBoundi.left,
          top = _targetNode$getBoundi.top,
          width = _targetNode$getBoundi.width;

      var rect = {
        height: height,
        left: left + window.pageXOffset,
        top: top + window.pageYOffset,
        width: width
      };
      return React.createElement(SpotlightTransitionConsumer, null, function (_ref) {
        var isOpen = _ref.isOpen,
            onExited = _ref.onExited;
        return React.createElement(Portal, {
          zIndex: layers.spotlight() + 1
        }, TargetReplacement ? React.createElement(NodeResovler, {
          innerRef: function innerRef(elem) {
            return _this2.setState({
              replacementElement: elem
            });
          }
        }, React.createElement(TargetReplacement, rect)) : React.createElement(Clone, {
          pulse: pulse,
          target: target,
          rect: rect,
          targetBgColor: targetBgColor,
          targetNode: targetNode,
          targetOnClick: targetOnClick,
          targetRadius: targetRadius
        }), TargetReplacement && !replacementElement ? null : React.createElement(Fade, {
          in: isOpen,
          onExited: onExited
        }, function (animationStyles) {
          return React.createElement(SpotlightDialog, _extends({}, _this2.props, {
            targetNode: replacementElement || targetNode,
            animationStyles: animationStyles
          }));
        }), React.createElement(ScrollLock, null));
      });
    }
  }]);

  return SpotlightInner;
}(React.Component);

_defineProperty(SpotlightInner, "defaultProps", {
  dialogWidth: 400,
  pulse: true
});

export default SpotlightInner;