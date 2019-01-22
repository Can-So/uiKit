import * as React from 'react';
import { IconWrapper, IconTitleWrapper, OtherWrapper } from './styled';

export interface IconAndTitleLayoutProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  right?: React.ReactNode;
}

export class IconAndTitleLayout extends React.Component<
  IconAndTitleLayoutProps
> {
  render() {
    const { icon, title, children } = this.props;
    return (
      <>
        <IconTitleWrapper>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          {title}
        </IconTitleWrapper>
        {children && <OtherWrapper>{children}</OtherWrapper>}
      </>
    );
  }
}
