import * as React from 'react';
import { Component } from 'react';
import { Node as PmNode } from 'prosemirror-model';
import { ExtensionProvider } from '../../../../macro';
import { Overlay } from '../styles';
import ExtensionLozenge from '../Lozenge';
import { Wrapper } from './styles';

export interface Props {
  node: PmNode;
  extensionProvider?: ExtensionProvider;
  onClick: (event: React.SyntheticEvent<any>) => void;
  children?: React.ReactNode;
}

export default class InlineExtension extends Component<Props, any> {
  render() {
    const { node, onClick, children } = this.props;

    const hasChildren = !!children;

    const className = hasChildren
      ? 'with-overlay with-children'
      : 'with-overlay';

    return (
      <Wrapper onClick={onClick} className={className}>
        <Overlay className="extension-overlay" />
        {children ? children : <ExtensionLozenge node={node} />}
      </Wrapper>
    );
  }
}
