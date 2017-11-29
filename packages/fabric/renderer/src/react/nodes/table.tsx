import * as React from 'react';
import { StyledTable } from '@atlaskit/editor-common';

// tslint:disable-next-line:variable-name
const Table = props => (
  <StyledTable>
    <tbody>{props.children}</tbody>
  </StyledTable>
);
export default Table;
