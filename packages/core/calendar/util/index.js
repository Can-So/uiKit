var i18n = {
  'en-au': {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
};

function getI18n() {
  return i18n['en-au'];
}

function pad(num) {
  return num < 10 ? "0".concat(num) : num;
}

export function getShortDayName(i) {
  return getI18n().weekdays[i].substring(0, 3);
}
export function getMonthName(i) {
  return getI18n().months[i - 1];
}
export function dateToString(date) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      fixMonth = _ref.fixMonth;

  return "".concat(date.year, "-").concat(pad(date.month + (fixMonth ? 1 : 0)), "-").concat(pad(date.day));
}
export function makeArrayFromNumber(i) {
  var arr = [];

  for (var a = 0; a < i; a += 1) {
    arr.push(a);
  }

  return arr;
}