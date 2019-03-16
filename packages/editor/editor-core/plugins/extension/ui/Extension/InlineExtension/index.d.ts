import * as React from 'react';
import { Component } from 'react';
import { Node as PmNode } from 'prosemirror-model';
import { MacroProvider } from '../../../../macro';
export interface Props {
    node: PmNode;
    macroProvider?: MacroProvider;
    children?: React.ReactNode;
}
export default class InlineExtension extends Component<Props, any> {
    render(): JSX.Element;
}
