import * as React from 'react';
import { IconTitleWrapper, IconWrapper } from './styled';
import { Icon } from '../Icon';

export interface IconAndTitleLayoutProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  right?: React.ReactNode;
}

export class IconAndTitleLayout extends React.Component<
  IconAndTitleLayoutProps
> {
  renderIcon() {
    const { icon } = this.props;
    // We render two kinds of icons here:
    // - Image: acquired from either DAC or Teamwork Platform Apps;
    // - Atlaskit Icon: an Atlaskit SVG;
    // Each of these are scaled down to 12x12.
    if (icon) {
      if (typeof icon === 'string') {
        return <Icon src={icon} />;
      } else {
        return <IconWrapper>{icon}</IconWrapper>;
      }
    }
    return null;
  }

  render() {
    const { title } = this.props;
    return (
      <>
        {this.renderIcon()}
        <IconTitleWrapper>{title}</IconTitleWrapper>
      </>
    );
  }
}
