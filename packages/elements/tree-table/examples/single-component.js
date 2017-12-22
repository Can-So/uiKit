// @flow
import React from 'react';

import TreeTable from '../src';
import staticData from './data-structured-nodes.json';

/* eslint react/no-unused-prop-types: 0 */
type ExampleItemData = { title: string, numbering: string };

const Title = (props: ExampleItemData) => <span>{props.title}</span>;
const Numbering = (props: ExampleItemData) => <span>{props.numbering}</span>;

function getChildrenData(parent = staticData) {
  return (parent && parent.children) || [];
}

export default () => (
  <TreeTable
    headers={['Title', 'Numbering']}
    columns={[Title, Numbering]}
    columnWidths={['200px', '200px']}
    items={getChildrenData}
  />
);
