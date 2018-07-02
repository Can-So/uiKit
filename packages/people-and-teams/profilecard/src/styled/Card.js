// @flow
import styled from 'styled-components';
import { akBorderRadius } from '@atlaskit/util-shared-styles';
import { gridSize, math } from '@atlaskit/theme';

import {
  headerBgColor,
  headerTextColor,
  appLabelBgColor,
  appLabelTextColor,
  labelTextColor,
  labelIconColor,
} from '../styled/constants';

const getFullNameMargin = props =>
  props.noMeta
    ? `${gridSize() * 4.5}px 0 ${gridSize() * 1.5}px 0`
    : `${gridSize() * 1.5}px 0 0 0`;

export const ProfileImage = styled.div`
  position: absolute;
  top: ${math.multiply(gridSize, 3)}px;
  left: ${math.multiply(gridSize, 3)}px;
`;

export const ActionsFlexSpacer = styled.div`
  flex: 1 0 auto;
`;

export const ActionButtonGroup = styled.div`
  user-select: none;
  margin: ${math.multiply(gridSize, 2)}px 0 0 0;
  text-align: right;

  button {
    margin-left: ${gridSize}px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${math.multiply(gridSize, 17)}px;
`;

export const DetailsGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${math.multiply(gridSize, 14.5)}px;
  width: ${math.multiply(gridSize, 24.5)}px;
`;

export const DeactivatedInfo = styled.div`
  font-size: ${math.multiply(gridSize, 1.5)}px;
  color: ${labelTextColor};
  margin: ${math.multiply(gridSize, 1.5)}px 0 0 0;
  line-height: ${math.divide(() => 24, 12)}em;
`;

export const FullNameLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 18px;
  color: ${headerTextColor};
  margin: ${props => getFullNameMargin(props)};
  line-height: ${math.divide(() => 24, 18)}em;
`;

export const JobTitleLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 14px;
  color: ${headerTextColor};
  margin: 0 0 ${math.multiply(gridSize, 1.5)}px 0;
  line-height: ${math.divide(() => 24, 14)}em;
`;

export const AppTitleLabel = styled.span`
  background: ${appLabelBgColor};
  color: ${appLabelTextColor};
  border-radius: ${akBorderRadius};
  padding: 0 6px;
  width: fit-content;
  font-weight: bold;
  text-transform: uppercase;

  font-size: 12px;
  margin: 4px 0 ${math.multiply(gridSize, 1.5)}px 0;
  line-height: ${math.divide(() => 24, 14)}em;
`;

export const SpinnerContainer = styled.div`
  align-items: center;
  display: flex;
  height: ${math.multiply(gridSize, 12)}px;
  justify-content: center;
  position: relative;
`;

export const CardContainer = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: linear-gradient(
    to bottom,
    ${headerBgColor} 0%,
    ${headerBgColor} 100%
  );
  background-repeat: no-repeat;
  background-size: 100% ${math.multiply(gridSize, 12)}px;
  box-sizing: content-box;
  padding: ${math.multiply(gridSize, 3)}px;
`;

export const DetailsLabel = styled.div`
  display: flex;
  align-items: center;
  line-height: ${math.multiply(gridSize, 3)}px;
  font-size: ${math.multiply(gridSize, 1.5)}px;
  margin: ${math.multiply(gridSize, 2)}px 0 0 0;
  white-space: nowrap;

  & + & {
    margin-top: ${math.multiply(gridSize, 0.25)}px;
  }
`;

export const DetailsLabelIcon = styled.div`
  display: flex;
  flex-shrink: 0;
  color: ${labelIconColor};
  width: ${math.multiply(gridSize, 2)}px;
  height: ${math.multiply(gridSize, 2)}px;
  padding: ${math.multiply(gridSize, 0.5)}px;
  vertical-align: top;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const DetailsLabelText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${labelTextColor};
  padding-left: ${math.multiply(gridSize, 0.5)}px;
`;
