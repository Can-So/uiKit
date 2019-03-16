export var noop = function noop() {};
export var range = function range(n) {
  return Array.from({
    length: n
  }, function (v, i) {
    return i;
  });
};
export var between = function between(min, max, number) {
  return Math.min(max, Math.max(min, number));
};
export var oneOf = function oneOf(a, b) {
  return typeof a !== 'undefined' ? a : b;
};