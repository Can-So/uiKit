// @flow
import React from 'react';
import styled from 'styled-components';
import TableTree, { Headers, Header, Rows, Row, Cell } from '../src';

const staticData = [
  {
    title: 'Chapter One: Introduction',
    description: 'Description One',
  },
  {
    title:
      "Chapter Two: With a Very Very Long Title That Should Be Cut Off Because We Don't Want It To Span Multiple Lines",
    description: 'Description Two. This column can span multiple lines.',
  },
];

function getItemsData(parent) {
  return parent ? [] : staticData;
}

const OverflowingBox = styled.div`
  background: red;
  width: 150px;
  bottom: 100%;
  margin-bottom: -15px;
  right: 0;
  position: absolute;
  color: #000;
  border: 5px solid #800;
`;

export default () => (
  <TableTree>
    <Headers>
      <Header width={300}>Title</Header>
      <Header width={200}>Description</Header>
    </Headers>
    <Rows
      items={getItemsData}
      render={({ title, description }) => (
        <Row itemId={title} hasChildren={false}>
          <Cell singleLine>{title}</Cell>
          <Cell>
            {description} <OverflowingBox>Overflowing box</OverflowingBox>
          </Cell>
        </Row>
      )}
    />
  </TableTree>
);
