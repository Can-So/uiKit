import * as React from 'react';
import styled from 'styled-components';
import { ExampleWrapper } from '../example-helpers/ExampleWrapper';
import { PopupUserPicker } from '../src/components/PopupUserPicker';
import { PopupSelect } from '@atlaskit/select';

const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const options = [
  { label: 'Adelaide', value: 'adelaide' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const onChange = console.log;
const defaults = { options, placeholder: 'Choose a City', onChange };

const Row = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const Cell = styled.div<{ width?: number }>`
  max-width: 100%;
  flex: 0 0 auto;
  width: ${({ width }) => `${width}px` || 'auto'};
`;

const renderRows = (count: number) => {
  const rows: React.ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    rows.push(
      <Row>
        <Cell width={300}>KEY-{i}</Cell>
        <Cell width={100}>
          <ExampleWrapper>
            {({ options, onInputChange }) => (
              <PopupUserPicker
                target={<button>Target</button> as any}
                options={options}
                onInputChange={onInputChange}
                onChange={console.log}
              />
              // <PopupSelect
              //   target={<button>Target</button> as any}
              //   options={options}
              // />
            )}
          </ExampleWrapper>
        </Cell>
      </Row>,
    );
  }
  return rows;
};

export default class Example extends React.Component<{}> {
  render() {
    return (
      <Table>
        <Row>
          <Cell width={300}>Issue</Cell>
          <Cell width={100}>Assign</Cell>
        </Row>
        {renderRows(50)}
      </Table>
    );
  }
}
