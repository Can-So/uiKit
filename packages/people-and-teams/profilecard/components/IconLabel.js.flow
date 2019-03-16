// @flow
import React, { PureComponent, type Node as ReactNode } from 'react';
import IconLocation from '@findable/icon/glyph/location';
import IconRecent from '@findable/icon/glyph/recent';
import IconMention from '@findable/icon/glyph/mention';
import IconEmail from '@findable/icon/glyph/email';
import OfficeBuildingIcon from '@findable/icon/glyph/office-building';

import {
  DetailsLabel,
  DetailsLabelIcon,
  DetailsLabelText,
} from '../styled/Card';

const icons = {
  location: IconLocation,
  time: IconRecent,
  mention: IconMention,
  email: IconEmail,
  companyName: OfficeBuildingIcon,
};

type Props = {
  icon: string,
  children?: ReactNode,
};

export default class IconLabel extends PureComponent<Props> {
  static defaultProps = {
    icon: '',
  };

  render() {
    if (!this.props.children) {
      return null;
    }

    const IconElement = this.props.icon && icons[this.props.icon];
    const displayIcon = IconElement ? (
      <IconElement label={`icon ${this.props.icon}`} size="small" />
    ) : null;

    return (
      <DetailsLabel>
        <DetailsLabelIcon>{displayIcon}</DetailsLabelIcon>
        <DetailsLabelText>{this.props.children}</DetailsLabelText>
      </DetailsLabel>
    );
  }
}
