// @flow
import React, { Component } from 'react';
import DynamicTable from '../src';
import { caption, head, rows } from './content/sample-data';

export default class extends Component<{}, {}> {
  render() {
    return (
      <DynamicTable
        caption={caption}
        head={head}
        rows={rows}
        isFixedSize
        rowsPerPage={10}
        defaultPage={1}
        onSetPage={() => console.log('onSetPage')}
      />
    );
  }
}
