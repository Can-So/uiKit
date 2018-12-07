import * as React from 'react';
import { Frame } from '../Frame';
import Spinner from '@atlaskit/spinner';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import { SpinnerWrapper } from './styled';

export interface InlineCardResolvingViewProps {
  /** The url to display */
  url: string;
  /** The optional click handler */
  onClick?: () => void;
  /**A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
}

export class InlineCardResolvingView extends React.Component<
  InlineCardResolvingViewProps
> {
  render() {
    const { url, onClick, isSelected } = this.props;
    return (
      <Frame onClick={onClick} isSelected={isSelected}>
        <IconAndTitleLayout
          icon={
            <SpinnerWrapper>
              <Spinner size={16} />
            </SpinnerWrapper>
          }
          title={url}
        />
      </Frame>
    );
  }
}
