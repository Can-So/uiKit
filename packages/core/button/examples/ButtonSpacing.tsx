import * as React from 'react';
import Button from '../src';

const Table = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ display: 'table' }} {...props} />
);
const Row = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ display: 'table-row' }} {...props} />
);
const Cell = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ display: 'table-cell', padding: 4 }} {...props} />
);

const ButtonSpacing = () => (
  <Table>
    <Row>
      <Cell>
        <Button>Default</Button>
      </Cell>
      <Cell>
        <Button spacing="compact">Compact</Button>
      </Cell>
    </Row>
    <Row>
      <Cell>
        <Button appearance="link">Default</Button>
      </Cell>
      <Cell>
        <Button appearance="link" spacing="compact">
          Compact
        </Button>
      </Cell>
      <Cell>
        <Button appearance="link" spacing="none">
          None
        </Button>
      </Cell>
    </Row>
  </Table>
);

export default ButtonSpacing;
