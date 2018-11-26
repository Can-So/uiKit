// backup real global Date object
const _Date = global.Date;

export default {
  setToday: (today = new Date()) => {
    function MockDate(y, m, d, h, M, s, ms) {
      let returnDate;

      switch (arguments.length) {
        case 0:
          returnDate = new _Date(today);
          break;

        case 1:
          returnDate = new _Date(y);
          break;

        default:
          const d = typeof d === 'undefined' ? 1 : d;
          const h = h || 0;
          const M = M || 0;
          const s = s || 0;
          const ms = ms || 0;
          returnDate = new _Date(y, m, d, h, M, s, ms);
          break;
      }

      return returnDate;
    }

    MockDate.UTC = _Date.UTC;

    MockDate.now = function now() {
      return new MockDate().valueOf();
    };

    MockDate.parse = function(dateString) {
      return _Date.parse(dateString);
    };

    MockDate.prototype = _Date.prototype;

    global.Date = MockDate;
  },
  reset: () => {
    global.Date = _Date;
  },
};
