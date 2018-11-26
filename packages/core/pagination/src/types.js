//@flow
import type { Node, ElementType } from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

export type PaginationPropTypes = {
  /** Custom collapse range function */
  collapseRange: (
    pages: Array<Node>,
    selectedIndex: number,
    { max: number, ellipsis: ({ key: string }) => Node },
  ) => Array<Node>,
  /** This prop should not be accessed under any circumstances. It is
   provided by @atlaskit/analytics-next. */
  createAnalyticsEvent?: any,
  /** Replace the built-in Page, Previous, Next and/ or Ellipsis component */
  components: {
    Page?: ElementType,
    Previous?: ElementType,
    Next?: ElementType,
  },
  /** Index of the page to be selected by default */
  defaultSelectedIndex: number,
  /** Helper function to get text displayed on the page button. It is helpful in scenarios when page the page passed in is an object  */
  getPageLabel?: (
    pageObj: string | number | Object,
    pageIndex: number,
  ) => number | string,
  /** The aria-label for next and previous buttons */
  i18n: {
    prev: string,
    next: string,
  },
  /** Styles to spread on the container element */
  innerStyles?: Object,
  /** Maximum number of pages to be displayed in the pagination */
  max: number,
  /** The onChange handler which is called when the page is changed */
  onChange?: (
    event: SyntheticEvent<>,
    pageIndex: number,
    analyticsEvent: ?UIAnalyticsEvent,
  ) => void,
  /** Array of the pages to display */
  pages: Array<any>,
  /** Index of the selected page. This will make this pagination controlled */
  selectedIndex?: number,
  /** The react Node returned from the function is rendered instead of the default ellipsis node */
  renderEllipsis: ({ key: string }) => Node,
};
