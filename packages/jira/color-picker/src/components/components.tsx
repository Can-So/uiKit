import * as React from 'react';
import { gridSize } from '@atlaskit/theme';
import { Color } from '../types';
import ColorCard from './ColorCard';
import { COLOR_CARD_SIZE } from '../constants';
import {
  ColorPaletteContainer,
  ColorCardWrapper,
} from '../styled/ColorPalette';

const EmptyComponent = () => null;

export interface SelectComponentProps {
  // select props
  data: Color;
  options: Color[];
  setValue: (option: Color) => void;
  getValue: () => Color[];
  selectProps: {
    label?: string;
    cols?: number;
    checkMarkColor?: string;
    focusedItemIndex: number;
  };
  isFocused: boolean;
  isSelected: boolean;
  innerProps: {};
}

export const MenuList = (props: SelectComponentProps) => {
  const { cols } = props.selectProps;

  return (
    <ColorPaletteContainer
      style={{
        maxWidth: cols ? cols * (COLOR_CARD_SIZE + 2) + gridSize() : undefined,
      }}
      {...props}
    />
  );
};

export const Option = (props: SelectComponentProps) => {
  const {
    data: { value, label },
    selectProps: { checkMarkColor },
    isFocused,
    isSelected,
  } = props;

  return (
    <ColorCardWrapper {...props.innerProps}>
      <ColorCard
        label={label}
        value={value}
        checkMarkColor={checkMarkColor}
        isOption
        focused={isFocused}
        selected={isSelected}
      />
    </ColorCardWrapper>
  );
};

export const DropdownIndicator = EmptyComponent;

export const Placeholder = EmptyComponent;
