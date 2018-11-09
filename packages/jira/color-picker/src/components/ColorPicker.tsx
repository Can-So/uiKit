import * as React from 'react';
import memoizeOne from 'memoize-one';
import { PopupSelect } from '@atlaskit/select';
import { ColorPalette } from './ColorPalette';
import ColorCard from './ColorCard';
import { Palette, Color } from '../types';
import { ColorCardWrapper } from '../styled/ColorPicker';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';

export type Option = Color;

export interface Props {
  /** list of available colors */
  palette: Palette;
  /** selected color */
  selectedColor?: string;
  /** maximum column length */
  cols?: number;
  /** color of checkmark on selected color */
  checkMarkColor?: string;
  /** onChange handler */
  onChange: (value: string, analyticsEvent?: object) => void;
  /** You should not be accessing this prop under any circumstances. It is
   provided by @atlaskit/analytics-next. */
  createAnalyticsEvent?: any;
}

export interface State {
  focusedItemIndex: number;
}

export interface SelectComponentProps {
  // select props
  data: Option;
  options: Option[];
  setValue: (option: Option) => void;
  getValue: () => Option[];
  selectProps: {
    selectedLabel?: string;
    cols?: number;
    checkMarkColor?: string;
    focusedItemIndex: number;
  };
}

const EmptyComponent = () => null;

const arrowKeys = {
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
};

const MenuList = (props: SelectComponentProps) => {
  const { cols, checkMarkColor, focusedItemIndex } = props.selectProps;
  const option = props.getValue()[0];

  return (
    <ColorPalette
      palette={props.options}
      selectedColor={option && option.value}
      cols={cols}
      checkMarkColor={checkMarkColor}
      focusedItemIndex={focusedItemIndex}
      onClick={newColor => {
        const newOption = props.options.find(
          option => option.value === newColor,
        );

        if (newOption) {
          props.setValue(newOption);
        }
      }}
    />
  );
};

const getOptions = memoizeOne((props: Props) => {
  const { palette, selectedColor } = props;

  let focusedItemIndex = 0;
  const value =
    palette.find((color, index) => {
      if (color.value === selectedColor) {
        focusedItemIndex = index;
        return true;
      }

      return false;
    }) || palette[0];

  return {
    options: palette,
    value,
    focusedItemIndex,
  };
});

const adjustFocusIndex = (newIndex, itemsLength) => {
  return (itemsLength + newIndex) % itemsLength;
};

export class ColorPickerWithoutAnalytics extends React.Component<Props, State> {
  state = {
    focusedItemIndex: getOptions(this.props).focusedItemIndex,
  };

  createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

  changeAnalyticsCaller = () => {
    const { createAnalyticsEvent } = this.props;

    if (createAnalyticsEvent) {
      return this.createAndFireEventOnAtlaskit({
        action: 'clicked',
        actionSubject: 'color-picker',

        attributes: {
          componentName: 'color-picker',
          packageName,
          packageVersion,
        },
      })(createAnalyticsEvent);
    }
    return undefined;
  };

  onChange = (option: Option) => {
    this.props.onChange(option.value, this.changeAnalyticsCaller());
  };

  onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        this.focusOption(arrowKeys[event.key]);
        break;
      case 'Tab':
      case 'Enter':
        this.selectOption();
        break;
      default:
        return;
    }

    event.preventDefault();
  };

  focusOption(dir) {
    const { cols, palette } = this.props;
    const { focusedItemIndex } = this.state;

    switch (dir) {
      case 'up': {
        if (cols !== undefined) {
          this.setState({
            focusedItemIndex: adjustFocusIndex(
              focusedItemIndex - cols,
              palette.length,
            ),
          });
        }
        break;
      }
      case 'left':
        this.setState({
          focusedItemIndex: adjustFocusIndex(
            focusedItemIndex - 1,
            palette.length,
          ),
        });
        break;
      case 'down':
        if (cols !== undefined) {
          this.setState({
            focusedItemIndex: adjustFocusIndex(
              focusedItemIndex + cols,
              palette.length,
            ),
          });
        }
        break;
      case 'right':
        this.setState({
          focusedItemIndex: adjustFocusIndex(
            focusedItemIndex + 1,
            palette.length,
          ),
        });
        break;
      default:
        return;
    }
  }

  selectOption() {
    const { focusedItemIndex } = this.state;
    const { palette, onChange } = this.props;

    onChange(palette[focusedItemIndex].value);

    if (this.selectRef.current) {
      this.selectRef.current.close();
    }
  }

  selectRef: React.RefObject<typeof PopupSelect> = React.createRef();

  render() {
    const { checkMarkColor, cols } = this.props;
    const { focusedItemIndex } = this.state;
    const { options, value } = getOptions(this.props);

    return (
      <PopupSelect
        ref={this.selectRef}
        target={
          <ColorCardWrapper>
            <ColorCard {...value} />
          </ColorCardWrapper>
        }
        popperProps={{
          modifiers: {
            offset: {
              offset: '0, 8',
            },
            preventOverflow: {
              padding: 0,
            },
          },
        }}
        maxMenuWidth="auto"
        minMenuWidth="auto"
        options={options}
        value={value}
        components={{
          MenuList,
          DropdownIndicator: EmptyComponent,
          Placeholder: EmptyComponent,
        }}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        // never show search input
        searchThreshold={Number.MAX_VALUE}
        // palette props
        focusedItemIndex={focusedItemIndex}
        cols={cols}
        checkMarkColor={checkMarkColor}
      />
    );
  }
}

export default withAnalyticsContext({
  componentName: 'color-picker',
  packageName,
  packageVersion,
})(withAnalyticsEvents()(ColorPickerWithoutAnalytics));
