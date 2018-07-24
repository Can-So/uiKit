import * as React from 'react';
import Button from '@atlaskit/button';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { colors } from '@atlaskit/theme';
import { CollapsedFrame } from '../CollapsedFrame';
import { minWidth, maxWidth } from '../dimensions';
import { CollapsedIconTitleDescriptionLayout } from '../CollapsedIconTitleDescriptionLayout';

export interface ErroredViewProps {
  url: string;
  message: string;
  onClick?: () => void;
  onRetry?: () => void;
}

export class ErroredView extends React.Component<ErroredViewProps> {
  handleRetry = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { onRetry } = this.props;
    if (onRetry) {
      onRetry();
    }
  };

  render() {
    const { url, message, onClick, onRetry } = this.props;
    return (
      <CollapsedFrame minWidth={minWidth} maxWidth={maxWidth} onClick={onClick}>
        <CollapsedIconTitleDescriptionLayout
          icon={
            <WarningIcon
              label="error"
              size="medium"
              primaryColor={colors.Y300}
            />
          }
          title={url}
          description={
            <>
              {message}{' '}
              {onRetry && (
                <Button
                  appearance="link"
                  spacing="none"
                  onClick={this.handleRetry as () => void}
                >
                  Try again
                </Button>
              )}
            </>
          }
        />
      </CollapsedFrame>
    );
  }
}
