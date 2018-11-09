// @flow
import { type ComponentType, type Element } from 'react';

type ComponentsType = { [key: string]: ComponentType<any> };

export type OptionType = {
  [string]: any,
};

export type SelectStyles = {
  [component: string]: (
    baseStyles: {},
    {
      isActive: boolean,
      isHover: boolean,
      isFocused: boolean,
      isSelected: boolean,
    },
  ) => {},
};

export type SwitcherBaseProps = {
  /* Close the menu when the user clicks create */
  closeMenuOnCreate?: boolean,
  /* Replaceable components */
  components?: ComponentsType,
  /* The action and text representing a create button as the footer */
  create?: { onClick: (*) => void, text: string },
  /* The react element to display as the footer, beneath the list */
  footer?: Element<*>,
  /* The options presented in the select menu */
  options: Array<Object>,
  /* The target element, which invokes the select menu */
  target: Element<*>,
  /* A react-select Style object, which overrides the default components styles. */
  styles?: SelectStyles,
};

export type SwitcherProps = SwitcherBaseProps & {
  // internal `navWidth` property isn't part of the public API
  navWidth: number,
};

export type SwitcherState = {
  isOpen: boolean,
  mergedComponents: ComponentsType,
};
