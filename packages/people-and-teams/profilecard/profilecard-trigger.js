import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import AkLayer from '@findable/layer';
import PositionWrapper from './components/PositionWrapper';
import withOuterListeners from './components/withOuterListeners';
import AkProfilecardResourced from './profilecard-resourced';
import { AnimationWrapper } from './styled/Trigger';
var AkLayerWithOuterListeners = withOuterListeners(AkLayer);

var ProfilecardTrigger =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ProfilecardTrigger, _PureComponent);

  function ProfilecardTrigger() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ProfilecardTrigger);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ProfilecardTrigger)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "showDelay", 500);

    _defineProperty(_assertThisInitialized(_this), "hideDelay", 500);

    _defineProperty(_assertThisInitialized(_this), "showTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "hideTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      visible: false,
      isFlipped: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleLayerFlipChange", function (_ref) {
      var flipped = _ref.flipped;

      _this.setState({
        isFlipped: flipped
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hideProfilecard", function () {
      clearTimeout(_this.showTimer);
      _this.hideTimer = setTimeout(function () {
        _this.setState({
          visible: false
        });
      }, _this.hideDelay);
    });

    _defineProperty(_assertThisInitialized(_this), "showProfilecard", function () {
      clearTimeout(_this.hideTimer);
      _this.showTimer = setTimeout(function () {
        _this.setState({
          visible: true
        });
      }, _this.showDelay);
    });

    return _this;
  }

  _createClass(ProfilecardTrigger, [{
    key: "renderProfilecard",
    value: function renderProfilecard() {
      return React.createElement(PositionWrapper, {
        position: this.props.position,
        isFlipped: this.state.isFlipped
      }, React.createElement(AnimationWrapper, {
        position: this.props.position,
        isFlipped: this.state.isFlipped
      }, React.createElement(AkProfilecardResourced, {
        userId: this.props.userId,
        cloudId: this.props.cloudId,
        resourceClient: this.props.resourceClient,
        actions: this.props.actions,
        analytics: this.props.analytics
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          position = _this$props.position,
          trigger = _this$props.trigger;
      var Layer = trigger === 'hover' ? AkLayer : AkLayerWithOuterListeners;
      var containerListeners = {};
      var layerListeners = {};

      if (trigger === 'hover') {
        containerListeners.onMouseEnter = this.showProfilecard;
        containerListeners.onMouseLeave = this.hideProfilecard;
      } else {
        containerListeners.onClick = this.showProfilecard;
        layerListeners.handleClickOutside = this.hideProfilecard;
        layerListeners.handleEscapeKeydown = this.hideProfilecard;
      }

      return React.createElement("div", _extends({
        style: {
          display: 'inline-block',
          maxWidth: '100%'
        }
      }, containerListeners), this.state.visible ? React.createElement(Layer, _extends({
        autoFlip: true,
        content: this.renderProfilecard(),
        offset: "0 4",
        onFlippedChange: this.handleLayerFlipChange,
        position: position
      }, layerListeners), children) : children);
    }
  }]);

  return ProfilecardTrigger;
}(PureComponent);

_defineProperty(ProfilecardTrigger, "defaultProps", {
  position: 'top left',
  actions: [],
  trigger: 'hover'
});

export { ProfilecardTrigger as default };