//@flow
import type { Node, ComponentType } from 'react';
import type { ButtonProps, ButtonAppearances } from '@atlaskit/button';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

export type EliipsisPropType = {
  key: number,
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
    items: Array<any>,
    selectedIndex: number,
    { max: number, ellipsisComponent: Function => Node },
  ) => Array<number | string | ComponentType<*>>,
  /** You should not be accessing this prop under any circumstances. It is
   provided by @atlaskit/analytics-next. */
  createAnalyticsEvent?: any,
  /** Index of the default selected page */
  defaultSelectedIndex: number,
  /** The component to be displayed in place of the ellipsis in the pagination button */
  ellipsisComponent: Function => Node,
  /** in case the pages in a object then this function will help us get the label of the page */
  getPageLabel?: (
    pageObj: string | number | Object,
    pageIndex: number,
  ) => number | string,
  /** aria label for pagination next and previous buttons */
  i18n: {
    prev: string,
    next: string,
  },
  /** Styles to spread on the pagination component */
  innerStyles?: Object,
  /** Maximum number of pages to be displayed in the pagination */
  max: number,
  /** The component to be displayed in place of the next page button */
  nextPageComponent?: ComponentType<*>,
  /** onChange handler for when page is chagned */
  onChange?: (
    event: SyntheticEvent<>,
    pageIndex: number,
    analyticsEvent: ?UIAnalyticsEvent,
  ) => void,
  /** The component to be displayed in place of the page button */
  pageComponent?: ComponentType<*>,
  /** Array of the pages to display */
  pages: Array<any>,
  /** The component to be displayed in place of the previous page button */
  previousPageComponent?: ComponentType<*>,
  /** index of the selected page - to make this value controlled */
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
