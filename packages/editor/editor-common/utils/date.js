import * as isBefore from 'date-fns/is_before';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
var ISO_FORMAT = 'YYYY-MM-DD';
var DEFAULT_FORMAT = 'DD MMM YYYY';
export var timestampToUTCDate = function (timestamp) {
    var date = new Date(Number(timestamp));
    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1;
    var year = date.getUTCFullYear();
    return { day: day, month: month, year: year };
};
export var todayTimestampInUTC = function () {
    var today = new Date();
    var todayInUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    return todayInUTC.toString();
};
var addLeadingZero = function (val) {
    if (val < 10) {
        return "0" + val;
    }
    return val;
};
var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
var week_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// example: "23 Jan 2018"
export var timestampToString = function (timestamp, pattern) {
    var date = new Date(Number(timestamp));
    switch (pattern) {
        case 'ddd, DD MMM':
            return week_days[date.getUTCDay()] + ", " + addLeadingZero(date.getUTCDate()) + " " + months[date.getUTCMonth()];
        case ISO_FORMAT:
            return date.getUTCFullYear() + "-" + addLeadingZero(date.getUTCMonth() + 1) + "-" + date.getUTCDate();
        default:
            return addLeadingZero(date.getUTCDate()) + " " + months[date.getUTCMonth()] + " " + date.getUTCFullYear();
    }
};
// example: "2018-01-23"
export var timestampToIsoFormat = function (timestamp) {
    return timestampToString(timestamp, ISO_FORMAT);
};
export var isPastDate = function (timestamp) {
    return isBefore(timestampToIsoFormat(Number(timestamp)), timestampToIsoFormat(new Date().valueOf()));
};
export var timestampToTaskContext = function (timestamp) {
    var curDate = new Date();
    var givenDate = new Date(Number(timestamp));
    var distance = differenceInCalendarDays(givenDate, curDate);
    var sameYear = givenDate.getUTCFullYear() === curDate.getUTCFullYear();
    var pattern = '';
    if (distance === 0) {
        return 'Today';
    }
    else if (distance === 1) {
        return 'Tomorrow';
    }
    else if (distance === -1) {
        pattern = 'Yesterday';
    }
    else if (sameYear) {
        pattern = 'ddd, DD MMM';
    }
    else {
        pattern = DEFAULT_FORMAT;
    }
    return timestampToString(timestamp, pattern);
};
//# sourceMappingURL=date.js.map