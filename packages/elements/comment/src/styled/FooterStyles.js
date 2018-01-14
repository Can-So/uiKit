// @flow

import styled from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';
import { actionsPadding } from './constants';

const ThemeColor = {
  text: {
    default: colors.N500,
    error: colors.Y500,
  },
};

export const ActionsItem = styled.div`
  display: flex;

  & + &::before {
    color: ${ThemeColor.text.default};
    content: '·';
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width: ${actionsPadding}px;
  }
`;

export const ErrorIcon = styled.span`
  color: ${ThemeColor.text.error};
  padding-right: ${gridSize()}px;
`;

export const ActionsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: ${gridSize() * 0.75}px;
`;
