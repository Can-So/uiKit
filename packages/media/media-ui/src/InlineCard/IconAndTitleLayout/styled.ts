import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';

// TODO: Replace overrides with proper AtlasKit solution.
export const IconWrapper: ComponentClass<HTMLAttributes<{}>> = styled.span`
  line-height: 12px;
  margin-right: 4px;
  vertical-align: text-bottom;
  & > span {
    height: 12px;
    width: 12px;
    & > svg {
      vertical-align: inherit;
    }
  }
`;

// The main 'wrapping' element, title of the content.
// NB: `white-space` adds little whitespace before wrapping.
// NB: `hyphens` enables hyphenation on word break.
export const IconTitleWrapper: ComponentClass<HTMLAttributes<{}>> = styled.span`
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  hyphens: auto;
`;

// TODO: Replace overrides with proper AtlasKit solution.
export const LozengeWrapper: ComponentClass<HTMLAttributes<{}>> = styled.span`
  display: inline-block;
  vertical-align: text-bottom;
  & > span {
    margin-left: 4px;
    padding: 2px 0 1px 0;
  }
`;
