import * as React from 'react';
import styled from 'styled-components';
import { exampleUsers } from '../example-helpers';
import UserPicker from '../src';

const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

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

export default class Example extends React.Component<{}> {
  render() {
    return (
      <Table>
        <Row>
          <Cell width={300}>Issue</Cell>
          <Cell width={100}>Assign</Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
        <Row>
          <Cell width={300}>KEY-123</Cell>
          <Cell width={100}>
            <UserPicker
              menuPortalTarget={document.body}
              options={exampleUsers}
              onChange={console.log}
            />
          </Cell>
        </Row>
      </Table>
    );
  }
}
