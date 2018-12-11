import * as React from 'react';
import { Frame } from '../Frame';
import Lozenge from '@atlaskit/lozenge';
import { LozengeViewModel } from '../../common';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import { Title } from './styled';
import { Icon } from '../Icon';

export interface InlineCardResolvedViewProps {
  /** The optional con of the service (e.g. Dropbox/Asana/Google/etc) to display */
  icon?: string | React.ReactNode;
  /** The name of the resource */
  title: string;
  /** The the optional lozenge that might represent the statux of the resource */
  lozenge?: LozengeViewModel;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
  /** The optional click handler */
  onClick?: () => void;
}

export class InlineCardResolvedView extends React.Component<
  InlineCardResolvedViewProps
> {
  renderIcon() {
    const { icon } = this.props;
    if (!icon) {
      return null;
    }

    if (typeof icon === 'string') {
      return <Icon src={icon} />;
    }

    return icon;
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
