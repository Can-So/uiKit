import * as React from 'react';
import memoizeOne from 'memoize-one';
import { PopupSelect } from '@atlaskit/select';
import Trigger from './Trigger';
import { Palette, Color } from '../types';
import * as components from './components';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import { ColorCardWrapper } from '../styled/ColorPicker';

export interface Props {
  /** color picker button label */
  label?: string;
  /** list of available colors */
  palette: Palette;
  /** selected color */
  selectedColor?: string;
  /** maximum column length */
  cols?: number;
  /** color of checkmark on selected color */
  checkMarkColor?: string;
  /** props for react-popper */
  popperProps?: Object;
  /** onChange handler */
  onChange: (value: string, analyticsEvent?: object) => void;
  /** You should not be accessing this prop under any circumstances. It is provided by @atlaskit/analytics-next. */
  createAnalyticsEvent?: any;
}

const defaultPopperProps = {
  positionFixed: true,
  modifiers: { offset: { offset: `0, 8` } },
  placement: 'bottom-start',
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

export class ColorPickerWithoutAnalytics extends React.Component<Props> {
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

  onChange = (option: Color) => {
    this.props.onChange(option.value, this.changeAnalyticsCaller());
  };

  render() {
    const {
      checkMarkColor,
      cols,
      popperProps = defaultPopperProps,
      label = 'Color picker',
    } = this.props;
    const { options, value } = getOptions(this.props);
    const fullLabel = `${label}, ${value.label} selected`;

    return (
      <PopupSelect
        target={({ ref, isOpen }: { ref: any; isOpen: boolean }) => (
          <ColorCardWrapper innerRef={ref}>
            <Trigger {...value} label={fullLabel} expanded={isOpen} />
          </ColorCardWrapper>
        )}
        popperProps={popperProps}
        maxMenuWidth="auto"
        minMenuWidth="auto"
        options={options}
        aria-label={fullLabel}
        value={value}
        components={components}
        onChange={this.onChange}
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
