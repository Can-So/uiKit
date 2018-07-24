import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { fontFamily, colors } from '@atlaskit/theme';
import { borderRadius } from '../../mixins';

export interface FrameProps {
  minWidth?: number;
  maxWidth?: number;
  isInteractive?: boolean;
}

function minWidth({ minWidth }: FrameProps) {
  if (minWidth) {
    return `min-width: ${minWidth}px;`;
  } else {
    return '';
  }
}

function maxWidth({ maxWidth }: FrameProps) {
  if (maxWidth) {
    return `max-width: ${maxWidth}px;`;
  } else {
    return '';
  }
}

function interactive({ isInteractive }: FrameProps) {
  if (isInteractive) {
    return `
      cursor: pointer;
      :hover {
        background-color: ${colors.B50};
      }
    `;
  } else {
    return '';
  }
}

export const Wrappper: React.ComponentClass<
  FrameProps & HTMLAttributes<{}>
> = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 40px;
  color: ${colors.N300};
  font-family: ${fontFamily};
  font-size: 12px;
  font-weight: 500;
  border-radius: 3px;
  background-color: ${colors.N20A};
  ${borderRadius} ${minWidth} ${maxWidth} ${interactive};
`;

export const Icon: React.ComponentClass<HTMLAttributes<{}>> = styled.span`
  display: inline-flex;
`;

export const Text: React.ComponentClass<HTMLAttributes<{}>> = styled.span`
  margin-left: 12px;
`;
