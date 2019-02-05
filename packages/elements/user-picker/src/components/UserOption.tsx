import { colors } from '@atlaskit/theme';
import * as React from 'react';
import { User } from '../types';
import { AvatarItemOption, TextWrapper } from './AvatarItemOption';
import { HighlightText } from './HighlightText';
import { SizeableAvatar } from './SizeableAvatar';
import { hasValue } from './utils';

export type UserOptionProps = {
  user: User;
  status?: string;
  isSelected: boolean;
};

export class UserOption extends React.PureComponent<UserOptionProps> {
  getPrimaryText = () => {
    const {
      user: { name, publicName, highlight },
    } = this.props;

    const result = [
      <TextWrapper
        key="name"
        color={this.props.isSelected ? colors.N0 : colors.N800}
      >
        <HighlightText highlights={highlight && highlight.name}>
          {name}
        </HighlightText>
      </TextWrapper>,
    ];
    if (hasValue(publicName) && name.trim() !== publicName.trim()) {
      result.push(
        <React.Fragment key="publicName">
          {' '}
          <TextWrapper color={this.props.isSelected ? colors.N50 : colors.N200}>
            (
            <HighlightText highlights={highlight && highlight.publicName}>
              {publicName}
            </HighlightText>
            )
          </TextWrapper>
        </React.Fragment>,
      );
    }
    return result;
  };

  renderSecondaryText = () =>
    this.props.user.byline ? (
      <TextWrapper color={this.props.isSelected ? colors.N50 : colors.N200}>
        {this.props.user.byline}
      </TextWrapper>
    ) : (
      undefined
    );

  private renderAvatar = () => {
    const {
      user: { avatarUrl, name },
      status,
    } = this.props;
    return (
      <SizeableAvatar
        appearance="big"
        src={avatarUrl}
        presence={status}
        name={name}
      />
    );
  };

  render() {
    return (
      <AvatarItemOption
        avatar={this.renderAvatar()}
        primaryText={this.getPrimaryText()}
        secondaryText={this.renderSecondaryText()}
      />
    );
  }
}
