import * as React from 'react';
import { Icon } from '../Icon';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import Button from '@atlaskit/button';
import { truncateUrlForErrorView } from '../utils';
import { Frame } from '../Frame';

export interface InlineCardUnauthorizedViewProps {
  /** The url to display */
  url: string;
  /** The icon of the service (e.g. Dropbox/Asana/Google/etc) to display */
  icon?: string;
  /** The optional click handler */
  onClick?: () => void;
  /** What to do when a user hit "Try another account" button */
  onAuthorise?: () => void;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
}

export class InlineCardUnauthorizedView extends React.Component<
  InlineCardUnauthorizedViewProps
> {
  handleConnectAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { onAuthorise } = this.props;
    if (onAuthorise) {
      event.preventDefault();
      event.stopPropagation();
      return onAuthorise();
    }
  };

  render() {
    const { url, icon, onClick, isSelected } = this.props;
    return (
      <Frame onClick={onClick} isSelected={isSelected}>
        <IconAndTitleLayout
          icon={<Icon src={icon} />}
          title={truncateUrlForErrorView(url)}
        />
        {' - '}
        <Button
          spacing="none"
          appearance="link"
          onClick={this.handleConnectAccount}
        >
          Connect your account to preview links
        </Button>
      </Frame>
    );
  }
}
