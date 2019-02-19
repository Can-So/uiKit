import { AvatarItem } from '@atlaskit/avatar';
import * as React from 'react';
import styled from 'styled-components';
import { Option } from '../types';
import { SizeableAvatar } from './SizeableAvatar';
import { getAvatarUrl } from './utils';

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

type Props = {
  data: Option;
  selectProps: any;
};

export const SingleValue = (props: Props) => {
  const {
    data: { label, data },
    selectProps: { appearance, isFocused },
  } = props;

  return !isFocused ? (
    <AvatarItem
      backgroundColor="transparent"
      avatar={
        <SizeableAvatar
          src={getAvatarUrl(data)}
          appearance={appearance}
          name={label}
        />
      }
      primaryText={label}
      component={AvatarItemComponent}
    />
  ) : null;
};
