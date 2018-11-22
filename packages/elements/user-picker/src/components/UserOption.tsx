import { AvatarItem } from '@atlaskit/avatar';
import { colors } from '@atlaskit/theme';
import * as React from 'react';
import styled from 'styled-components';
import { HighlightRange, User } from '../types';
import { HighlightText } from './HighlightText';
import { SizeableAvatar } from './SizeableAvatar';

type AvatarTextData = [string, HighlightRange[] | undefined];

interface AvatarText {
  primaryText: AvatarTextData;
  secondaryText?: AvatarTextData;
}

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

export const TextWrapper = styled.div`
  color: ${({ color }) => color};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const OptionWrapper = styled.div`
  & ${TextWrapper} {
  }
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

  private generateAvatarText = (): AvatarText => {
    const {
      user: { name, nickname, highlight },
    } = this.props;

    const nicknameData: [string, HighlightRange[] | undefined] = [
      nickname,
      highlight && highlight.nickname,
    ];

    if (name) {
      const nameData: [string, HighlightRange[] | undefined] = [
        name,
        highlight && highlight.name,
      ];
      return {
        primaryText: nameData,
        secondaryText: nicknameData,
      };
    }
    return { primaryText: nicknameData };
  };

  private highlightText = (textData?: AvatarTextData) => {
    if (!textData) {
      return undefined;
    }
    const [text, highlights] = textData;
    return (
      <TextWrapper color={this.props.isSelected ? colors.N0 : colors.N800}>
        {highlights ? (
          <HighlightText highlights={highlights}>{text}</HighlightText>
        ) : (
          text
        )}
      </TextWrapper>
    );
  };

  render() {
    const { primaryText, secondaryText } = this.generateAvatarText();
    return (
      <AvatarItem
        backgroundColor="transparent"
        avatar={this.renderAvatar()}
        component={AvatarComponent}
        primaryText={this.highlightText(primaryText)}
        secondaryText={this.highlightText(secondaryText)}
      />
    );
  }
}
