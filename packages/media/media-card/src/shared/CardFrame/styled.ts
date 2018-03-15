import styled, { css } from 'styled-components';

import { HTMLAttributes, ComponentClass, AnchorHTMLAttributes } from 'react';

import {
  akColorN20,
  akColorN30,
  akColorB50,
  akColorN300,
  akFontFamily,
} from '@atlaskit/util-shared-styles';
import { borderRadius, size, linkCardShadow, ellipsis } from '../../styles';

const wrapperPadding = 8;
export const className = 'media-card-frame';

export interface WrapperProps {
  minWidth?: number;
  maxWidth?: number;
  isInteractive?: boolean;
}

function minWidth({ minWidth }: WrapperProps) {
  if (minWidth) {
    return `min-width: ${minWidth}px;`;
  } else {
    return '';
  }
}

function maxWidth({ maxWidth }: WrapperProps) {
  if (maxWidth) {
    return `max-width: ${maxWidth}px;`;
  } else {
    return '';
  }
}

function interactive({ isInteractive }: WrapperProps) {
  if (isInteractive) {
    return `
      cursor: pointer;
      &:hover {
        background-color: ${akColorN30};
      }
      &:active {
        background-color: ${akColorB50};
      }
    `;
  } else {
    return '';
  }
}

/*

  Conversation confirming widths with @Scotty:

  # (Standalone links/smart-cards with a feature image) OR (Filmstrip links/smart-cards):

    width: 100% => take up the full width of the container
    max-width: 400px; but don't go larger than 400px
    min-width: 240px; but don't go smaller than 240px

      => so they'll all be 400px unless someone resizes the window

  # (Standalone links/smart-cards without a feature image):

    width: 100% => take up the full width of the container
    max-width: 644px; but don't go larger than 664px
    min-width: 240px; but don't go smaller than 240px

      => so they'll all be 664px unless someone resizes the window

 */

const wrapperStyles = css`
  ${borderRadius} ${minWidth} ${maxWidth} ${interactive} display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  font-family: ${akFontFamily};
  padding: 0 ${wrapperPadding}px ${wrapperPadding}px ${wrapperPadding}px;
  width: 100%;
  user-select: none;
  background-color: ${akColorN20};
  line-height: initial;
  transition: background 0.3s;
`;

// export interface ContentProps {
//   maxWidth?: number;
// }

export const LinkWrapper: ComponentClass<
  AnchorHTMLAttributes<{}> & WrapperProps
> = styled.a`
  ${wrapperStyles} &:hover {
    text-decoration: none;
  }
`;

export const Wrapper: ComponentClass<
  HTMLAttributes<{}> & WrapperProps
> = styled.div`
  ${wrapperStyles};
`;

export const Header: ComponentClass<HTMLAttributes<{}>> = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  color: ${akColorN300};
`;

export interface PlaceholderProps {
  isPlaceholder: boolean;
}

export const IconWrapper: ComponentClass<
  HTMLAttributes<{}> & PlaceholderProps
> = styled.div`
  ${borderRadius} ${size(16)} ${({ isPlaceholder }: PlaceholderProps) => {
      if (isPlaceholder) {
        return `
      background-color: ${akColorN30};
    `;
      } else {
        return '';
      }
    }} margin-right: 4px;
`;

export const TextWrapper: ComponentClass<
  HTMLAttributes<{}> & PlaceholderProps
> = styled.div`
  ${({ isPlaceholder }: PlaceholderProps) => {
    if (isPlaceholder) {
      return `
        ${borderRadius}
        width: 125px;
        height: 12px;
        background-color: ${akColorN30};
      `;
    } else {
      return '';
    }
  }} color: ${akColorN300};
  font-size: 12px;
  line-height: 16px;
  ${ellipsis('none')};
`;

export interface ContentProps {
  isInteractive: boolean;
}

export const Content: ComponentClass<
  HTMLAttributes<{}> & ContentProps
> = styled.div`
  position: relative;

  ${borderRadius} ${linkCardShadow} background-color: white;
  transition: box-shadow 0.3s;

  ${({ isInteractive }: ContentProps) => {
    if (isInteractive) {
      return ` 
          .${className}:hover & {
            box-shadow: 0 4px 8px -2px rgba(23, 43, 77, 0.32),
              0 0 1px rgba(23, 43, 77, 0.25);
          }
        `;
    } else {
      return '';
    }
  }};
`;
