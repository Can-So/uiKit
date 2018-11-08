import * as React from 'react';
import Select from '@atlaskit/select';
import { ColorPalette } from './ColorPalette';
import ColorCard from './ColorCard';
import { Palette, Color } from '../types';
import { styles } from '../styled/ColorPicker';

export type Option = Color;

export interface Props {
  palette: Palette;
  selectedColor?: string;
  selectedLabel?: string;
  cols?: number;
  checkMarkColor?: string;
  onChange: (value: string) => void;
}

export interface State {
  activeIndex: number | void;
}

export interface SelectComponentProps {
  data: Option;
  options: Option[];
  setValue: (option: Option) => void;
  getValue: () => Option[];
}

const EmptyComponent = () => null;

const MenuList = (props: SelectComponentProps) => {
  const option = props.getValue()[0];

  return (
    <ColorPalette
      palette={props.options}
      selectedColor={option && option.value}
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

const SingleValue = (props: SelectComponentProps) => {
  const { data } = props;

  return <ColorCard {...data} tabIndex={-1} />;
};

export class ColorPicker extends React.Component<Props, State> {
  onChange = (option: Option) => {
    this.props.onChange(option.value);
  };

  getOptions() {
    const { palette, selectedColor } = this.props;

    return {
      options: palette,
      value: palette.find(color => color.value === selectedColor) || palette[0],
    };
  }

  render() {
    return (
      <Select
        {...this.getOptions()}
        components={{
          MenuList,
          SingleValue,
          DropdownIndicator: EmptyComponent,
          Placeholder: EmptyComponent,
        }}
        styles={styles}
        isSearchable={false}
        onChange={this.onChange}
      />
    );
  }
}
