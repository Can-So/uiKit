//@flow
import type { Node } from 'react';
import type { ButtonProps, ButtonAppearances } from '@atlaskit/button';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

export type EliipsisPropType = {
  key: string,
};

export type NavigatorPropsType = {
  /** This will be passed in as ariaLabel to button. This is what screen reader will read */
  ariaLabel?: string,
  /** React node to render in the button, pass the text you want use to view on pagination button */
  children?: Node,
  /** Is the navigator disabled */
  isDisabled?: boolean,
  /** This function is called with the when user clicks on navigator */
  onClick?: Function,
  /** Add the padding styles to the navigator
   * This can we used to add padding when displaying a icon
   */
  styles?: Object,
};

export type PaginationPropTypes = {
  /** Custom collapse range function */
  collapseRange: (
    pages: Array<Node>,
    selectedIndex: number,
    { max: number, ellipsisComponent: ({ key: string }) => Node },
  ) => Array<Node>,
  /** This prop should not be accessed under any circumstances. It is
   provided by @atlaskit/analytics-next. */
  createAnalyticsEvent?: any,
  /** Index of the page to be selected by default */
  defaultSelectedIndex: number,
  /** The react Node returned from the function is rendered instead of the default ellipsis node */
  ellipsisComponent: ({ key: string }) => Node,
  /** Helper function to get text displayed on the page button. It is helpful in scenarios when page is passed in Object  */
  getPageLabel?: (
    pageObj: string | number | Object,
    pageIndex: number,
  ) => number | string,
  /** The aria label for pagination next and previous buttons */
  i18n: {
    prev: string,
    next: string,
  },
  /** Styles to spread on the pagination component */
  innerStyles?: Object,
  /** Maximum number of pages to be displayed in the pagination */
  max: number,
  /** The react Node returned from nextPageComponent function is rendered instead of default next page component */
  nextPageComponent?: ({
    children?: Node,
    className?: string,
    onMouseEnter?: Function,
    onMouseLeave?: Function,
    disabled?: boolean,
    pages?: Array<any>,
    selectedIndex?: number,
  }) => Node,
  /** onChange handler which is called when the page is changed */
  onChange?: (
    event: SyntheticEvent<>,
    pageIndex: number,
    analyticsEvent: ?UIAnalyticsEvent,
  ) => void,
  /** The react Node returned from pageComponent function is rendered instead of default page button component */
  pageComponent?: ({
    children?: Node,
    className?: string,
    onMouseEnter?: Function,
    onMouseLeave?: Function,
    disabled?: boolean,
    page?: any,
  }) => Node,
  /** Array of the pages to display */
  pages: Array<any>,
  /** The react Node returned from previousPageComponent function is rendered instead of default previous page component */
  previousPageComponent?: ({
    children?: Node,
    className?: string,
    onMouseEnter?: Function,
    onMouseLeave?: Function,
    disabled?: boolean,
    pages?: Array<any>,
    selectedIndex?: number,
  }) => Node,
  /** index of the selected page. This will make this pagination controlled */
  selectedIndex?: number,
};

export type PagePropsType = $Diff<
  ButtonProps,
  {
    appearance?: ButtonAppearances,
    autoFocus: boolean,
    isDisabled: boolean,
    isLoading: boolean,
    spacing: 'compact' | 'default' | 'none',
    shouldFitContainer: boolean,
    type: 'button' | 'submit',
  },
>;
