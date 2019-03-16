import { Skeleton } from '@findable/icon';
import InviteTeamIcon from '@findable/icon/glyph/invite-team';
import * as React from 'react';
import styled from 'styled-components';

const AddOptionAvatarWrapper = styled.span`
  color: black;
  padding: 2px;
`;

export type AddOptionAvatarProps = {
  label: string;
  size?: 'small' | 'large';
};

export const AddOptionAvatar: React.StatelessComponent<
  AddOptionAvatarProps
> = ({ size, label }) => (
  <AddOptionAvatarWrapper>
    <Skeleton size={size}>
      <InviteTeamIcon label={label} size={size} primaryColor="white" />
    </Skeleton>
  </AddOptionAvatarWrapper>
);

AddOptionAvatar.defaultProps = {
  size: 'large',
};
