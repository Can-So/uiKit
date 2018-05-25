import * as React from 'react';
import { MultiLineLayout } from '../MultiLineLayout';
import { Icon, Title, Description } from './styled';

export interface IconTitleDescriptionLayoutProps {
  icon?: string;
  title: string;
  description: string;
  right?: React.ReactNode;
}

export class IconTitleDescriptionLayout extends React.Component<
  IconTitleDescriptionLayoutProps
> {
  renderLeft() {
    const { icon } = this.props;

    if (!icon) {
      return null;
    }

    return <Icon src={icon} />;
  }

  renderMiddle() {
    const { title, description } = this.props;
    return (
      <>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </>
    );
  }

  render() {
    const { right } = this.props;
    return (
      <MultiLineLayout
        left={this.renderLeft()}
        middle={this.renderMiddle()}
        right={right}
      />
    );
  }
}
