import * as React from 'react';
import { Component } from 'react';

export interface Props {
  id: string;
  annotationType: string;
}

export default class Annotation extends Component<Props, {}> {
  render() {
    const { id, annotationType, children } = this.props;
    return (
      <span
        data-mark-type="annotation"
        data-mark-annotation-type={annotationType}
        data-id={id}
      >
        {children}
      </span>
    );
  }
}
