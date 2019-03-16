import * as React from 'react';
import { IndentationMarkAttributes } from '@findable/adf-schema';

interface Props extends IndentationMarkAttributes {
  children: React.Props<any>;
}

export default function Indentation(props: Props) {
  return (
    <div
      className="fabric-editor-block-mark fabric-editor-indentation-mark"
      data-level={props.level}
    >
      {props.children}
    </div>
  );
}
