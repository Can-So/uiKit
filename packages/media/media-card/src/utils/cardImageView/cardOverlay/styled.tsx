/* tslint:disable:variable-name */

import styled from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';
import {
  rgba,
  centerX,
  easeOutCubic,
  borderRadius,
  size,
  transition,
  ellipsis,
  absolute,
  antialiased,
} from '../../../styles';
import {
  akColorN70,
  akColorB200,
  akColorN0,
  akColorN800,
  akColorN900,
  akColorB400,
  akColorB300,
} from '@atlaskit/util-shared-styles';

export interface OverlayProps {
  hasError?: boolean;
}

export const TickBox: ComponentClass<
  HTMLAttributes<{}> & OverlayProps
> = styled.div`
  ${size(14)} ${transition()} background-color: ${rgba('#ffffff', 0.5)};
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 20px;
  color: #798599; /* TODO FIL-3884: Align color with new design */
  display: flex;
  opacity: 0;

  &.selected {
    opacity: 1;
    color: white;
    background-color: #0052cc; /* TODO FIL-3884: Align with tickbox icons */
  }

  /* Enforce dimensions of "tick" icon */
  svg {
    width: 14px;
  }
`;

export const Overlay: ComponentClass<
  HTMLAttributes<{}> & OverlayProps
> = styled.div`
  ${size()} ${absolute()} ${borderRadius} display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: transparent;
  border: 2px solid transparent;
  transition: 0.3s background ${easeOutCubic}, 0.3s border-color;
  padding: 16px;

  ${({ hasError }: OverlayProps) => {
    if (hasError) {
      return `
        cursor: default;

        &:hover {
          background: transparent;
        }
      `;
    }

    return '';
  }} &:hover, &.active {
    .top-row {
      .title {
        color: ${akColorB400};
      }
    }

    .bottom-row {
      .delete-btn {
        display: flex;
      }
    }
  }

  .file-type-icon {
    display: block;
  }

  &:not(.persistent) {
    &:not(.error):hover {
      background-color: ${rgba(akColorN900, 0.06)};
    }

    &.selectable {
      &.selected {
        background-color: ${akColorB200};

        &:hover {
          /* TODO FIL-3884 add new overlay with rgba(akColorN900, 0.16) */
        }

        .title,
        .bottom-row,
        .file-size,
        .more-btn {
          color: ${akColorN0};
        }
      }
    }
  }

  &.persistent {
    &:not(.active) {
      overflow: hidden;
    }

    .top-row {
      .title {
        transition: opacity 0.3s;
        opacity: 0;
        color: white;
        visibility: hidden;
      }
    }

    .bottom-row {
      opacity: 0;
      transition: transform 0.2s, opacity 0.5s;
      /* This is the height of the overlay footer, needs to be present now since the parent uses flex and 100% doesn't look right anymore */
      transform: translateY(35px);

      .file-type-icon {
        display: none;
      }

      .file-size {
        color: white;
        display: none;
      }

      .more-btn {
        color: ${akColorN0};
        display: none;

        &:hover {
          background-color: rgba(9, 30, 66, 0.2);
        }
      }

      .delete-btn {
        display: none;

        &:hover {
          background-color: rgba(9, 30, 66, 0.2);
        }
      }
    }

    &:hover,
    &.active {
      background-color: ${rgba(akColorN900, 0.5)};

      .title {
        opacity: 1;
        visibility: visible;
      }

      .file-type-icon,
      .file-size {
        display: block;
      }

      .more-btn {
        ${centerX} color: ${akColorN0};
      }

      .delete-btn {
        display: flex;
      }

      .bottom-row {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Selectable */
    &.selectable {
      &:hover {
        .tickbox {
          opacity: 1;
        }
      }

      &.selected {
        border-color: ${akColorB200} !important;

        .tickbox {
          background-color: ${akColorB200} !important;
          border-color: ${akColorB200} !important;
          color: white;
        }
      }
    }
  }

  &.error {
    .top-row {
      overflow: visible;
    }
    &:hover,
    &.active {
      .top-row {
        .title {
          color: ${akColorN800};
        }
      }
    }
  }
`;

export const ErrorLine: ComponentClass<HTMLAttributes<{}>> = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
`;

export const LeftColumn: ComponentClass<HTMLAttributes<{}>> = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  vertical-align: middle;
`;

export const TopRow: ComponentClass<HTMLAttributes<{}>> = styled.div``;

export const BottomRow: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
  height: 16px;
`;

export const RightColumn: ComponentClass<HTMLAttributes<{}>> = styled.div``;

export const ErrorMessage: ComponentClass<HTMLAttributes<{}>> = styled.div`
  ${antialiased} display: inline-block;
  vertical-align: middle;
  font-weight: bold;
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: ~'calc(100% - 24px)';
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Retry: ComponentClass<HTMLAttributes<{}>> = styled.div`
  ${antialiased} box-sizing: border-box;
  margin-left: 5px;
  font-weight: bold;
  color: ${akColorB400};
  font-size: 12px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: ${akColorB300};
  }
`;

export const ErrorWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
`;

export const TitleWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  box-sizing: border-box;
  word-wrap: break-word;
  color: ${akColorN800};
  font-size: 12px;
  line-height: 18px;
`;

export const Subtitle: ComponentClass<HTMLAttributes<{}>> = styled.div`
  ${ellipsis('100px')} font-size: 12px;
  color: #5e6c84;
`;

export const Metadata: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  align-items: center;
`;
