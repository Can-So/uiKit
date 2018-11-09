// @flow
import React, { Component, type ComponentType, type ElementRef } from 'react';
import { mergeStyles, makeAnimated } from 'react-select';
import memoizeOne from 'memoize-one';
import isEqual from 'react-fast-compare';
import { colors, gridSize } from '@atlaskit/theme';

import * as defaultComponents from './components';

// NOTE in the future, `Props` and `defaultProps` should come
// directly from react-select

type ValidationState = 'default' | 'error' | 'success';
type OptionType = { [string]: any };
type OptionsType = Array<OptionType>;
type ValueType = OptionType | OptionsType | null | void;

type ReactSelectProps = {
  /* HTML ID(s) of element(s) that should be used to describe this input (for assistive tech) */
  'aria-describedby'?: string,
  /* Aria label (for assistive tech) */
  'aria-label'?: string,
  /* HTML ID of an element that should be used as the label (for assistive tech) */
  'aria-labelledby'?: string,
  /* Focus the control when it is mounted */
  autoFocus?: boolean,
  /* Remove the currently focused option when the user presses backspace */
  backspaceRemovesValue?: boolean,
  /* When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent  */
  captureMenuScroll?: boolean,
  /* Close the select menu when the user selects an option */
  closeMenuOnSelect?: boolean,
  /* Custom components to use */
  components?: {},
  /* Delimiter used to join multiple values into a single HTML Input value */
  delimiter?: string,
  /* Clear all values when the user presses escape AND the menu is closed */
  escapeClearsValue?: boolean,
  /* Custom method to filter whether an option should be displayed in the menu */
  filterOption: (({}, string) => boolean) | null,
  /* Formats option labels in the menu and control as React components */
  formatOptionLabel?: (OptionType, {}) => Node,
  /* Resolves option data to a string to be displayed as the label by components */
  getOptionLabel: OptionType => string,
  /* Resolves option data to a string to compare options and specify value attributes */
  getOptionValue: OptionType => string,
  /* Hide the selected option from the menu */
  hideSelectedOptions?: boolean,
  /* Define an id prefix for the select components e.g. {your-id}-value */
  instanceId?: number | string,
  /* Is the select value clearable */
  isClearable?: boolean,
  /* Is the select disabled */
  isDisabled?: boolean,
  /* Is the select in a state of loading (async) */
  isLoading?: boolean,
  /* Override the built-in logic to detect whether an option is disabled */
  isOptionDisabled: (OptionType => boolean) | false,
  /* Override the built-in logic to detect whether an option is selected */
  isOptionSelected?: (OptionType, OptionsType) => boolean,
  /* Support multiple selected options */
  isMulti?: boolean,
  /* Async: Text to display when loading options */
  loadingMessage?: ({ inputValue: string }) => string,
  /* Maximum height of the menu before scrolling */
  maxMenuHeight?: number,
  /* Maximum height of the value container before scrolling */
  maxValueHeight?: number,
  /* Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string,
  /* Text to display when there are no options */
  noOptionsMessage?: ({ inputValue: string }) => string,
  /* Handle blur events on the control */
  onBlur?: (SyntheticFocusEvent<HTMLElement>) => void,
  /* Handle change events on the select */
  onChange?: (ValueType, {}) => void,
  /* Click events by default have preventDefault & stopPropogation called on them. Use this prop to disable this behaviour  */
  onClickPreventDefault?: boolean,
  /* Handle focus events on the control */
  onFocus?: (SyntheticFocusEvent<HTMLElement>) => void,
  /* Handle change events on the input; return a string to modify the value */
  onInputChange?: string => string | void,
  /* Handle key down events on the select */
  onKeyDown?: (SyntheticKeyboardEvent<HTMLElement>) => void,
  /* Array of options that populate the select menu */
  options: OptionsType,
  /* Placeholder text for the select value */
  placeholder: string,
  /* Status to relay to screen readers */
  screenReaderStatus?: ({ count: number }) => string,
  /* Style modifier methods */
  styles?: {},
  /* Select the currently focused option when the user presses tab */
  tabSelectsValue?: boolean,
  /* The value of the select; reflected by the selected option */
  value?: ValueType,
};

type Props = ReactSelectProps & {
  /* This prop affects the height of the select control. Compact is gridSize() * 4, default is gridSize * 5  */
  spacing: 'compact' | 'default',
  /* The state of validation if used in a form */
  validationState?: ValidationState,
};

