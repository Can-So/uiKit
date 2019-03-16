import isThisWeek from 'date-fns/is_this_week';
import isThisMonth from 'date-fns/is_this_month';
import differenceInMonths from 'date-fns/difference_in_months';
import isValid from 'date-fns/is_valid';
export function isValidDate(date) {
  var today = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  return !!date.getTime && isValid(date) && date.getTime() <= today.getTime();
}
export default function getRelativeDateKey(date) {
  var today = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

  if (!date || !isValidDate(date, today)) {
    return null;
  }

  if (isThisWeek(date)) {
    return 'ThisWeek';
  }

  if (isThisMonth(date)) {
    return 'ThisMonth';
  }

  if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() - 1) {
    return 'LastMonth';
  }

  var diffInMonths = differenceInMonths(today, date);

  if (diffInMonths < 6) {
    return 'AFewMonths';
  }

  if (diffInMonths <= 12) {
    return 'SeveralMonths';
  }

  return 'MoreThanAYear';
}