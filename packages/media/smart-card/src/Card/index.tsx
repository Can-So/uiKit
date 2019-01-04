import * as React from 'react';
import { CardAppearance } from './types';
import { CardProps } from './types';
import {
  isCardWithData,
  CardWithDataRenderer,
  CardWithURLRenderer,
} from './render';
export { CardAppearance, CardProps };

export const Card = (props: CardProps) =>
  isCardWithData(props) ? (
    <CardWithDataRenderer {...props} />
  ) : (
    <CardWithURLRenderer {...props} />
  );
