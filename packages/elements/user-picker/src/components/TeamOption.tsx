import { AvatarItem } from '@atlaskit/avatar';
import { colors } from '@atlaskit/theme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Team } from '../types';
import { HighlightText } from './HighlightText';
import { SizeableAvatar } from './SizeableAvatar';
import { messages } from './i18n';

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

export type TeamOptionProps = {
  team: Team;
  status: string;
  isSelected: boolean;
};

export class TeamOption extends React.PureComponent<TeamOptionProps> {
  private renderAvatar = () => {
    const {
      team: { avatarUrl, name },
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
      team: { name, highlight },
    } = this.props;

    return [
      <TextWrapper
        key="name"
        color={this.props.isSelected ? colors.N0 : colors.N800}
      >
        <HighlightText highlights={highlight && highlight.name}>
          {name}
        </HighlightText>
      </TextWrapper>,
    ];
  };

  private renderByline = () => {
    const {
      isSelected,
      team: { memberCount, includesYou },
    } = this.props;

    // Member count should always be present in the data that's apssed by Legion. But for some reason
    // if it's not there, do not show the byline
    if (memberCount === null || typeof memberCount === 'undefined') {
      return undefined;
    }

    return (
      <TextWrapper color={isSelected ? colors.N50 : colors.N200}>
        <FormattedMessage
          {...(memberCount > 50
            ? messages.plus50Members
            : messages.memberCount)}
          values={{ count: memberCount, includes: includesYou }}
        />
      </TextWrapper>
    );
  };

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
