// There are cases where the context is not available, such as when a dropdown item is used
// inside @atlaskit/navigation. For this reason we have this helper function which safely calls
// the context functions if they are available.
export default (function (instance, contextKey) {
  return function (fnToCall) {
    var _instance$context$con;

    if (!instance.context[contextKey]) {
      return null;
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_instance$context$con = instance.context[contextKey])[fnToCall].apply(_instance$context$con, args);
  };
});