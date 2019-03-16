import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

var AnalyticsEvent =
/*#__PURE__*/
function () {
  function AnalyticsEvent(props) {
    var _this = this;

    _classCallCheck(this, AnalyticsEvent);

    _defineProperty(this, "payload", void 0);

    _defineProperty(this, "clone", function () {
      // We stringify and parse here to get a hacky "deep clone" of the object.
      // This has some limitations in that it wont support functions, regexs, Maps, Sets, etc,
      // but none of those need to be represented in our payload, so we consider this fine
      var payload = JSON.parse(JSON.stringify(_this.payload));
      return new AnalyticsEvent({
        payload: payload
      });
    });

    this.payload = props.payload;
  }

  _createClass(AnalyticsEvent, [{
    key: "update",
    value: function update(updater) {
      if (typeof updater === 'function') {
        this.payload = updater(this.payload);
      } else if (_typeof(updater) === 'object') {
        this.payload = _objectSpread({}, this.payload, updater);
      }

      return this;
    }
  }]);

  return AnalyticsEvent;
}();

export { AnalyticsEvent as default };