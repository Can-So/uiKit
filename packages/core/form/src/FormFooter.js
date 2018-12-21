// @flow
import React, { Component, type Node } from 'react';
import { FormFooterWrapper } from './styled/FormFooter';

type Props = {
  /** Children to be rendered in the footer. */
  children?: Node,
};

export default class FormFooter extends Component<Props> {
  render() {
    return <FormFooterWrapper>{this.props.children}</FormFooterWrapper>;
  }
}
