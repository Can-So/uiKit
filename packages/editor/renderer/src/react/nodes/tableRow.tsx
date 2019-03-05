import * as React from 'react';
import { RendererCssClassName } from '../../consts';

type Props = {
  isNumberColumnEnabled?: number;
  index?: number;
  children?: React.ReactNode;
};

// tslint:disable-next-line:variable-name
const TableRow = (props: Props) => {
  return (
    <tr>
      {props.isNumberColumnEnabled && (
        <td className={RendererCssClassName.NUMBER_COLUMN}>{props.index}</td>
      )}
      {props.children}
    </tr>
  );
};

export default TableRow;
