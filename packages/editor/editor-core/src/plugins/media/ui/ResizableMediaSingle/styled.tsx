import {
  MediaSingleDimensionHelper,
  MediaSingleDimensionHelperProps,
} from '@atlaskit/editor-common';
import styled from 'styled-components';

export const Wrapper: React.ComponentClass<
  React.HTMLAttributes<{}> & MediaSingleDimensionHelperProps
> = styled.div`
  & > div {
    ${MediaSingleDimensionHelper};
    position: relative;
    z-index: 1;

    > div {
      position: absolute;
      height: 100%;
    }
  }

  & > div::after {
    content: '';
    display: block;
    padding-bottom: ${p => (p.height / p.width) * 100}%;
  }
`;
