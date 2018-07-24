import * as React from 'react';
import { Frame } from '../Frame';
import Lozenge from '@atlaskit/lozenge';
import { LozengeViewModel } from '../../types';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import { Icon, Title } from './styled';

export interface ResolvedViewProps {
  icon?: string;
  title: string;
  lozenge?: LozengeViewModel;
  isSelected?: boolean;
  onClick?: () => void;
}

export class ResolvedView extends React.Component<ResolvedViewProps> {
  renderIcon() {
    const { icon } = this.props;
    if (!icon) {
      return null;
    }
    return <Icon src={icon} />;
  }

  renderLozenge() {
    const { lozenge } = this.props;
    if (!lozenge) {
      return null;
    }
    return (
      <Lozenge
        appearance={lozenge.appearance || 'default'}
        isBold={lozenge.isBold}
      >
        {lozenge.text}
      </Lozenge>
    );
  }

  render() {
    const { title, isSelected, onClick } = this.props;
    return (
      <Frame isSelected={isSelected} onClick={onClick}>
        <IconAndTitleLayout
          icon={this.renderIcon()}
          title={<Title isSelected={isSelected}>{title}</Title>}
        >
          {this.renderLozenge()}
        </IconAndTitleLayout>
      </Frame>
    );
  }
}
