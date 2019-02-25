import * as React from 'react';
import { shallow } from 'enzyme';
import TableRow from '../../../../react/nodes/tableRow';

describe('Renderer - React/Nodes/TableRow', () => {
  const tableRow = shallow(<TableRow />);

  it('should create a <tr>-tag', () => {
    expect(tableRow.name()).toEqual('tr');
  });
});
