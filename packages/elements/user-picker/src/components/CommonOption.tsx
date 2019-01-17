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
  getByline: () => void; //todo - this is not the expected return type
  getPrimaryText: () => void;
};

export class CommonOption extends React.PureComponent<CommonOptionProps> {
  private renderAvatar = () => {
    const { avatarUrl, name, presence } = this.props;
    return (
      <SizeableAvatar
        appearance="big"
        src={avatarUrl}
        presence={presence} // todo - teams should not show presence, test this logic as well
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
        primaryText={this.props.getPrimaryText()}
        secondaryText={this.props.getByline()}
      />
    );
  }
}
