import * as React from 'react';
import { CSSProperties } from 'react';

const TableHeader = props => {
  let style: CSSProperties = {};

  if (props.background) {
    style.backgroundColor = props.background;
  }

  return (
    <th style={style} rowSpan={props.rowspan} colSpan={props.colspan}>
      {props.children}
    </th>
  );
};

export default TableHeader;
