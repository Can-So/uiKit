import { AvatarItem } from '@atlaskit/avatar';
import { colors } from '@atlaskit/theme';
import * as React from 'react';
import styled from 'styled-components';
import { User } from '../types';
import { HighlightText } from './HighlightText';
import { SizeableAvatar } from './SizeableAvatar';
import { hasValue } from './utils';

const AvatarComponent = styled.div`
  &,
  &:hover,
  &:active,
  &:focus {
    padding: 0;
    margin: 0;
    border: none;
  }
`;

export const TextWrapper = styled.span`
  color: ${({ color }) => color};
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`;

export type UserOptionProps = {
  user: User;
  status: string;
  isSelected: boolean;
};

export class UserOption extends React.PureComponent<UserOptionProps> {
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

  private getPrimaryText = () => {
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

  private renderByline = () =>
    this.props.user.byline ? (
      <TextWrapper color={this.props.isSelected ? colors.N50 : colors.N200}>
        {this.props.user.byline}
      </TextWrapper>
    ) : (
      undefined
    );

  render() {
    return (
      <AvatarItem
        backgroundColor="transparent"
        avatar={this.renderAvatar()}
        component={AvatarComponent}
        primaryText={this.getPrimaryText()}
        secondaryText={this.renderByline()}
      />
    );
  }
}
