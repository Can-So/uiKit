import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
export default function collapseRange(pages, current, _ref) {
  var max = _ref.max,
      ellipsis = _ref.ellipsis;
  var total = pages.length; // only need ellipsis if we have more pages than we can display

  var needEllipsis = total > max; // show start ellipsis if the current page is further away than max - 3 from the first page

  var hasStartEllipsis = needEllipsis && max - 3 < current; // show end ellipsis if the current page is further than total - max + 3 from the last page

  var hasEndEllipsis = needEllipsis && current < total - max + 4;

  if (!needEllipsis) {
    return pages;
  } else if (hasStartEllipsis && !hasEndEllipsis) {
    var _pageCount = max - 2;

    return [pages[0], ellipsis({
      key: 'elipses-1'
    })].concat(_toConsumableArray(pages.slice(total - _pageCount)));
  } else if (!hasStartEllipsis && hasEndEllipsis) {
    var _pageCount2 = max - 2;

    return [].concat(_toConsumableArray(pages.slice(0, _pageCount2)), [ellipsis({
      key: 'elipses-1'
    }), pages[total - 1]]);
  } // we have both start and end ellipsis


  var pageCount = max - 4;
  return [pages[0], ellipsis({
    key: 'elipses-1'
  })].concat(_toConsumableArray(pages.slice(current - Math.floor(pageCount / 2), current + pageCount - 1)), [ellipsis({
    key: 'elipses-2'
  }), pages[total - 1]]);
}