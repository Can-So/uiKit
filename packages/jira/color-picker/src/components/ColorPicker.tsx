import * as React from 'react';
import memoizeOne from 'memoize-one';
import { PopupSelect } from '@atlaskit/select';
import ColorCard from './ColorCard';
import { Palette, Color } from '../types';
import { ColorCardWrapper } from '../styled/ColorPalette';
import * as components from './components';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';

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
  /** You should not be accessing this prop under any circumstances. It is provided by @atlaskit/analytics-next. */
  createAnalyticsEvent?: any;
}

const arrowKeys = {
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
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

// const adjustFocusIndex = (newIndex, itemsLength) => {
//   return (itemsLength + newIndex) % itemsLength;
// };

export class ColorPickerWithoutAnalytics extends React.Component<Props> {
  createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedColor !== this.props.selectedColor) {
      this.setState({
        focusedItemIndex: getOptions(this.props).focusedItemIndex,
      });
    }
  }

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

  onChange = (option: Color) => {
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
      default:
        return;
    }

    event.preventDefault();
  };

  focusOption(dir) {
    // const { cols, palette } = this.props;
    // switch (dir) {
    //   case 'up': {
    //     if (cols !== undefined) {
    //       this.setState({
    //         focusedItemIndex: adjustFocusIndex(
    //           focusedItemIndex - cols,
    //           palette.length,
    //         ),
    //       });
    //     }
    //     break;
    //   }
    //   case 'left':
    //     this.setState({
    //       focusedItemIndex: adjustFocusIndex(
    //         focusedItemIndex - 1,
    //         palette.length,
    //       ),
    //     });
    //     break;
    //   case 'down':
    //     if (cols !== undefined) {
    //       this.setState({
    //         focusedItemIndex: adjustFocusIndex(
    //           focusedItemIndex + cols,
    //           palette.length,
    //         ),
    //       });
    //     }
    //     break;
    //   case 'right':
    //     this.setState({
    //       focusedItemIndex: adjustFocusIndex(
    //         focusedItemIndex + 1,
    //         palette.length,
    //       ),
    //     });
    //     break;
    //   default:
    //     return;
    // }
  }

  selectRef: React.RefObject<typeof PopupSelect> = React.createRef();

  render() {
    const { checkMarkColor, cols } = this.props;
    const { options, value } = getOptions(this.props);

    return (
      <PopupSelect
        ref={this.selectRef}
        target={
          <ColorCardWrapper>
            <ColorCard {...value} />
          </ColorCardWrapper>
        }
        maxMenuWidth="auto"
        minMenuWidth="auto"
        options={options}
        value={value}
        components={components}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        // never show search input
        searchThreshold={Number.MAX_VALUE}
        // palette props
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
