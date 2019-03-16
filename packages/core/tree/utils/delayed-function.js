import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

var DelayedFunction =
/*#__PURE__*/
function () {
  function DelayedFunction(delay) {
    _classCallCheck(this, DelayedFunction);

    _defineProperty(this, "delay", void 0);

    _defineProperty(this, "timeoutId", null);

    _defineProperty(this, "fn", void 0);

    this.delay = delay;
  }

  _createClass(DelayedFunction, [{
    key: "start",
    value: function start(fn) {
      this.stop();
      this.timeoutId = setTimeout(fn, this.delay);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  }]);

  return DelayedFunction;
}();

export { DelayedFunction as default };