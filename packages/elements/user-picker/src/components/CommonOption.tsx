import { AvatarItem } from '@atlaskit/avatar';
import * as React from 'react';
import styled from 'styled-components';
import { SizeableAvatar } from './SizeableAvatar';

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

export type CommonOptionProps = {
  avatarUrl: string | undefined;
  name: string;
  presence?: string;
  byline: React.ReactNode;
  primaryText: React.ReactNode;
};

export class CommonOption extends React.PureComponent<CommonOptionProps> {
  private renderAvatar = () => {
    const { avatarUrl, name, presence } = this.props;
    return (
      <SizeableAvatar
        appearance="big"
        src={avatarUrl}
        presence={presence}
        name={name}
      />
    );
  };

  render() {
    return (
      <AvatarItem
        backgroundColor="transparent"
        avatar={this.renderAvatar()}
        component={AvatarComponent}
        primaryText={this.props.primaryText}
        secondaryText={this.props.byline}
      />
    );
  }
}
