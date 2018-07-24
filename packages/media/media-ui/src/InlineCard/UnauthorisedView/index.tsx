import * as React from 'react';
import { Icon } from '../Icon';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import Button from '@atlaskit/button';
import { truncateUrlForErrorView } from '../utils';
import { Frame } from '../Frame';

export interface UnauthorizedViewProps {
  url: string;
  icon?: string;
  onClick?: () => void;
  onAuthorise?: () => void;
}

export class UnauthorizedView extends React.Component<UnauthorizedViewProps> {
  handleConnectAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { onAuthorise } = this.props;
    if (onAuthorise) {
      return onAuthorise();
    }
  };

  render() {
    const { url, icon, onClick } = this.props;
    return (
      <Frame onClick={onClick}>
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
