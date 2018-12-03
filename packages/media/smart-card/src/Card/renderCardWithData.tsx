import * as React from 'react';
import { CardAppearance } from './types';
import { extractBlockPropsFromJSONLD } from '../extractBlockPropsFromJSONLD';
import { extractInlinePropsFromJSONLD } from '../extractInlinePropsFromJSONLD';
import {
  BlockCardResolvedView,
  InlineCardResolvedView,
} from '@atlaskit/media-ui';
import { DefinedState } from '../Client/types';

export interface CardWithDataContentProps {
  appearance: CardAppearance;
  data: DefinedState['data'];
  onClick?: () => void;
  isSelected?: boolean;
}

export class CardWithDataContent extends React.Component<
  CardWithDataContentProps
> {
  handleFrameClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  };

  render() {
    const { data, isSelected, appearance } = this.props;

    if (appearance === 'inline') {
      return (
        <InlineCardResolvedView
          {...extractInlinePropsFromJSONLD(data || {})}
          isSelected={isSelected}
          onClick={this.handleFrameClick}
        />
      );
    } else {
      return (
        <BlockCardResolvedView
          {...extractBlockPropsFromJSONLD(data || {})}
          isSelected={isSelected}
          onClick={this.handleFrameClick}
        />
      );
    }
  }
}
