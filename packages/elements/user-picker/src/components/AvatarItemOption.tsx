import { AvatarItem } from '@atlaskit/avatar';
import * as React from 'react';
import styled from 'styled-components';

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

export type AvatarItemOptionProps = {
  avatar: React.ReactNode;
  primaryText: React.ReactNode;
  secondaryText: React.ReactNode;
};

export const AvatarItemOption = (props: AvatarItemOptionProps) => (
  <AvatarItem
    backgroundColor="transparent"
    component={AvatarComponent}
    {...props}
  />
);
