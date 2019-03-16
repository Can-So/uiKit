import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _get from "@babel/runtime/helpers/get";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import AnalyticsEvent from './AnalyticsEvent';
var _console = console,
    warn = _console.warn;

var UIAnalyticsEvent =
/*#__PURE__*/
function (_AnalyticsEvent) {
  _inherits(UIAnalyticsEvent, _AnalyticsEvent);

  function UIAnalyticsEvent(props) {
    var _this;

    _classCallCheck(this, UIAnalyticsEvent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIAnalyticsEvent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "context", void 0);

    _defineProperty(_assertThisInitialized(_this), "handlers", void 0);

    _defineProperty(_assertThisInitialized(_this), "hasFired", void 0);

    _defineProperty(_assertThisInitialized(_this), "clone", function () {
      if (_this.hasFired) {
        warn("Cannot clone an event after it's been fired.");
        return null;
      }

      var context = _toConsumableArray(_this.context);

      var handlers = _toConsumableArray(_this.handlers); // We stringify and parse here to get a hacky "deep clone" of the object.
      // This has some limitations in that it wont support functions, regexs, Maps, Sets, etc,
      // but none of those need to be represented in our payload, so we consider this fine


      var payload = JSON.parse(JSON.stringify(_this.payload));
      return new UIAnalyticsEvent({
        context: context,
        handlers: handlers,
        payload: payload
      });
    });

    _defineProperty(_assertThisInitialized(_this), "fire", function (channel) {
      if (_this.hasFired) {
        warn('Cannot fire an event twice.');
        return;
      }

      _this.handlers.forEach(function (handler) {
        handler(_assertThisInitialized(_this), channel);
      });

      _this.hasFired = true;
    });

    _this.context = props.context || [];
    _this.handlers = props.handlers || [];
    _this.hasFired = false;
    return _this;
  }

  _createClass(UIAnalyticsEvent, [{
    key: "update",
    value: function update(updater) {
      if (this.hasFired) {
        warn("Cannot update an event after it's been fired.");
        return this;
      }

      return _get(_getPrototypeOf(UIAnalyticsEvent.prototype), "update", this).call(this, updater);
    }
  }]);

  return UIAnalyticsEvent;
}(AnalyticsEvent);

export { UIAnalyticsEvent as default };