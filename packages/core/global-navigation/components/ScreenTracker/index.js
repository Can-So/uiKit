import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Component } from 'react';
import { withAnalyticsEvents } from '@findable/analytics-next';
import { NAVIGATION_CHANNEL } from '../../constants';

/** Fires a screen event when the screen becomes visible */
export var ScreenTrackerBase =
/*#__PURE__*/
function (_Component) {
  _inherits(ScreenTrackerBase, _Component);

  function ScreenTrackerBase() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ScreenTrackerBase);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScreenTrackerBase)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "fireScreenEvent", function () {
      var _this$props = _this.props,
          name = _this$props.name,
          createAnalyticsEvent = _this$props.createAnalyticsEvent;
      createAnalyticsEvent({
        eventType: 'screen',
        name: name
      }).fire(NAVIGATION_CHANNEL);
    });

    return _this;
  }

  _createClass(ScreenTrackerBase, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.isVisible) {
        this.fireScreenEvent();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.isVisible && this.props.isVisible) {
        this.fireScreenEvent();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return ScreenTrackerBase;
}(Component);
export default withAnalyticsEvents()(ScreenTrackerBase);