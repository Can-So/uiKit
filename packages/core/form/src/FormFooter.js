// @flow
import React, { Component, type Node } from 'react';
import { FormFooterWrapper } from './styled/FormFooter';

type Props = {
  /** Child Compo */
  children?: Node,
};

export default class FormFooter extends Component<Props, void> {
  render() {
    return <FormFooterWrapper>{this.props.children}</FormFooterWrapper>;
  }
}
