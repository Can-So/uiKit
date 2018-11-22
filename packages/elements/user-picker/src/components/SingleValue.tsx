import { AvatarItem } from '@atlaskit/avatar';
import * as React from 'react';
import styled from 'styled-components';
import { SizeableAvatar } from './SizeableAvatar';

const AvatarItemComponent = styled.div`
  border: none;
  padding: 0;
  width: auto;
  overflow: hidden;

  & > span {
    box-sizing: border-box;
  }

  &:hover {
    width: auto;
    padding: 0;
    border: none;
  }
`;

export const SingleValue = props => {
  const {
    data: {
      user: { avatarUrl, name, nickname },
    },
    selectProps: { appearance, isFocused },
  } = props;
  const displayName = name || nickname;

  if (isFocused) {
    return <SizeableAvatar src={avatarUrl} appearance={appearance} />;
  }

  return (
    <AvatarItem
      backgroundColor="transparent"
      avatar={
        <SizeableAvatar
          src={avatarUrl}
          appearance={appearance}
          name={displayName}
        />
      }
      primaryText={displayName}
      component={AvatarItemComponent}
    />
  );
};
