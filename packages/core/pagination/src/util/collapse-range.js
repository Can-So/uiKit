// @flow
export default function collapseRange(
  pageLinks: Array<any>,
  current: number,
  {
    max,
    ellipsisComponent,
  }: {
    max: number,
    ellipsisComponent: Function,
  },
) {
  const total = pageLinks.length;
  // only need ellipsis if we have more pages than we can display
  const needEllipsis = total > max;
  // show start ellipsis if the current page is further away than max - 3 from the first page
  const hasStartEllipsis = needEllipsis && max - 3 < current;
  // show end ellipsis if the current page is further than total - max + 3 from the last page
  const hasEndEllipsis = needEllipsis && current < total - max + 4;

  if (!needEllipsis) {
    return pageLinks;
  } else if (hasStartEllipsis && !hasEndEllipsis) {
    const pageCount = max - 2;
    return [
      pageLinks[0],
      ellipsisComponent({ key: 'elipses-1' }),
      ...pageLinks.slice(total - pageCount),
    ];
  } else if (!hasStartEllipsis && hasEndEllipsis) {
    const pageCount = max - 2;
    return [
      ...pageLinks.slice(0, pageCount),
      ellipsisComponent({ key: 'elipses-1' }),
      ...pageLinks.slice(-1),
    ];
  }
  // we have both start and end ellipsis
  const pageCount = max - 4;
  return [
    pageLinks[0],
    ellipsisComponent({ key: 'elipses-1' }),
    ...pageLinks.slice(
      current - Math.floor(pageCount / 2),
      current + pageCount - 1,
    ),
    ellipsisComponent({ key: 'elipses-2' }),
    ...pageLinks.slice(-1),
  ];
}