function baseStyles(validationState, isCompact) {
  return {
    control: (css, { isFocused, isDisabled }) => {
      let borderColor = isFocused ? colors.B100 : colors.N20;
      let backgroundColor = isFocused ? colors.N0 : colors.N20;
      if (isDisabled) {
        backgroundColor = colors.N20;
      }
      if (validationState === 'error') borderColor = colors.R400;
      if (validationState === 'success') borderColor = colors.G400;

      let borderColorHover = isFocused ? colors.B100 : colors.N30;
      if (validationState === 'error') borderColorHover = colors.R400;
      if (validationState === 'success') borderColorHover = colors.G400;

      const transitionDuration = '200ms';

      return {
        ...css,
        backgroundColor,
        borderColor,
        borderStyle: 'solid',
        borderRadius: '3px',
        borderWidth: '2px',
        boxShadow: 'none',
        minHeight: isCompact ? gridSize() * 4 : gridSize() * 5,
        padding: 0,
        transition: `background-color ${transitionDuration} ease-in-out,
        border-color ${transitionDuration} ease-in-out`,

        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        '::-webkit-scrollbar': {
          height: gridSize(),
          width: gridSize(),
        },
        '::-webkit-scrollbar-corner': {
          display: 'none',
        },

        ':hover': {
          '::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          cursor: 'pointer',
          backgroundColor: isFocused ? colors.N0 : colors.N30,
          borderColor: borderColorHover,
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0,0,0,0.4)',
        },
      };
    },
    valueContainer: css => ({
      ...css,
      paddingBottom: isCompact ? 0 : 2,
      paddingTop: isCompact ? 0 : 2,
    }),
    clearIndicator: css => ({
      ...css,
      color: colors.N70,
      paddingLeft: '2px',
      paddingRight: '2px',
      paddingBottom: isCompact ? 0 : 6,
      paddingTop: isCompact ? 0 : 6,
      ':hover': {
        color: colors.N500,
      },
    }),
    loadingIndicator: css => ({
      ...css,
      paddingBottom: isCompact ? 0 : 6,
      paddingTop: isCompact ? 0 : 6,
    }),
    dropdownIndicator: (css, { isDisabled }) => {
      let color = colors.N500;
      if (isDisabled) {
        color = colors.N70;
      }
      return {
        ...css,
        color,
        paddingBottom: isCompact ? 0 : 6,
        paddingTop: isCompact ? 0 : 6,
        paddingLeft: '2px',
        paddingRight: '2px',
        ':hover': {
          color: colors.N200,
        },
      };
    },
    option: (css, { isFocused, isSelected }) => {
      const color = isSelected ? colors.N0 : null;

      let backgroundColor;
      if (isSelected) backgroundColor = colors.N500;
      else if (isFocused) backgroundColor = colors.N30;
      return {
        ...css,
        paddingTop: '6px',
        paddingBottom: '6px',
        backgroundColor,
        color,
      };
    },
    placeholder: css => ({ ...css, color: colors.N100 }),
    singleValue: (css, { isDisabled }) => ({
      ...css,
      color: isDisabled ? colors.N70 : colors.N800,
      lineHeight: `${gridSize() * 2}px`, // 16px
    }),
    menuList: css => ({
      ...css,
      paddingTop: gridSize(),
      paddingBottom: gridSize(),
    }),
    multiValue: css => ({
      ...css,
      borderRadius: '2px',
      backgroundColor: colors.N40,
      color: colors.N500,
      maxWidth: '100%',
    }),
    multiValueLabel: css => ({
      ...css,
      padding: '2px',
      paddingRight: '2px',
    }),
    multiValueRemove: (css, { isFocused }) => ({
      ...css,
      backgroundColor: isFocused && colors.R75,
      color: isFocused && colors.R400,
      paddingLeft: '2px',
      paddingRight: '2px',
      borderRadius: '0px 2px 2px 0px',
      ':hover': {
        color: colors.R400,
        backgroundColor: colors.R75,
      },
    }),
  };
}

export default function createSelect(WrappedComponent: ComponentType<*>) {
  return class AtlaskitSelect extends Component<*> {
    components: {};
    select: ElementRef<*>;
    constructor(props: Props) {
      super(props);
      this.cacheComponents = memoizeOne(this.cacheComponents, isEqual).bind(
        this,
      );
      this.cacheComponents(props.components);
    }
    static defaultProps = {
      validationState: 'default',
      spacing: 'default',
      onClickPreventDefault: true,
      tabSelectsValue: false,
    };
    componentWillReceiveProps(nextProps: Props) {
      this.cacheComponents(nextProps.components);
    }
    cacheComponents = (components?: {}) => {
      this.components = {
        ...defaultComponents,
        ...components,
      };
    };
    focus() {
      this.select.focus();
    }
    blur() {
      this.select.blur();
    }
    onSelectRef = (ref: ElementRef<*>) => {
      this.select = ref;
    };
    render() {
      const {
        styles,
        validationState,
        spacing,
        isMulti,
        ...props
      } = this.props; // eslint-disable-line
      const isCompact = !isMulti && spacing === 'compact';

      // props must be spread first to stop `components` being overridden
      return (
        <WrappedComponent
          ref={this.onSelectRef}
          isMulti={isMulti}
          {...props}
          components={this.components}
          styles={mergeStyles(baseStyles(validationState, isCompact), styles)}
        />
      );
    }
  };
}
