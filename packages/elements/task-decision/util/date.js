// Only bring in the subset of date-fns that we use
import * as format from 'date-fns/format';
import * as isSameDay from 'date-fns/is_same_day';
import * as isToday from 'date-fns/is_today';
import * as isYesterday from 'date-fns/is_yesterday';
import * as isThisYear from 'date-fns/is_this_year';
import * as startOfDay from 'date-fns/start_of_day';
var DATE_FORMAT_SAME_YEAR = 'MMMM D';
var DATE_FORMAT_PAST_YEAR = 'MMMM D, YYYY';
export var getFormattedDate = function (ts) {
    // FIXME i18n messages
    if (isToday(ts)) {
        return 'Today';
    }
    if (isYesterday(ts)) {
        return 'Yesterday';
    }
    if (isThisYear(ts)) {
        return format(ts, DATE_FORMAT_SAME_YEAR);
    }
    return format(ts, DATE_FORMAT_PAST_YEAR);
};
export var getStartOfDate = function (ts) {
    return startOfDay(ts);
};
export var isSameDate = function (d1, d2) {
    return !!(d1 && d2 && isSameDay(d1, d2));
};
//# sourceMappingURL=date.js.map