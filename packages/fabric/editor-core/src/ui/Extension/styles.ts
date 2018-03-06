import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import {
  akColorN20A,
  akColorN20,
  akColorB200,
  akColorN70,
  akBorderRadius,
} from '@atlaskit/util-shared-styles';

export const padding = 8;

export const Wrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  background: ${akColorN20};
  border-radius: ${akBorderRadius};
  position: relative;
  vertical-align: middle;

  .ProseMirror-selectednode > & > .extension-overlay {
    border: 2px solid ${akColorB200};
    top: -2px;
    left: -2px;
    opacity: 1;
  }

  &.with-overlay {
    .extension-overlay {
      background: ${akColorN20A};
    }

    &:hover .extension-overlay {
      opacity: 1;
    }
  }
`;

export const Overlay: ComponentClass<HTMLAttributes<{}>> = styled.div`
  border-radius: ${akBorderRadius};
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 1;
`;

export const PlaceholderFallback: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  display: inline-flex;
  align-items: center;

  & > img {
    margin: 0 4px;
  }
`;

export const PlaceholderFallbackParams: ComponentClass<
  HTMLAttributes<{}>
> = styled.span`
  display: inline-block;
  max-width: 200px;
  margin-left: 5px;
  color: ${akColorN70};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
