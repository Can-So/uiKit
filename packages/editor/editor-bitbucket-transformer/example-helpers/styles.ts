import * as React from 'react';
import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes } from 'react';

import { colors } from '@atlaskit/theme';

// tslint:disable-next-line:variable-name
export const Content: React.ComponentClass<HTMLAttributes<{}>> = styled.div`
  & div.toolsDrawer {
    padding: 8px 16px;
    background: ${colors.N800};

    & label {
      display: flex;
      color: white;
      align-self: center;
      padding-right: 8px;
    }

    & > div {
      /* padding: 4px 0; */
    }

    & button {
      margin: 4px 0;
    }
  }

  & legend {
    margin: 8px 0;
  }

  & input {
    font-size: 13px;
  }
`;
