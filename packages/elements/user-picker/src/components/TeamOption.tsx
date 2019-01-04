import { AvatarItem } from '@atlaskit/avatar';
import { colors } from '@atlaskit/theme';
import * as React from 'react';
import styled from 'styled-components';
import { Team } from '../types';
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
      team: { name, description, highlight },
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
    if (hasValue(description) && name.trim() !== description.trim()) {
      result.push(
        <React.Fragment key="description">
          {' '}
          <TextWrapper color={this.props.isSelected ? colors.N50 : colors.N200}>
            (
            <HighlightText highlights={highlight && highlight.description}>
              {description}
            </HighlightText>
            )
          </TextWrapper>
        </React.Fragment>,
      );
    }
    return result;
  };

  private renderByline = () =>
    this.props.team.description ? ( //todo - verfiy this logic
      <TextWrapper color={this.props.isSelected ? colors.N50 : colors.N200}>
        {this.props.team.description}
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
