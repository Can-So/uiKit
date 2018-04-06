// @flow
import styled, { css } from 'styled-components';
import { colors, gridSize, math, themed } from '@atlaskit/theme';

import { flexMaxHeightIEFix } from '../utils/flex-max-height-ie-fix';

// Constants
// ==============================
const innerGutter = 16;
const outerGutter = 20;
const keylineColor = themed({ light: colors.N30, dark: colors.DN30 });
export const keylineHeight = 2;

// Wrapper
// ==============================
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  ${flexMaxHeightIEFix};
`;

// Header
// ==============================
const HeaderOrFooter = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  transition: box-shadow 200ms;
`;

// $FlowFixMe: Passed in type incompatible with expected type of React.Component (quite sure this is an issue with styled component flow types)
export const Header = styled(HeaderOrFooter)`
  padding: ${outerGutter}px ${outerGutter}px ${innerGutter - keylineHeight}px;
  box-shadow: ${p =>
    p.showKeyline ? ` 0 ${keylineHeight}px 0 0 ${keylineColor(p)}` : 'none'};
`;

// Title
const oneLineTitleText = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Title = styled.h4`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-style: inherit;
  font-weight: 500;
  letter-spacing: -0.008em;
  line-height: 1;
  margin: 0;
  min-width: 0;
`;

export const TitleText = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  word-wrap: break-word;
  width: 100%;
  ${({ isHeadingMultiline }) => !isHeadingMultiline && oneLineTitleText};
`;
const iconColor = {
  danger: colors.R400,
  warning: colors.Y400,
};
export const TitleIconWrapper = styled.span`
  color: ${p => iconColor[p.appearance]};
  margin-right: ${gridSize}px;
  flex: 0 0 auto;
`;

// Body
// ==============================

/**
  Adding the padding here avoids cropping box shadow on first/last
  children. The combined vertical spacing is maintained by subtracting the
  keyline height from header and footer.
*/
export const Body = styled.div`
  flex: 1 1 auto;
  ${p =>
    p.shouldScroll
      ? `
          overflow-y: auto;
          overflow-x: hidden;
          padding: ${keylineHeight}px ${outerGutter}px;
        `
      : `
          padding: 0 ${outerGutter}px;
        `};
`;

// Footer
// ==============================

// $FlowFixMe: Passed in type incompatible with expected type of React.Component (quite sure this is an issue with styled component flow types)
export const Footer = styled(HeaderOrFooter)`
  padding: ${innerGutter - keylineHeight}px ${outerGutter}px ${outerGutter}px;
  box-shadow: ${p =>
    p.showKeyline ? `0 -${keylineHeight}px 0 0 ${keylineColor(p)}` : 'none'};
`;

export const Actions = styled.div`
  display: inline-flex;
  margin: 0 -${math.divide(gridSize, 2)}px;
`;
export const ActionItem = styled.div`
  flex: 1 0 auto;
  margin: 0 ${math.divide(gridSize, 2)}px;
`;
