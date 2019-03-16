import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import Blanket from '@atlaskit/blanket';
import { withAnalytics } from '@atlaskit/analytics';
import ScrollLock from 'react-scrolllock';
import DrawerTrigger from './DrawerTrigger';
import DrawerBackIcon from './DrawerBackIcon';
import ContainerHeader from './ContainerHeader';
import DrawerSide from '../styled/DrawerSide';
import DrawerInner from '../styled/DrawerInner';
import DrawerPrimaryIcon from '../styled/DrawerPrimaryIcon';
import DrawerMain from '../styled/DrawerMain';
import DrawerContent from '../styled/DrawerContent';
import DrawerBackIconWrapper from '../styled/DrawerBackIconWrapper';
import { WithRootTheme } from '../../theme/util';
import { container } from '../../theme/presets';
var escKeyCode = 27;
export var analyticsNamespace = 'atlaskit.navigation.drawer';
export var DrawerImpl =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DrawerImpl, _PureComponent);

  function DrawerImpl() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DrawerImpl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DrawerImpl)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isAnimating: false
    });

    _defineProperty(_assertThisInitialized(_this), "createBackButtonHandler", function (method) {
      return function (e) {
        if (_this.props.isOpen) {
          _this.props.onBackButton(e);

          _this.props.fireAnalyticsEvent('close', {
            method: method
          });
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onBackButtonByBackButton", _this.createBackButtonHandler('back-btn'));

    _defineProperty(_assertThisInitialized(_this), "onBackButtonByBlanket", _this.createBackButtonHandler('blanket'));

    _defineProperty(_assertThisInitialized(_this), "onBackButtonByEscKey", _this.createBackButtonHandler('esc-key'));

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      // The reason we have onKeyDown living together with onBackButton is because
      // some apps living in Focused task need the ability to handle on key down by itself.
      // However, some other apps don't really care about it
      // and leave it to the Focused task to handle.
      // Calling onKeyDown first can either supplement or override onBackButton.
      var onKeyDown = _this.props.onKeyDown;

      if (onKeyDown) {
        onKeyDown(event);
      }

      if (!event.defaultPrevented && event.keyCode === escKeyCode) {
        _this.onBackButtonByEscKey(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleAnimationEnd", function () {
      return _this.setState({
        isAnimating: false
      });
    });

    return _this;
  }

  _createClass(DrawerImpl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isOpen !== this.props.isOpen) {
        this.setState({
          isAnimating: true
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Fire analytics event upon drawer opening
      if (!prevProps.isOpen && this.props.isOpen) {
        this.props.fireAnalyticsEvent('open');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    } // eslint-disable-next-line react/sort-comp

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          backIcon = _this$props.backIcon,
          header = _this$props.header,
          isOpen = _this$props.isOpen,
          primaryIcon = _this$props.primaryIcon,
          width = _this$props.width,
          iconOffset = _this$props.iconOffset;
      var actualFullWidth = width === 'full';
      var sidebar = isOpen ? React.createElement(DrawerSide, null, React.createElement(DrawerPrimaryIcon, null, primaryIcon), React.createElement(DrawerBackIconWrapper, {
        iconOffset: iconOffset
      }, React.createElement(DrawerTrigger, {
        onActivate: this.onBackButtonByBackButton
      }, React.createElement(DrawerBackIcon, {
        isVisible: isOpen
      }, backIcon)))) : null;
      var content = isOpen ? React.createElement(DrawerMain, null, React.createElement(ContainerHeader, {
        isInDrawer: true,
        iconOffset: iconOffset,
        isFullWidth: actualFullWidth
      }, width !== 'full' ? header : React.createElement(ScrollLock, null)), React.createElement(DrawerContent, null, this.props.children)) : null; // Note: even though we are using WithRootTheme here, the Drawer appearance is not able
      // to be customised via a preset or custom theme.

      return React.createElement(WithRootTheme, {
        provided: container
      }, React.createElement("div", null, React.createElement(Blanket, {
        isTinted: isOpen,
        canClickThrough: !isOpen,
        onBlanketClicked: this.onBackButtonByBlanket
      }), (this.state.isAnimating || isOpen) && React.createElement(DrawerInner, {
        isOpen: isOpen,
        width: width,
        isAnimating: this.state.isAnimating,
        onAnimationEnd: this.handleAnimationEnd
      }, sidebar, content)));
    }
  }]);

  return DrawerImpl;
}(PureComponent);

_defineProperty(DrawerImpl, "defaultProps", {
  iconOffset: 0,
  isOpen: false,
  onBackButton: function onBackButton() {},
  primaryIcon: null,
  width: 'narrow'
});

export default withAnalytics(DrawerImpl, {}, {
  analyticsId: analyticsNamespace
});